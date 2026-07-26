import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const css = readFileSync(join(process.cwd(), 'src/styles/v28-layout.css'), 'utf8')

describe('v28 setup visual contract', () => {
  it('owns one named v16-inspired setup palette', () => {
    for (const token of ['--setup-navy:', '--setup-paper:', '--setup-gold:', '--setup-ink:', '--setup-muted:', '--setup-red:']) expect(css).toContain(token)
  })

  it('keeps labels and fieldset headings readable instead of clipping them', () => {
    expect(css).toMatch(/\.fields-card label>span\{[^}]*white-space:normal/)
    expect(css).toMatch(/\.setup-card legend\{[^}]*float:left[^}]*width:100%/)
    expect(css).toMatch(/\.(?:level-grid|mode-grid)[^{]*\{[^}]*clear:both/)
    expect(css).not.toMatch(/\.setup-card\{[^}]*overflow:hidden/)
  })

  it('uses the same gold selection language for level and mode controls', () => {
    expect(css).toMatch(/\.setup-card button\.active\{[^}]*--setup-gold/)
  })

  it('provides explicit safe title sizes for all language modes', () => {
    expect(css).toContain('[data-language="zh"] .setup-hero-block')
    expect(css).toContain('[data-language="en"] .setup-hero-block')
    expect(css).toContain('[data-language="bilingual"] .setup-hero-block')
  })
})
