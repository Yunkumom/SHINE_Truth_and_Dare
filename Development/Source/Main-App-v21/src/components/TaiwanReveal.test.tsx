import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import TaiwanReveal from './TaiwanReveal'
import type { ArtworkVariant } from '../types'

const artwork = {
  id: 'mazu-lantern',
  deityId: 'mazu',
  zhName: '媽祖',
  enName: 'Mazu',
  src: 'mazu.webp',
  hiddenTaiwan: 'lantern metalwork',
  taiwanHotspot: { x: 72, y: 28, scale: 1, rotation: 8 },
} satisfies ArtworkVariant

describe('Taiwan artwork reveal', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('does not reveal after a short press', () => {
    render(<TaiwanReveal artwork={artwork} language="zh"><img alt="媽祖" /></TaiwanReveal>)
    const target = screen.getByRole('button', { name: /長按/ })
    fireEvent.pointerDown(target, { clientX: 20, clientY: 20, pointerId: 1 })
    act(() => vi.advanceTimersByTime(599))
    fireEvent.pointerUp(target, { clientX: 20, clientY: 20, pointerId: 1 })
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('reveals at 600ms and hides three seconds after release', () => {
    render(<TaiwanReveal artwork={artwork} language="zh"><img alt="媽祖" /></TaiwanReveal>)
    const target = screen.getByRole('button', { name: /長按/ })
    fireEvent.pointerDown(target, { clientX: 20, clientY: 20, pointerId: 2 })
    act(() => vi.advanceTimersByTime(600))
    expect(screen.getByRole('status')).toHaveTextContent('台灣位置')
    expect(screen.getByTestId('taiwan-locator')).toHaveStyle({ left: '72%', top: '28%' })
    fireEvent.pointerUp(target, { clientX: 20, clientY: 20, pointerId: 2 })
    act(() => vi.advanceTimersByTime(2999))
    expect(screen.getByRole('status')).toBeInTheDocument()
    act(() => vi.advanceTimersByTime(1))
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it.each(['Enter', ' '])('supports the %p keyboard reveal', key => {
    render(<TaiwanReveal artwork={artwork} language="en"><img alt="Mazu" /></TaiwanReveal>)
    const target = screen.getByRole('button', { name: /Press and hold/ })
    fireEvent.keyDown(target, { key })
    expect(screen.getByRole('status')).toHaveTextContent('Taiwan location')
    act(() => vi.advanceTimersByTime(3000))
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('cancels a pending reveal when the pointer moves', () => {
    render(<TaiwanReveal artwork={artwork} language="bilingual"><img alt="媽祖" /></TaiwanReveal>)
    const target = screen.getByRole('button', { name: /長按.*Press and hold/ })
    fireEvent.pointerDown(target, { clientX: 20, clientY: 20, pointerId: 3 })
    fireEvent.pointerMove(target, { clientX: 40, clientY: 20, pointerId: 3 })
    act(() => vi.advanceTimersByTime(700))
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })
})
