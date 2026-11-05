/**
 * Visits every Storybook story and, for each one:
 *  1. runs axe (WCAG 2.0/2.1/2.2 A + AA) — fails on serious/critical violations
 *  2. checks every zodiac/planet glyph in the DOM carries U+FE0E (never emoji)
 *  3. checks nothing is animating under prefers-reduced-motion
 *  4. saves full-page screenshots at 1440, 1366×768 and 390 px
 *
 * Usage: start Storybook (pnpm storybook), then `pnpm storybook:check`.
 *   SB_URL=http://localhost:6006  SHOTS=0 to skip screenshots
 */
import { AxeBuilder } from '@axe-core/playwright'
import { chromium } from '@playwright/test'
import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const SB_URL = process.env.SB_URL ?? 'http://localhost:6006'
const TAKE_SHOTS = process.env.SHOTS !== '0'
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const SHOT_DIR = path.join(ROOT, 'docs/screenshots/phase-1')

const VIEWPORTS = [
  { name: '1440', width: 1440, height: 900 },
  { name: '1366x768', width: 1366, height: 768 },
  { name: '390', width: 390, height: 844 },
]

const index = await (await fetch(`${SB_URL}/index.json`)).json()
const stories = Object.values(index.entries).filter((entry) => entry.type === 'story')
if (TAKE_SHOTS) await mkdir(SHOT_DIR, { recursive: true })

const browser = await chromium.launch()
const failures = []
const notes = []

async function openStory(context, id) {
  const page = await context.newPage()
  // 'load', not 'networkidle': the dev server keeps an HMR socket open
  await page.goto(`${SB_URL}/iframe.html?id=${id}&viewMode=story`, { waitUntil: 'load' })
  await page.waitForSelector('#storybook-root > *', { timeout: 30_000 })
  await page.evaluate(() => document.fonts.ready)
  // let play functions (e.g. open the mobile menu) finish
  await page.waitForTimeout(400)
  return page
}

for (const story of stories) {
  const label = `${story.title} › ${story.name}`

  // Reduced motion: resting state, used for axe, glyph check and screenshots (deterministic)
  for (const viewport of TAKE_SHOTS ? VIEWPORTS : VIEWPORTS.slice(0, 1)) {
    const context = await browser.newContext({
      viewport: { width: viewport.width, height: viewport.height },
      reducedMotion: 'reduce',
      deviceScaleFactor: 1,
    })
    const page = await openStory(context, story.id)

    if (viewport.name === '1440') {
      const axe = await new AxeBuilder({ page })
        .include('#storybook-root')
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze()
      for (const v of axe.violations) {
        const line = `${label}: [${v.impact}] ${v.id} — ${v.help} (${v.nodes.length} node(s))`
        if (v.impact === 'serious' || v.impact === 'critical') failures.push(line)
        else notes.push(line)
      }

      const badGlyphs = await page.evaluate(() => {
        const walker = document.createTreeWalker(
          document.getElementById('storybook-root'),
          NodeFilter.SHOW_TEXT,
        )
        const bad = []
        for (let node = walker.nextNode(); node; node = walker.nextNode()) {
          const text = node.textContent ?? ''
          const matches = text.match(/[☉☊☋☽☿♀♂-♓✦](?!︎)/g)
          if (matches) bad.push(...matches)
        }
        return bad
      })
      if (badGlyphs.length)
        failures.push(`${label}: glyphs without U+FE0E: ${[...new Set(badGlyphs)].join(' ')}`)

      const running = await page.evaluate(
        () => document.getAnimations().filter((a) => a.playState === 'running').length,
      )
      if (running > 0)
        failures.push(`${label}: ${running} animation(s) still running under reduced motion`)
    }

    if (TAKE_SHOTS) {
      await page.screenshot({
        path: path.join(SHOT_DIR, `${story.id}--${viewport.name}.png`),
        fullPage: true,
      })
    }
    await context.close()
  }
  process.stdout.write('.')
}

// Motion sanity check: the celestial stories really do animate when motion is allowed
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await openStory(context, 'celestial-zodiac-wheel--wheel')
  const running = await page.evaluate(() => document.getAnimations().length)
  if (running === 0) failures.push('Zodiac wheel: no animations running with motion allowed')
  else
    notes.push(
      `Zodiac wheel runs ${running} CSS animations with motion allowed, 0 under reduced motion`,
    )
  await context.close()
}

await browser.close()

const report = [
  `Storybook check — ${new Date().toISOString()}`,
  `${stories.length} stories × ${VIEWPORTS.length} viewports`,
  '',
  `Serious/critical problems: ${failures.length}`,
  ...failures.map((f) => `  ✗ ${f}`),
  '',
  `Notes (moderate/minor, info): ${notes.length}`,
  ...notes.map((n) => `  · ${n}`),
].join('\n')

console.log(`\n${report}`)
if (TAKE_SHOTS) await writeFile(path.join(SHOT_DIR, 'REPORT.txt'), report + '\n')
process.exit(failures.length ? 1 : 0)
