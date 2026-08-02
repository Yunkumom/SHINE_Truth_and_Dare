import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const css = readFileSync('src/styles/v32-layout.css', 'utf8')

describe('v32 visible typography safety', () => {
  it('gives the deity header content-safe CJK line boxes without clipping', () => {
    expect(css).toMatch(/\.mythic-card-header\{[^}]*min-height:[^;}]+[^}]*overflow:visible/)
    expect(css).toMatch(/\.mythic-card-header h2\{[^}]*line-height:[^;}]+[^}]*padding-block:[^;}]+/)
    expect(css).toMatch(/\.mythic-card-header small\{[^}]*line-height:[^;}]+/)
  })

  it('forbids clipping on setup and desktop mode labels', () => {
    expect(css).toMatch(/\.desktop-mode-switch button\{[^}]*white-space:normal[^}]*overflow:visible/)
    expect(css).toMatch(/\.advanced-deck-choice[^}]*overflow:visible/)
  })
})
