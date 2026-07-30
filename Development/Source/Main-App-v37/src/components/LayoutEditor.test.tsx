import { fireEvent, render, screen } from '@testing-library/react'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import type { LayoutScreen } from '../layout/layout-model'
import { createLayoutHistory, DEFAULT_LAYOUT } from '../layout/layout-model'
import EditableBlock from './EditableBlock'
import LayoutEditor from './LayoutEditor'
import { DEFAULT_PRESENTATION } from '../presentation/presentation-model'

function Harness({ open = true }: { open?: boolean }) {
  const [history, setHistory] = useState(() => createLayoutHistory(DEFAULT_LAYOUT))
  const [presentation, setPresentation] = useState(DEFAULT_PRESENTATION)
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
    directManipulation={false}
    onDirectManipulationChange={() => undefined}
    presentation={presentation}
    artworkId="preview-ma-zu"
    onPresentationChange={setPresentation}
  />
}

describe('V37 LayoutEditor', () => {
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

  it('uses compact category tabs and renders only the selected editor section', () => {
    render(<Harness />)
    expect(screen.getByRole('tablist', { name: 'Editor categories' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: '版面 Layout' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByLabelText('Block')).toBeInTheDocument()
    expect(screen.queryByLabelText('Layout JSON')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('tab', { name: '資料 Data' }))
    expect(screen.getByLabelText('Layout JSON')).toBeInTheDocument()
    expect(screen.queryByLabelText('Block')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('tab', { name: '歷史 History' }))
    expect(screen.getByRole('button', { name: 'Undo' })).toBeInTheDocument()
    expect(screen.queryByLabelText('Layout JSON')).not.toBeInTheDocument()
  })

  it('undoes edits and rejects invalid JSON without replacing the layout', () => {
    render(<Harness />)
    fireEvent.change(screen.getByLabelText('X'), { target: { value: '44' } })
    fireEvent.click(screen.getByRole('tab', { name: '歷史 History' }))
    fireEvent.click(screen.getByRole('button', { name: 'Undo' }))
    fireEvent.click(screen.getByRole('tab', { name: '版面 Layout' }))
    expect(screen.getByLabelText('X')).toHaveValue(18)
    fireEvent.click(screen.getByRole('tab', { name: '資料 Data' }))
    fireEvent.change(screen.getByLabelText('Layout JSON'), { target: { value: '{"name":"private"}' } })
    fireEvent.click(screen.getByRole('button', { name: /Import layout/ }))
    expect(screen.getByRole('alert')).toHaveTextContent(/invalid|personal|schema/i)
    fireEvent.click(screen.getByRole('tab', { name: '版面 Layout' }))
    expect(screen.getByLabelText('X')).toHaveValue(18)
  })

  it('exports the current privacy-safe layout into the exchange field', () => {
    render(<Harness />)
    fireEvent.click(screen.getByRole('tab', { name: '資料 Data' }))
    fireEvent.click(screen.getByRole('button', { name: /Export layout/ }))
    const exported = (screen.getByLabelText('Layout JSON') as HTMLTextAreaElement).value
    expect(exported).toContain('"schemaVersion": 1')
    expect(exported).not.toMatch(/birthday|contact|name/i)
  })

  it('shows full artwork and blessing controls for card screens', () => {
    render(<Harness />)
    fireEvent.click(screen.getByRole('button', { name: /Game layout/ }))
    fireEvent.click(screen.getByRole('tab', { name: '卡片 Card' }))
    expect(screen.getByLabelText('Artwork horizontal')).toBeInTheDocument()
    expect(screen.getByLabelText('Artwork vertical')).toBeInTheDocument()
    expect(screen.getByLabelText('Artwork zoom')).toBeInTheDocument()
    expect(screen.getByLabelText('Artwork height')).toBeInTheDocument()
    expect(screen.getByLabelText('Question font size')).toBeInTheDocument()
    expect(screen.getByLabelText('Question font size slider')).toHaveAttribute('type', 'range')
    expect(screen.getByLabelText('Blessing font size')).toBeInTheDocument()
    expect(screen.getByLabelText('Blessing font size slider')).toHaveAttribute('type', 'range')
    expect(screen.getByLabelText('Blessing line height')).toBeInTheDocument()
    expect(screen.getByLabelText('Blessing height')).toBeInTheDocument()
    expect(screen.getByLabelText('Blessing padding')).toBeInTheDocument()
    expect(screen.getByLabelText('Blessing horizontal')).toBeInTheDocument()
    expect(screen.getByLabelText('Blessing vertical')).toBeInTheDocument()
  })

  it('keeps the number fields and sliders synchronized independently', () => {
    render(<Harness />)
    fireEvent.click(screen.getByRole('button', { name: /Game layout/ }))
    fireEvent.click(screen.getByRole('tab', { name: '卡片 Card' }))
    fireEvent.change(screen.getByLabelText('Question font size slider'), { target: { value: '1.55' } })
    expect(screen.getByLabelText('Question font size')).toHaveValue(1.55)
    expect(screen.getByLabelText('Blessing font size')).toHaveValue(1.25)
    fireEvent.change(screen.getByLabelText('Blessing font size'), { target: { value: '1.4' } })
    expect(screen.getByLabelText('Blessing font size slider')).toHaveValue('1.4')
  })

  it('keeps direct manipulation off by default and exposes an explicit toggle', () => {
    render(<Harness />)
    expect(screen.getByLabelText('Direct manipulation')).not.toBeChecked()
  })
})

describe('V37 EditableBlock', () => {
  const block = DEFAULT_LAYOUT.screens.setup.hero

  it('drags a selected block and emits its bounded position', () => {
    const onChange = vi.fn<(patch: Partial<typeof block>) => void>()
    render(<EditableBlock editing selected directManipulation canvasScale={0.5} id="hero" block={block} onSelect={() => undefined} onChange={onChange}><div>Hero</div></EditableBlock>)
    const target = screen.getByTestId('editable-hero')
    fireEvent.pointerDown(target, { pointerId: 5, clientX: 20, clientY: 30 })
    fireEvent.pointerMove(target, { pointerId: 5, clientX: 35, clientY: 50 })
    fireEvent.pointerUp(target, { pointerId: 5, clientX: 35, clientY: 50 })
    expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({ x: 48, y: 112 }))
  })

  it('resizes from the corner handle', () => {
    const onChange = vi.fn<(patch: Partial<typeof block>) => void>()
    render(<EditableBlock editing selected directManipulation canvasScale={0.5} id="hero" block={block} onSelect={() => undefined} onChange={onChange}><div>Hero</div></EditableBlock>)
    const handle = screen.getByRole('button', { name: 'Resize hero' })
    fireEvent.pointerDown(handle, { pointerId: 6, clientX: 0, clientY: 0 })
    fireEvent.pointerMove(handle, { pointerId: 6, clientX: 20, clientY: 30 })
    fireEvent.pointerUp(handle, { pointerId: 6, clientX: 20, clientY: 30 })
    expect(onChange).toHaveBeenLastCalledWith(expect.objectContaining({ width: block.width + 40, height: block.height + 60 }))
  })

  it('does not move when direct manipulation is disabled or a control starts the gesture', () => {
    const onChange = vi.fn<(patch: Partial<typeof block>) => void>()
    render(<EditableBlock editing selected directManipulation={false} canvasScale={0.5} id="hero" block={block} onSelect={() => undefined} onChange={onChange}><button type="button">Choose</button></EditableBlock>)
    const button = screen.getByRole('button', { name: 'Choose' })
    fireEvent.pointerDown(button, { pointerId: 7, clientX: 20, clientY: 30 })
    fireEvent.pointerMove(button, { pointerId: 7, clientX: 80, clientY: 90 })
    expect(onChange).not.toHaveBeenCalled()
  })
})
