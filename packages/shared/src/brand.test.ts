import { describe, expect, it } from 'vitest'

import { BRAND, COLORS } from './brand.js'

describe('brand', () => {
  it('always writes the full name with an ampersand', () => {
    expect(BRAND.fullName).toBe('Essence of Predictive Arts & Research')
    expect(BRAND.fullName).not.toMatch(/\band\b/i)
  })

  it('defines every colour token as a 6-digit hex value', () => {
    for (const value of Object.values(COLORS)) {
      expect(value).toMatch(/^#[0-9A-F]{6}$/)
    }
  })
})
