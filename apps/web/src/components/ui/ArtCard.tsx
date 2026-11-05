import { Card } from './Card'
import { GlyphCircle } from './GlyphCircle'
import { TextLink } from './TextLink'

export interface ArtCardProps {
  number: number
  glyph: string
  title: string
  tagline: string
  methods: string[]
  href: string
  headingLevel?: 'h2' | 'h3' | 'h4'
}

/** Homepage "02 — Predictive & Interpretive Arts" card */
export function ArtCard({
  number,
  glyph,
  title,
  tagline,
  methods,
  href,
  headingLevel: Heading = 'h3',
}: ArtCardProps) {
  return (
    <Card as="article" className="flex h-full flex-col p-8 sm:p-9">
      <div className="flex items-start justify-between">
        <p className="text-eyebrow tracking-[0.2em] text-gold">{String(number).padStart(2, '0')}</p>
        <span className="hidden sm:block">
          <GlyphCircle glyph={glyph} />
        </span>
      </div>
      <Heading className="mt-4 font-display text-display-sm font-normal text-ivory">
        {title}
      </Heading>
      <p className="mt-2 font-display text-[1.3rem] italic text-gold-soft">{tagline}</p>
      <p className="mt-6 text-small text-ivory/80">{methods.join(' · ')}</p>
      <TextLink href={href} className="mt-auto pt-5" aria-label={`Explore ${title}`}>
        Explore
      </TextLink>
    </Card>
  )
}
