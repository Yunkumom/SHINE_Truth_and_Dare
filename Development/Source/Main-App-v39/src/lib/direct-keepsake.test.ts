import { describe, expect, it } from 'vitest'
import { DIRECT_KEEPSAKE_CANVAS, wrapKeepsakeText } from './direct-keepsake'

describe('V39 direct keepsake', () => {
  it('uses the same commemorative 63:88 ratio', () => {
    expect(DIRECT_KEEPSAKE_CANVAS.width / DIRECT_KEEPSAKE_CANVAS.height).toBeCloseTo(63 / 88, 5)
  })

  it('wraps Chinese and spaced English copy without dropping content', () => {
    const context = { measureText: (value: string) => ({ width: value.length * 10 }) } as Pick<CanvasRenderingContext2D, 'measureText'>
    expect(wrapKeepsakeText(context, '願今天的相遇值得收藏', 50).join('')).toBe('願今天的相遇值得收藏')
    expect(wrapKeepsakeText(context, 'A moment worth keeping', 90).join(' ')).toBe('A moment worth keeping')
  })
})
