import { GRAHAS, type GrahaId } from '@eopar/shared'

import { cn } from '@/lib/cn'

import { Marquee } from './Marquee'

export interface SkyTickerItem {
  graha: GrahaId
  /** e.g. "Sun transit". Real positions arrive with the live ephemeris (later phase). */
  text: string
}

const DEFAULT_ITEMS: SkyTickerItem[] = GRAHAS.filter((g) => g.id !== 'rahu' && g.id !== 'ketu').map(
  (g) => ({ graha: g.id, text: `${g.name} transit` }),
)

export interface SkyTickerProps {
  items?: SkyTickerItem[]
  /** Left label. Until live data exists it must say so (brief §14). */
  status?: string
  className?: string
}

/** "Today's sky" marquee under the hero. Labels only — no fabricated positions. */
export function SkyTicker({
  items = DEFAULT_ITEMS,
  status = "Today's sky · Live at launch",
  className,
}: SkyTickerProps) {
  return (
    <div className={cn('flex h-14 items-stretch border-y border-gold/20 bg-black', className)}>
      <p className="hidden shrink-0 items-center gap-2.5 border-r border-gold/20 px-gutter text-[0.6875rem] uppercase tracking-[0.24em] text-gold sm:flex">
        <span aria-hidden="true" className="size-1.5 rounded-full bg-gold-light" />
        {status}
      </p>
      <Marquee label="Today's sky" duration={50} className="min-w-0 flex-1">
        <ul className="flex items-center">
          {items.map((item, index) => {
            const graha = GRAHAS.find((g) => g.id === item.graha)!
            return (
              <li key={`${item.graha}-${index}`} className="flex items-center whitespace-nowrap">
                <span className="flex items-center gap-3 px-6 text-[0.75rem] uppercase tracking-[0.2em] text-ivory/85">
                  <span
                    aria-hidden="true"
                    className="font-glyph text-[1rem] text-gold-soft normal-case"
                  >
                    {graha.glyph}
                  </span>
                  {item.text}
                </span>
                <span aria-hidden="true" className="size-1 rounded-full bg-gold/60" />
              </li>
            )
          })}
        </ul>
      </Marquee>
    </div>
  )
}
