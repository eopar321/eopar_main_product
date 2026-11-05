import { BRAND } from '@eopar/shared'
import type { Metadata } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import React from 'react'

import '@/styles/globals.css'

// next/font downloads these at build time and serves them from our own domain (no Google requests at runtime)
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
})

export const metadata: Metadata = {
  title: `${BRAND.name} — ${BRAND.fullName}`,
  description: BRAND.tagline,
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${cormorant.variable} ${manrope.variable}`}>
      <body className="min-h-dvh bg-navy text-ivory">{children}</body>
    </html>
  )
}
