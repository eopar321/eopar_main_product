import { GRAHAS } from '@eopar/shared'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { ArtCard } from './ArtCard'
import { Card } from './Card'

const meta = {
  title: 'UI/Double-rule card',
  component: Card,
  args: { tone: 'default', children: null },
  argTypes: { tone: { control: 'inline-radio', options: ['default', 'strong', 'dashed'] } },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="max-w-[16.5rem] p-6">
      <h3 className="font-display text-[1.6rem] text-ivory">Market Cycle Studies</h3>
      <p className="mt-2 text-small text-ivory/80">
        Planetary cycles mapped against index history.
      </p>
    </Card>
  ),
}

export const StrongPanel: Story = {
  ...Default,
  args: { tone: 'strong', children: null },
}

export const Dashed: Story = {
  render: () => (
    <Card tone="dashed" className="max-w-md p-10">
      <p className="text-eyebrow uppercase tracking-[var(--tracking-eyebrow)] text-gold">
        Research library
      </p>
      <h3 className="mt-4 font-display text-display-sm text-ivory">In Development</h3>
      <p className="mt-4 text-small text-ivory/80">
        No findings are published yet. When they are, each will carry a clear label.
      </p>
    </Card>
  ),
}

const sun = GRAHAS.find((g) => g.id === 'sun')!.glyph

export const ArtCardAstrology: Story = {
  name: 'Art card',
  render: () => (
    <div className="max-w-[24rem]">
      <ArtCard
        number={1}
        glyph={sun}
        title="Astrology"
        tagline="Patterns across time"
        methods={['Vedic', 'KP', 'Lal Kitab', 'Ashtakavarga', 'Prashna', 'Muhurta']}
        href="/predictive-arts/astrology"
      />
    </div>
  ),
}
