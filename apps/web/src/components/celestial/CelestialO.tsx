import Image from 'next/image'

import { BRAND_ASSETS } from '@/components/brand/assets'
import { cn } from '@/lib/cn'

import { arcPath } from './geometry'

export interface CelestialOProps {
  /** Rendered height in px */
  size?: number
  /** Draw the arcs in on load and let the outer arc drift slowly. Off under reduced motion. */
  animate?: boolean
  /** Show the extra orbit arcs around the O */
  arcs?: boolean
  /** Accessible name; omit when decorative */
  label?: string
  className?: string
}

/**
 * The Celestial O from the logo. Today it is the PNG (BRAND_ASSETS.oGold) with SVG arcs layered
 * on top; when the SVG master arrives, replace the <Image> with the master's paths and give its
 * arcs the same `motion-safe:animate-draw` class.
 */
export function CelestialO({
  size = 120,
  animate = true,
  arcs = true,
  label,
  className,
}: CelestialOProps) {
  const asset = BRAND_ASSETS.oGold
  const width = Math.round((asset.width / asset.height) * size)
  return (
    <span
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn('relative inline-grid place-items-center', className)}
      style={{ width: size * 1.5, height: size * 1.5 }}
    >
      <Image src={asset.src} alt="" width={width} height={size} style={{ width, height: size }} />
      {arcs && (
        <svg viewBox="-100 -100 200 200" className="absolute inset-0 size-full overflow-visible">
          <g
            fill="none"
            stroke="var(--color-gold-soft)"
            strokeLinecap="round"
            className={cn('spin-origin', animate && 'motion-safe:animate-rotate-slow')}
          >
            <circle r="96" stroke="none" />
            <path
              d={arcPath(96, 210, 330)}
              strokeOpacity="0.55"
              strokeWidth="0.8"
              pathLength={1}
              strokeDasharray="1"
              style={{ ['--eo-dash' as string]: 1 }}
              className={cn(animate && 'motion-safe:animate-draw')}
            />
            <path
              d={arcPath(88, 30, 125)}
              strokeOpacity="0.35"
              strokeWidth="0.8"
              pathLength={1}
              strokeDasharray="1"
              style={{ ['--eo-dash' as string]: 1, animationDelay: '0.4s' }}
              className={cn(animate && 'motion-safe:animate-draw')}
            />
          </g>
        </svg>
      )}
    </span>
  )
}
