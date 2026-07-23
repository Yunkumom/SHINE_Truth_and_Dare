import { afterEach, describe, expect, it, vi } from 'vitest'
import type { EncounterComposition } from '../types'
import { deliverCardFile, getIncludedParticipants, KEEPSAKE_CANVAS, localizedLines } from './share'

const composition: EncounterComposition = {
  card: { id: 'question', level: 3, mode: 'truth', zh: '中文問題', en: 'English question' },
  artwork: { id: 'art', deityId: 'mazu', zhName: '媽祖', enName: 'Mazu', src: 'art.webp', hiddenTaiwan: 'lantern', portraitFocus: { x: 50, y: 22 }, taiwanHotspot: { x: 50, y: 50, scale: 1, rotation: 0, color: '#24c9c3', accent: '#ff765f' } },
  blessing: { id: 'blessing', zh: '中文祝福', en: 'English blessing' },
}

describe('v25 keepsake content', () => {
  afterEach(() => vi.restoreAllMocks())

  it('always includes the selected blessing in every language mode', () => {
    expect(localizedLines(composition, 'zh').blessing).toEqual(['中文祝福'])
    expect(localizedLines(composition, 'en').blessing).toEqual(['English blessing'])
    expect(localizedLines(composition, 'bilingual').blessing).toEqual(['中文祝福', 'English blessing'])
  })

  it('uses the approved 63:88 card ratio', () => {
    expect(KEEPSAKE_CANVAS).toEqual({ width: 1260, height: 1760 })
    expect(KEEPSAKE_CANVAS.width / KEEPSAKE_CANVAS.height).toBeCloseTo(63 / 88, 5)
  })

  it('includes only participant rows explicitly selected for exchange', () => {
    const participants = [
      { role: 'self' as const, name: 'Yunkumom', contact: 'hello@example.com', include: true },
      { role: 'other' as const, name: 'Linker Lin', contact: '0912345678', include: false },
    ]
    expect(getIncludedParticipants(participants)).toEqual([participants[0]])
    expect(JSON.stringify(getIncludedParticipants(participants))).not.toContain('0912345678')
  })

  it('downloads the PNG on desktop when Web Share is unavailable', async () => {
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => undefined)
    const createObjectURL = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:keepsake')
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined)
    const file = new File(['png'], 'encounter-card-v25.png', { type: 'image/png' })

    expect(await deliverCardFile(file, {})).toBe('downloaded')
    expect(createObjectURL).toHaveBeenCalledWith(file)
    expect(click).toHaveBeenCalledOnce()
  })
})
