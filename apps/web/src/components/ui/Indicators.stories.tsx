import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { PanchangCard } from './PanchangCard'
import { SkyTicker } from './SkyTicker'
import { Stepper } from './Stepper'
import { ZodiacBand } from './ZodiacBand'

const meta = {
  title: 'UI/Stepper, Panchang & bands',
  component: Stepper,
  args: { current: 2 },
  argTypes: { current: { control: { type: 'range', min: 1, max: 9 } } },
} satisfies Meta<typeof Stepper>

export default meta
type Story = StoryObj<typeof meta>

export const StepperStep2: Story = {
  name: 'Stepper',
  render: (args) => (
    <div className="max-w-[73rem]">
      <Stepper {...args} />
    </div>
  ),
}

export const StepperAllSteps: Story = {
  render: () => (
    <div className="flex max-w-[73rem] flex-col gap-8">
      {[1, 5, 9].map((n) => (
        <Stepper key={n} current={n} />
      ))}
    </div>
  ),
}

export const Panchang: Story = {
  render: () => <PanchangCard />,
}

export const SkyTickerBand: Story = {
  name: 'Sky ticker',
  parameters: { layout: 'fullscreen' },
  render: () => <SkyTicker />,
}

export const ZodiacNameBand: Story = {
  name: 'Zodiac name band',
  parameters: { layout: 'fullscreen' },
  render: () => <ZodiacBand />,
}
