import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it } from 'vitest'
import App from './App'

describe('Encounter Cards setup', () => {
  beforeEach(() => localStorage.clear())

  it('changes language and enters the draw screen without personal data', async () => {
    const user = userEvent.setup()
    render(<App />)
    await user.click(screen.getByRole('button', { name: 'EN' }))
    expect(screen.getByRole('heading', { name: 'Turn a meeting into a story' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /Begin/ }))
    expect(screen.getByRole('button', { name: 'Draw a card' })).toBeInTheDocument()
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
})
