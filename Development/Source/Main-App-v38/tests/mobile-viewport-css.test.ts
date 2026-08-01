import { describe, expect, it } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'

const css = fs.readFileSync(path.resolve(__dirname, '../src/styles/v38.css'), 'utf8')

describe('v38 mobile viewport contract', () => {
  it('keeps the fixed canvas scaled inside the visual viewport without scrolling', () => {
    expect(css).toContain('.v38-mobile-stage')
    expect(css).toMatch(/overflow:\s*hidden/)
    expect(css).toContain('transform: translate(-50%, -50%) scale(var(--phone-scale))')
  })

  it('keeps revealed artwork controls inside the card width', () => {
    expect(css).toMatch(/\.v38-shell \.artwork-control-panel[\s\S]*?right:\s*14px/)
    expect(css).toMatch(/\.v38-shell \.artwork-control-panel[\s\S]*?width:\s*auto/)
  })
})
