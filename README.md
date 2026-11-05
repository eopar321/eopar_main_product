# EOPAR

**Essence of Predictive Arts & Research** — _Patterns. Possibilities. Direction._

Monorepo for the public website, EOPAR Studio (CMS + CRM) and background worker.

| Path              | What it is                                                              |
| ----------------- | ----------------------------------------------------------------------- |
| `apps/web`        | Next.js + Payload CMS. Public site, Studio at `/studio`, API routes     |
| `apps/worker`     | BullMQ background jobs (emails, reminders, upload scanning, retention)  |
| `packages/shared` | Code shared by web and worker: brand constants, validation, permissions |
| `infra`           | AWS CDK (EC2 + RDS in ap-south-1). Synth only until Phase 8             |
| `docs`            | Spec, decisions log, runbook, security matrix                           |
| `design`          | Design PDF and brand assets (source of truth for visuals)               |

## Run it locally

Needs: Node 24.22+ (see `.nvmrc`), pnpm 11, Docker Desktop running.

```bash
pnpm install
docker compose up -d                 # Postgres :5433, Redis :6380, Mailpit :8025, ClamAV :3310
cp apps/web/.env.example apps/web/.env       # then set PAYLOAD_SECRET
pnpm --filter @eopar/web migrate     # create database tables
pnpm dev                             # http://localhost:3000 and http://localhost:3000/studio
```

Test inbox for emails: http://localhost:8025

## Checks (same as CI)

```bash
pnpm format:check && pnpm lint && pnpm typecheck && pnpm test
pnpm --filter @eopar/infra synth
```

Decisions and their reasons are logged in [docs/DECISIONS.md](docs/DECISIONS.md).
