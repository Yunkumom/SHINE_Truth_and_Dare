import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import SwipeDeck from './SwipeDeck'

describe('v24 SwipeDeck', () => {
  it('returns a short drag without drawing', () => {
    const onDraw = vi.fn()
    render(<SwipeDeck revealed={false} onDraw={onDraw}><div>card</div></SwipeDeck>)
    const deck = screen.getByTestId('swipe-card')
    fireEvent.pointerDown(deck, { pointerId: 1, clientX: 200, clientY: 500 })
    fireEvent.pointerMove(deck, { pointerId: 1, clientX: 215, clientY: 460 })
    expect(deck).toHaveStyle({ transform: 'translate3d(15px, -40px, 0) rotate(0.9deg)' })
    fireEvent.pointerUp(deck, { pointerId: 1, clientX: 215, clientY: 460 })
    expect(onDraw).not.toHaveBeenCalled()
    expect(deck).toHaveClass('is-returning')
  })

  it('commits one draw after crossing the threshold', () => {
    vi.useFakeTimers()
    const onDraw = vi.fn()
    render(<SwipeDeck revealed={false} onDraw={onDraw}><div>card</div></SwipeDeck>)
    const deck = screen.getByTestId('swipe-card')
    fireEvent.pointerDown(deck, { pointerId: 2, clientX: 200, clientY: 500 })
    fireEvent.pointerMove(deck, { pointerId: 2, clientX: 230, clientY: 350 })
    fireEvent.pointerUp(deck, { pointerId: 2, clientX: 230, clientY: 350 })
    fireEvent.pointerUp(deck, { pointerId: 2, clientX: 230, clientY: 350 })
    expect(onDraw).not.toHaveBeenCalled()
    expect(deck).toHaveClass('is-committing')
    vi.advanceTimersByTime(180)
    expect(onDraw).toHaveBeenCalledTimes(1)
    vi.useRealTimers()
  })

  it('does not start a deck gesture on the artwork', () => {
    const onDraw = vi.fn()
    render(<SwipeDeck revealed onDraw={onDraw}><div data-card-artwork>artwork</div></SwipeDeck>)
    const artwork = screen.getByText('artwork')
    fireEvent.pointerDown(artwork, { pointerId: 3, clientX: 200, clientY: 500 })
    fireEvent.pointerMove(artwork, { pointerId: 3, clientX: 200, clientY: 300 })
    fireEvent.pointerUp(artwork, { pointerId: 3, clientX: 200, clientY: 300 })
    expect(onDraw).not.toHaveBeenCalled()
  })

  it('exposes the flipped face state', () => {
    render(<SwipeDeck revealed onDraw={() => undefined}><div>face</div></SwipeDeck>)
    expect(screen.getByTestId('swipe-card')).toHaveClass('is-flipped')
  })
})
