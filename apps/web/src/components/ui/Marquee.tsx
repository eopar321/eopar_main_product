'use client'

import { useState, type ReactNode } from 'react'

import { cn } from '@/lib/cn'

export interface MarqueeProps {
  /** Accessible name for the region and its pause button */
  label: string
  /** Seconds for one full loop */
  duration?: number
  children: ReactNode
  className?: string
  trackClassName?: string
}

/**
 * Endless horizontal band. The content is rendered twice; the copy is aria-hidden.
 * Has a pause button (WCAG 2.2.2), pauses on hover/focus, and does not move at all under
 * prefers-reduced-motion (it becomes a scrollable row instead).
 */
export function Marquee({
  label,
  duration = 60,
  children,
  className,
  trackClassName,
}: MarqueeProps) {
  const [paused, setPaused] = useState(false)
  return (
    <div className={cn('group/marquee relative flex items-center', className)}>
      {/* Focusable so keyboard users can scroll it under reduced motion (axe scrollable-region-focusable);
          focusing it also pauses the movement */}
      <div
        role="region"
        aria-label={label}
        tabIndex={0}
        className="min-w-0 flex-1 overflow-hidden focus-visible:outline-offset-[-2px] motion-reduce:overflow-x-auto"
      >
        <div
          className={cn(
            'flex w-max motion-safe:animate-marquee group-hover/marquee:[animation-play-state:paused] group-focus-within/marquee:[animation-play-state:paused]',
            paused && '[animation-play-state:paused]',
            trackClassName,
          )}
          style={{ animationDuration: `${duration}s` }}
        >
          <div className="flex shrink-0">{children}</div>
          <div className="flex shrink-0 motion-reduce:hidden" aria-hidden="true" inert>
            {children}
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((value) => !value)}
        aria-pressed={paused}
        aria-label={`${paused ? 'Play' : 'Pause'} ${label}`}
        className="mx-2 grid size-8 shrink-0 place-items-center rounded-full text-ivory/70 hover:text-gold motion-reduce:hidden"
      >
        <svg viewBox="0 0 12 12" aria-hidden="true" className="size-3">
          {paused ? (
            <path d="M3 1.5v9l7-4.5z" fill="currentColor" />
          ) : (
            <path d="M3 1.5h2v9H3zM7 1.5h2v9H7z" fill="currentColor" />
          )}
        </svg>
      </button>
    </div>
  )
}
