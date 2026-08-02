import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import type { ArtworkVariant } from '../types'
import ArtworkAdjuster from './ArtworkAdjuster'

const artwork: ArtworkVariant = {
  id: 'art-1', deityId: 'subject-1', zhName: '測試卡', enName: 'Test Card', src: '/art.webp', hiddenTaiwan: 'test', portraitFocus: { x: 50, y: 50 },
  taiwanHotspot: { x: 50, y: 50, scale: 1, rotation: 0, color: '#fff', accent: '#000' },
}

describe('v39 artwork adjuster', () => {
  it('moves focus into the modal and closes with Escape', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<ArtworkAdjuster open artwork={artwork} value={{ offsetX: 0, offsetY: 0, zoom: 1 }} onChange={() => undefined} onClose={onClose} />)
    expect(screen.getByRole('button', { name: '取消照片調整' })).toHaveFocus()
    await user.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('offers extended vertical movement, zoom, and a nine-square grid', () => {
    render(<ArtworkAdjuster open artwork={artwork} value={{ offsetX: 0, offsetY: 0, zoom: 1 }} onChange={() => undefined} onClose={() => undefined} />)
    expect(screen.getByRole('slider', { name: '垂直位置 · Y' })).toHaveAttribute('min', '-60')
    expect(screen.getByRole('slider', { name: '垂直位置 · Y' })).toHaveAttribute('max', '60')
    expect(screen.getByRole('slider', { name: '照片大小 · Size' })).toHaveAttribute('max', '2.4')
    expect(screen.getByTestId('artwork-grid')).toBeInTheDocument()
  })
})
