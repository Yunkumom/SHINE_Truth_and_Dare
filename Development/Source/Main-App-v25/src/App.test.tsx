import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'

describe('Encounter Cards setup', () => {
  beforeEach(() => { vi.useRealTimers(); localStorage.clear() })

  it('changes language and enters the draw screen without personal data', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'English' }))
    expect(screen.getByRole('heading', { name: 'Turn a simple conversation into a meeting worth keeping.' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /Begin/ }))
    expect(screen.getByRole('button', { name: 'Draw a card' })).toBeInTheDocument()
  })

  it('renders the approved entrance hierarchy as v25 with Begin separated at the bottom', () => {
    render(<App />)
    expect(screen.getByText('ENCOUNTER CARDS · V25')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /讓一次簡單的對話，成為值得收藏的相遇/ })).toBeInTheDocument()
    expect(screen.getByText(/準備這次相遇/)).toBeInTheDocument()
    expect(screen.getByText(/Choose familiarity level/)).toBeInTheDocument()
    expect(screen.getByText(/Choose a card type/)).toBeInTheDocument()
    const modes = screen.getByTestId('editable-modes')
    const begin = screen.getByTestId('editable-begin')
    expect(Number.parseFloat(begin.style.top)).toBeGreaterThan(Number.parseFloat(modes.style.top) + Number.parseFloat(modes.style.height))
  })

  it('opens a three-screen editor while keeping chrome out of player mode', async () => {
    const user = userEvent.setup()
    render(<App />)
    expect(screen.queryByRole('dialog', { name: 'Layout editor' })).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /Edit layout/ }))
    expect(screen.getByRole('dialog', { name: 'Layout editor' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Keepsake layout/ })).toBeInTheDocument()
  })

  it('keeps level five locked until an adult birthday is entered', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: /Level 5/ }))
    expect(screen.getByLabelText('Birthday')).toBeInTheDocument()
    await user.type(screen.getByLabelText('Birthday'), '2000-01-01')
    await user.click(screen.getByRole('button', { name: 'Confirm 18+' }))
    expect(screen.getByRole('button', { name: /Level 5/ })).toHaveAttribute('aria-pressed', 'true')
  })

  it('supports desktop mouse clicks through setup, draw, and next-card controls', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'Truth' }))
    await user.click(screen.getByRole('button', { name: /Level 2/ }))
    await user.click(screen.getByRole('button', { name: /開始抽卡/ }))
    expect(screen.getByTestId('editable-card')).toHaveStyle({ width: '402px', height: '590px' })
    await user.click(screen.getByRole('button', { name: '抽一張卡' }))
    expect(screen.getByRole('img', { name: /台灣/ })).toBeInTheDocument()
    expect(screen.getByTestId('mythic-card')).toBeInTheDocument()
    expect(screen.getByText(/祝福|Blessing/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '下一張' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: '下一張' }))
    expect(screen.getByRole('button', { name: '下一張' })).toBeInTheDocument()
  })

  it('opens a keepsake preview with optional participant exchange rows', async () => {
    const user = userEvent.setup()
    render(<App />)
    const inputs = screen.getAllByRole('textbox')
    await user.type(inputs[0], 'Yunkumom')
    await user.type(inputs[1], 'Linker Lin')
    await user.type(inputs[2], 'hello@example.com')
    await user.type(inputs[3], '0912345678')
    await user.click(screen.getByRole('button', { name: /開始抽卡/ }))
    await user.click(screen.getByRole('button', { name: '抽一張卡' }))
    await user.click(screen.getByRole('button', { name: '製作紀念卡' }))
    expect(screen.getByText(/Yunkumom/)).toBeInTheDocument()
    expect(screen.getByText(/Linker Lin/)).toBeInTheDocument()
    expect(screen.getByText(/給這次相遇的祝福|BLESSING/)).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: /Include your contact/ })).toBeChecked()
    expect(screen.getByRole('checkbox', { name: /Include their contact/ })).toBeChecked()
  })

  it('reveals Taiwan without bubbling a card-draw gesture', () => {
    vi.useFakeTimers()
    render(<App />)
    fireEvent.click(screen.getByRole('button', { name: /開始抽卡/ }))
    fireEvent.click(screen.getByRole('button', { name: '抽一張卡' }))
    const artworkImage = screen.getByRole('img', { name: /台灣/ })
    const artworkSource = artworkImage.getAttribute('src')
    const revealTarget = screen.getByRole('button', { name: /長按圖片/ })
    fireEvent.pointerDown(revealTarget, { clientX: 25, clientY: 25, pointerId: 4 })
    act(() => vi.advanceTimersByTime(600))
    expect(screen.getByTestId('taiwan-locator')).toBeInTheDocument()
    fireEvent.pointerUp(revealTarget, { clientX: 25, clientY: 25, pointerId: 4 })
    expect(screen.getByRole('img', { name: /台灣/ })).toHaveAttribute('src', artworkSource)
  })

  it('renders the synchronized desktop workbench and exact phone preview above 1100px', () => {
    const originalWidth = window.innerWidth
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: 1600 })
    render(<App />)
    expect(screen.getByTestId('desktop-workspace')).toBeInTheDocument()
    expect(screen.getByLabelText('Desktop enlarged workspace')).toBeInTheDocument()
    expect(screen.getByLabelText('430 by 932 phone preview')).toBeInTheDocument()
    expect(screen.getByRole('dialog', { name: 'Layout editor' })).toBeInTheDocument()
    Object.defineProperty(window, 'innerWidth', { configurable: true, value: originalWidth })
  })
})
