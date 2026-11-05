import { cn } from '@/lib/cn'

import { arcPath, polar } from './geometry'

export type Corner = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

export interface OrbitDecorProps {
  corner?: Corner
  /** Diameter in px of the outer orbit */
  size?: number
  /** 'dark' = gold rules on navy/black; 'light' = bronze rules on ivory */
  tone?: 'dark' | 'light'
  animate?: boolean
  className?: string
}

const placement: Record<Corner, string> = {
  'top-left': 'top-0 left-0 -translate-x-1/2 -translate-y-1/2',
  'top-right': 'top-0 right-0 translate-x-1/2 -translate-y-1/2',
  'bottom-left': 'bottom-0 left-0 -translate-x-1/2 translate-y-1/2',
  'bottom-right': 'bottom-0 right-0 translate-x-1/2 translate-y-1/2',
}

/** Corner orbits for section backgrounds. Purely decorative; place inside a `relative overflow-hidden` section. */
export function OrbitDecor({
  corner = 'top-right',
  size = 560,
  tone = 'dark',
  animate = true,
  className,
}: OrbitDecorProps) {
  const colour = tone === 'dark' ? 'var(--color-gold)' : 'var(--color-bronze)'
  const node = polar(200, corner.includes('left') ? 120 : 240)
  return (
    <svg
      aria-hidden="true"
      viewBox="-280 -280 560 560"
      width={size}
      height={size}
      className={cn('pointer-events-none absolute', placement[corner], className)}
    >
      <g fill="none" stroke={colour}>
        <circle r="270" strokeOpacity="0.14" />
        <circle r="200" strokeOpacity="0.2" />
        <g className={cn('spin-origin', animate && 'motion-safe:animate-rotate-reverse')}>
          <circle r="232" strokeOpacity="0.32" strokeDasharray="1 6" strokeLinecap="round" />
        </g>
        <path d={arcPath(150, 200, 300)} strokeOpacity="0.28" />
        <path d={arcPath(120, 20, 90)} strokeOpacity="0.2" />
      </g>
      <g className={cn('spin-origin', animate && 'motion-safe:animate-rotate-slow')}>
        <circle r="200" fill="none" stroke="none" />
        <circle cx={node.x} cy={node.y} r="20" fill="var(--color-gold-soft)" fillOpacity="0.16" />
        <circle
          cx={node.x}
          cy={node.y}
          r="3"
          fill={tone === 'dark' ? 'var(--color-gold-light)' : 'var(--color-bronze)'}
        />
      </g>
    </svg>
  )
}
