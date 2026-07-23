import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const appCss = readFileSync('src/styles/v25.css', 'utf8')
const layoutCss = readFileSync('src/styles/v25-layout.css', 'utf8')

describe('v25 artwork crop contract', () => {
  it('uses each artwork portrait-safe focal point in game and keepsake cards', () => {
    expect(appCss).toMatch(/\.mythic-art-frame img[\s\S]*object-position:\s*var\(--portrait-position\)/)
    expect(layoutCss).toMatch(/\.keepsake-art img[\s\S]*object-position:\s*var\(--portrait-position\)/)
  })
})
