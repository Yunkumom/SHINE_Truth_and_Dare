import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'

const css = fs.readFileSync(path.resolve(__dirname, '../src/styles/v39.css'), 'utf8')

describe('v39 mobile viewport contract', () => {
  it('fills the live viewport width without scaling the app into a narrow column', () => {
    expect(css).toContain('.v39-mobile-stage')
    expect(css).toMatch(/overflow:\s*hidden/)
    expect(css).toMatch(/\.v39-mobile-stage \.app-shell[\s\S]*?width:\s*100%/)
    expect(css).toMatch(/\.v39-mobile-stage \.app-shell[\s\S]*?transform:\s*none/)
    expect(css).toContain('height: 100dvh')
  })

  it('reflows cards and revealed artwork controls between equal mobile insets', () => {
    expect(css).toMatch(/\.v39-shell \.game-card-block[\s\S]*?right:\s*12px/)
    expect(css).toMatch(/\.v39-shell \.artwork-control-panel[\s\S]*?right:\s*12px/)
    expect(css).toMatch(/\.v39-shell \.artwork-control-panel[\s\S]*?width:\s*auto/)
  })

  it('defines the mode home and direct keepsake surfaces', () => {
    expect(css).toContain('.mode-home-canvas')
    expect(css).toContain('.experience-grid')
    expect(css).toContain('.direct-keepsake-canvas')
    expect(css).toContain('.direct-artwork-picker')
  })
})
