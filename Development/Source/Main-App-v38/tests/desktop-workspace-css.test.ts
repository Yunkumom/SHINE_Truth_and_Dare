import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const inheritedCss = readFileSync('src/styles/v32-layout.css', 'utf8')
const css = `${readFileSync('src/styles/v37.css', 'utf8')}\n${readFileSync('src/styles/v38.css', 'utf8')}`

describe('V38 responsive desktop studio CSS', () => {
  it('creates a contained three-column studio at 1366 by 768', () => {
    expect(css).toMatch(/@media\s*\(min-width:\s*1100px\)/)
    expect(css).toMatch(/\.desktop-viewport[\s\S]*overflow:\s*hidden/)
    expect(css).toMatch(/\.desktop-workspace[\s\S]*grid-template-columns:\s*270px\s+minmax\(0,1fr\)\s+310px/)
    expect(css).toMatch(/\.desktop-editor-rail[\s\S]*overflow:\s*hidden/)
    expect(css).toMatch(/\.layout-editor\.is-docked[\s\S]*overflow:\s*hidden/)
    expect(css).toMatch(/@media\s*\(min-width:\s*1366px\)\s*and\s*\(min-height:\s*768px\)/)
    expect(inheritedCss).toMatch(/\.desktop-device-frame[\s\S]*width:445px[\s\S]*height:932px/)
  })

  it('reserves compact bookmark tabs outside the editor and scales the centre larger', () => {
    expect(css).toMatch(/\.desktop-mode-bookmarks[\s\S]*grid-area:\s*mode-tabs/)
    expect(css).toMatch(/\.desktop-mode-bookmark-tabs[\s\S]*flex-direction:\s*column/)
    expect(css).toMatch(/\.desktop-mode-bookmark-tabs button[\s\S]*min-height:\s*30px/)
    expect(css).toMatch(/--workbench-scale:\s*\.74/)
    expect(css).toMatch(/--preview-scale:\s*\.62/)
  })
})
