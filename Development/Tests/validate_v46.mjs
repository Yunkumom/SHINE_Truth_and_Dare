import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { access, readFile, readdir } from 'node:fs/promises'
import { join, relative, resolve, sep } from 'node:path'

const repositoryRoot = resolve(import.meta.dirname, '..', '..')
const sourceRoot = join(repositoryRoot, 'Development', 'Source', 'Main-App-v46')
const archiveRoot = join(repositoryRoot, '_pending', 'SHINE_Truth_and_Dare_v46_GitHub_Lite_2026-08-16')
const recordedFullArchiveDigest = '673a023f20c9ac2a8c7084a216937a71f256379d68d8ec883f87bef74e40f480'
const expectedSafeArchiveDigest = 'ab52245e009b1d95ebd5a9eb3c136596082dbc4fd60a00d316c7913e074b7c92'

async function exists(path) {
  try {
    await access(path)
    return true
  } catch {
    return false
  }
}

async function text(relativePath) {
  return readFile(join(sourceRoot, relativePath), 'utf8')
}

async function collectFiles(root, extension) {
  const files = []
  async function visit(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = join(directory, entry.name)
      if (entry.isDirectory()) await visit(path)
      else if (!extension || entry.name.endsWith(extension)) files.push(path)
    }
  }
  await visit(root)
  return files
}

async function inventoryDigest(root) {
  const files = (await collectFiles(root)).filter((path) => {
    const relativePath = relative(root, path).split(sep).join('/')
    return relativePath !== '.npmrc' && !relativePath.startsWith('.openai/')
  })
  const records = []
  for (const path of files.sort()) {
    const fileDigest = createHash('sha256').update(await readFile(path)).digest('hex')
    const relativePath = relative(root, path).split(sep).join('/')
    records.push(`${fileDigest}  SHINE_Truth_and_Dare_v46_GitHub_Lite/${relativePath}\n`)
  }
  return createHash('sha256').update(records.join('')).digest('hex')
}

async function validate() {
  assert.equal(await exists(sourceRoot), true, `Missing canonical v46 source: ${sourceRoot}`)
  assert.equal(await exists(archiveRoot), true, `Missing preserved v46 intake: ${archiveRoot}`)
  assert.equal(await inventoryDigest(archiveRoot), expectedSafeArchiveDigest, 'Trackable preserved v46 intake differs from the received package')

  const packageDocument = JSON.parse(await text('package.json'))
  assert.equal(packageDocument.name, 'encounter-cards-v46')
  assert.equal(packageDocument.version, '46.0.0')
  assert.equal(packageDocument.displayName, 'Encounter Cards V46')
  assert.equal('drizzle-orm' in (packageDocument.dependencies ?? {}), false)
  assert.equal('drizzle-kit' in (packageDocument.devDependencies ?? {}), false)
  assert.equal('db:generate' in (packageDocument.scripts ?? {}), false)

  const hosting = JSON.parse(await text('.openai/hosting.json'))
  assert.equal(hosting.d1, null)
  assert.equal(hosting.r2, null)

  const rootPage = await text('app/page.tsx')
  const mobilePage = await text('app/mobile/page.tsx')
  const studioPage = await text('app/studio/page.tsx')
  const layout = await text('app/layout.tsx')
  const encounterApp = await text('app/encounter/App.tsx')
  const preferences = await text('app/encounter/lib/preferences.ts')
  const layoutModel = await text('app/encounter/layout/layout-model.ts')
  const presentationModel = await text('app/encounter/presentation/presentation-model.ts')
  const share = await text('app/encounter/lib/share.ts')
  const directKeepsake = await text('app/encounter/lib/direct-keepsake.ts')

  assert.match(rootPage, /ENCOUNTER CARDS · V46/)
  assert.match(mobilePage, /src="\/v46\/index\.html\?surface=mobile"/)
  assert.match(studioPage, /DESKTOP STUDIO · V46/)
  assert.match(studioPage, /src="\/v46\/index\.html\?surface=studio"/)
  assert.doesNotMatch(layout, /codex-preview/)
  assert.match(encounterApp, /ENCOUNTER CARDS · V46/)
  assert.match(layoutModel, /encounter-layout-v46/)
  assert.match(presentationModel, /encounter-presentation-v46/)
  assert.match(share, /encounter-card-V46-/)
  assert.match(directKeepsake, /keepsake-card-V46-/)
  assert.doesNotMatch(preferences, /name|contact|birthday|answer/i)

  const forbiddenActivePaths = [
    'app/chatgpt-auth.ts',
    'db',
    'examples/d1',
    'drizzle',
    'drizzle.config.ts',
  ]
  for (const path of forbiddenActivePaths) {
    assert.equal(await exists(join(sourceRoot, path)), false, `Inactive backend/account capability remains active: ${path}`)
  }

  const deityFiles = await collectFiles(join(sourceRoot, 'app', 'encounter', 'assets', 'deities'), '.webp')
  const zodiacFiles = await collectFiles(join(sourceRoot, 'app', 'encounter', 'assets', 'zodiac', 'taiwan'), '.webp')
  assert.equal(deityFiles.length, 18)
  assert.equal(zodiacFiles.length, 24)

  const questionBook = await text('app/encounter/data/shine-question-book.ts')
  assert.equal(questionBook.match(/\bnumber: \d+/g)?.length, 62)

  const publicIndex = await text('public/v46/index.html')
  const manifest = JSON.parse(await text('public/v46/manifest.webmanifest'))
  const serviceWorker = await text('public/v46/service-worker.js')
  assert.match(publicIndex, /Encounter Cards V46/)
  assert.match(manifest.name, /v46/i)
  assert.match(serviceWorker, /encounter-cards-v46/)
  assert.doesNotMatch(serviceWorker, /\/\*__PRECACHE__\*\//)

  const launcher = await readFile(join(repositoryRoot, 'Open Truth and Dare.cmd'), 'utf8')
  assert.match(launcher, /Development\\Source\\Main-App-v46/)
  assert.match(launcher, /npm run build:encounter/)
  assert.match(launcher, /127\.0\.0\.1:8765/)

  const firebase = JSON.parse(await readFile(join(repositoryRoot, 'firebase.json'), 'utf8'))
  const firebaserc = JSON.parse(await readFile(join(repositoryRoot, '.firebaserc'), 'utf8'))
  const firebaseTargets = Object.fromEntries(firebase.hosting.map((entry) => [entry.target, entry]))
  assert.equal(firebaseTargets.sandbox.public, 'Development/Source/Main-App-v46/public/v46')
  assert.equal(firebaseTargets.share.public, 'Development/Source/Main-App-v46/public/v46')
  assert.equal(firebaserc.projects.sandbox, 'shine-sandbox-lab')
  assert.equal(firebaserc.projects.share, 'shine-share-lab')
  assert.deepEqual(firebaserc.targets['shine-sandbox-lab'].hosting.sandbox, ['shine-truth-or-dare-dev'])
  assert.deepEqual(firebaserc.targets['shine-share-lab'].hosting.share, ['shine-truth-or-dare-share'])

  console.log('validate_v46: PASS')
  console.log(`recorded full intake SHA-256: ${recordedFullArchiveDigest}`)
  console.log(`verified non-sensitive intake SHA-256: ${expectedSafeArchiveDigest}`)
  console.log(`artworks: ${deityFiles.length + zodiacFiles.length}`)
  console.log('SHINE question-book records: 62')
}

validate().catch((error) => {
  console.error(`validate_v46: FAIL\n${error.stack ?? error}`)
  process.exitCode = 1
})
