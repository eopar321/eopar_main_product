'use client'

import { useId, useRef, useState, type InputHTMLAttributes, type ReactNode } from 'react'

import { cn } from '@/lib/cn'

export interface FileUploadProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'className'
> {
  label: ReactNode
  help?: ReactNode
  error?: string
  className?: string
}

/**
 * File picker styled as a drop zone. The real <input type=file> stays in the tab order
 * (visually hidden), so it works with keyboard, screen readers and mobile camera pickers.
 * Server-side checks (size, magic bytes, ClamAV, re-encode) arrive with the upload API in Phase 4.
 */
export function FileUpload({
  label,
  help,
  error,
  required,
  multiple,
  className,
  onChange,
  ...rest
}: FileUploadProps) {
  const id = useId()
  const [names, setNames] = useState<string[]>([])
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const helpId = `${id}-help`
  const errorId = `${id}-error`
  const statusId = `${id}-status`

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <span id={`${id}-label`} className="text-small text-ivory">
        {label}
        {required && (
          <span className="text-ivory/70">
            <span aria-hidden="true"> *</span>
            <span className="sr-only"> (required)</span>
          </span>
        )}
      </span>
      <label
        htmlFor={id}
        onDragOver={(event) => {
          event.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault()
          setDragging(false)
          const input = inputRef.current
          if (!input || event.dataTransfer.files.length === 0) return
          const transfer = new DataTransfer()
          const dropped = Array.from(event.dataTransfer.files).slice(0, multiple ? undefined : 1)
          dropped.forEach((file) => transfer.items.add(file))
          input.files = transfer.files
          input.dispatchEvent(new Event('change', { bubbles: true }))
        }}
        className={cn(
          'group flex cursor-pointer flex-col items-center gap-3 border border-dashed px-6 py-8 text-center transition-colors',
          error ? 'border-error' : 'border-(--rule-input) hover:border-gold/70',
          dragging && 'border-gold bg-gold/5',
          'has-focus-visible:outline-2 has-focus-visible:outline-offset-3 has-focus-visible:outline-gold',
        )}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6 text-gold">
          <path
            d="M12 16V4m0 0l-4.5 4.5M12 4l4.5 4.5M4 15v5h16v-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.3"
          />
        </svg>
        <span className="text-body text-ivory">
          <span className="text-gold underline underline-offset-4">
            Choose {multiple ? 'files' : 'a file'}
          </span>{' '}
          or drop
          {multiple ? ' them' : ' it'} here
        </span>
        <input
          ref={inputRef}
          id={id}
          type="file"
          multiple={multiple}
          required={required}
          aria-labelledby={`${id}-label`}
          aria-describedby={[help && helpId, error && errorId, statusId].filter(Boolean).join(' ')}
          aria-invalid={error ? true : undefined}
          className="sr-only"
          onChange={(event) => {
            setNames(Array.from(event.target.files ?? [], (file) => file.name))
            onChange?.(event)
          }}
          {...rest}
        />
      </label>
      <p id={statusId} aria-live="polite" className="text-caption text-ivory/80 empty:hidden">
        {names.length > 0 ? `Selected: ${names.join(', ')}` : ''}
      </p>
      {help && (
        <p id={helpId} className="text-caption text-ivory/70">
          {help}
        </p>
      )}
      <p id={errorId} aria-live="polite" className="text-caption text-error empty:hidden">
        {error}
      </p>
    </div>
  )
}
