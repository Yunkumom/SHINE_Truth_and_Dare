import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

const css = readFileSync(join(process.cwd(), 'src/styles/v32-layout.css'), 'utf8')

describe('V32 setup visual contract', () => {
  it('owns one warm milk-tea palette without dark setup surfaces', () => {
    for (const token of ['--setup-milk-tea:', '--setup-cream:', '--setup-caramel:', '--setup-espresso:', '--setup-gold:']) expect(css).toContain(token)
    expect(css).toMatch(/\.v32-shell \.setup-canvas\{[^}]*--setup-milk-tea/)
    expect(css).toMatch(/\.v32-shell \.setup-canvas \.site-header\{[^}]*--setup-cream/)
  })

  it('reserves an in-flow title row before both setup grids', () => {
    expect(css).toMatch(/\.v32-shell \.fields-card \.panel-heading>b\{[^}]*min-height:[^;}]+[^}]*line-height:[^;}]+[^}]*overflow:visible/)
    expect(css).toMatch(/\.fields-card label>span\{[^}]*white-space:normal/)
    expect(css).toMatch(/\.v32-shell \.setup-card legend\{[^}]*display:block[^}]*min-height:[^;}]+[^}]*line-height:[^;}]+[^}]*white-space:normal/)
    expect(css).toMatch(/\.v32-shell \.setup-card legend\{[^}]*position:static/)
    expect(css).toMatch(/\.v32-shell \.setup-levels-block \.level-grid,\.v32-shell \.setup-modes-block \.mode-grid\{[^}]*margin-top:/)
    expect(css).not.toMatch(/\.setup-card\{[^}]*overflow:hidden/)
  })

  it('uses the same gold selection language for level and mode controls', () => {
    expect(css).toMatch(/\.setup-card button\.active\{[^}]*--setup-gold/)
  })

  it('coordinates the desktop workbench and editor with the milk-tea family', () => {
    expect(css).toMatch(/\.desktop-workbench-stage\{[^}]*--setup-milk-tea/)
    expect(css).toMatch(/\.layout-editor\{[^}]*--setup-cream[^}]*--setup-espresso/)
    expect(css).toMatch(/\.desktop-device-frame\{[^}]*--setup-caramel/)
  })

  it('provides explicit safe title sizes for all language modes', () => {
    expect(css).toContain('[data-language="zh"] .setup-hero-block')
    expect(css).toContain('[data-language="en"] .setup-hero-block')
    expect(css).toContain('[data-language="bilingual"] .setup-hero-block')
  })
})
