import { cn } from '@/lib/cn'

export interface GlyphCircleProps {
  /** A glyph string ending in U+FE0E (see ZODIAC_SIGNS / GRAHAS) */
  glyph: string
  /** Accessible name. Omit when the glyph is decorative next to visible text. */
  label?: string
  size?: 'sm' | 'md' | 'lg'
  /** ring: gold ring on transparent; node: navy disc + gold rim + soft halo (Sector Wheel) */
  variant?: 'ring' | 'node'
  tone?: 'dark' | 'light'
  className?: string
}

const sizes = {
  sm: 'size-9 text-[0.95rem]',
  md: 'size-[2.5625rem] text-[1.05rem]', // 41px (art cards)
  lg: 'size-[3.25rem] text-[1.35rem]', // 52px (arts overview)
}

/** Planet / zodiac symbol inside a gold ring */
export function GlyphCircle({
  glyph,
  label,
  size = 'md',
  variant = 'ring',
  tone = 'dark',
  className,
}: GlyphCircleProps) {
  return (
    <span
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn(
        'inline-grid shrink-0 place-items-center rounded-full font-glyph leading-none',
        sizes[size],
        variant === 'ring' &&
          (tone === 'dark'
            ? 'border border-gold/35 text-gold-soft'
            : 'border border-bronze/45 text-bronze'),
        variant === 'node' && 'border border-gold bg-navy text-gold-soft shadow-halo',
        className,
      )}
    >
      {glyph}
    </span>
  )
}
