import { grahaById, type GrahaId } from '@eopar/shared'

import { cn } from '@/lib/cn'

export type HouseNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

/**
 * Centre of each house in a 300×300 North Indian chart. House 1 is the top diamond;
 * houses run counter-clockwise (2 top-left … 12 top-right), as in the PDF.
 */
export const HOUSE_CENTRES: Record<HouseNumber, { x: number; y: number }> = {
  1: { x: 150, y: 78 },
  2: { x: 75, y: 32 },
  3: { x: 30, y: 75 },
  4: { x: 78, y: 150 },
  5: { x: 30, y: 225 },
  6: { x: 75, y: 268 },
  7: { x: 150, y: 222 },
  8: { x: 225, y: 268 },
  9: { x: 270, y: 225 },
  10: { x: 222, y: 150 },
  11: { x: 270, y: 75 },
  12: { x: 225, y: 32 },
}

/** Where the rashi number sits: near the house's inner point */
const SIGN_SPOTS: Record<HouseNumber, { x: number; y: number }> = {
  1: { x: 150, y: 132 },
  2: { x: 75, y: 62 },
  3: { x: 62, y: 75 },
  4: { x: 132, y: 150 },
  5: { x: 62, y: 225 },
  6: { x: 75, y: 238 },
  7: { x: 150, y: 168 },
  8: { x: 225, y: 238 },
  9: { x: 238, y: 225 },
  10: { x: 168, y: 150 },
  11: { x: 238, y: 75 },
  12: { x: 225, y: 62 },
}

export type KundliHouses = Partial<Record<HouseNumber, GrahaId[]>>

/** Sample placements shown in the PDF hero */
export const SAMPLE_HOUSES: KundliHouses = {
  2: ['moon'],
  4: ['jupiter'],
  7: ['saturn'],
  8: ['mars'],
  10: ['sun', 'mercury'],
}

export interface KundliChartProps {
  houses?: KundliHouses
  /** Rashi number (1–12) occupying each house, starting with the ascendant's sign in house 1 */
  ascendantSign?: number
  /** Label in house 1 */
  ascLabel?: string
  size?: number | string
  /** Accessible title; describe that sample data is sample */
  title?: string
  /** Render as an embedded <svg> for use inside ZodiacWheel */
  embedded?: { x: number; y: number; size: number }
  className?: string
}

export function describeKundli(houses: KundliHouses, ascLabel: string): string {
  const parts = (Object.keys(HOUSE_CENTRES) as unknown as HouseNumber[])
    .map(Number)
    .filter((house) => houses[house as HouseNumber]?.length)
    .map(
      (house) =>
        `house ${house}: ${houses[house as HouseNumber]!.map((id) => grahaById(id).name).join(' and ')}`,
    )
  return `North Indian chart. ${ascLabel} in house 1${parts.length ? '; ' + parts.join('; ') : ''}.`
}

/** North Indian (diamond) kundli with a planet/label slot per house */
export function KundliChart({
  houses = SAMPLE_HOUSES,
  ascendantSign,
  ascLabel = 'Asc',
  size = 300,
  title = 'Sample birth chart',
  embedded,
  className,
}: KundliChartProps) {
  const description = describeKundli(houses, ascLabel)
  const content = (
    <>
      <rect x="0.5" y="0.5" width="299" height="299" fill="var(--color-panel)" fillOpacity="0.55" />
      <g fill="none" stroke="var(--color-gold)" strokeOpacity="0.6" strokeWidth="1">
        <rect x="0.5" y="0.5" width="299" height="299" />
        <path d="M0 0L300 300M300 0L0 300" />
        <path d="M150 0L300 150L150 300L0 150Z" />
      </g>
      <text
        x={HOUSE_CENTRES[1].x}
        y={HOUSE_CENTRES[1].y - 4}
        textAnchor="middle"
        dominantBaseline="middle"
        className="fill-ivory font-sans text-[15px]"
      >
        {ascLabel}
      </text>
      {(Object.entries(houses) as [string, GrahaId[]][]).map(([house, grahas]) => {
        const centre = HOUSE_CENTRES[Number(house) as HouseNumber]
        const offset = Number(house) === 1 ? 22 : 0
        return (
          <text
            key={house}
            x={centre.x}
            y={centre.y + offset}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-gold-soft font-glyph text-[15px]"
            letterSpacing="3"
          >
            {grahas.map((id) => grahaById(id).glyph).join(' ')}
          </text>
        )
      })}
      {ascendantSign !== undefined &&
        (Object.keys(SIGN_SPOTS) as unknown as HouseNumber[]).map((key) => {
          const house = Number(key) as HouseNumber
          const sign = ((ascendantSign - 1 + house - 1) % 12) + 1
          return (
            <text
              key={`s${house}`}
              x={SIGN_SPOTS[house].x}
              y={SIGN_SPOTS[house].y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-ivory/55 font-sans text-[10px]"
            >
              {sign}
            </text>
          )
        })}
    </>
  )

  if (embedded) {
    return (
      <svg
        x={embedded.x}
        y={embedded.y}
        width={embedded.size}
        height={embedded.size}
        viewBox="0 0 300 300"
      >
        {content}
      </svg>
    )
  }

  return (
    <svg
      role="img"
      aria-label={`${title}. ${description}`}
      viewBox="0 0 300 300"
      width={size}
      height={size}
      className={cn('block h-auto max-w-full', className)}
    >
      {content}
    </svg>
  )
}
