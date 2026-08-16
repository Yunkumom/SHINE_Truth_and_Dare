import { readFile, readdir, writeFile } from 'node:fs/promises'
import { join, relative, resolve, sep } from 'node:path'

const projectRoot = resolve(import.meta.dirname, '..')
const outputRoot = join(projectRoot, 'public', 'v46')
const workerPath = join(outputRoot, 'service-worker.js')

async function collectFiles(directory) {
  const files = []
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) files.push(...await collectFiles(path))
    else files.push(path)
  }
  return files
}

const files = await collectFiles(outputRoot)
const urls = [
  './',
  ...files
    .filter((path) => path !== workerPath)
    .map((path) => `./${relative(outputRoot, path).split(sep).join('/')}`)
    .sort(),
]

const worker = await readFile(workerPath, 'utf8')
const marker = /\/\*__PRECACHE__\*\/\s*\[[^\n]*\]/
if (!marker.test(worker)) throw new Error('service-worker precache marker is missing')
await writeFile(workerPath, worker.replace(marker, JSON.stringify(urls)), 'utf8')

console.log(`Finalized Encounter Cards v46 precache with ${urls.length} URLs.`)
