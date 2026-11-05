'use client'

import { useId, type InputHTMLAttributes, type ReactNode } from 'react'

import { cn } from '@/lib/cn'

/* Native inputs keep keyboard + screen-reader behaviour; appearance is restyled. */
const boxBase =
  'peer relative size-5 shrink-0 cursor-pointer appearance-none border border-(--rule-input) bg-transparent ' +
  'transition-colors checked:border-gold checked:bg-gold aria-invalid:border-error disabled:cursor-not-allowed'

const radioBase =
  'peer relative size-5 shrink-0 cursor-pointer appearance-none rounded-full border border-(--rule-input) ' +
  'transition-colors checked:border-gold checked:bg-[radial-gradient(circle,var(--color-gold)_0_4px,transparent_5px)]'

function CheckMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      className="pointer-events-none absolute top-0 left-0 size-5 text-navy opacity-0 peer-checked:opacity-100"
    >
      <path d="M5 10.5l3.2 3.2L15 6.8" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode
  help?: ReactNode
  error?: string
}

/** Checkbox with label and optional help/error (consent, "I don't know my birth time") */
export function Checkbox({ label, help, error, id, className, ...rest }: CheckboxProps) {
  const generated = useId()
  const inputId = id ?? generated
  const helpId = `${inputId}-help`
  const errorId = `${inputId}-error`
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <div className="flex items-start gap-3.5">
        <span className="relative mt-0.5 flex">
          <input
            id={inputId}
            type="checkbox"
            aria-describedby={
              [help && helpId, error && errorId].filter(Boolean).join(' ') || undefined
            }
            aria-invalid={error ? true : undefined}
            className={boxBase}
            {...rest}
          />
          <CheckMark />
        </span>
        <div>
          <label htmlFor={inputId} className="cursor-pointer text-body text-ivory">
            {label}
          </label>
          {help && (
            <p id={helpId} className="mt-0.5 text-caption text-ivory/70">
              {help}
            </p>
          )}
        </div>
      </div>
      <p id={errorId} aria-live="polite" className="pl-8.5 text-caption text-error empty:hidden">
        {error}
      </p>
    </div>
  )
}

interface ChoiceCardProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'title'> {
  title: ReactNode
  description?: ReactNode
  badge?: ReactNode
  /** Serif title (questions, scopes, methods) vs sans (short options) */
  serif?: boolean
}

function ChoiceCard({
  type,
  title,
  description,
  badge,
  serif = true,
  id,
  className,
  ...rest
}: ChoiceCardProps & { type: 'radio' | 'checkbox' }) {
  const generated = useId()
  const inputId = id ?? generated
  const descriptionId = description ? `${inputId}-desc` : undefined
  return (
    <label
      htmlFor={inputId}
      className={cn(
        'group flex cursor-pointer items-start gap-4 border border-ivory/20 px-6 py-5 transition-colors',
        'hover:border-ivory/45 has-checked:border-gold has-checked:bg-gold/10',
        'has-focus-visible:outline-2 has-focus-visible:outline-offset-3 has-focus-visible:outline-gold',
        'has-disabled:cursor-not-allowed has-disabled:opacity-50',
        className,
      )}
    >
      <span className="relative mt-1 flex">
        <input
          id={inputId}
          type={type}
          aria-describedby={descriptionId}
          className={cn(type === 'radio' ? radioBase : boxBase, 'focus-visible:outline-none')}
          {...rest}
        />
        {type === 'checkbox' && <CheckMark />}
      </span>
      <span className="flex flex-col gap-1.5">
        {badge && <span className="-mt-0.5 mb-1">{badge}</span>}
        <span
          className={cn(
            serif ? 'font-display text-[1.375rem] leading-snug' : 'text-body',
            'text-ivory',
          )}
        >
          {title}
        </span>
        {description && (
          <span id={descriptionId} className="text-small text-ivory/75">
            {description}
          </span>
        )}
      </span>
    </label>
  )
}

export type RadioCardProps = ChoiceCardProps & { name: string; value: string }

/** Selectable card with a radio (scope, method, mode). Group several inside <ChoiceGroup>. */
export function RadioCard(props: RadioCardProps) {
  return <ChoiceCard type="radio" {...props} />
}

export type CheckboxCardProps = ChoiceCardProps

/** Selectable card with a checkbox (predefined questions, multi-select) */
export function CheckboxCard(props: CheckboxCardProps) {
  return <ChoiceCard type="checkbox" {...props} />
}

export interface ChoiceGroupProps {
  legend: ReactNode
  /** Visually hide the legend when a page heading already says the same thing */
  hideLegend?: boolean
  help?: ReactNode
  error?: string
  className?: string
  children: ReactNode
}

/** fieldset + legend wrapper for radio/checkbox cards */
export function ChoiceGroup({
  legend,
  hideLegend,
  help,
  error,
  className,
  children,
}: ChoiceGroupProps) {
  const id = useId()
  return (
    <fieldset
      aria-describedby={
        [help && `${id}-help`, error && `${id}-error`].filter(Boolean).join(' ') || undefined
      }
      aria-invalid={error ? true : undefined}
      className={cn('flex flex-col gap-4', className)}
    >
      <legend className={cn('mb-3 text-small text-ivory', hideLegend && 'sr-only')}>
        {legend}
      </legend>
      {help && (
        <p id={`${id}-help`} className="-mt-2 text-caption text-ivory/70">
          {help}
        </p>
      )}
      {children}
      <p id={`${id}-error`} aria-live="polite" className="text-caption text-error empty:hidden">
        {error}
      </p>
    </fieldset>
  )
}
