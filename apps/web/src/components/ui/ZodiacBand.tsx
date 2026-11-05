import { TEXT_VS, ZODIAC_SIGNS } from '@eopar/shared'

import { cn } from '@/lib/cn'

import { Marquee } from './Marquee'

const STAR = `✦${TEXT_VS}`

/** Mesha → Meena name band between homepage sections */
export function ZodiacBand({ className }: { className?: string }) {
  return (
    <div className={cn('h-[4.125rem] border-y border-gold/20 bg-black-deep', className)}>
      <Marquee label="The twelve rashis" duration={70} className="h-full">
        <ul className="flex items-center">
          {ZODIAC_SIGNS.map((sign) => (
            <li key={sign.id} className="flex items-center whitespace-nowrap">
              <span className="flex items-center gap-3 px-6">
                <span aria-hidden="true" className="font-glyph text-[1.05rem] text-gold">
                  {sign.glyph}
                </span>
                <span className="font-display text-[1.375rem] italic text-ivory/90">
                  {sign.name}
                </span>
              </span>
              <span aria-hidden="true" className="font-glyph text-[0.7rem] text-gold/70">
                {STAR}
              </span>
            </li>
          ))}
        </ul>
      </Marquee>
    </div>
  )
}
