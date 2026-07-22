import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App'

describe('Encounter Cards setup', () => {
  beforeEach(() => localStorage.clear())

  it('changes language and enters the draw screen without personal data', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'English' }))
    expect(screen.getByRole('heading', { name: 'Turn a simple conversation into a meeting worth keeping.' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /Begin/ }))
    expect(screen.getByRole('button', { name: 'Draw a card' })).toBeInTheDocument()
  })

  it('renders the approved v16 entrance hierarchy as v20', () => {
    render(<App />)
    expect(screen.getByText('ENCOUNTER CARDS · V20')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /讓一次簡單的對話，成為值得收藏的相遇/ })).toBeInTheDocument()
    expect(screen.getByText(/準備這次相遇/)).toBeInTheDocument()
    expect(screen.getByText(/Choose familiarity level/)).toBeInTheDocument()
    expect(screen.getByText(/Choose a card type/)).toBeInTheDocument()
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
    await user.click(screen.getByRole('button', { name: '抽一張卡' }))
    expect(screen.getByRole('img', { name: /台灣/ })).toBeInTheDocument()
    expect(screen.getByTestId('mythic-card')).toBeInTheDocument()
    expect(screen.getByText(/祝福|Blessing/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '下一張' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: '下一張' }))
    expect(screen.getByRole('button', { name: '下一張' })).toBeInTheDocument()
  })
})
