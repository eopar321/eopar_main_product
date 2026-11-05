import { GRAHAS, ZODIAC_SIGNS, type GrahaId } from '@eopar/shared'
import { useId, type ReactNode } from 'react'

import { cn } from '@/lib/cn'

import { polar } from './geometry'
import { KundliChart, SAMPLE_HOUSES, describeKundli, type KundliHouses } from './KundliChart'

/** Sidereal longitudes (0–360°) for the nine grahas. Decorative sample until live data exists. */
export type GrahaPositions = Partial<Record<GrahaId, number>>

export const SAMPLE_POSITIONS: GrahaPositions = {
  sun: 14,
  moon: 62,
  mars: 112,
  mercury: 142,
  jupiter: 196,
  venus: 228,
  saturn: 266,
  rahu: 304,
  ketu: 124, // always opposite Rahu
}

export interface ZodiacWheelProps {
  /** Width/height in px, or any CSS length (default fills its container) */
  size?: number | string
  /** Graha longitudes; pass {} to hide the orbit */
  positions?: GrahaPositions
  /** Show a North Indian kundli in the centre */
  kundli?: boolean | KundliHouses
  /** Free centre content (e.g. the logo on the intro gate) — overrides kundli */
  centre?: ReactNode
  /** Soft breathing halo behind the wheel */
  halo?: boolean
  /** Slow ring rotation, orbiting spark, arc draw-in. Always off under prefers-reduced-motion. */
  animate?: boolean
  /** Accessible name; omit for a purely decorative wheel */
  label?: string
  className?: string
}

// Radii measured from the PDF (680px wheel, viewBox 720 leaves room for the top marker)
const R = {
  outer: 340,
  glyph: 319,
  band: 302.5,
  bandInner: 296,
  disc: 313,
  orbit: 275,
  nakshatra: 257,
  dotted: 228,
}

const SIGN_DIVIDERS = Array.from({ length: 12 }, (_, i) => i * 30)
const FIVE_DEGREE_TICKS = Array.from({ length: 72 }, (_, i) => i * 5).filter((d) => d % 30 !== 0)
const PADA_TICKS = Array.from({ length: 108 }, (_, i) => (i * 360) / 108)

/** Hidden circle that makes a rotating group's bounding box centred on the wheel centre */
function Pivot({ r = R.outer }: { r?: number }) {
  return <circle r={r} fill="none" stroke="none" />
}

