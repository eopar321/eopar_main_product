/* eslint-disable @next/next/no-img-element -- static PDF crops, not site content */
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import type { ReactNode } from 'react'

import { SectorWheel } from '@/components/celestial/SectorWheel'
import { ZodiacWheel } from '@/components/celestial/ZodiacWheel'
import { Header } from '@/components/sections/Header'
import { ArtCard } from '@/components/ui/ArtCard'
import { PanchangCard } from '@/components/ui/PanchangCard'
import { GRAHAS } from '@eopar/shared'

const meta = {
  title: 'Review/PDF comparison',
  parameters: { layout: 'fullscreen' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

function Pair({
  title,
  page,
  crop,
  width,
  children,
}: {
  title: string
  page: string
  crop: string
  width: number
  children: ReactNode
}) {
  return (
    <section className="border-b border-ivory/10 px-6 py-12 lg:px-12">
      <h2 className="font-display text-display-xs text-ivory">{title}</h2>
      <div className="mt-6 grid items-start gap-8 xl:grid-cols-2">
        <figure>
          <figcaption className="mb-3 text-eyebrow uppercase tracking-[var(--tracking-eyebrow)] text-gold">
            Design PDF · {page}
          </figcaption>
          <img
            src={`/pdf/${crop}.png`}
            alt={`${title} as drawn in the design PDF`}
            style={{ width, maxWidth: '100%' }}
          />
        </figure>
        <figure>
          <figcaption className="mb-3 text-eyebrow uppercase tracking-[var(--tracking-eyebrow)] text-gold">
            Built component
          </figcaption>
          <div style={{ width, maxWidth: '100%' }}>{children}</div>
        </figure>
      </div>
    </section>
  )
}

export const Comparison: Story = {
  name: 'PDF comparison',
  render: () => (
    <div className="bg-navy">
      <section className="border-b border-ivory/10 px-6 py-12 lg:px-12">
        <h2 className="font-display text-display-xs text-ivory">Header</h2>
        <p className="mt-3 mb-3 text-eyebrow uppercase tracking-[var(--tracking-eyebrow)] text-gold">
          Design PDF · p.4 (homepage)
        </p>
        <img
          src="/pdf/header.png"
          alt="Header as drawn in the design PDF"
          className="w-full max-w-[90rem]"
        />
        <p className="mt-8 mb-3 text-eyebrow uppercase tracking-[var(--tracking-eyebrow)] text-gold">
          Built component
        </p>
        <div className="max-w-[90rem]">
          <Header />
        </div>
      </section>

      <Pair title="Hero wheel" page="p.4" crop="hero-wheel" width={710}>
        <div className="relative">
          <ZodiacWheel kundli label="Sample birth chart inside the zodiac wheel" animate={false} />
          <PanchangCard className="absolute right-[2%] bottom-0" />
        </div>
      </Pair>

      <Pair title="Art card" page="p.4" crop="art-card" width={394}>
        <ArtCard
          number={1}
          glyph={GRAHAS[0]!.glyph}
          title="Astrology"
          tagline="Patterns across time"
          methods={['Vedic', 'KP', 'Lal Kitab', 'Ashtakavarga', 'Prashna', 'Muhurta']}
          href="/predictive-arts/astrology"
        />
      </Pair>

      <Pair title="Panchang card" page="p.4" crop="panchang" width={260}>
        <PanchangCard />
      </Pair>

      <Pair title="Sector Wheel" page="p.4" crop="sector-wheel" width={605}>
        <SectorWheel animate={false} />
      </Pair>
    </div>
  ),
}
