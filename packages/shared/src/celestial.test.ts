import { describe, expect, it } from 'vitest'

import { GRAHAS, MAIN_NAV, NAKSHATRAS, PLANET_SECTORS, TEXT_VS, ZODIAC_SIGNS } from './celestial.js'

describe('celestial data', () => {
  it('has 12 signs from Mesha to Meena', () => {
    expect(ZODIAC_SIGNS).toHaveLength(12)
    expect(ZODIAC_SIGNS[0]?.name).toBe('Mesha')
    expect(ZODIAC_SIGNS[11]?.name).toBe('Meena')
  })

  it('has the nine grahas and 27 nakshatras', () => {
    expect(GRAHAS).toHaveLength(9)
    expect(NAKSHATRAS).toHaveLength(27)
  })

  it.each([...ZODIAC_SIGNS, ...GRAHAS].map((item) => [item.name, item.glyph]))(
    '%s glyph uses the text variation selector (never emoji)',
    (_name, glyph) => {
      expect(glyph.endsWith(TEXT_VS)).toBe(true)
      expect([...glyph]).toHaveLength(2)
    },
  )

  it('maps the seven classical planets to sectors, never Rahu/Ketu', () => {
    expect(PLANET_SECTORS.map((p) => p.graha)).toEqual([
      'sun',
      'moon',
      'mars',
      'mercury',
      'jupiter',
      'venus',
      'saturn',
    ])
  })

  it('has a single consultation entry point outside the main nav', () => {
    expect(MAIN_NAV.map((item) => item.label)).not.toContain('Consultations')
  })
})
