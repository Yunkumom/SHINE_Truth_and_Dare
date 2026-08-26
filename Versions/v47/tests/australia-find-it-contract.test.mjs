import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const source = path => readFile(new URL(path, import.meta.url), 'utf8')

test('Australia Find It is wired as the fifth bilingual V47 experience', async () => {
  const [app, home, menu, component, css] = await Promise.all([
    source('../app/encounter/App.tsx'),
    source('../app/encounter/components/ModeHome.tsx'),
    source('../app/encounter/components/SurfaceMenu.tsx'),
    source('../app/encounter/components/AustraliaFindIt.tsx'),
    source('../app/encounter/styles/australia-find-it.css'),
  ])

  assert.match(app, /australia-find-it/)
  assert.match(app, /<AustraliaFindIt/)
  assert.match(home, /05[\s\S]*大家來找碴[\s\S]*AUSTRALIA FIND IT/)
  assert.match(menu, /大家來找碴[\s\S]*FIND IT/)
  assert.match(component, /混合[\s\S]*MIXED/)
  assert.match(component, /找地圖[\s\S]*HIDDEN MAP/)
  assert.match(component, /找不同[\s\S]*DIFFERENCES/)
  assert.match(component, /揭曉答案[\s\S]*REVEAL ANSWER/)
  assert.match(component, /找到了[\s\S]*FOUND IT/)
  assert.match(component, /60/)
  assert.match(css, /australia-find-it-canvas/)
  assert.match(css, /aspect-ratio:\s*63\s*\/\s*88/)
  assert.match(css, /@media\s+\(prefers-reduced-motion:\s*reduce\)/)
})

test('the registry contains fifty complete bilingual cards split evenly by mode', async () => {
  const { AUSTRALIA_FIND_IT_CARDS } = await import('../app/encounter/data/australia-find-it.ts')
  assert.equal(AUSTRALIA_FIND_IT_CARDS.length, 50)
  assert.equal(AUSTRALIA_FIND_IT_CARDS.filter(card => card.kind === 'hidden-map').length, 25)
  assert.equal(AUSTRALIA_FIND_IT_CARDS.filter(card => card.kind === 'spot-difference').length, 25)
  assert.equal(new Set(AUSTRALIA_FIND_IT_CARDS.map(card => card.id)).size, 50)
  assert.equal(new Set(AUSTRALIA_FIND_IT_CARDS.map(card => card.masterPath)).size, 50)
  assert.equal(new Set(AUSTRALIA_FIND_IT_CARDS.map(card => card.src)).size, 50)

  for (const card of AUSTRALIA_FIND_IT_CARDS) {
    assert.ok(card.title.en && card.title.zh)
    assert.ok(card.instruction.en && card.instruction.zh)
    assert.ok(card.answer.en && card.answer.zh)
    assert.match(card.masterPath, /^Library\/Images\//)
    assert.match(card.src, /australia-find-it-v1/)
    if (card.kind === 'spot-difference') assert.equal(card.differences.length, 5)
    else assert.equal(card.differences.length, 0)
  }
})

test('mode filtering and no-repeat drawing stay local and deterministic', async () => {
  const [{ AUSTRALIA_FIND_IT_CARDS }, game] = await Promise.all([
    import('../app/encounter/data/australia-find-it.ts'),
    import('../app/encounter/lib/australia-find-it-game.ts'),
  ])

  assert.equal(game.cardsForFindItMode(AUSTRALIA_FIND_IT_CARDS, 'mixed').length, 50)
  assert.equal(game.cardsForFindItMode(AUSTRALIA_FIND_IT_CARDS, 'hidden-map').length, 25)
  assert.equal(game.cardsForFindItMode(AUSTRALIA_FIND_IT_CARDS, 'spot-difference').length, 25)

  const first = game.drawFindItCard(AUSTRALIA_FIND_IT_CARDS, 'mixed', [], () => 0)
  const second = game.drawFindItCard(AUSTRALIA_FIND_IT_CARDS, 'mixed', [first.card.id], () => 0)
  assert.notEqual(first.card.id, second.card.id)
  assert.equal(second.resetHistory, false)

  const hiddenIds = game.cardsForFindItMode(AUSTRALIA_FIND_IT_CARDS, 'hidden-map').map(card => card.id)
  const cycled = game.drawFindItCard(AUSTRALIA_FIND_IT_CARDS, 'hidden-map', hiddenIds, () => 0)
  assert.equal(cycled.resetHistory, true)
  assert.equal(cycled.card.kind, 'hidden-map')
})

test('the Library owns the card book, prompts, and both visible master collections', async () => {
  const [book, prompts, gallery, readme] = await Promise.all([
    source('../../../Library/Games/Australia/AUSTRALIA_FIND_IT_CARD_BOOK.md'),
    source('../../../Library/Games/Australia/PROMPTS.md'),
    source('../../../Library/index.html'),
    source('../../../Library/Images/Games/Australia/find-it-v1/README.md'),
  ])

  assert.match(book, /50 cards · 50 張卡/)
  assert.match(prompts, /## 50 /)
  assert.match(gallery, /Australia Find It/)
  assert.match(gallery, /field-journal-embedded-map-v2/)
  assert.match(gallery, /Images\/Games\/Australia\/find-it-v1\/difference/)
  assert.match(readme, /Library masters[\s\S]*runtime derivatives/i)
})

test('the feature keeps play offline and excludes sensitive or remote state', async () => {
  const [component, game] = await Promise.all([
    source('../app/encounter/components/AustraliaFindIt.tsx'),
    source('../app/encounter/lib/australia-find-it-game.ts'),
  ])
  const combined = `${component}\n${game}`
  assert.doesNotMatch(combined, /localStorage|sessionStorage|indexedDB|firebase|fetch\(|XMLHttpRequest|analytics|telemetry/i)
  assert.doesNotMatch(combined, /yourName|theirName|contact|birthday|answerText|upload|customQuestion/i)
})
