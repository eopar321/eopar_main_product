import { describe, expect, it } from 'vitest'

import { loadConfig } from './config.js'

describe('loadConfig', () => {
  it('accepts a valid redis URL and applies defaults', () => {
    const config = loadConfig({ REDIS_URL: 'redis://:secret@127.0.0.1:6380' })
    expect(config.NODE_ENV).toBe('development')
    expect(config.LOG_LEVEL).toBe('info')
  })

  it('rejects a missing REDIS_URL without leaking values', () => {
    expect(() => loadConfig({ LOG_LEVEL: 'info' })).toThrow(
      'Invalid worker configuration: REDIS_URL',
    )
  })

  it('rejects a non-redis URL', () => {
    expect(() => loadConfig({ REDIS_URL: 'http://example.com' })).toThrow()
  })
})
