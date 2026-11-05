import type { ElementType, ReactNode } from 'react'

import { cn } from '@/lib/cn'

export interface EyebrowProps {
  /** Section number, rendered as "01 — " */
  number?: number
  tone?: 'dark' | 'light'
  as?: ElementType
  className?: string
  children: ReactNode
}

/** Tracked uppercase section label: "01 — THE EOPAR PHILOSOPHY" */
export function Eyebrow({
  number,
  tone = 'dark',
  as: Tag = 'p',
  className,
  children,
}: EyebrowProps) {
  return (
    <Tag
      className={cn(
        'text-eyebrow font-medium uppercase tracking-[var(--tracking-eyebrow)]',
        tone === 'dark' ? 'text-gold' : 'text-bronze',
        className,
      )}
    >
      {number !== undefined && (
        <span>
          {String(number).padStart(2, '0')}
          <span aria-hidden="true"> — </span>
          <span className="sr-only">: </span>
        </span>
      )}
      {children}
    </Tag>
  )
}
