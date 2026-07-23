import { createHash } from 'node:crypto'
import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../../Source/Main-App-v24/dist/', import.meta.url))
async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []
  for (const entry of entries) files.push(...(entry.isDirectory() ? await walk(join(directory, entry.name)) : [join(directory, entry.name)]))
  return files
}
const files = (await walk(root)).filter(file => !file.endsWith('service-worker.js')).sort()
const urls = files.map(file => `./${relative(root, file).replaceAll('\\', '/')}`)
if (!urls.includes('./index.html')) throw new Error('PWA build is missing index.html')
const hash = createHash('sha256').update(urls.join('\n')).digest('hex').slice(0, 12)
const workerPath = join(root, 'service-worker.js')
let worker = await readFile(workerPath, 'utf8')
worker = worker.replace('__BUILD_HASH__', hash).replace("/*__PRECACHE__*/ ['./', './index.html', './manifest.webmanifest']", JSON.stringify(['./', ...urls]))
await writeFile(workerPath, worker, 'utf8')
