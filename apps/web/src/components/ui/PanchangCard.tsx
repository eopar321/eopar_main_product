import { Badge } from './Chip'
import { Card } from './Card'
import { cn } from '@/lib/cn'

export interface PanchangRow {
  label: string
  value: string
}

export const SAMPLE_PANCHANG: PanchangRow[] = [
  { label: 'Tithi', value: 'Shukla Panchami' },
  { label: 'Nakshatra', value: 'Rohini' },
  { label: 'Yoga', value: 'Siddha' },
  { label: 'Rahu Kaal', value: '10:30 – 12:00' },
]

export interface PanchangCardProps {
  rows?: PanchangRow[]
  /**
   * True until a real ephemeris source is integrated (brief §14: never present sample data as live).
   * Shows a visible "Sample" badge and tells screen readers the values are illustrative.
   */
  sample?: boolean
  title?: string
  className?: string
}

export function PanchangCard({
  rows = SAMPLE_PANCHANG,
  sample = true,
  title = 'Today · Panchang',
  className,
}: PanchangCardProps) {
  return (
    <Card
      as="section"
      tone="strong"
      aria-label={sample ? `${title} (sample data)` : title}
      className={cn('w-full max-w-[15.75rem] px-6 py-6', className)}
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="whitespace-nowrap text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-gold">
          {title}
        </h2>
        {sample && <Badge variant="sample">Sample</Badge>}
      </div>
      <dl className="mt-4 border-t border-ivory/8">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-baseline justify-between gap-4 border-b border-ivory/8 py-2.5 last:border-b-0"
          >
            <dt className="text-caption text-ivory/75">{row.label}</dt>
            <dd className="text-right font-display text-[1.0625rem] text-gold-soft">{row.value}</dd>
          </div>
        ))}
      </dl>
      {sample && (
        <p className="sr-only">These values are illustrative, not today&apos;s live Panchang.</p>
      )}
    </Card>
  )
}
