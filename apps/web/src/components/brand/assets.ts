/**
 * Brand asset registry. Everything that draws the logo reads from here, so when the SVG master
 * arrives (brief §1) only these entries change: point `src` at the .svg and update width/height.
 */
export const BRAND_ASSETS = {
  /** EOPAR wordmark with the Celestial O, ivory — header / footer on dark */
  wordIvory: { src: '/brand/eopar-word-ivory.png', width: 1190, height: 325 },
  /** Wordmark + tagline, gold — intro gate */
  fullGold: { src: '/brand/eopar-full-gold.png', width: 1190, height: 403 },
  fullIvory: { src: '/brand/eopar-full-ivory.png', width: 1190, height: 403 },
  /** For ivory backgrounds */
  fullNavy: { src: '/brand/eopar-full-navy.png', width: 1190, height: 403 },
  /** The Celestial O on its own */
  oGold: { src: '/brand/eopar-o-gold.png', width: 290, height: 319 },
} as const

export type BrandAsset = keyof typeof BRAND_ASSETS
