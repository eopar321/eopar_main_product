import { BRAND } from '@eopar/shared'

// Phase 0 placeholder. Replaced by the intro gate (/) and homepage (/home) in Phase 3.
// The wordmark is set in type until the logo files arrive (design/brand).
export default function HelloPage() {
  return (
    <main className="grid min-h-dvh place-items-center px-4">
      <div className="frame-double w-full max-w-xl px-8 py-16 text-center">
        <p className="eyebrow text-gold">{BRAND.fullName}</p>
        <h1 className="mt-6 font-display text-[length:var(--text-display)] font-medium tracking-[0.12em]">
          {BRAND.name}
        </h1>
        <p className="mt-4 font-display text-2xl italic text-gold-soft">{BRAND.tagline}</p>
        <p className="mt-10 text-sm text-ivory/70">Phase 0 — foundation in place.</p>
      </div>
    </main>
  )
}
