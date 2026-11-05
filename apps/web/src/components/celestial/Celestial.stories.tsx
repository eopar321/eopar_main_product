import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Logo } from '@/components/brand/Logo'
import { PanchangCard } from '@/components/ui/PanchangCard'

import { CelestialO } from './CelestialO'
import { KundliChart } from './KundliChart'
import { OrbitDecor } from './OrbitDecor'
import { SectorWheel } from './SectorWheel'
import { ZodiacWheel } from './ZodiacWheel'

const meta = {
  title: 'Celestial/Zodiac wheel',
  component: ZodiacWheel,
  args: { size: 640, halo: true, animate: true, kundli: false },
  argTypes: { size: { control: { type: 'range', min: 240, max: 720, step: 20 } } },
} satisfies Meta<typeof ZodiacWheel>

export default meta
type Story = StoryObj<typeof meta>

export const Wheel: Story = {}

export const WithKundliCentre: Story = {
  args: { kundli: true, label: 'Sample birth chart inside the zodiac wheel' },
}

export const HeroWithPanchang: Story = {
  name: 'Hero wheel + Panchang',
  render: () => (
    <div className="relative w-[min(46rem,100%)]">
      <ZodiacWheel kundli label="Sample birth chart inside the zodiac wheel" />
      <PanchangCard className="absolute right-0 bottom-0 max-sm:relative max-sm:mt-6" />
    </div>
  ),
}

export const IntroGateLogo: Story = {
  name: 'Intro gate (logo centre)',
  args: {
    size: 640,
    centre: (
      <div className="w-[86%]">
        <Logo variant="fullGold" height={170} className="!w-full" />
      </div>
    ),
  },
}

export const NoMotion: Story = {
  args: { animate: false, halo: false, kundli: true },
}

export const Small: Story = { args: { size: 320, kundli: true } }

export const Kundli: StoryObj<typeof KundliChart> = {
  name: 'Kundli chart',
  render: () => <KundliChart size={320} ascendantSign={8} />,
}

export const KundliEmpty: StoryObj<typeof KundliChart> = {
  name: 'Kundli chart — empty houses',
  render: () => <KundliChart size={320} houses={{}} title="Empty chart template" />,
}

export const Sectors: StoryObj<typeof SectorWheel> = {
  name: 'Sector wheel',
  render: () => (
    <div className="w-[min(37.5rem,100%)]">
      <SectorWheel />
    </div>
  ),
}

export const SectorsBare: StoryObj<typeof SectorWheel> = {
  name: 'Sector wheel — no panel',
  render: () => (
    <div className="w-[min(37.5rem,100%)]">
      <SectorWheel panel={false} />
    </div>
  ),
}

export const CelestialOLogo: StoryObj<typeof CelestialO> = {
  name: 'Celestial O',
  render: () => (
    <div className="flex flex-wrap items-center gap-12">
      <CelestialO size={120} label="EOPAR Celestial O" />
      <CelestialO size={64} arcs={false} />
      <CelestialO size={120} animate={false} />
    </div>
  ),
}

export const Orbits: StoryObj<typeof OrbitDecor> = {
  name: 'Orbit decor',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="grid gap-px md:grid-cols-2">
      <section className="relative h-80 overflow-hidden bg-black p-10">
        <p className="relative font-display text-display-sm">Top-right orbit</p>
        <OrbitDecor corner="top-right" />
      </section>
      <section className="relative h-80 overflow-hidden bg-navy p-10">
        <p className="relative font-display text-display-sm">Bottom-left orbit</p>
        <OrbitDecor corner="bottom-left" />
      </section>
      <section className="surface-ivory relative h-80 overflow-hidden p-10 md:col-span-2">
        <p className="relative font-display text-display-sm">On ivory</p>
        <OrbitDecor corner="bottom-right" tone="light" />
      </section>
    </div>
  ),
}
