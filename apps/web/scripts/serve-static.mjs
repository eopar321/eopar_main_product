/**
 * Minimal static server for the built Storybook (CI runs storybook-check against it).
 * Usage: node scripts/serve-static.mjs storybook-static 6006
 */
import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import path from 'node:path'

const root = path.resolve(process.argv[2] ?? 'storybook-static')
const port = Number(process.argv[3] ?? 6006)

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
}

createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', 'http://localhost')
  const file = path.join(root, decodeURIComponent(url.pathname))
  // Stay inside the build directory
  if (file !== root && !file.startsWith(root + path.sep)) {
    res.writeHead(403).end()
    return
  }
  try {
    const info = await stat(file)
    const target = info.isDirectory() ? path.join(file, 'index.html') : file
    res.writeHead(200, {
      'Content-Type': TYPES[path.extname(target)] ?? 'application/octet-stream',
    })
    createReadStream(target).pipe(res)
  } catch {
    res.writeHead(404).end('Not found')
  }
}).listen(port, '127.0.0.1', () => console.log(`Serving ${root} on http://127.0.0.1:${port}`))
