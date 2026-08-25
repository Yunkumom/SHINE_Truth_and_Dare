import { execFile } from 'node:child_process'
import { isDeepStrictEqual } from 'node:util'
import { readFile } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)
const REQUIRED_NAMESPACES = ['undercoverRooms', 'undercoverPrivate']

export function assertUndercoverRulesMatch(deployedDocument, canonicalDocument) {
  const deployed = deployedDocument?.rules
  const canonical = canonicalDocument?.rules
  if (!deployed || !canonical) throw new Error('Firebase rules document is invalid')

  for (const namespace of REQUIRED_NAMESPACES) {
    if (!deployed[namespace]) throw new Error(`deployed rules missing ${namespace}`)
    if (!isDeepStrictEqual(deployed[namespace], canonical[namespace])) {
      throw new Error(`deployed ${namespace} rules differ from the canonical V47 rules`)
    }
  }
}

async function main() {
  const projectFlag = process.argv.indexOf('--project')
  const project = projectFlag >= 0 ? process.argv[projectFlag + 1] : ''
  if (!project) throw new Error('Usage: node scripts/verify-live-undercover-rules.mjs --project <firebase-project>')

  const canonicalUrl = new URL('../database.rules.json', import.meta.url)
  const canonical = JSON.parse(await readFile(canonicalUrl, 'utf8'))
  const { stdout } = await execFileAsync(
    'firebase',
    ['database:get', '/.settings/rules', '--project', project],
    { maxBuffer: 4 * 1024 * 1024 },
  )
  assertUndercoverRulesMatch(JSON.parse(stdout), canonical)
  console.log(`Verified deployed Undercover rules in ${project}.`)
}

const invokedPath = process.argv[1] ? pathToFileURL(fileURLToPath(pathToFileURL(process.argv[1]))).href : ''
if (import.meta.url === invokedPath) {
  main().catch(error => {
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
  })
}
