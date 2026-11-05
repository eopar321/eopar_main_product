import Link from 'next/link'
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/lib/cn'

export type ButtonVariant = 'gold' | 'outline' | 'outline-gold' | 'navy'
export type ButtonSize = 'md' | 'lg'

interface CommonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Adds a trailing → */
  arrow?: boolean
  /** Stretch to the container width (mobile CTAs) */
  block?: boolean
  className?: string
  children: ReactNode
}

type AsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }
type AsLink = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

export type ButtonProps = AsButton | AsLink

const base =
  'inline-flex items-center justify-center gap-2.5 rounded-pill font-sans font-semibold uppercase ' +
  'text-[0.75rem] leading-none tracking-[var(--tracking-button)] whitespace-nowrap ' +
  'transition-[background-color,box-shadow,color,border-color] duration-300 ' +
  'aria-disabled:pointer-events-none aria-disabled:opacity-50 disabled:cursor-not-allowed disabled:opacity-50'

const variants: Record<ButtonVariant, string> = {
  // Filled gold pill with soft glow (hero CTAs, Continue)
  gold: 'bg-gold text-navy shadow-glow-gold hover:bg-gold-soft hover:shadow-glow-gold-strong',
  // Ivory hairline pill (secondary CTAs on dark)
  outline: 'border border-ivory/50 text-ivory hover:border-ivory hover:bg-ivory/5',
  // Gold outline with 6% fill (header REQUEST A CONSULTATION)
  'outline-gold': 'border border-gold bg-gold/6 text-gold hover:bg-gold/15 hover:text-gold-soft',
  // Navy pill on ivory sections (START A CONSULTATION)
  navy: 'bg-navy text-ivory hover:bg-black',
}

const sizes: Record<ButtonSize, string> = {
  md: 'h-12 px-7',
  lg: 'h-14 px-8',
}

export function Button(props: ButtonProps) {
  const { variant = 'gold', size = 'md', arrow, block, className, children, ...rest } = props
  const classes = cn(base, variants[variant], sizes[size], block && 'w-full', className)
  const content = (
    <>
      {children}
      {arrow && <span aria-hidden="true">→</span>}
    </>
  )

  if ('href' in rest && rest.href !== undefined) {
    const { href, ...anchor } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
    return (
      <Link href={href} className={classes} {...anchor}>
        {content}
      </Link>
    )
  }

  const { type = 'button', ...button } = rest as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button type={type} className={classes} {...button}>
      {content}
    </button>
  )
}
