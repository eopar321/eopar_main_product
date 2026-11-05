/** Brand wording. Always "&", never "and" (brief §2). */
export const BRAND = {
  name: 'EOPAR',
  fullName: 'Essence of Predictive Arts & Research',
  tagline: 'Patterns. Possibilities. Direction.',
  motto: 'Not a person. A pursuit.',
} as const

/** Colour tokens (brief §5). Mirrored in apps/web/src/styles/tokens.css — keep both in sync. */
export const COLORS = {
  navy: '#0B1426',
  black: '#07080B',
  blackDeep: '#050608',
  gold: '#C9A96E',
  goldSoft: '#E6CFA0',
  goldLight: '#F3DFB2',
  goldSpark: '#FFF1D2',
  bronze: '#7A5C2E',
  ivory: '#F4EDE1',
  stone: '#E9E2D5',
} as const

export type ColorToken = keyof typeof COLORS
