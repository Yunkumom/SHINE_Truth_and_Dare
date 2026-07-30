import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { ARTWORK_COLLECTIONS } from '../data/collections'
import { ALL_ARTWORKS } from '../lib/artwork-catalog'
import CardLibrary from './CardLibrary'

function renderLibrary(onChoose = vi.fn(), onClose = vi.fn()) {
  render(<CardLibrary artworks={ALL_ARTWORKS} collections={ARTWORK_COLLECTIONS} onChoose={onChoose} onClose={onClose} renderCard={artwork => <div>{artwork.zhName}</div>} />)
  return { onChoose, onClose }
}

describe('CardLibrary', () => {
  it('opens as a complete accessible 42-card browser', () => {
    renderLibrary()
    expect(screen.getByRole('dialog', { name: '卡庫 · Card library' })).toBeInTheDocument()
    expect(screen.getByText('1 / 42')).toBeInTheDocument()
    expect(screen.getByLabelText(/目前卡片/)).toBeInTheDocument()
    expect(screen.getAllByTestId('library-card')).toHaveLength(3)
  })

  it('supports next, previous, keyboard, and committed horizontal drag navigation', async () => {
    const user = userEvent.setup()
    renderLibrary()
    const initial = screen.getByLabelText(/目前卡片/).getAttribute('aria-label')
    await user.click(screen.getByRole('button', { name: '下一張卡 · Next card' }))
    expect(screen.getByLabelText(/目前卡片/)).not.toHaveAttribute('aria-label', initial)
    fireEvent.keyDown(screen.getByRole('dialog', { name: '卡庫 · Card library' }), { key: 'ArrowLeft' })
    expect(screen.getByLabelText(/目前卡片/)).toHaveAttribute('aria-label', initial)
    const viewport = screen.getByTestId('card-library-viewport')
    vi.spyOn(viewport, 'getBoundingClientRect').mockReturnValue({ width: 360, height: 580, x: 0, y: 0, top: 0, left: 0, right: 360, bottom: 580, toJSON: () => ({}) })
    fireEvent.pointerDown(viewport, { pointerId: 4, clientX: 240, clientY: 200 })
    fireEvent.pointerMove(viewport, { pointerId: 4, clientX: 140, clientY: 205 })
    fireEvent.pointerUp(viewport, { pointerId: 4, clientX: 140, clientY: 205 })
    expect(screen.getByLabelText(/目前卡片/)).not.toHaveAttribute('aria-label', initial)
  })

  it('filters by series and chooses only the current artwork', async () => {
    const user = userEvent.setup()
    const { onChoose, onClose } = renderLibrary()
    await user.click(screen.getByRole('button', { name: /台灣星座・地方故事.*12/ }))
    expect(screen.getByText('1 / 12')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: '選擇這張卡面 · Choose this face' }))
    expect(onChoose).toHaveBeenCalledTimes(1)
    expect(onChoose.mock.calls[0][0].collectionId).toBe('taiwan-zodiac-local-stories')
    expect(onClose).not.toHaveBeenCalled()
  })
})
