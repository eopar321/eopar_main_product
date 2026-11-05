import type { Preview } from '@storybook/nextjs-vite'

import { fontVariables } from '../src/styles/fonts'
import '../src/styles/globals.css'

const preview: Preview = {
  parameters: {
    layout: 'padded',
    backgrounds: {
      options: {
        navy: { name: 'Navy', value: '#0B1426' },
        black: { name: 'Black', value: '#07080B' },
        ivory: { name: 'Ivory', value: '#F4EDE1' },
      },
    },
    // Fail the a11y panel (and the axe run in scripts/storybook-check) on violations
    a11y: { test: 'error' },
    controls: { expanded: true },
    nextjs: { appDirectory: true },
  },
  initialGlobals: {
    backgrounds: { value: 'navy' },
  },
  decorators: [
    (Story) => (
      <div className={`${fontVariables} font-sans text-ivory`}>
        <Story />
      </div>
    ),
  ],
}

export default preview
