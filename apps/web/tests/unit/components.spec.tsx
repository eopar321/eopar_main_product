// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { polar } from '@/components/celestial/geometry'
import { describeKundli, KundliChart } from '@/components/celestial/KundliChart'
import { SectorWheel } from '@/components/celestial/SectorWheel'
import { ZodiacWheel } from '@/components/celestial/ZodiacWheel'
import { Checkbox } from '@/components/forms/choices'
import { TextField } from '@/components/forms/inputs'
import { Header } from '@/components/sections/Header'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Marquee } from '@/components/ui/Marquee'
import { PanchangCard } from '@/components/ui/PanchangCard'
import { Stepper } from '@/components/ui/Stepper'

afterEach(cleanup)

describe('celestial geometry', () => {
  it('puts 0° at 12 o’clock and runs clockwise', () => {
    expect(polar(100, 0)).toEqual({ x: 0, y: -100 })
    expect(polar(100, 90)).toEqual({ x: 100, y: 0 })
    expect(polar(100, 180)).toEqual({ x: 0, y: 100 })
  })
})

describe('KundliChart', () => {
  it('describes its houses for screen readers', () => {
    expect(describeKundli({ 10: ['sun', 'mercury'] }, 'Asc')).toBe(
      'North Indian chart. Asc in house 1; house 10: Sun and Mercury.',
    )
    render(<KundliChart title="Sample birth chart" />)
    expect(screen.getByRole('img').getAttribute('aria-label')).toMatch(
      /^Sample birth chart\. North Indian chart/,
    )
  })
})

describe('ZodiacWheel', () => {
  it('is hidden from assistive tech unless labelled', () => {
    const { container } = render(<ZodiacWheel />)
    expect(container.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true')
  })

  it('renders 12 signs and 9 grahas', () => {
    const { container } = render(<ZodiacWheel label="Wheel" />)
    const glyphs = [...container.querySelectorAll('text')].map((t) => t.textContent)
    expect(glyphs.filter((g) => /[♈-♓]/.test(g ?? ''))).toHaveLength(12)
    expect(glyphs.filter((g) => /[☉☊☋☽☿♀♂-♄]/.test(g ?? ''))).toHaveLength(9)
  })

  it('applies motion only through motion-safe classes', () => {
    const { container } = render(<ZodiacWheel />)
    const animated = [...container.querySelectorAll('[class*="animate-"]')]
    expect(animated.length).toBeGreaterThan(0)
    for (const el of animated) {
      const classes = el.getAttribute('class') ?? ''
      expect(
        classes.split(' ').filter((c) => c.includes('animate-') && !c.startsWith('motion-safe:')),
      ).toEqual([])
    }
  })
})

describe('SectorWheel', () => {
  it('lists all seven planets with sectors and carries the SEBI disclaimer', () => {
    render(<SectorWheel />)
    expect(screen.getAllByRole('listitem')).toHaveLength(7)
    expect(screen.getByText('Banking · Gold')).toBeTruthy()
    expect(
      screen.getByText(
        'Not investment advice — EOPAR does not give buy, sell or hold recommendations.',
      ),
    ).toBeTruthy()
  })
})

describe('PanchangCard', () => {
  it('shows a visible Sample label by default', () => {
    render(<PanchangCard />)
    expect(screen.getByText('Sample')).toBeTruthy()
    expect(screen.getByRole('region', { name: /sample data/ })).toBeTruthy()
  })

  it('drops the label only when data is live', () => {
    render(<PanchangCard sample={false} />)
    expect(screen.queryByText('Sample')).toBeNull()
  })
})

describe('Stepper', () => {
  it('marks the current step for assistive tech', () => {
    const { container } = render(<Stepper current={3} />)
    expect(screen.getByText('Step 3 of 9 · Scope')).toBeTruthy()
    const current = container.querySelector('[aria-current="step"]')
    expect(current?.textContent).toContain('Step 3: Scope (current step)')
    expect(container.querySelectorAll('li')).toHaveLength(9)
  })
})

describe('form fields', () => {
  it('wires label, help and error to the input', () => {
    render(<TextField label="Email" help="We reply here." error="Enter a valid email" required />)
    const input = screen.getByLabelText(/Email/)
    expect(input.getAttribute('aria-invalid')).toBe('true')
    expect(input.hasAttribute('required')).toBe(true)
    const describedBy = input.getAttribute('aria-describedby')!.split(' ')
    const texts = describedBy.map((id) => document.getElementById(id)?.textContent)
    expect(texts).toEqual(['We reply here.', 'Enter a valid email'])
  })

  it('announces errors through a polite live region that is always present', () => {
    const { container } = render(<TextField label="Name" />)
    expect(container.querySelector('[aria-live="polite"]')).toBeTruthy()
  })

  it('checkbox toggles by its label', () => {
    render(<Checkbox label="I agree" />)
    const box = screen.getByLabelText('I agree') as HTMLInputElement
    fireEvent.click(screen.getByText('I agree'))
    expect(box.checked).toBe(true)
  })
})

describe('Marquee', () => {
  it('hides the duplicate copy and offers a pause button', () => {
    render(
      <Marquee label="Today's sky">
        <span>Sun transit</span>
      </Marquee>,
    )
    const copies = screen.getAllByText('Sun transit', { ignore: false })
    expect(copies).toHaveLength(2)
    expect(copies[1]!.closest('[aria-hidden="true"]')).toBeTruthy()
    const pause = screen.getByRole('button', { name: "Pause Today's sky" })
    fireEvent.click(pause)
    expect(pause.getAttribute('aria-pressed')).toBe('true')
  })
})

describe('Eyebrow', () => {
  it('renders the numbered section label', () => {
    render(<Eyebrow number={1}>The EOPAR philosophy</Eyebrow>)
    expect(screen.getByText(/01/).textContent).toContain('01')
  })
})

describe('Header', () => {
  it('has six nav links and one consultation CTA, no separate Consultations link', () => {
    render(<Header current="/markets" />)
    const nav = screen.getAllByRole('navigation', { name: 'Main' })[0]!
    const links = within(nav).getAllByRole('link')
    expect(links.map((l) => l.textContent)).toEqual([
      'Predictive Arts',
      'Markets',
      'Learning',
      'Research',
      'Publications',
      'About',
    ])
    expect(within(nav).getByRole('link', { name: 'Markets' }).getAttribute('aria-current')).toBe(
      'page',
    )
    expect(screen.getAllByRole('link', { name: 'Request a consultation' })).toHaveLength(1)
  })

  it('opens and closes the mobile menu with the keyboard', () => {
    render(<Header />)
    const toggle = screen.getByRole('button', { name: 'Open menu' })
    fireEvent.click(toggle)
    expect(toggle.getAttribute('aria-expanded')).toBe('true')
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.getByRole('button', { name: 'Open menu' }).getAttribute('aria-expanded')).toBe(
      'false',
    )
  })
})
