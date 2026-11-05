import { COLORS } from '@eopar/shared'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta = {
  title: 'Foundations/Tokens',
  parameters: { layout: 'padded' },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

const USAGE: Record<string, string> = {
  navy: 'Main background',
  black: 'Alternate sections',
  blackDeep: 'Footer, bands',
  panel: 'Panels under wheels / Panchang',
  gold: 'CTAs, rules, icons (≤ 5% of a screen)',
  goldSoft: 'Highlights, italic accents',
  goldLight: 'Glows',
  goldSpark: 'Sparks',
  bronze: 'Gold’s stand-in on ivory',
  ivory: 'Text on dark, light sections',
  stone: 'Secondary light sections',
}

export const Colours: Story = {
  render: () => (
    <ul className="grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {Object.entries(COLORS).map(([name, hex]) => (
        <li key={name} className="frame-double p-3">
          <div className="h-20 border border-ivory/15" style={{ background: hex }} />
          <p className="mt-3 text-small text-ivory">{name}</p>
          <p className="font-mono text-caption text-ivory/75">{hex}</p>
          <p className="mt-1 text-caption text-ivory/70">{USAGE[name]}</p>
        </li>
      ))}
    </ul>
  ),
}

const SCALE = [
  ['display-xl', 'text-display-xl', 'Read the sky.', '84 px'],
  ['display-lg', 'text-display-lg', 'Different systems observe different patterns.', '60 px'],
  ['display-md', 'text-display-md', 'Observation before conclusion.', '44–48 px'],
  ['display-sm', 'text-display-sm', 'Astrology', '36 px'],
  ['display-xs', 'text-display-xs', 'Remedial Traditions', '24 px'],
] as const

export const Typography: Story = {
  render: () => (
    <div className="flex max-w-5xl flex-col gap-8">
      {SCALE.map(([name, cls, sample, size]) => (
        <div
          key={name}
          className="grid gap-2 border-b border-ivory/10 pb-6 md:grid-cols-[10rem_1fr]"
        >
          <p className="text-caption text-ivory/75">
            {name}
            <br />
            {size} · Cormorant Garamond
          </p>
          <p className={`font-display font-normal ${cls}`}>{sample}</p>
        </div>
      ))}
      <div className="grid gap-2 border-b border-ivory/10 pb-6 md:grid-cols-[10rem_1fr]">
        <p className="text-caption text-ivory/75">italic accent</p>
        <p className="font-display text-display-lg italic text-gold-soft">
          Understand the <span className="text-shimmer">cycles.</span>
        </p>
      </div>
      {(
        [
          ['lead', 'text-lead', '17–19 px · Manrope'],
          ['body', 'text-body', '16 px · Manrope'],
          ['small', 'text-small', '14 px · Manrope'],
          ['caption', 'text-caption', '13 px · Manrope'],
        ] as const
      ).map(([name, cls, size]) => (
        <div key={name} className="grid gap-2 md:grid-cols-[10rem_1fr]">
          <p className="text-caption text-ivory/75">
            {name}
            <br />
            {size}
          </p>
          <p className={`${cls} text-ivory/90`}>
            EOPAR studies planetary patterns across life and markets — from birth charts, Prashna
            and Muhurta to the timing of market cycles.
          </p>
        </div>
      ))}
      <div className="grid gap-2 md:grid-cols-[10rem_1fr]">
        <p className="text-caption text-ivory/75">eyebrow · 12 px · 0.3em</p>
        <p className="text-eyebrow uppercase tracking-[var(--tracking-eyebrow)] text-gold">
          Vedic · KP · Lal Kitab · Financial Astrology
        </p>
      </div>
    </div>
  ),
}

export const SpacingRadiiShadows: Story = {
  name: 'Spacing, radii & glows',
  render: () => (
    <div className="flex max-w-5xl flex-col gap-10">
      <section>
        <h2 className="font-display text-display-xs">Layout</h2>
        <dl className="mt-4 grid grid-cols-[12rem_1fr] gap-y-2 text-small text-ivory/85">
          <dt>Content width</dt>
          <dd>1200 px (75rem)</dd>
          <dt>Page gutter</dt>
          <dd>20 px mobile → 120 px at 1440</dd>
          <dt>Section padding</dt>
          <dd>72 px mobile → 136 px desktop</dd>
          <dt>Header height</dt>
          <dd>87 px desktop, 72 px mobile</dd>
          <dt>Spacing scale</dt>
          <dd>Tailwind 4 px base (p-1 = 4 px … p-30 = 120 px)</dd>
        </dl>
      </section>
      <section>
        <h2 className="font-display text-display-xs">Radii</h2>
        <div className="mt-4 flex flex-wrap items-end gap-6 text-caption text-ivory/80">
          <div>
            <div className="frame-double size-24" />
            <p className="mt-2">none — cards, inputs, tags</p>
          </div>
          <div>
            <div className="h-6 w-24 rounded-badge bg-gold" />
            <p className="mt-2">badge — 2 px</p>
          </div>
          <div>
            <div className="h-12 w-40 rounded-pill border border-gold" />
            <p className="mt-2">pill — buttons, chips</p>
          </div>
        </div>
      </section>
      <section>
        <h2 className="font-display text-display-xs">Glows & rules</h2>
        <div className="mt-6 flex flex-wrap items-center gap-10 text-caption text-ivory/80">
          <div className="flex flex-col items-center gap-3">
            <div className="h-12 w-40 rounded-pill bg-gold shadow-glow-gold" />
            glow-gold
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="h-[3px] w-40 rounded-pill bg-gold shadow-glow-segment" />
            glow-segment
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="size-9 rounded-full border border-gold bg-navy shadow-halo" />
            halo
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="frame-double-strong size-24 bg-panel/80" />
            frame-double-strong
          </div>
        </div>
      </section>
    </div>
  ),
}

export const Motion: Story = {
  render: () => (
    <div className="flex max-w-3xl flex-col gap-6 text-small text-ivory/85">
      <p>
        All motion is CSS and applied through <code>motion-safe:</code>, so nothing moves when the
        operating system asks for reduced motion. Marquees also have a pause button.
      </p>
      <ul className="list-disc space-y-1 pl-5">
        <li>
          Sign ring: one turn per 10 minutes; nakshatra ring: 12 minutes, reverse; graha orbit: 15
          minutes
        </li>
        <li>Spark: one orbit per 24 s · Halo: breathes every 7 s</li>
        <li>Gold text shimmer: 6 s · Arc draw-in: 2.4 s once</li>
        <li>Sky ticker: 50 s loop · Zodiac band: 70 s loop</li>
      </ul>
      <p className="font-display text-display-md italic">
        <span className="text-shimmer">Patterns. Possibilities. Direction.</span>
      </p>
    </div>
  ),
}
