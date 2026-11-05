import { GRAHAS, ZODIAC_SIGNS } from '@eopar/shared'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { GlyphCircle } from './GlyphCircle'

const meta = {
  title: 'UI/Glyph circle',
  component: GlyphCircle,
  args: { glyph: GRAHAS[0]!.glyph, label: 'Sun', size: 'md', variant: 'ring' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    variant: { control: 'inline-radio', options: ['ring', 'node'] },
  },
} satisfies Meta<typeof GlyphCircle>

export default meta
type Story = StoryObj<typeof meta>

export const Ring: Story = {}

export const Node: Story = { args: { variant: 'node' } }

export const AllGrahas: Story = {
  render: () => (
    <ul className="flex flex-wrap gap-4">
      {GRAHAS.map((graha) => (
        <li key={graha.id} className="flex flex-col items-center gap-2">
          <GlyphCircle glyph={graha.glyph} label={graha.name} />
          <span className="text-caption text-ivory/80">{graha.name}</span>
        </li>
      ))}
    </ul>
  ),
}

export const AllSigns: Story = {
  render: () => (
    <ul className="flex flex-wrap gap-4">
      {ZODIAC_SIGNS.map((sign) => (
        <li key={sign.id} className="flex flex-col items-center gap-2">
          <GlyphCircle glyph={sign.glyph} label={sign.name} size="lg" />
          <span className="text-caption text-ivory/80">{sign.name}</span>
        </li>
      ))}
    </ul>
  ),
}

export const OnIvory: Story = {
  args: { tone: 'light', size: 'lg' },
  globals: { backgrounds: { value: 'ivory' } },
}
