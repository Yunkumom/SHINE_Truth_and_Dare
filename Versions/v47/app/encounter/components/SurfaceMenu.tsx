import { useState } from 'react'
import type { ReactNode } from 'react'

export type SurfaceMode = 'phone' | 'showcase' | 'studio'

export interface SurfaceMenuNavigationProps {
  surfaceMode: SurfaceMode
  onSurfaceModeChange: (mode: SurfaceMode) => void
  onHome: () => void
  onChooseKeepsake: () => void
  onChooseTruthOrDare: () => void
  onChooseFoodJourney: () => void
}

interface SurfaceMenuProps extends SurfaceMenuNavigationProps {
  children?: ReactNode
}

export default function SurfaceMenu({ surfaceMode, onSurfaceModeChange, onHome, onChooseKeepsake, onChooseTruthOrDare, onChooseFoodJourney, children }: SurfaceMenuProps) {
  const [open, setOpen] = useState(false)

  function choose(action: () => void) {
    setOpen(false)
    action()
  }

  return <div className="surface-menu">
    <button type="button" className="surface-menu-toggle" aria-label="開啟選單 · Open menu" aria-expanded={open} onClick={() => setOpen(value => !value)}>
      <span aria-hidden="true"><i /><i /><i /></span>
    </button>
    {open && <div className="surface-menu-panel" role="menu" aria-label="TRUTH OR DARE · V47">
      <header><b>TRUTH OR DARE</b><small>V47 · DISPLAY &amp; TOOLS</small></header>
      <section className="surface-menu-section" aria-label="顯示模式 · Display mode">
        <strong>顯示模式 · DISPLAY</strong>
        <button type="button" role="menuitemradio" aria-checked={surfaceMode === 'phone'} onClick={() => choose(() => onSurfaceModeChange('phone'))}>iPhone 17 Pro Max<small>預設介面 · DEFAULT</small></button>
        <button type="button" role="menuitemradio" aria-checked={surfaceMode === 'showcase'} onClick={() => choose(() => onSurfaceModeChange('showcase'))}>桌面展示<small>DESKTOP SHOWCASE</small></button>
        <button type="button" role="menuitemradio" aria-checked={surfaceMode === 'studio'} onClick={() => choose(() => onSurfaceModeChange('studio'))}>進階工作室<small>ADVANCED STUDIO</small></button>
      </section>
      <section className="surface-menu-section" aria-label="體驗選擇 · Experiences">
        <strong>前往 · EXPERIENCES</strong>
        <button type="button" role="menuitem" onClick={() => choose(onHome)}>選擇首頁<small>HOME</small></button>
        <button type="button" role="menuitem" onClick={() => choose(onChooseKeepsake)}>直接製作紀念卡<small>CREATE A KEEPSAKE</small></button>
        <button type="button" role="menuitem" onClick={() => choose(onChooseTruthOrDare)}>真心話大冒險<small>TRUTH OR DARE</small></button>
        <button type="button" role="menuitem" onClick={() => choose(onChooseFoodJourney)}>台灣美食旅行<small>TAIWAN FOOD JOURNEY</small></button>
      </section>
      {children && <section className="surface-menu-section surface-menu-context" aria-label="目前畫面工具 · Current tools" onClick={event => { if (!(event.target as HTMLElement).closest('.surface-menu-upload')) setOpen(false) }}><strong>目前畫面 · TOOLS</strong>{children}</section>}
    </div>}
  </div>
}
