import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'

const appCss = readFileSync('src/styles/v23.css', 'utf8')
const layoutCss = readFileSync('src/styles/v23-layout.css', 'utf8')

describe('v23 artwork crop contract', () => {
  it('centres game and keepsake artwork so Taiwan motifs remain visible', () => {
    expect(appCss).toMatch(/\.mythic-art-frame img[\s\S]*object-position:\s*center/)
    expect(layoutCss).toMatch(/\.keepsake-art img[\s\S]*object-position:\s*center/)
    expect(appCss).not.toContain('object-position: center 30%')
    expect(layoutCss).not.toContain('object-position: center 30%')
  })
})
