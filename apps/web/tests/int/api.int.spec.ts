import { getPayload, Payload } from 'payload'
import config from '@/payload.config'

import { describe, it, beforeAll, expect } from 'vitest'

let payload: Payload

// Needs the local Postgres running and migrations applied (pnpm --filter @eopar/web migrate)
describe('Payload', () => {
  beforeAll(async () => {
    payload = await getPayload({ config: await config })
  })

  it('connects to the database and queries users', async () => {
    const users = await payload.find({ collection: 'users', limit: 1 })
    expect(users.docs).toBeInstanceOf(Array)
  })

  it('mounts Studio at /studio with GraphQL disabled', () => {
    expect(payload.config.routes.admin).toBe('/studio')
    expect(payload.config.routes.api).toBe('/api/studio')
    expect(payload.config.graphQL.disable).toBe(true)
  })

  it('locks staff accounts after 5 failed logins', () => {
    const auth = payload.collections.users.config.auth
    expect(auth.maxLoginAttempts).toBe(5)
    expect(auth.cookies.sameSite).toBe('Strict')
  })
})
