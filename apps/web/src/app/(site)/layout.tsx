import { BRAND } from '@eopar/shared'
import type { Metadata } from 'next'
import React from 'react'

import { fontVariables } from '@/styles/fonts'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: `${BRAND.name} — ${BRAND.fullName}`,
  description: BRAND.tagline,
}

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={fontVariables}>
      <body className="min-h-dvh bg-navy text-ivory">{children}</body>
    </html>
  )
}
