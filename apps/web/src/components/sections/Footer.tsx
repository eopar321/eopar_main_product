import { BRAND } from '@eopar/shared'
import Link from 'next/link'
import { useId } from 'react'

import { Logo } from '@/components/brand/Logo'

const COLUMNS = [
  {
    title: 'The arts',
    links: [
      { label: 'Astrology', href: '/predictive-arts/astrology' },
      { label: 'Palmistry', href: '/predictive-arts/palmistry' },
      { label: 'Numerology', href: '/predictive-arts/numerology' },
      { label: 'Cartomancy', href: '/predictive-arts/cartomancy' },
      { label: 'Tarot', href: '/predictive-arts/tarot' },
      { label: 'Vastu Shastra', href: '/predictive-arts/vastu-shastra' },
      { label: 'Remedial Traditions', href: '/predictive-arts/remedial-traditions' },
    ],
  },
  {
    title: 'EOPAR',
    links: [
      { label: 'Consultations', href: '/consultations' },
      { label: 'Learning', href: '/learning' },
      { label: 'Research', href: '/research' },
      { label: 'Publications', href: '/publications' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Trust',
    links: [
      { label: 'Methodology', href: '/methodology' },
      { label: 'Ethical approach', href: '/methodology#ethics' },
      { label: 'What prediction can and cannot do', href: '/methodology#limits' },
      { label: 'Privacy', href: '/legal/privacy' },
      { label: 'Terms & Disclaimer', href: '/legal/terms' },
      { label: 'Refunds & Cancellation', href: '/legal/refunds' },
    ],
  },
]

/** Short list shown on mobile (PDF p.6) */
const MOBILE_LINKS = [
  { label: 'Predictive Arts', href: '/predictive-arts' },
  { label: 'Methodology', href: '/methodology' },
  { label: 'Consultations', href: '/consultations' },
  { label: 'Privacy', href: '/legal/privacy' },
  { label: 'Learning', href: '/learning' },
  { label: 'Terms & Disclaimer', href: '/legal/terms' },
  { label: 'Research', href: '/research' },
  { label: 'Contact', href: '/contact' },
]

export interface FooterProps {
  /** Newsletter form target; wired to /api/v1/newsletter in Phase 6 */
  newsletterAction?: string
  /** Legal line placeholders until SiteSettings is filled (brief §9) */
  legalEntity?: string
  gstin?: string
  year?: number
}

export function Footer({
  newsletterAction,
  legalEntity = '[LEGAL ENTITY NAME]',
  gstin = '[NUMBER]',
  year = new Date().getFullYear(),
}: FooterProps) {
  const emailId = useId()
  return (
    <footer className="bg-black-deep text-ivory">
      <div className="mx-auto max-w-[calc(var(--container-content)+2*var(--spacing-gutter))] px-gutter pt-16 pb-10 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-4 lg:gap-8">
          <div>
            <Logo height={30} />
            <p className="mt-5 text-small text-ivory/80">{BRAND.fullName}</p>
            <p className="mt-2 font-display text-[1.3rem] italic text-gold-soft">{BRAND.tagline}</p>

            <form action={newsletterAction} className="mt-8 hidden md:block">
              <label
                htmlFor={emailId}
                className="text-eyebrow uppercase tracking-[var(--tracking-eyebrow)] text-ivory/80"
              >
                Newsletter
              </label>
              <div className="mt-3 flex max-w-xs">
                <input
                  id={emailId}
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Email address"
                  className="h-11 min-w-0 flex-1 border border-(--rule-input) bg-transparent px-3.5 text-small text-ivory placeholder:text-ivory/55 focus:border-gold"
                />
                <button
                  type="submit"
                  className="h-11 bg-gold px-4 text-[0.75rem] font-semibold tracking-[0.2em] text-navy shadow-glow-gold hover:bg-gold-soft"
                >
                  JOIN
                </button>
              </div>
            </form>
          </div>

          {COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title} className="hidden lg:block">
              <h2 className="text-eyebrow uppercase tracking-[var(--tracking-eyebrow)] text-gold">
                {column.title}
              </h2>
              <ul className="mt-5 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-small text-ivory/85 hover:text-ivory">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <nav aria-label="Footer" className="lg:hidden">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              {MOBILE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-body text-ivory/85 hover:text-ivory">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-14 border-t border-ivory/10 pt-6 text-caption text-ivory/70">
          © {year} {BRAND.name} · {legalEntity} · GSTIN {gstin}
        </p>
      </div>
    </footer>
  )
}
