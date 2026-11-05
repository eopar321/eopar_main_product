# EOPAR — Progress

| Phase             | Status                                                                   | Branch    |
| ----------------- | ------------------------------------------------------------------------ | --------- |
| 0 · Setup         | Done (committed on `main`); CI not yet run on GitHub — no repository yet | `main`    |
| 1 · Design system | **Built, awaiting owner approval**                                       | `phase-1` |
| 2 · Backend core  | Not started                                                              | —         |
| 3 – 8             | Not started                                                              | —         |

## Phase 1 — design system (2026-11-05)

**Open Storybook:** `pnpm --filter @eopar/web storybook` → http://localhost:6006

### Built

- **Tokens** — colours, type scale (fluid `clamp()`), layout, radii, glows and motion, measured from the
  design PDF. CSS variables + Tailwind v4 `@theme` in `apps/web/src/styles/tokens.css`. Fonts self-hosted with
  `next/font`: Cormorant Garamond, Manrope, Noto Sans Symbols (glyphs).
- **UI** (`apps/web/src/components/ui`) — Button (gold pill with glow, ivory outline, gold outline, navy),
  TextLink (→), double-rule Card (default / strong / dashed), ArtCard, GlyphCircle (ring / node), Chip, Tag,
  Badge (coming soon / suggested / recommended / sample), Eyebrow ("01 — …"), Breadcrumb, Stepper (9 glowing
  segments), PanchangCard (visible "Sample"), Marquee, SkyTicker, ZodiacBand (Mesha → Meena).
- **Sections** — Header (logo, six links, one REQUEST A CONSULTATION button, mobile menu with Escape/focus
  handling) and Footer (desktop columns, mobile short list, newsletter, legal placeholders).
- **Forms** — text, textarea, select, date, time, checkbox, radio card, checkbox card, file upload; each with
  label, help text and a polite live error region.
- **Celestial** (pure React SVG, props-driven) — ZodiacWheel (12 signs, 5° ticks, 27-nakshatra/108-pada ring,
  9 grahas, optional kundli centre or custom centre, breathing halo, orbiting spark, size), KundliChart (North
  Indian, a slot per house, optional rashi numbers, screen-reader description), SectorWheel (7 planets ↔
  sectors with the SEBI line), CelestialO (logo PNG + animatable SVG arcs), OrbitDecor (corner orbits).
- **Storybook** — 65 stories, including Foundations (colours, type, spacing, motion) and
  **Review › PDF comparison** (header, hero wheel, art card, Panchang card and Sector Wheel beside PDF crops).

### Checks

| Check                                                       | Result                                                            |
| ----------------------------------------------------------- | ----------------------------------------------------------------- |
| axe (WCAG 2.0/2.1/2.2 A+AA) on every story                  | see `docs/screenshots/phase-1/REPORT.txt`                         |
| Every zodiac/planet glyph carries U+FE0E                    | checked on every story in the DOM + unit test on the data         |
| Nothing animates under `prefers-reduced-motion`             | checked on every story (`document.getAnimations()`)               |
| Screenshots at 1440, 1366×768, 390                          | `docs/screenshots/phase-1/`                                       |
| Lint, type-check, unit tests, `next build`, Storybook build | pass locally                                                      |
| CI on GitHub                                                | not run — no GitHub repository yet (owner chose to skip the push) |

### Not yet matching the PDF

See `docs/DECISIONS.md` D-014 → D-025 for the reasoning behind each.

- Navigation order follows the inner pages/brief, not the homepage drawing (D-015).
- Input borders are slightly brighter than drawn (accessibility, D-016).
- Marquees have a small pause button that the PDF doesn't show (accessibility, D-020).
- "Sample" badge is more visible than the PDF's faint label (D-021).
- Select and file upload are not in the PDF — designed to match (D-018).
- Celestial O uses the logo PNG; arcs around it are SVG until the SVG master arrives (D-025).
- Sample graha positions differ from the drawing (Rahu/Ketu kept opposite, D-022).
- Page-level composition (hero layout, Panchang overlapping the wheel, section spacing) is Phase 3 work.
