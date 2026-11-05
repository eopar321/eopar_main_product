import type { ElementType, HTMLAttributes, ReactNode } from 'react'

import { cn } from '@/lib/cn'

export type CardTone = 'default' | 'strong' | 'dashed'

export interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  /**
   * default: 22% border + 10% inset rule (art cards, study cards)
   * strong:  40% border + 12% inset rule on a dark panel (Panchang, Sector Wheel, summaries)
   * dashed:  dotted gold frame (Research Library "In Development")
   */
  tone?: CardTone
  children: ReactNode
}

const tones: Record<CardTone, string> = {
  default: 'frame-double bg-ivory/[0.02]',
  strong: 'frame-double-strong bg-panel/80',
  dashed: 'border border-dashed border-gold/40',
}

/** Double-rule card: border + inset outline, square corners */
export function Card({
  as: Tag = 'div',
  tone = 'default',
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <Tag className={cn('relative', tones[tone], className)} {...rest}>
      {children}
    </Tag>
  )
}
