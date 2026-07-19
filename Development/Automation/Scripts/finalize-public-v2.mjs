import { cp, mkdir, readFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '../../..')
const source = join(root, 'Development', 'Source', 'Main-App-v19', 'dist')
const target = join(root, 'Apps', 'Public-Web', 'v2')
try {
  await readFile(join(target, 'index.html'))
  throw new Error('Public Web v2 already exists; create v3 instead of overwriting the release')
} catch (error) {
  if (error.code !== 'ENOENT') throw error
}
await mkdir(target, { recursive: true })
await cp(source, target, { recursive: true })
