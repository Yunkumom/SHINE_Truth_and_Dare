import { fireEvent, render, screen } from '@testing-library/react'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import type { LayoutScreen } from '../layout/layout-model'
import { createLayoutHistory, DEFAULT_LAYOUT } from '../layout/layout-model'
import EditableBlock from './EditableBlock'
import LayoutEditor from './LayoutEditor'

function Harness({ open = true }: { open?: boolean }) {
  const [history, setHistory] = useState(() => createLayoutHistory(DEFAULT_LAYOUT))
  const [layoutScreen, setLayoutScreen] = useState<LayoutScreen>('setup')
  const [selected, setSelected] = useState('hero')
  return <LayoutEditor
    open={open}
    history={history}
    onHistoryChange={setHistory}
    screen={layoutScreen}
    onScreenChange={setLayoutScreen}
    selectedBlock={selected}
    onSelectBlock={setSelected}
    onClose={() => undefined}
  />
}

describe('v22 LayoutEditor', () => {
  it('keeps editing chrome out of player mode', () => {
    render(<Harness open={false} />)
    expect(screen.queryByRole('dialog', { name: /Layout editor/ })).not.toBeInTheDocument()
  })

  it('switches previews and edits exact block values', () => {
    render(<Harness />)
    fireEvent.click(screen.getByRole('button', { name: /Keepsake layout/ }))
    expect(screen.getByLabelText('Block')).toHaveValue('card')
    fireEvent.click(screen.getByRole('button', { name: /Setup layout/ }))
    fireEvent.change(screen.getByLabelText('Block'), { target: { value: 'hero' } })
    fireEvent.change(screen.getByLabelText('X'), { target: { value: '33' } })
    expect(screen.getByLabelText('X')).toHaveValue(33)
  })

  it('undoes edits and rejects invalid JSON without replacing the layout', () => {
    render(<Harness />)
    fireEvent.change(screen.getByLabelText('X'), { target: { value: '44' } })
    fireEvent.click(screen.getByRole('button', { name: 'Undo' }))
    expect(screen.getByLabelText('X')).toHaveValue(18)
    fireEvent.change(screen.getByLabelText('Layout JSON'), { target: { value: '{"name":"private"}' } })
    fireEvent.click(screen.getByRole('button', { name: /Import layout/ }))
    expect(screen.getByRole('alert')).toHaveTextContent(/invalid|personal|schema/i)
    expect(screen.getByLabelText('X')).toHaveValue(18)
  })

  it('exports the current privacy-safe layout into the exchange field', () => {
    render(<Harness />)
    fireEvent.click(screen.getByRole('button', { name: /Export layout/ }))
    const exported = (screen.getByLabelText('Layout JSON') as HTMLTextAreaElement).value
    expect(exported).toContain('"schemaVersion": 1')
    expect(exported).not.toMatch(/birthday|contact|name/i)
  })
})

describe('v22 EditableBlock', () => {
  const block = DEFAULT_LAYOUT.screens.setup.hero

  it('drags a selected block and emits its bounded position', () => {
    const onChange = vi.fn<(patch: Partial<typeof block>) => void>()
    render(<EditableBlock editing selected id="hero" block={block} onSelect={() => undefined} onChange={onChange}><div>Hero</div></EditableBlock>)
    const target = screen.getByTestId('editable-hero')
    fireEvent.pointerDown(target, { pointerId: 5, clientX: 20, clientY: 30 })
    fireEvent.pointerMove(target, { pointerId: 5, clientX: 35, clientY: 50 })
    fireEvent.pointerUp(target, { pointerId: 5, clientX: 35, clientY: 50 })
    expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({ x: 33, y: 92 }))
  })

  it('resizes from the corner handle', () => {
    const onChange = vi.fn<(patch: Partial<typeof block>) => void>()
    render(<EditableBlock editing selected id="hero" block={block} onSelect={() => undefined} onChange={onChange}><div>Hero</div></EditableBlock>)
    const handle = screen.getByRole('button', { name: 'Resize hero' })
    fireEvent.pointerDown(handle, { pointerId: 6, clientX: 0, clientY: 0 })
    fireEvent.pointerMove(handle, { pointerId: 6, clientX: 20, clientY: 30 })
    fireEvent.pointerUp(handle, { pointerId: 6, clientX: 20, clientY: 30 })
    expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({ width: 414, height: 162 }))
  })
})
