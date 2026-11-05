import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Button } from './Button'
import { TextLink } from './TextLink'

const meta = {
  title: 'UI/Buttons',
  component: Button,
  args: { children: 'Begin with your question', variant: 'gold', size: 'lg' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['gold', 'outline', 'outline-gold', 'navy'] },
    size: { control: 'inline-radio', options: ['md', 'lg'] },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const GoldPill: Story = {}

export const OutlinePill: Story = {
  args: { variant: 'outline', children: 'Explore market cycles' },
}

export const GoldOutline: Story = {
  args: { variant: 'outline-gold', size: 'md', children: 'Request a consultation' },
}

export const WithArrow: Story = {
  args: { variant: 'gold', arrow: true, children: 'Explore market research' },
}

export const AsLink: Story = {
  args: { href: '/consultations/request', children: 'Start a consultation' },
}

export const Disabled: Story = {
  args: { disabled: true, children: 'Continue' },
}

export const NavyOnIvory: Story = {
  args: { variant: 'navy', children: 'Start a consultation' },
  globals: { backgrounds: { value: 'ivory' } },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-10">
      <div className="flex flex-wrap items-center gap-4">
        <Button size="lg">Begin with your question</Button>
        <Button variant="outline" size="lg">
          Explore market cycles
        </Button>
        <Button variant="outline-gold">Request a consultation</Button>
        <Button arrow>Explore EOPAR</Button>
      </div>
      <div className="flex flex-wrap items-center gap-8">
        <TextLink href="/predictive-arts/astrology">Explore</TextLink>
        <TextLink href="/learning">Join waitlist</TextLink>
      </div>
      <div className="surface-ivory flex flex-wrap items-center gap-6 p-8">
        <Button variant="navy">Start a consultation</Button>
        <TextLink href="/publications" tone="light">
          Explore publications
        </TextLink>
      </div>
    </div>
  ),
}

export const TextLinkArrow: Story = {
  render: () => <TextLink href="/predictive-arts/astrology">Explore</TextLink>,
}
