import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const layoutCss = readFileSync('src/styles/v29-layout.css', 'utf8')
const appSource = readFileSync('src/App.tsx', 'utf8')
const shareSource = readFileSync('src/lib/share.ts', 'utf8')

describe('v29 readable card text contract', () => {
  it('applies independent typography variables with wrapping and bounded scrolling', () => {
    expect(appSource).toContain("'--question-font-scale': presentation.question.fontScale")
    expect(appSource).toContain("'--blessing-font-scale': presentation.blessing.fontScale")
    expect(layoutCss).toMatch(/font-size:calc\(14px \* var\(--question-font-scale,1\.2\)\)/)
    expect(layoutCss).toMatch(/font-size:calc\(1em \* var\(--blessing-font-scale,1\.25\)\)/)
    expect(layoutCss).toMatch(/font-size:calc\(11px \* var\(--blessing-font-scale,1\.25\)\)/)
    expect(layoutCss).toContain('overflow-wrap:anywhere')
    expect(layoutCss).toContain('overflow-y:auto')
  })

  it('uses the same independent scales in commemorative PNG rendering', () => {
    expect(shareSource).toContain('37 * presentation.question.fontScale')
    expect(shareSource).toContain('23 * blessingStyle.fontScale')
  })
})
