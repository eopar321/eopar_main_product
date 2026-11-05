'use client'

import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'

import { cn } from '@/lib/cn'

import { controlClass, Field, useField, type FieldProps } from './Field'

type FieldShellProps = Omit<FieldProps, 'children' | 'id'> & { id?: string }

function splitField<T extends FieldShellProps>(props: T) {
  const { label, help, error, required, id, className, ...control } = props
  return { field: { label, help, error, required, id, className }, control }
}

function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  const { inputId, describedBy, invalid, required } = useField()
  return (
    <input
      id={inputId}
      aria-describedby={describedBy}
      aria-invalid={invalid || undefined}
      required={required}
      {...props}
      className={cn(controlClass, props.className)}
    />
  )
}

export type TextFieldProps = FieldShellProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'id' | 'required'> & {
    inputClassName?: string
  }

export function TextField(props: TextFieldProps) {
  const { field, control } = splitField(props)
  const { inputClassName, type = 'text', ...rest } = control
  return (
    <Field {...field}>
      <Input type={type} className={inputClassName} {...rest} />
    </Field>
  )
}

export type DateFieldProps = Omit<TextFieldProps, 'type'>

/** Native date picker (keyboard and screen-reader friendly on every platform) */
export function DateField(props: DateFieldProps) {
  return <TextField {...props} type="date" />
}

export function TimeField(props: DateFieldProps) {
  return <TextField {...props} type="time" />
}

export type TextAreaProps = FieldShellProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'className' | 'id' | 'required'>

export function TextArea(props: TextAreaProps) {
  const { field, control } = splitField(props)
  return (
    <Field {...field}>
      <TextAreaControl rows={4} {...control} />
    </Field>
  )
}

function TextAreaControl(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { inputId, describedBy, invalid, required } = useField()
  return (
    <textarea
      id={inputId}
      aria-describedby={describedBy}
      aria-invalid={invalid || undefined}
      required={required}
      {...props}
      className={cn(controlClass, 'resize-y py-3.5 leading-relaxed')}
    />
  )
}

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export type SelectFieldProps = FieldShellProps &
  Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className' | 'id' | 'required'> & {
    options: SelectOption[]
    placeholder?: string
  }

/** Native <select> styled to match the inputs (the PDF has no select design — see DECISIONS D-018) */
export function SelectField(props: SelectFieldProps) {
  const { field, control } = splitField(props)
  const { options, placeholder, ...rest } = control
  return (
    <Field {...field}>
      <SelectControl options={options} placeholder={placeholder} {...rest} />
    </Field>
  )
}

function SelectControl({
  options,
  placeholder,
  defaultValue,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { options: SelectOption[]; placeholder?: string }) {
  const { inputId, describedBy, invalid, required } = useField()
  return (
    <div className="relative">
      <select
        id={inputId}
        aria-describedby={describedBy}
        aria-invalid={invalid || undefined}
        required={required}
        defaultValue={defaultValue ?? (placeholder && props.value === undefined ? '' : undefined)}
        {...props}
        className={cn(controlClass, 'appearance-none bg-navy pr-11')}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 12 8"
        className="pointer-events-none absolute top-1/2 right-4 w-3 -translate-y-1/2 text-gold"
      >
        <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    </div>
  )
}
