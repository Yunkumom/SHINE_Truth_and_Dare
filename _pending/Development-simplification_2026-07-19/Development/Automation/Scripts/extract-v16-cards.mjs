import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { createHash } from 'node:crypto'
import { dirname, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '../../..')
const sourcePath = resolve(root, 'Apps/Standalone/v16-assets/page-B3j9dtoA.js')
const outputPath = resolve(root, 'Development/Source/Public-Web/v1/src/data/original-cards.generated.json')
const source = await readFile(sourcePath, 'utf8')
const pattern = /\{id:`(L[1-5]-\d{2})`,kind:`(truth|dare)`,titleZh:`([^`]*)`,titleEn:`([^`]*)`,questionZh:`([^`]*)`,questionEn:`([^`]*)`,blessingZh:`([^`]*)`,blessingEn:`([^`]*)`,image:`([^`]*)`/g
const cards = []
for (const match of source.matchAll(pattern)) {
  const [, id, kind, titleZh, titleEn, questionZh, questionEn, blessingZh, blessingEn, image] = match
  cards.push({ id, level: Number(id[1]), mode: kind, titleZh, titleEn, questionZh, questionEn, blessingZh, blessingEn, image })
}
if (cards.length !== 12) throw new Error(`Expected 12 complete v16 mythic cards, found ${cards.length}`)
await mkdir(dirname(outputPath), { recursive: true })
await writeFile(outputPath, `${JSON.stringify({ sourceSha256: createHash('sha256').update(source).digest('hex').toUpperCase(), cards }, null, 2)}\n`)
console.log(`Extracted ${cards.length} cards without executing v16.`)
