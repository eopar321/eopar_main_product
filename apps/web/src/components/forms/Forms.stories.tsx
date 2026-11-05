import type { Meta, StoryObj } from '@storybook/nextjs-vite'

import { Badge } from '@/components/ui/Chip'

import { Checkbox, CheckboxCard, ChoiceGroup, RadioCard } from './choices'
import { FileUpload } from './FileUpload'
import { DateField, SelectField, TextArea, TextField, TimeField } from './inputs'

const meta = {
  title: 'Forms/Fields',
  component: TextField,
  args: { label: 'Full name', placeholder: 'Your name' },
  decorators: [(Story) => <div className="max-w-[47.5rem]">{Story()}</div>],
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Text: Story = {}

export const TextWithHelp: Story = {
  args: {
    label: 'Place of birth',
    placeholder: 'Start typing a city or town',
    help: 'Choose from the list so we can record coordinates and the correct historical timezone.',
  },
}

export const TextWithError: Story = {
  args: {
    label: 'Email',
    type: 'email',
    defaultValue: 'name@',
    error: 'Enter an email address like name@example.com',
    required: true,
  },
}

export const TextAreaField: Story = {
  render: () => (
    <TextArea
      label="I have my own question (optional)"
      placeholder="Write your question in your own words…"
      help="20 to 1,500 characters."
    />
  ),
}

export const Select: Story = {
  render: () => (
    <SelectField
      label="Country"
      placeholder="Choose a country"
      options={[
        { value: 'IN', label: 'India' },
        { value: 'AE', label: 'United Arab Emirates' },
        { value: 'GB', label: 'United Kingdom' },
        { value: 'US', label: 'United States' },
      ]}
      help="Used to format your phone number and time windows."
    />
  ),
}

export const DateAndTime: Story = {
  render: () => (
    <div className="grid gap-6 sm:grid-cols-2">
      <DateField label="Date of birth" required />
      <TimeField label="Time of birth" help="24-hour clock, local time at birth." />
      <DateField
        label="Date of birth"
        error="Date of birth can’t be in the future"
        defaultValue="2031-01-01"
      />
    </div>
  ),
}

export const Checkboxes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Checkbox
        label="I don't know my exact birth time"
        help="We'll ask for an approximate window and a few dated life events instead."
      />
      <Checkbox
        label="I agree to the Terms and Privacy Policy"
        help="Required. Your details are encrypted and used only for this request."
        defaultChecked
      />
      <Checkbox label="I agree to the Terms and Privacy Policy" error="Please agree to continue" />
    </div>
  ),
}

export const RadioCards: Story = {
  render: () => (
    <ChoiceGroup legend="How broad is your question?">
      <RadioCard
        name="scope"
        value="focused"
        defaultChecked
        badge={<Badge variant="suggested">Suggested</Badge>}
        title="Focused Question"
        description="One question. One focused analysis — for clarity about one specific matter."
      />
      <RadioCard
        name="scope"
        value="related"
        title="Related Questions"
        description="A few connected questions and a broader analysis — e.g. timing, delay and partner questions together."
      />
      <RadioCard
        name="scope"
        value="comprehensive"
        title="Comprehensive Analysis"
        description="When the situation cannot be reduced to one question — several life areas, deeper study."
      />
    </ChoiceGroup>
  ),
}

export const QuestionCards: Story = {
  render: () => (
    <ChoiceGroup
      legend="Choose one or more questions"
      error="Choose at least one question or write your own"
    >
      <CheckboxCard title="When are the stronger periods for marriage?" defaultChecked />
      <CheckboxCard title="What factors may be contributing to delay in marriage?" />
      <CheckboxCard title="What does the analysis indicate regarding compatibility?" />
    </ChoiceGroup>
  ),
}

export const Upload: Story = {
  render: () => (
    <div className="grid gap-8 sm:grid-cols-2">
      <FileUpload
        label="Left palm"
        accept="image/jpeg,image/png,image/heic"
        help="A clear photo in daylight. JPG, PNG or HEIC, up to 10 MB."
        required
      />
      <FileUpload
        label="Right palm"
        accept="image/jpeg,image/png,image/heic"
        error="This file is larger than 10 MB"
      />
      <FileUpload label="Site plan or photos (optional)" multiple className="sm:col-span-2" />
    </div>
  ),
}
