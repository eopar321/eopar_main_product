import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { useState } from 'react'

import { Badge, Chip, Tag } from './Chip'

const CATEGORIES = [
  'Marriage & Relationships',
  'Career & Profession',
  'Business & Finance',
  'Markets & Financial Timing',
  'Education',
  'Property & Home',
  'Family & Children',
  'Timing & Important Decisions',
  'Personal Direction',
  'Birth Time Rectification',
  'Other / Specific Question',
]

const meta = {
  title: 'UI/Chips, tags & badges',
  component: Chip,
  args: { children: 'Career & Profession' },
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>

export const ChipDefault: Story = {}

export const ChipSelected: Story = { args: { selected: true } }

function CategoryChips({ tone }: { tone: 'dark' | 'light' }) {
  const [picked, setPicked] = useState<string[]>(['Career & Profession'])
  return (
    <div
      className="flex max-w-4xl flex-wrap justify-center gap-3"
      role="group"
      aria-label="Categories"
    >
      {CATEGORIES.map((category) => (
        <Chip
          key={category}
          tone={tone}
          selected={picked.includes(category)}
          onClick={() =>
            setPicked((list) =>
              list.includes(category) ? list.filter((c) => c !== category) : [...list, category],
            )
          }
        >
          {category}
        </Chip>
      ))}
    </div>
  )
}

export const CategoryChipsOnIvory: Story = {
  render: () => <CategoryChips tone="light" />,
  globals: { backgrounds: { value: 'ivory' } },
}

export const CategoryChipsOnNavy: Story = {
  render: () => <CategoryChips tone="dark" />,
}

export const Tags: Story = {
  render: () => (
    <div className="flex max-w-md flex-wrap gap-2.5">
      {[
        'Predictive Arts Research',
        'Classical Text & Source Studies',
        'Comparative System Studies',
        'Case Studies',
        'Observational Research',
      ].map((t) => (
        <Tag key={t}>{t}</Tag>
      ))}
    </div>
  ),
}

export const Badges: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Badge>Coming soon</Badge>
      <Badge variant="suggested">Suggested</Badge>
      <Badge variant="recommended">Recommended</Badge>
      <Badge variant="sample">Sample</Badge>
    </div>
  ),
}
