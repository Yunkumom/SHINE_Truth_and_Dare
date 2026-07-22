import { readFile, writeFile } from 'node:fs/promises'
import { join, resolve } from 'node:path'

const projectRoot = resolve(import.meta.dirname, '../../..')
const dist = join(projectRoot, 'Development', 'Source', 'Main-App-v23', 'dist')
const output = join(projectRoot, 'Apps', 'Standalone', 'encounter_cards_v23.html')
let html = await readFile(join(dist, 'index.html'), 'utf8')
const scriptMatch = html.match(/<script type="module" crossorigin src="\.\/(assets\/[^\"]+\.js)"><\/script>/)
const styleMatch = html.match(/<link rel="stylesheet" crossorigin href="\.\/(assets\/[^\"]+\.css)">/)
if (!scriptMatch || !styleMatch) throw new Error('Expected Vite JavaScript and CSS outputs were not found')
const script = await readFile(join(dist, scriptMatch[1]), 'utf8')
const style = await readFile(join(dist, styleMatch[1]), 'utf8')
const safeScript = script.replaceAll('</script', '<\\/script')
html = html.replace(scriptMatch[0], () => `<script type="module">${safeScript}</script>`).replace(styleMatch[0], () => `<style>${style}</style>`)
html = html.replace(/\s*<link rel="manifest"[^>]+>/, '').replace(/\s*<link rel="icon"[^>]+>/, '')
html = html.replace('</head>', '<meta name="encounter-release" content="V23"><!-- Standalone v23 embeds the layout editor, swipe deck, 18 deity artworks, hidden-Taiwan locators, contact-selectable keepsakes, and blessings. --></head>')
try {
  const existing = await readFile(output, 'utf8')
  if (existing !== html) throw new Error('A different standalone v23 already exists; create the next version instead of overwriting a release')
} catch (error) {
  if (error.code !== 'ENOENT') throw error
  await writeFile(output, html, 'utf8')
}
