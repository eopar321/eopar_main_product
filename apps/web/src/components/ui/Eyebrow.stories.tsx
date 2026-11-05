import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Breadcrumb } from './Breadcrumb'
import { Eyebrow } from './Eyebrow'

const meta = {
  title: 'UI/Eyebrow & breadcrumb',
  component: Eyebrow,
  args: { number: 1, children: 'The EOPAR philosophy' },
} satisfies Meta<typeof Eyebrow>

export default meta
type Story = StoryObj<typeof meta>

export const NumberedEyebrow: Story = {}

export const PlainEyebrow: Story = { args: { number: undefined, children: 'Research areas' } }

export const EyebrowOnIvory: Story = {
  args: { number: 4, tone: 'light', children: 'Consultations' },
  globals: { backgrounds: { value: 'ivory' } },
}

export const SectionHeading: Story = {
  render: () => (
    <div className="max-w-3xl">
      <Eyebrow number={3}>Astrology & Market Cycles</Eyebrow>
      <h2 className="mt-5 font-display text-display-lg font-normal text-ivory">
        Where the heavens <em className="text-shimmer">meet the markets.</em>
      </h2>
    </div>
  ),
}

export const BreadcrumbTrail: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: 'Home', href: '/home' },
        { label: 'Predictive Arts', href: '/predictive-arts' },
        { label: 'Astrology' },
      ]}
    />
  ),
}
