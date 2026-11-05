/**
 * Zodiac signs, grahas and nakshatras. Every glyph ends with U+FE0E (text variation selector)
 * so iOS and Android draw a line glyph, never a colour emoji.
 */
export const TEXT_VS = '︎'

const g = (codePoint: string) => `${codePoint}${TEXT_VS}`

export interface ZodiacSign {
  id: string
  /** Sanskrit (rashi) name used on the site */
  name: string
  western: string
  glyph: string
}

/** Mesha → Meena, in zodiac order */
export const ZODIAC_SIGNS: readonly ZodiacSign[] = [
  { id: 'mesha', name: 'Mesha', western: 'Aries', glyph: g('♈') },
  { id: 'vrishabha', name: 'Vrishabha', western: 'Taurus', glyph: g('♉') },
  { id: 'mithuna', name: 'Mithuna', western: 'Gemini', glyph: g('♊') },
  { id: 'karka', name: 'Karka', western: 'Cancer', glyph: g('♋') },
  { id: 'simha', name: 'Simha', western: 'Leo', glyph: g('♌') },
  { id: 'kanya', name: 'Kanya', western: 'Virgo', glyph: g('♍') },
  { id: 'tula', name: 'Tula', western: 'Libra', glyph: g('♎') },
  { id: 'vrishchika', name: 'Vrishchika', western: 'Scorpio', glyph: g('♏') },
  { id: 'dhanu', name: 'Dhanu', western: 'Sagittarius', glyph: g('♐') },
  { id: 'makara', name: 'Makara', western: 'Capricorn', glyph: g('♑') },
  { id: 'kumbha', name: 'Kumbha', western: 'Aquarius', glyph: g('♒') },
  { id: 'meena', name: 'Meena', western: 'Pisces', glyph: g('♓') },
]

export type GrahaId =
  'sun' | 'moon' | 'mars' | 'mercury' | 'jupiter' | 'venus' | 'saturn' | 'rahu' | 'ketu'

export interface Graha {
  id: GrahaId
  name: string
  sanskrit: string
  glyph: string
}

/** The nine grahas (navagraha), weekday order then the lunar nodes */
export const GRAHAS: readonly Graha[] = [
  { id: 'sun', name: 'Sun', sanskrit: 'Surya', glyph: g('☉') },
  { id: 'moon', name: 'Moon', sanskrit: 'Chandra', glyph: g('☽') },
  { id: 'mars', name: 'Mars', sanskrit: 'Mangala', glyph: g('♂') },
  { id: 'mercury', name: 'Mercury', sanskrit: 'Budha', glyph: g('☿') },
  { id: 'jupiter', name: 'Jupiter', sanskrit: 'Guru', glyph: g('♃') },
  { id: 'venus', name: 'Venus', sanskrit: 'Shukra', glyph: g('♀') },
  { id: 'saturn', name: 'Saturn', sanskrit: 'Shani', glyph: g('♄') },
  { id: 'rahu', name: 'Rahu', sanskrit: 'Rahu', glyph: g('☊') },
  { id: 'ketu', name: 'Ketu', sanskrit: 'Ketu', glyph: g('☋') },
]

export const grahaById = (id: GrahaId): Graha => GRAHAS.find((graha) => graha.id === id)!

export const NAKSHATRAS = [
  'Ashwini',
  'Bharani',
  'Krittika',
  'Rohini',
  'Mrigashira',
  'Ardra',
  'Punarvasu',
  'Pushya',
  'Ashlesha',
  'Magha',
  'Purva Phalguni',
  'Uttara Phalguni',
  'Hasta',
  'Chitra',
  'Swati',
  'Vishakha',
  'Anuradha',
  'Jyeshtha',
  'Mula',
  'Purva Ashadha',
  'Uttara Ashadha',
  'Shravana',
  'Dhanishta',
  'Shatabhisha',
  'Purva Bhadrapada',
  'Uttara Bhadrapada',
  'Revati',
] as const

/**
 * Traditional planet ↔ market-sector associations as shown on the homepage Sector Wheel.
 * Classical rulerships from financial astrology — studied, not assumed. Never trading advice.
 */
export const PLANET_SECTORS: readonly { graha: GrahaId; sectors: readonly string[] }[] = [
  { graha: 'sun', sectors: ['Government', 'Power'] },
  { graha: 'moon', sectors: ['FMCG', 'Silver'] },
  { graha: 'mars', sectors: ['Metals', 'Defence'] },
  { graha: 'mercury', sectors: ['IT', 'Telecom'] },
  { graha: 'jupiter', sectors: ['Banking', 'Gold'] },
  { graha: 'venus', sectors: ['Luxury', 'Autos'] },
  { graha: 'saturn', sectors: ['Oil', 'Infrastructure'] },
]

/** Main navigation, in the order used on every inner page of the design (DECISIONS D-015) */
export const MAIN_NAV = [
  { label: 'Predictive Arts', href: '/predictive-arts' },
  { label: 'Markets', href: '/markets' },
  { label: 'Learning', href: '/learning' },
  { label: 'Research', href: '/research' },
  { label: 'Publications', href: '/publications' },
  { label: 'About', href: '/about' },
] as const

export const CONSULTATION_CTA = {
  label: 'Request a consultation',
  href: '/consultations/request',
} as const
