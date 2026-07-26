import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const css = readFileSync('src/styles/v27-layout.css', 'utf8')

describe('v27 responsive workspace CSS', () => {
  it('creates a desktop two-column studio and exact phone preview', () => {
    expect(css).toMatch(/@media\(min-width:1100px\)/)
    expect(css).toMatch(/\.desktop-workspace[\s\S]*grid-template-columns/)
    expect(css).toMatch(/\.desktop-device-frame[\s\S]*width:445px[\s\S]*height:932px/)
    expect(css).toMatch(/\.desktop-phone-canvas[\s\S]*width:430px[\s\S]*height:932px/)
  })

  it('gives the card image more space with a narrow title band', () => {
    expect(css).toMatch(/\.game-card-block \.mythic-card\{grid-template-rows:10% 62% 28%\}/)
  })
})
