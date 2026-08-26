import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const source = path => readFile(new URL(path, import.meta.url), 'utf8')
const binary = path => readFile(new URL(path, import.meta.url))

test('completed Australia Find It rounds can become a bilingual keepsake postcard', async () => {
  const [game, postcard, css] = await Promise.all([
    source('../app/encounter/components/AustraliaFindIt.tsx'),
    source('../app/encounter/components/KeepsakePostcard.tsx'),
    source('../app/encounter/styles/keepsake-postcard.css'),
  ])

  assert.match(game, /<KeepsakePostcard/)
  assert.match(game, /製作紀念明信片.*MAKE POSTCARD/s)
  assert.match(postcard, /正面.*FRONT/s)
  assert.match(postcard, /背面.*BACK/s)
  assert.match(postcard, /收件人.*TO/s)
  assert.match(postcard, /想送出去的話.*MESSAGE/s)
  assert.match(postcard, /下載／分享雙面明信片.*SHARE BOTH SIDES/s)
  assert.match(postcard, /createElectronicPostcardFiles/)
  assert.match(postcard, /yunkumom-logo-transparent-v1\.png/)
  assert.match(css, /aspect-ratio:\s*3\s*\/\s*2/)
})

test('the generic exporter creates separate branded front and back files without remote state', async () => {
  const exporter = await source('../app/encounter/lib/electronic-postcard.ts')
  assert.match(exporter, /POSTCARD_CANVAS[\s\S]*1800[\s\S]*1200/)
  assert.match(exporter, /createElectronicPostcardFiles/)
  assert.match(exporter, /yunkumom-postcard-[^`]*-front\.png/)
  assert.match(exporter, /yunkumom-postcard-[^`]*-back\.png/)
  assert.match(exporter, /files:\s*\[front,\s*back\]/)
  assert.doesNotMatch(exporter, /localStorage|sessionStorage|indexedDB|firebase|fetch\(|XMLHttpRequest|analytics|telemetry/i)
})

test('the exact owner logo is retained in Library and the transparent runtime derivative matches it', async () => {
  const [ownerSource, transparent, runtime, readme] = await Promise.all([
    binary('../../../Library/Brand/Yunkumom/yunkumom-owner-source-v1.png'),
    binary('../../../Library/Brand/Yunkumom/yunkumom-logo-transparent-v1.png'),
    binary('../app/encounter/assets/brand/yunkumom-logo-transparent-v1.png'),
    source('../../../Library/Brand/Yunkumom/README.md'),
  ])

  assert.ok(ownerSource.length > 100_000)
  assert.equal(transparent[25], 6, 'Library transparent PNG must use RGBA color type')
  assert.deepEqual(runtime, transparent)
  assert.match(readme, /owner-supplied source/i)
  assert.match(readme, /background-extraction/i)
  assert.match(readme, /keepsake.*postcard/is)
})

test('the Library standard makes every game image reusable as a gift output', async () => {
  const [standard, gallery] = await Promise.all([
    source('../../../Library/Card-Designs/YUNKUMOM_KEEPSAKE_OUTPUT_STANDARD.md'),
    source('../../../Library/index.html'),
  ])
  assert.match(standard, /Every game image starts with a keepsake purpose/i)
  assert.match(standard, /electronic postcard/i)
  assert.match(standard, /front.*back/is)
  assert.match(standard, /Yunkumom/i)
  assert.match(standard, /memory-only/i)
  assert.match(gallery, /YUNKUMOM_KEEPSAKE_OUTPUT_STANDARD\.md/)
  assert.match(gallery, /Brand\/Yunkumom\//)
})
