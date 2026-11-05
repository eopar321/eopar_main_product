import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { expect, userEvent, within } from 'storybook/test'

import { Footer } from './Footer'
import { Header } from './Header'

const meta = {
  title: 'Sections/Header & footer',
  component: Header,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const HeaderDesktop: Story = {
  name: 'Header',
}

export const HeaderActive: Story = {
  name: 'Header — Markets active',
  args: { current: '/markets' },
}

export const HeaderMobileMenuOpen: Story = {
  name: 'Header — mobile menu open',
  globals: { viewport: { value: 'mobile2', isRotated: false } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const toggle = canvas.getByRole('button', { name: 'Open menu' })
    await userEvent.click(toggle)
    await expect(toggle).toHaveAttribute('aria-expanded', 'true')
    await expect(
      canvas.getAllByRole('link', { name: 'Request a consultation' }).length,
    ).toBeGreaterThan(0)
  },
}

export const FooterDefault: Story = {
  name: 'Footer',
  render: () => <Footer year={2026} />,
}
