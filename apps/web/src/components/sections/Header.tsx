'use client'

import { CONSULTATION_CTA, MAIN_NAV } from '@eopar/shared'
import Link from 'next/link'
import { useCallback, useEffect, useId, useRef, useState } from 'react'

import { Logo } from '@/components/brand/Logo'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

export interface HeaderProps {
  /** href of the current section, e.g. "/markets" — marks the nav item active */
  current?: string
}

/** Site header: logo · six nav links · one REQUEST A CONSULTATION button. Mobile: menu button + overlay. */
export function Header({ current }: HeaderProps) {
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const toggleRef = useRef<HTMLButtonElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const close = useCallback(() => {
    setOpen(false)
    toggleRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    panelRef.current?.querySelector<HTMLElement>('a')?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [open, close])

  return (
    <header className="relative z-40 border-b border-gold/18 bg-navy">
      <div className="mx-auto flex h-[4.5rem] max-w-[calc(var(--container-content)+2*var(--spacing-gutter))] items-center justify-between gap-6 px-gutter lg:h-header">
        <Link href="/home" className="shrink-0" aria-label="EOPAR — home">
          <Logo height={26} priority />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8 xl:gap-9">
            {MAIN_NAV.map((item) => {
              const active = current === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'border-b py-1.5 text-small transition-colors',
                      active
                        ? 'border-gold text-gold'
                        : 'border-transparent text-ivory/85 hover:text-ivory',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* display is set on a wrapper: the Button carries its own inline-flex */}
        <div className="hidden lg:block">
          <Button href={CONSULTATION_CTA.href} variant="outline-gold">
            {CONSULTATION_CTA.label}
          </Button>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 grid size-11 place-items-center lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          <svg width="34" height="20" viewBox="0 0 34 20" aria-hidden="true" className="text-ivory">
            {open ? (
              <path d="M8 1l18 18M26 1L8 19" stroke="currentColor" strokeWidth="1.5" />
            ) : (
              <path d="M0 1h34M0 10h34M8 19h26" stroke="currentColor" strokeWidth="1.5" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div
          ref={panelRef}
          id={menuId}
          className="fixed inset-x-0 top-[4.5rem] bottom-0 overflow-y-auto border-t border-gold/18 bg-navy px-gutter py-10 lg:hidden"
        >
          <nav aria-label="Main">
            <ul className="space-y-1">
              {MAIN_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current === item.href ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'block py-3 font-display text-display-xs',
                      current === item.href ? 'text-gold' : 'text-ivory',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Button href={CONSULTATION_CTA.href} variant="gold" block className="mt-10">
            {CONSULTATION_CTA.label}
          </Button>
        </div>
      )}
    </header>
  )
}
