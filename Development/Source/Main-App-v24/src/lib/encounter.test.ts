import { describe, expect, it } from 'vitest'
import type { ArtworkVariant, Blessing } from '../types'
import { selectArtwork, selectBlessing } from './encounter'

const artworks: ArtworkVariant[] = [
  { id: 'mazu-calm', deityId: 'mazu', zhName: '媽祖', enName: 'Mazu', src: 'mazu.webp', hiddenTaiwan: 'sleeve embroidery', taiwanHotspot: { x: 30, y: 30, scale: 1, rotation: 0, color: '#24c9c3', accent: '#ff765f' } },
  { id: 'mazu-sailing', deityId: 'mazu', zhName: '媽祖', enName: 'Mazu', src: 'mazu-sailing.webp', hiddenTaiwan: 'lantern carving', taiwanHotspot: { x: 40, y: 50, scale: .8, rotation: 8, color: '#54d7b2', accent: '#e8493f' } },
  { id: 'guanyin-lotus', deityId: 'guanyin', zhName: '觀音', enName: 'Guanyin', src: 'guanyin.webp', hiddenTaiwan: 'lotus ornament', taiwanHotspot: { x: 60, y: 70, scale: .7, rotation: -8, color: '#7f65e8', accent: '#46d9e0' } },
]

const blessings: Blessing[] = [
  { id: 'warmth', zh: '願溫柔成為你們再次相遇的路。', en: 'May kindness become the road that brings you together again.' },
  { id: 'courage', zh: '願你帶著勇氣，也保有柔軟。', en: 'May you carry courage without losing tenderness.' },
]

describe('v21 independent encounter composition', () => {
  it('selects artwork independently and avoids an immediate repeat', () => {
    expect(selectArtwork(artworks, 'mazu-calm', () => 0).id).toBe('mazu-sailing')
    expect(selectArtwork(artworks, undefined, () => 0.99).id).toBe('guanyin-lotus')
  })

  it('always selects a complete bilingual blessing', () => {
    const blessing = selectBlessing(blessings, () => 0)
    expect(blessing.zh).toBeTruthy()
    expect(blessing.en).toBeTruthy()
  })
})
