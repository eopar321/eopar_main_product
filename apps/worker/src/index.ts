import { BRAND } from '@eopar/shared'
import { Queue, Worker } from 'bullmq'
import { Redis } from 'ioredis'
import { pino } from 'pino'

import { loadConfig } from './config.js'

const config = loadConfig()
const log = pino({ level: config.LOG_LEVEL, base: { service: 'worker' } })
// BullMQ 6 needs a ready-made client; maxRetriesPerRequest: null is required for blocking workers
const connection = new Redis(config.REDIS_URL, { maxRetriesPerRequest: null })

// Phase 0: a single "system" queue with a heartbeat job proves Redis + repeatable jobs work.
// Later phases add queues for email, uploads (ClamAV/sharp), reminders, quote expiry and retention.
const SYSTEM_QUEUE = 'system'

const systemQueue = new Queue(SYSTEM_QUEUE, { connection })
await systemQueue.upsertJobScheduler('heartbeat', { every: 60_000 }, { name: 'heartbeat' })

const systemWorker = new Worker(
  SYSTEM_QUEUE,
  async (job) => {
    if (job.name === 'heartbeat') {
      log.info({ job: job.name }, 'heartbeat')
      return { ok: true, at: new Date().toISOString() }
    }
    throw new Error(`Unknown job: ${job.name}`)
  },
  { connection, concurrency: 1 },
)

systemWorker.on('failed', (job, err) =>
  log.error({ job: job?.name, err: err.message }, 'job failed'),
)

log.info(`${BRAND.name} worker started`)

async function shutdown(signal: string) {
  log.info({ signal }, 'shutting down')
  await systemWorker.close()
  await systemQueue.close()
  connection.disconnect()
  process.exit(0)
}

process.on('SIGINT', () => void shutdown('SIGINT'))
process.on('SIGTERM', () => void shutdown('SIGTERM'))
