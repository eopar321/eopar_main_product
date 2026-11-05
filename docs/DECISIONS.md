# EOPAR — Decisions log

Each entry: what was decided, why, and whether it is easy to reverse. Newest last.

## Phase 0

### D-001 · Repository lives in the owner's OneDrive folder (2026-11-04)

Owner's choice: `C:\Users\hp\OneDrive\Desktop\Eopar`. Known risk: OneDrive syncing `node_modules` and
build output can cause file locks and slow builds. If that happens, pause OneDrive sync during development.
GitHub is the real backup.
Reversible: yes.

### D-002 · Node.js 24.22.2 LTS (2026-10-29)

Payload 3.92 requires Node ≥ 24.22.1. Node 26 became LTS on 2026-10-28; we stay on the mature 24 line
(supported to April 2028) until native deps (sharp, clamscan) are proven on 26. Pinned in `.nvmrc`.
On the owner's PC it is installed per-user at `%LOCALAPPDATA%\Programs\node\node-v24.22.2-win-x64`
(the system-wide Node 24.19 needs admin rights to upgrade).
Reversible: yes, small change.

### D-003 · pnpm 11.28.9, installed per-user via npm (2026-11-04)

Corepack could not write to `C:\Program Files` without admin rights. Payload's template declares support
for pnpm 9–11, so we use 11 rather than 12. Pinned in the root `packageManager` field.
Build scripts are allow-listed in `pnpm-workspace.yaml` (`allowBuilds`).
Reversible: yes.

### D-004 · PostgreSQL 18 everywhere (2026-11-04)

Local `postgres:18.6`; RDS PostgreSQL 18 is supported by CDK (`PostgresEngineVersion.VER_18`) with
minor-version auto-upgrade. Resolved.
Reversible: before production data exists, yes.

### D-005 · Design tokens taken from the brief, pending the design PDF (2026-10-29)

`/design/EOPAR-Website-Design.pdf`, `/design/brand/*` and `/docs/spec.md` were not yet supplied when Phase 0 began.
Colour and font tokens come from brief §5 and must be checked against the PDF when it arrives.
The wordmark is set in Cormorant Garamond until the logo files arrive.
Reversible: yes.

### D-006 · Local containers on host ports 5433 (Postgres) and 6380 (Redis) (2026-11-04)

A native Windows PostgreSQL already listens on 5432 and a WSL Redis on 6379 on the owner's machine.
The Docker containers map to `127.0.0.1:5433` and `127.0.0.1:6380`; `.env.example` uses these.
Production is unaffected.
Reversible: yes.

### D-007 · Dependency versions: newest stable, at least 7 days old (2026-11-04)

`minimumReleaseAge` (7 days) in `pnpm-workspace.yaml` refuses brand-new releases, the window in which
most npm supply-chain attacks are caught. Exceptions:

- TypeScript 6.0 (not 7): TS 7 is the new native compiler and the Next.js editor plugin does not support it yet.
- `aws-cdk` CLI 2.1146 (the `3.0.0` on npm is an old, incompatible release).
  GitHub Actions are pinned to commit SHAs; Dependabot proposes updates weekly.
  Reversible: yes.

### D-008 · RDS master password managed by AWS Secrets Manager — NEEDS OWNER APPROVAL (2026-11-04)

The brief allows only EC2 and RDS. The safest way to create the database admin password is
`Credentials.fromGeneratedSecret`, which stores it in Secrets Manager (≈ US$0.40/month). Alternatives
(password in the CloudFormation template or in code) would leak it. The app itself uses a separate
least-privilege user whose password lives in the root-only env file on the host.
Reversible: yes, before Phase 8.

### D-009 · Studio at `/studio`, Payload API at `/api/studio`, GraphQL off (2026-11-04)

Both share the `studio` prefix so one Cloudflare Access rule (`/studio*` + `/api/studio*`) protects them.
Custom public endpoints will live under `/api/v1/`. GraphQL and its playground are disabled (brief §9A A05).
Reversible: yes.

### D-010 · Schema changes only through committed migrations (2026-11-04)

Payload's dev-mode auto "push" is off; every schema change is a migration in `apps/web/src/migrations`.
CI applies migrations to a clean database and fails if generated types drift.
All IDs are UUIDs (`idType: 'uuid'`).
Reversible: no (by design).

