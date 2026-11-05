import { PLANET_SECTORS, ZODIAC_SIGNS, grahaById, type GrahaId } from '@eopar/shared'
import type { CSSProperties } from 'react'

import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/cn'

import { polar } from './geometry'

export interface SectorWheelProps {
  items?: readonly { graha: GrahaId; sectors: readonly string[] }[]
  /** Wrap in the double-rule panel with header + footnote (homepage/markets). False = wheel only. */
  panel?: boolean
  animate?: boolean
  className?: string
}

// Stage measured from the PDF panel: 600×400, wheel centre 300,200, planet orbit r=127
const W = 600
const H = 400
const CX = 300
const CY = 200
const ORBIT = 127

type Placement =
  'top' | 'top-right' | 'right' | 'bottom-right' | 'bottom-left' | 'left' | 'top-left'

function placementFor(deg: number): Placement {
  if (deg < 25 || deg > 335) return 'top'
  if (deg < 80) return 'top-right'
  if (deg <= 130) return 'right'
  if (deg < 180) return 'bottom-right'
  if (deg < 230) return 'bottom-left'
  if (deg <= 280) return 'left'
  return 'top-left'
}

const NODE = 'clamp(1.6rem, 5.84cqw, 2.1875rem)' // 35px at full size
const GAP = `calc(${NODE} / 2 + 0.45rem)`

const labelStyle: Record<Placement, { transform: string; align: string }> = {
  top: { transform: `translate(-50%, calc(-100% - ${GAP}))`, align: 'text-center items-center' },
  'top-right': {
    transform: `translate(-10%, calc(-100% - ${GAP}))`,
    align: 'text-left items-start',
  },
  right: { transform: `translate(${GAP}, -50%)`, align: 'text-left items-start' },
  'bottom-right': { transform: `translate(-10%, ${GAP})`, align: 'text-left items-start' },
  'bottom-left': { transform: `translate(-90%, ${GAP})`, align: 'text-right items-end' },
  left: { transform: `translate(calc(-100% - ${GAP}), -50%)`, align: 'text-right items-end' },
  'top-left': { transform: `translate(-90%, calc(-100% - ${GAP}))`, align: 'text-right items-end' },
}

function Wheel({ items, animate }: Required<Pick<SectorWheelProps, 'items' | 'animate'>>) {
  const step = 360 / items.length
  return (
    <div className="@container relative w-full" style={{ aspectRatio: `${W} / ${H}` }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full" aria-hidden="true">
        <g transform={`translate(${CX} ${CY})`}>
          <g className={cn('spin-origin', animate && 'motion-safe:animate-rotate-slow')}>
            <circle
              r={ORBIT}
              fill="none"
              stroke="var(--color-gold)"
              strokeOpacity="0.35"
              strokeDasharray="1.5 5"
              strokeLinecap="round"
            />
          </g>
          {/* spokes from the inner ring to each planet */}
          {items.map((_, i) => {
            const a = polar(89, i * step)
            const b = polar(ORBIT - 18, i * step)
            return (
              <line
                key={i}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke="var(--color-gold)"
                strokeOpacity="0.25"
              />
            )
          })}
          <circle
            r="89"
            fill="none"
            stroke="var(--color-gold)"
            strokeOpacity="0.38"
            strokeWidth="0.8"
          />
          <circle r="82" fill="var(--color-gold-soft)" fillOpacity="0.06" />
          <circle
            r="79.5"
            fill="none"
            stroke="var(--color-gold)"
            strokeOpacity="0.3"
            strokeWidth="0.8"
          />
          <circle
            r="77.5"
            fill="none"
            stroke="var(--color-gold)"
            strokeOpacity="0.15"
            strokeWidth="0.8"
          />
          <g className={cn('spin-origin', animate && 'motion-safe:animate-rotate-reverse')}>
            <circle r="79.5" fill="none" stroke="none" />
            {ZODIAC_SIGNS.map((sign, i) => {
              const p = polar(71, i * 30 + 15)
              return (
                <text
                  key={sign.id}
                  x={p.x}
                  y={p.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="fill-gold/60 font-glyph text-[7px]"
                >
                  {sign.glyph}
                </text>
              )
            })}
          </g>
          <circle r="62" fill="var(--color-panel)" fillOpacity="0.85" />
          <circle r="62" fill="none" stroke="var(--color-gold)" strokeOpacity="0.17" />
          <text
            y="-6"
            textAnchor="middle"
            className="fill-gold-soft font-display text-[15px] italic"
          >
            Planets
          </text>
          <text
            y="14"
            textAnchor="middle"
            className="fill-ivory/70 font-sans text-[7.5px]"
            letterSpacing="2.2"
          >
            × SECTORS
          </text>
        </g>
      </svg>

      <ul className="absolute inset-0">
        {items.map((item, i) => {
          const deg = i * step
          const p = polar(ORBIT, deg)
          const graha = grahaById(item.graha)
          const placement = labelStyle[placementFor(deg)]
          const at: CSSProperties = {
            left: `${((CX + p.x) / W) * 100}%`,
            top: `${((CY + p.y) / H) * 100}%`,
          }
          return (
            <li key={item.graha}>
              <span
                aria-hidden="true"
                className="absolute grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-gold bg-navy font-glyph text-gold-soft shadow-[0_0_0_0.5rem_rgb(230_207_160/0.16)]"
                style={{ ...at, width: NODE, height: NODE, fontSize: `calc(${NODE} * 0.45)` }}
              >
                {graha.glyph}
              </span>
              <span
                className={cn('absolute flex w-max flex-col leading-tight', placement.align)}
                style={{ ...at, transform: placement.transform }}
              >
                <span className="font-display text-[clamp(0.875rem,2.6cqw,1rem)] text-ivory">
                  {graha.name}
                </span>
                <span className="text-[clamp(0.625rem,1.75cqw,0.6875rem)] tracking-[0.08em] text-gold">
                  {item.sectors.join(' · ')}
                </span>
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/** Seven classical planets and their traditional market sectors (homepage §03, /markets) */
export function SectorWheel({
  items = PLANET_SECTORS,
  panel = true,
  animate = true,
  className,
}: SectorWheelProps) {
  if (!panel) {
    return (
      <div className={className}>
        <Wheel items={items} animate={animate} />
      </div>
    )
  }
  return (
    <Card as="figure" tone="strong" className={cn('px-5 py-6 sm:px-7 sm:py-7', className)}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-[0.75rem] uppercase tracking-[0.24em] text-gold">
          Planets × Market sectors
        </p>
        <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-ivory/70">
          Traditional associations
        </p>
      </div>
      <div className="my-6 sm:my-8">
        <Wheel items={items} animate={animate} />
      </div>
      <figcaption className="text-caption text-ivory/80">
        Classical rulerships as described in financial astrology — studied, not assumed.
        <span className="mt-2 block text-ivory/70">
          Not investment advice — EOPAR does not give buy, sell or hold recommendations.
        </span>
      </figcaption>
    </Card>
  )
}