export function ZodiacWheel({
  size = '100%',
  positions = SAMPLE_POSITIONS,
  kundli = false,
  centre,
  halo = true,
  animate = true,
  label,
  className,
}: ZodiacWheelProps) {
  const uid = useId()
  const haloId = `${uid}-halo`
  const shadeId = `${uid}-shade`
  const houses = kundli === true ? SAMPLE_HOUSES : kundli || undefined
  const motion = (cls: string) => (animate ? cls : undefined)
  const description = label && houses ? `${label}. ${describeKundli(houses, 'Ascendant')}` : label

  return (
    <div
      className={cn('relative aspect-square', className)}
      style={{ width: size, maxWidth: '100%' }}
    >
      <svg
        viewBox="0 0 720 720"
        className="absolute inset-0 size-full overflow-visible"
        role={description ? 'img' : undefined}
        aria-label={description}
        aria-hidden={description ? undefined : true}
      >
        <defs>
          <radialGradient id={haloId}>
            <stop offset="55%" stopColor="var(--color-gold-soft)" stopOpacity="0.09" />
            <stop offset="100%" stopColor="var(--color-gold-soft)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={shadeId}>
            <stop offset="0%" stopColor="#000" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g transform="translate(360 360)">
          {halo && (
            <circle
              r={R.outer + 20}
              fill={`url(#${haloId})`}
              className={cn('spin-origin', motion('motion-safe:animate-breathe'))}
            />
          )}

          {/* Disc and band rings */}
          <circle r={R.disc} fill="var(--color-gold-soft)" fillOpacity="0.06" />
          <circle r={R.disc - 20} fill={`url(#${shadeId})`} />
          <circle r={R.outer} fill="none" stroke="var(--color-gold)" strokeOpacity="0.5" />
          <circle r={R.band} fill="none" stroke="var(--color-gold)" strokeOpacity="0.4" />
          <circle r={R.bandInner} fill="none" stroke="var(--color-gold)" strokeOpacity="0.2" />

          {/* Sign ring: dividers, 5° ticks and the 12 glyphs (glyphs counter-rotate to stay upright) */}
          <g className={cn('spin-origin', motion('motion-safe:animate-rotate-slow'))}>
            <Pivot />
            <g stroke="var(--color-gold)" strokeOpacity="0.55">
              {SIGN_DIVIDERS.map((deg) => {
                const a = polar(R.band, deg)
                const b = polar(R.outer, deg)
                return <line key={deg} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
              })}
            </g>
            <g stroke="var(--color-gold)" strokeOpacity="0.35">
              {FIVE_DEGREE_TICKS.map((deg) => {
                const a = polar(R.outer - 6, deg)
                const b = polar(R.outer, deg)
                return <line key={deg} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
              })}
            </g>
            {ZODIAC_SIGNS.map((sign, i) => {
              const p = polar(R.glyph, i * 30 + 15)
              return (
                <text
                  key={sign.id}
                  x={p.x}
                  y={p.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className={cn(
                    'spin-origin fill-ivory/80 font-glyph text-[17px]',
                    motion('motion-safe:animate-counter-slow'),
                  )}
                >
                  {sign.glyph}
                </text>
              )
            })}
          </g>

          {/* 27-nakshatra ring: 108 pada ticks, every 4th (a nakshatra boundary) longer */}
          <g className={cn('spin-origin', motion('motion-safe:animate-rotate-reverse'))}>
            <Pivot />
            {PADA_TICKS.map((deg, i) => {
              const boundary = i % 4 === 0
              const a = polar(R.nakshatra - (boundary ? 7 : 3), deg)
              const b = polar(R.nakshatra + (boundary ? 5 : 1), deg)
              return (
                <line
                  key={deg}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke="var(--color-gold)"
                  strokeOpacity={boundary ? 0.5 : 0.22}
                />
              )
            })}
            <circle
              r={R.dotted}
              fill="none"
              stroke="var(--color-gold)"
              strokeOpacity="0.3"
              strokeDasharray="1 7"
              strokeLinecap="round"
            />
          </g>

          {/* Graha orbit */}
          {Object.keys(positions).length > 0 && (
            <g className={cn('spin-origin', motion('motion-safe:animate-rotate-slower'))}>
              <Pivot />
              {GRAHAS.filter((g) => positions[g.id] !== undefined).map((graha) => {
                const p = polar(R.orbit, positions[graha.id]!)
                return (
                  <g key={graha.id}>
                    <circle cx={p.x} cy={p.y} r="12" fill="var(--color-ivory)" fillOpacity="0.09" />
                    <text
                      x={p.x}
                      y={p.y}
                      textAnchor="middle"
                      dominantBaseline="central"
                      className={cn(
                        'spin-origin fill-gold-soft font-glyph text-[13px]',
                        motion('motion-safe:animate-counter-slower'),
                      )}
                    >
                      {graha.glyph}
                    </text>
                  </g>
                )
              })}
            </g>
          )}

          {/* Top marker + orbiting spark (rests at the top under reduced motion) */}
          <circle cy={-R.outer} r="20" fill="var(--color-gold-soft)" fillOpacity="0.16" />
          <line
            x1="0"
            y1={-R.outer}
            x2="0"
            y2={-R.band}
            stroke="var(--color-gold)"
            strokeOpacity="0.55"
          />
          <g className={cn('spin-origin', motion('motion-safe:animate-orbit'))}>
            <Pivot />
            <circle cy={-R.outer} r="3.5" fill="var(--color-gold-spark)" />
          </g>

          {houses && !centre && (
            <KundliChart houses={houses} embedded={{ x: -143, y: -143, size: 286 }} />
          )}
        </g>
      </svg>
      {centre && <div className="absolute inset-0 grid place-items-center">{centre}</div>}
    </div>
  )
}
