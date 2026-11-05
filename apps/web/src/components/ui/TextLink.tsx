import Link from 'next/link'
import type { AnchorHTMLAttributes, ReactNode } from 'react'

import { cn } from '@/lib/cn'

export interface TextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  /** 'dark' = gold on navy/black, 'light' = bronze on ivory (gold on ivory fails contrast) */
  tone?: 'dark' | 'light'
  arrow?: boolean
  children: ReactNode
}

/** "Explore →" style link */
export function TextLink({
  href,
  tone = 'dark',
  arrow = true,
  className,
  children,
  ...rest
}: TextLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group inline-flex items-center gap-2 text-small tracking-[0.1em] underline-offset-[6px] hover:underline',
        tone === 'dark' ? 'text-gold hover:text-gold-soft' : 'text-bronze',
        className,
      )}
      {...rest}
    >
      {children}
      {arrow && (
        <span
          aria-hidden="true"
          className="transition-transform duration-300 motion-safe:group-hover:translate-x-1"
        >
          →
        </span>
      )}
    </Link>
  )
}
