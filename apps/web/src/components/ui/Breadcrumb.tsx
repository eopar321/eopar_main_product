import Link from 'next/link'

import { cn } from '@/lib/cn'

export interface BreadcrumbItem {
  label: string
  /** Omit for the current page */
  href?: string
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[]
  tone?: 'dark' | 'light'
  className?: string
}

export function Breadcrumb({ items, tone = 'dark', className }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol
        className={cn(
          'flex flex-wrap items-center gap-x-1.5 text-caption',
          tone === 'dark' ? 'text-ivory/75' : 'text-navy/70',
        )}
      >
        {items.map((item, index) => {
          const last = index === items.length - 1
          return (
            <li key={item.label} className="flex items-center gap-x-1.5">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className={cn(
                    'underline-offset-4 hover:underline',
                    tone === 'dark' ? 'hover:text-ivory' : 'hover:text-navy',
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span aria-current={last ? 'page' : undefined}>{item.label}</span>
              )}
              {!last && <span aria-hidden="true">/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
