import type { ButtonHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/lib/cn'

type Tone = 'dark' | 'light'

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: Tone
  /** When set, the chip is a toggle and exposes aria-pressed */
  selected?: boolean
  glyph?: string
  children: ReactNode
}

/** Pill chip (category chips, art filters). Interactive → <button>. */
export function Chip({ tone = 'dark', selected, glyph, className, children, ...rest }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        'inline-flex min-h-11 items-center gap-2 rounded-pill border px-5 text-small transition-colors duration-200',
        tone === 'dark'
          ? 'border-ivory/30 text-ivory/90 hover:border-gold/70 aria-pressed:border-gold aria-pressed:bg-gold/10 aria-pressed:text-gold-soft'
          : 'border-navy/25 text-navy hover:border-bronze aria-pressed:border-navy aria-pressed:bg-navy aria-pressed:text-ivory',
        className,
      )}
      {...rest}
    >
      {glyph && (
        <span aria-hidden="true" className="font-glyph">
          {glyph}
        </span>
      )}
      {children}
    </button>
  )
}

export interface TagProps {
  tone?: Tone
  children: ReactNode
  className?: string
}

/** Square, non-interactive label (research categories, art methods) */
export function Tag({ tone = 'dark', children, className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center border px-3 py-1.5 text-caption',
        tone === 'dark' ? 'border-ivory/25 text-ivory/85' : 'border-navy/25 text-navy/80',
        className,
      )}
    >
      {children}
    </span>
  )
}

export type BadgeVariant = 'outline' | 'suggested' | 'recommended' | 'sample'

export interface BadgeProps {
  variant?: BadgeVariant
  children: ReactNode
  className?: string
}

const regular = 'px-2.5 py-1 text-[0.6875rem] tracking-[0.2em]'

const badgeVariants: Record<BadgeVariant, string> = {
  // COMING SOON / FORTHCOMING
  outline: `${regular} border border-gold/60 text-gold`,
  // SUGGESTED (scope step)
  suggested: `${regular} rounded-pill bg-gold text-navy`,
  // RECOMMENDED (method step)
  recommended: `${regular} rounded-badge bg-gold text-navy`,
  // SAMPLE — marks illustrative data (brief §14); compact so it fits beside card titles
  sample: 'border border-ivory/40 px-1.5 py-[3px] text-[0.625rem] tracking-[0.16em] text-ivory/80',
}

export function Badge({ variant = 'outline', children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center font-semibold uppercase leading-none',
        badgeVariants[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
