import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const source = path => readFile(new URL(path, import.meta.url), 'utf8')

test('undercover is integrated as the fourth V47 experience', async () => {
  const [app, home, menu, component, css] = await Promise.all([
    source('../app/encounter/App.tsx'),
    source('../app/encounter/components/ModeHome.tsx'),
    source('../app/encounter/components/SurfaceMenu.tsx'),
    source('../app/encounter/components/WhoIsUndercover.tsx'),
    source('../app/encounter/styles/who-is-undercover.css'),
  ])
  assert.match(app, /undercover/)
  assert.match(app, /<WhoIsUndercover/)
  assert.match(home, /誰是臥底/)
  assert.match(home, /WHO IS THE UNDERCOVER/)
  assert.match(menu, /誰是臥底/)
  assert.match(component, /建立房間/)
  assert.match(component, /加入房間/)
  assert.match(component, /QRCode/)
  assert.match(css, /undercover-canvas/)
  assert.match(css, /@media\s+\(prefers-reduced-motion:\s*reduce\)/)
})

test('multiplayer adapter uses anonymous Firebase auth and private player paths', async () => {
  const adapter = await source('../app/undercover/firebase.ts')
  assert.match(adapter, /signInAnonymously/)
  assert.match(adapter, /onValue/)
  assert.match(adapter, /runTransaction/)
  assert.match(adapter, /undercoverPrivate/)
  assert.match(adapter, /undercoverRooms/)
  assert.doesNotMatch(adapter, /name|contact|birthday|answerText|note|upload|analytics|telemetry/i)
})

test('database rules isolate private assignments and preserve root denial', async () => {
  const rules = JSON.parse(await source('../database.rules.json')).rules
  assert.equal(rules['.read'], false)
  assert.equal(rules['.write'], false)
  assert.ok(rules.rooms)
  assert.ok(rules.letsTalkRooms)
  assert.match(rules.undercoverPrivate.$code.$uid['.read'], /auth\.uid === \$uid/)
  assert.match(rules.undercoverPrivate.$code.$uid['.write'], /hostUid/)
  assert.match(rules.undercoverRooms.$code['.read'], /members.*auth\.uid/)
})

test('QR codes are generated locally and invitations deep-link by room code', async () => {
  const [component, packageJson] = await Promise.all([
    source('../app/encounter/components/WhoIsUndercover.tsx'),
    source('../package.json'),
  ])
  assert.match(component, /QRCode\.toDataURL/)
  assert.match(component, /undercoverRoom/)
  assert.equal(JSON.parse(packageJson).dependencies.qrcode.length > 0, true)
  assert.doesNotMatch(component, /api\.qrserver|chart\.googleapis|fetch\([^)]*qr/i)
})

test('public room and adapter contracts exclude owner-sensitive fields', async () => {
  const [types, engine, adapter] = await Promise.all([
    source('../app/undercover/types.ts'),
    source('../app/undercover/engine.ts'),
    source('../app/undercover/firebase.ts'),
  ])
  const forbidden = /name|contact|birthday|answer|note|customQuestion|upload/i
  assert.doesNotMatch(`${types}\n${engine}\n${adapter}`, forbidden)
})
