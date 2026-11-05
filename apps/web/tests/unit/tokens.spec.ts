import { COLORS } from '@eopar/shared'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const css = readFileSync(path.resolve(__dirname, '../../src/styles/tokens.css'), 'utf8')

const kebab = (key: string) => key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)

describe('design tokens', () => {
  it.each(Object.entries(COLORS))('tokens.css matches shared colour %s', (key, hex) => {
    const match = css.match(new RegExp(`--color-${kebab(key)}:\\s*(#[0-9a-fA-F]{6})`))
    expect(match?.[1]?.toUpperCase()).toBe(hex)
  })
})