### D-011 · EC2 host in a public subnet with zero inbound rules; no NAT gateway (2026-11-04)

A NAT gateway costs ≈ US$35/month and is a third AWS service. The host sits in a public subnet for
outbound internet (Cloudflare Tunnel, updates, email API) but its security group has no inbound rules,
so nothing can connect to it. RDS is in isolated subnets reachable only from the host's security group.
A CDK test fails the build if any inbound rule is added.
Reversible: yes.

### D-012 · Container images and Dockerfiles deferred to Phase 8 (2026-11-04)

Phase 0 CI covers lint, types, tests, migrations, type drift, CodeQL, gitleaks, pnpm audit, OSV-Scanner
and Trivy (filesystem/config). Multi-arch `web`/`worker` images, GHCR push, Trivy image scans, Playwright
and Lighthouse join the pipeline when there is something to ship.
Reversible: n/a.

### D-013 · Security overrides for transitive dependencies (2026-11-04)

`pnpm audit` found critical/high advisories in packages we do not depend on directly:

- `dompurify` 3.4.15 (via Payload UI → monaco-editor): overridden to patched 3.4.17 (patch release).
- `happy-dom` 20.14.6 (via `@lexical/headless` and vitest): overridden to patched 21.0.4. This is a major bump
  over what Lexical declares, but Payload never loads Lexical's happy-dom entry point and our tests run in
  `node`, so nothing executes it today. Re-check when Phase 2 adds rich-text fields.

Remaining: 2 moderate (dev-only esbuild in drizzle-kit, minimatch in ESLint) and 1 low — below the CI gate.
Remove the overrides once Payload ships patched versions (Dependabot will flag it).
Reversible: yes.

## Phase 1 — design system

Source: `design/EOPAR-Website-Design.pdf` (v5, 26 pages), measured with PyMuPDF (exact fills, strokes,
opacities and text sizes, converted to 1440 px design pixels). "CLAUDE.md section 5" in the Phase 1 request
refers to brief §5 — there is no CLAUDE.md in the repo.

### D-014 · Tokens compared with the PDF (2026-11-05)

| Token                                                           | Brief §5                            | PDF                                                                             | Decision                                           |
| --------------------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------- |
| Colours navy, black, gold, gold-soft, gold-light, bronze, ivory | as listed                           | identical hex values                                                            | unchanged                                          |
| `panel`                                                         | —                                   | `#060709` under the wheel, Kundli and Panchang                                  | **added**                                          |
| `stone`                                                         | `#E9E2D5`                           | not used anywhere (spec says `#D9D1C3`)                                         | kept brief value; owner to confirm                 |
| Display type                                                    | "Cormorant Garamond"                | 84 / 60 / 44–48 / 36 / 24 px                                                    | fluid `display-xl…xs` scale from these sizes       |
| Body type                                                       | "Manrope"                           | lead 17–19, body 15–17, small 14, caption 13 px                                 | `lead/body/small/caption` tokens                   |
| Eyebrow                                                         | 12–13 px, 0.3em                     | 11–13 px, ~0.3em                                                                | 12 px, 0.3em                                       |
| Layout                                                          | —                                   | content 1200 px, gutter 120 px, header 87 px                                    | `container-content`, `gutter`, `header`            |
| Card rules                                                      | "border + inset outline"            | outer gold 22 %, inner 10 %, 8 px inset; panels 40 % / 12 %, 6 px               | `frame-double`, `frame-double-strong`              |
| Buttons                                                         | "gold pill with soft glow; outline" | gold 259×55 with gold-soft glow; ivory 50 % outline; gold outline with 6 % fill | `gold`, `outline`, `outline-gold`, `navy` variants |

The spec's fixed scale (12/14/16/18/24/32/48/64/88) is replaced by the PDF's measured sizes because the
PDF is the visual source of truth. In Tailwind v4 the `@theme` block in `apps/web/src/styles/tokens.css`
_is_ the Tailwind config (there is no `tailwind.config.js`).
Reversible: yes.

### D-015 · Main navigation order — OWNER TO CONFIRM (2026-11-05)

