import { afterEach, describe, expect, it, vi } from 'vitest'
import type { EncounterComposition } from '../types'
import { deliverCardFile, localizedLines } from './share'

const composition: EncounterComposition = {
  card: { id: 'question', level: 3, mode: 'truth', zh: '中文問題', en: 'English question' },
  artwork: { id: 'art', deityId: 'mazu', zhName: '媽祖', enName: 'Mazu', src: 'art.webp', hiddenTaiwan: 'lantern', taiwanHotspot: { x: 50, y: 50, scale: 1, rotation: 0 } },
  blessing: { id: 'blessing', zh: '中文祝福', en: 'English blessing' },
}

describe('v21 keepsake content', () => {
  afterEach(() => vi.restoreAllMocks())

  it('always includes the selected blessing in every language mode', () => {
    expect(localizedLines(composition, 'zh').blessing).toEqual(['中文祝福'])
    expect(localizedLines(composition, 'en').blessing).toEqual(['English blessing'])
    expect(localizedLines(composition, 'bilingual').blessing).toEqual(['中文祝福', 'English blessing'])
  })

  it('downloads the PNG on desktop when Web Share is unavailable', async () => {
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => undefined)
    const createObjectURL = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:keepsake')
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined)
    const file = new File(['png'], 'encounter-card-v21.png', { type: 'image/png' })

    expect(await deliverCardFile(file, {})).toBe('downloaded')
    expect(createObjectURL).toHaveBeenCalledWith(file)
    expect(click).toHaveBeenCalledOnce()
  })
})
