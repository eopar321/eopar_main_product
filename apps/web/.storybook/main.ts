import type { StorybookConfig } from '@storybook/nextjs-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: { name: '@storybook/nextjs-vite', options: {} },
  // public/ for brand assets; storybook-assets/ for the PDF crops used by the comparison page
  staticDirs: ['../public', '../storybook-assets'],
  core: { disableTelemetry: true },
}

export default config
