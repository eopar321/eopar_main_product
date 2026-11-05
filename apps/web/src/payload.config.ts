import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export default buildConfig({
  serverURL: siteUrl,
  routes: {
    // Studio and its API share the /…studio prefix so one Cloudflare Access rule covers both (brief §9)
    admin: '/studio',
    api: '/api/studio',
  },
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' — EOPAR Studio',
      robots: 'noindex, nofollow',
    },
  },
  collections: [Users, Media],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  // Same-origin only (brief §9A A05, CSRF)
  cors: [siteUrl],
  csrf: [siteUrl],
  graphQL: {
    disable: true,
  },
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    idType: 'uuid',
    // Schema changes go through committed migrations only — never auto-push
    push: false,
    migrationDir: path.resolve(dirname, 'migrations'),
    pool: {
      connectionString: process.env.DATABASE_URL || '',
      // Small pool: RDS is a burstable instance (brief §12A)
      max: 10,
    },
  }),
  sharp,
  plugins: [],
})
