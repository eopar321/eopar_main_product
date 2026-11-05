'use client'

import { createContext, useContext, useId, type ReactNode } from 'react'

import { cn } from '@/lib/cn'

interface FieldIds {
  inputId: string
  helpId: string
  errorId: string
  describedBy: string | undefined
  invalid: boolean
  required: boolean
}

const FieldContext = createContext<FieldIds | null>(null)

/** Ids and ARIA wiring for the control inside a <Field>. */
export function useField(): FieldIds {
  const context = useContext(FieldContext)
  if (!context) throw new Error('useField must be used inside <Field>')
  return context
}

export interface FieldProps {
  label: ReactNode
  help?: ReactNode
  error?: string
  required?: boolean
  /** Use an existing id instead of a generated one */
  id?: string
  className?: string
  children: ReactNode
}

/**
 * Label + control + help text + error. The error region is always rendered and polite-live,
 * so screen readers announce a new error without moving focus (brief §5, WCAG 4.1.3).
 */
export function Field({
  label,
  help,
  error,
  required = false,
  id,
  className,
  children,
}: FieldProps) {
  const generated = useId()
  const inputId = id ?? `${generated}-input`
  const helpId = `${inputId}-help`
  const errorId = `${inputId}-error`
  const describedBy =
    [help ? helpId : null, error ? errorId : null].filter(Boolean).join(' ') || undefined

  return (
    <FieldContext.Provider
      value={{ inputId, helpId, errorId, describedBy, invalid: Boolean(error), required }}
    >
      <div className={cn('flex flex-col gap-2', className)}>
        <label htmlFor={inputId} className="text-small text-ivory">
          {label}
          {required && (
            <span className="text-ivory/70">
              <span aria-hidden="true"> *</span>
              <span className="sr-only"> (required)</span>
            </span>
          )}
        </label>
        {children}
        {help && (
          <p id={helpId} className="text-caption text-ivory/70">
            {help}
          </p>
        )}
        <p id={errorId} aria-live="polite" className="text-caption text-error empty:hidden">
          {error}
        </p>
      </div>
    </FieldContext.Provider>
  )
}

/** Shared look of text-like controls (PDF: 51px tall, square, 1px ivory rule) */
export const controlClass =
  'w-full min-h-[3.1875rem] border border-(--rule-input) bg-transparent px-4 text-body text-ivory ' +
  'placeholder:text-ivory/55 transition-colors duration-200 hover:border-ivory/60 ' +
  'focus:border-gold focus-visible:outline-offset-2 ' +
  'aria-invalid:border-error disabled:cursor-not-allowed disabled:opacity-50 [color-scheme:dark]'
