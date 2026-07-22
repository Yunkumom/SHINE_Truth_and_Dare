import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const css = readFileSync(resolve(process.cwd(), 'src/styles/taiwan-reveal.css'), 'utf8')

describe('Taiwan reveal visual contract', () => {
  it('defines a blinking per-artwork locator and a reduced-motion fallback', () => {
    expect(css).toMatch(/@keyframes taiwanPulse/)
    expect(css).toMatch(/@keyframes taiwanHalo/)
    expect(css).toMatch(/--taiwan-color:\s*#[0-9a-f]{6}/i)
    expect(css).toMatch(/--taiwan-accent:\s*#[0-9a-f]{6}/i)
    expect(css).toMatch(/stroke:\s*var\(--taiwan-accent\)/)
    expect(css).toMatch(/prefers-reduced-motion:\s*reduce/)
    expect(css).toMatch(/animation:\s*none/)
  })

  it('protects long press from native image interactions', () => {
    expect(css).toMatch(/touch-action:\s*none/)
    expect(css).toMatch(/-webkit-touch-callout:\s*none/)
    expect(css).toMatch(/user-select:\s*none/)
  })
})
