import { cn } from '@/lib/cn'

export const CONSULTATION_STEPS = [
  'Clarity',
  'Question',
  'Scope',
  'Method',
  'Information',
  'Mode',
  'Your details',
  'Review',
  'Received',
] as const

export interface StepperProps {
  /** 1-based current step */
  current: number
  steps?: readonly string[]
  /** Right-hand note, e.g. autosave status */
  note?: string
  className?: string
}

/** Nine glowing segments: completed + current glow gold, upcoming are faint ivory */
export function Stepper({
  current,
  steps = CONSULTATION_STEPS,
  note = 'Your progress is saved automatically',
  className,
}: StepperProps) {
  const total = steps.length
  const step = Math.min(Math.max(current, 1), total)
  return (
    <div className={className}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <p className="text-small tracking-[0.06em] text-gold">
          Step {step} of {total} · {steps[step - 1]}
        </p>
        {note && <p className="text-caption text-ivory/75">{note}</p>}
      </div>
      <ol
        className="mt-4 grid gap-1.5 sm:gap-2"
        style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}
      >
        {steps.map((label, index) => {
          const number = index + 1
          const state = number < step ? 'completed' : number === step ? 'current' : 'upcoming'
          return (
            <li key={label} aria-current={state === 'current' ? 'step' : undefined}>
              <span
                aria-hidden="true"
                className={cn(
                  'block h-[3px] rounded-pill transition-[background-color,box-shadow] duration-500',
                  state === 'upcoming' ? 'bg-ivory/15' : 'bg-gold shadow-glow-segment',
                )}
              />
              <span className="sr-only">
                Step {number}: {label} ({state === 'current' ? 'current step' : state})
              </span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
