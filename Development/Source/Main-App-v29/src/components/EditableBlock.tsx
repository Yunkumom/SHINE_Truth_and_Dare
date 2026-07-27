import { useRef } from 'react'
import type { CSSProperties, PointerEvent, ReactNode } from 'react'
import type { LayoutBlock } from '../layout/layout-model'

interface EditableBlockProps {
  id: string
  block: LayoutBlock
  editing: boolean
  selected: boolean
  snap?: boolean
  onSelect: () => void
  onChange: (patch: Partial<LayoutBlock>) => void
  children: ReactNode
  className?: string
}

interface DirectGesture {
  kind: 'move' | 'resize'
  pointerId: number
  startX: number
  startY: number
  block: LayoutBlock
}

const snapValue = (value: number, snap: boolean) => snap ? Math.round(value / 4) * 4 : value

export default function EditableBlock({ id, block, editing, selected, snap = false, onSelect, onChange, children, className = '' }: EditableBlockProps) {
  const gesture = useRef<DirectGesture | null>(null)

  function beginMove(event: PointerEvent<HTMLDivElement>) {
    if (!editing || (event.target as HTMLElement).closest('[data-resize-handle]')) return
    event.preventDefault()
    event.stopPropagation()
    onSelect()
    gesture.current = { kind: 'move', pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, block }
    event.currentTarget.setPointerCapture?.(event.pointerId)
  }

  function beginResize(event: PointerEvent<HTMLButtonElement>) {
    event.preventDefault()
    event.stopPropagation()
    onSelect()
    gesture.current = { kind: 'resize', pointerId: event.pointerId, startX: event.clientX, startY: event.clientY, block }
    event.currentTarget.setPointerCapture?.(event.pointerId)
  }

  function update(event: PointerEvent<HTMLElement>) {
    const active = gesture.current
    if (!active || active.pointerId !== event.pointerId) return
    const dx = event.clientX - active.startX
    const dy = event.clientY - active.startY
    if (active.kind === 'move') onChange({ x: snapValue(active.block.x + dx, snap), y: snapValue(active.block.y + dy, snap) })
    else onChange({ width: snapValue(active.block.width + dx, snap), height: snapValue(active.block.height + dy, snap) })
  }

  function finish(event: PointerEvent<HTMLElement>) {
    if (!gesture.current || gesture.current.pointerId !== event.pointerId) return
    gesture.current = null
    event.currentTarget.releasePointerCapture?.(event.pointerId)
  }

  const style = {
    left: block.x,
    top: block.y,
    width: block.width,
    height: block.height,
    zIndex: block.z,
    padding: block.padding,
    '--block-font-scale': block.fontScale,
  } as CSSProperties

  return <div
    className={`editable-block ${className}${editing ? ' is-editing' : ''}${selected ? ' is-selected' : ''}`}
    data-testid={`editable-${id}`}
    data-layout-block={id}
    style={style}
    onPointerDown={beginMove}
    onPointerMove={update}
    onPointerUp={finish}
    onPointerCancel={finish}
  >
    {children}
    {editing && selected && <button
      type="button"
      className="resize-handle"
      data-resize-handle
      aria-label={`Resize ${id}`}
      onPointerDown={beginResize}
      onPointerMove={update}
      onPointerUp={finish}
      onPointerCancel={finish}
    />}
    {editing && <span className="block-label" aria-hidden="true">{id}</span>}
  </div>
}
