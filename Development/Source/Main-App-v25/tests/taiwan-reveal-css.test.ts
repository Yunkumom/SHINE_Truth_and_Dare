import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const css = readFileSync(resolve(process.cwd(), 'src/styles/taiwan-reveal.css'), 'utf8')

describe('Taiwan reveal visual contract', () => {
  it('makes only a large transparent Taiwan coastline glow', () => {
    expect(css).toMatch(/\.taiwan-locator\s*\{[^}]*width:\s*40px;[^}]*height:\s*80px;/s)
    expect(css).toMatch(/\.taiwan-coastline-glow\s*\{[^}]*fill:\s*none;/s)
    expect(css).toMatch(/\.taiwan-coastline-crisp\s*\{[^}]*fill:\s*none;/s)
    expect(css).toMatch(/@keyframes taiwanCoastlineGlow/)
    expect(css).toMatch(/--taiwan-color:\s*#[0-9a-f]{6}/i)
    expect(css).toMatch(/--taiwan-accent:\s*#[0-9a-f]{6}/i)
    expect(css).not.toMatch(/\.taiwan-locator-(dot|halo)/)
    expect(css).not.toMatch(/radial-gradient/)
    expect(css).toMatch(/prefers-reduced-motion:\s*reduce/)
    expect(css).toMatch(/animation:\s*none/)
  })

  it('protects long press from native image interactions', () => {
    expect(css).toMatch(/touch-action:\s*none/)
    expect(css).toMatch(/-webkit-touch-callout:\s*none/)
    expect(css).toMatch(/user-select:\s*none/)
  })
})
