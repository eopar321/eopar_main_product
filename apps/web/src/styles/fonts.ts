import { Cormorant_Garamond, Manrope, Noto_Sans_Symbols } from 'next/font/google'

// next/font downloads these at build time and serves them from our own domain (no Google requests at runtime)
export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

// Zodiac + planet glyphs render identically on every device instead of falling back to system fonts
export const symbols = Noto_Sans_Symbols({
  subsets: ['symbols'],
  weight: ['400'],
  variable: '--font-symbols',
  display: 'swap',
})

export const fontVariables = `${cormorant.variable} ${manrope.variable} ${symbols.variable}`