The homepage (PDF p.4) shows _Predictive Arts · Learning · Research · Publications · Markets · About_; every
inner page (pp.16–26) and the brief show _Predictive Arts · Markets · Learning · Research · Publications · About_.
Built with the inner-page/brief order (one constant, `MAIN_NAV` in `packages/shared`).
Reversible: yes, one line.

### D-016 · Input borders at 40 % instead of the PDF's 30 % (2026-11-05)

WCAG 2.2 SC 1.4.11 needs 3:1 for the boundary of a form control. Ivory at 30 % on navy is 2.5:1; at 40 % it is
3.5:1. Decorative card rules stay at the PDF values (they are not controls).
Reversible: yes, but would fail AA.

### D-017 · Error colour `#F0A699` added (2026-11-05)

The PDF has no error state. A soft coral that sits with the palette: 9.3:1 on navy, 10.1:1 on black.
Reversible: yes.

### D-018 · Select and file upload designed in the PDF's language (2026-11-05)

Neither appears in the PDF. Select = native `<select>` styled like the text inputs with a gold chevron.
File upload = dashed drop zone with a "Choose a file" link; the real file input stays keyboard- and
screen-reader-operable and also accepts dropped files.
Reversible: yes. **Owner review requested.**

### D-019 · Gold text only on dark; bronze on ivory (2026-11-05)

Gold on ivory is 1.9:1 (fails). The PDF already uses bronze on ivory sections (5.3:1); components take a
`tone="light"` prop that switches to bronze. Gold on navy is 8.2:1, so gold text passes at every size on dark
(the spec's "18 px+ only" rule is stricter than needed and not enforced).
Reversible: n/a.

### D-020 · Marquees get a pause button (2026-11-05)

Sky ticker and zodiac band move for more than 5 seconds, so WCAG 2.2.2 requires a way to pause them. A small
pause/play button sits at the right end (not in the PDF); movement also pauses on hover and keyboard focus, and
stops entirely under reduced motion, where the band becomes a focusable scrollable row.
Reversible: no (AA requirement).

### D-021 · "Sample" label more visible than in the PDF (2026-11-05)

The PDF writes SAMPLE in faint grey. Brief §14 says sample Panchang data must never look live, so it is a small
outlined badge, and the card's accessible name says "sample data".
Reversible: yes.

### D-022 · Sample graha positions: Rahu and Ketu exactly opposite (2026-11-05)

In the PDF wheel the nodes are placed decoratively. Astrologers will notice if Rahu and Ketu are not 180° apart,
so the sample positions keep them opposite. Positions are a prop; live data replaces them later.
Reversible: yes.

### D-023 · Glyph font: Noto Sans Symbols, self-hosted (2026-11-05)

Manrope and Cormorant have no zodiac/planet glyphs. Noto Sans Symbols (via next/font) draws them the same on
every device; each glyph also carries U+FE0E. The Storybook check fails if any glyph in the DOM lacks U+FE0E.
Reversible: yes.

### D-024 · Rotation is very slow (2026-11-05)

The spec bans "spinning zodiac wheels"; the brief asks for slow rotation at different speeds. Rings turn once
every 10, 12 and 15 minutes (barely perceptible), the spark orbits every 24 s, the halo breathes every 7 s.
All motion is CSS behind `motion-safe:` and stops under prefers-reduced-motion (verified in the check script).
Reversible: yes, token values.

### D-025 · Celestial O = PNG + SVG arcs until the SVG master arrives (2026-11-05)

All logo use goes through `BRAND_ASSETS` (`apps/web/src/components/brand/assets.ts`). When the SVG master
arrives, point the entries at the `.svg` files and move the arc paths into `CelestialO`.
Reversible: yes.

## Upgrade paths (documented, not built)

- **Second server:** add a second EC2 host and Cloudflare Load Balancing when traffic or uptime needs it (brief §12A).

## Open questions for the owner

- Email provider: Postmark (recommended for simplicity/deliverability) or Amazon SES. Needed by Phase 4.
- GitHub account / repository for CI and the container registry.
- Approve D-008 (Secrets Manager for the RDS admin password) before Phase 8.
- Confirm the main navigation order (D-015) and the `stone` colour (D-014).
- Review the select and file-upload designs, which are not in the PDF (D-018).
