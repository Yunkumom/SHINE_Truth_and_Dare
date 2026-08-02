import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import type { ArtworkCollection, ArtworkPreference, ArtworkVariant, Card, SessionQuestionManagerState } from '../types'
import MobileSettings from './MobileSettings'

const artwork: ArtworkVariant = {
  id: 'art-1', deityId: 'subject-1', collectionId: 'collection-1', zhName: '測試卡', enName: 'Test Card', src: '/art.webp', hiddenTaiwan: 'test', portraitFocus: { x: 50, y: 50 },
  taiwanHotspot: { x: 50, y: 50, scale: 1, rotation: 0, color: '#fff', accent: '#000' },
}
const collection: ArtworkCollection = {
  id: 'collection-1', family: 'deity', region: 'TW', zhName: '測試系列', enName: 'Test Collection', zhDescription: '測試', enDescription: 'Test', availability: 'available', artworkIds: ['art-1'],
}
const questions: Card[] = [{ id: 'card-1', level: 1, mode: 'truth', zh: '測試問題', en: 'Test question' }]
const manager: SessionQuestionManagerState = { disabledQuestionIds: [], customQuestions: [], selectedQuestionId: null, showRealYou: true, showQuestion: true }
const preference: ArtworkPreference = { mode: 'random', collectionId: 'collection-1' }

describe('v39 mobile settings', () => {
  it('provides accessible draw settings and never offers a blessing visibility toggle', async () => {
    const user = userEvent.setup()
    const onLevelChange = vi.fn()
    render(<MobileSettings open onClose={() => undefined} level={1} mode="random" onLevelChange={onLevelChange} onModeChange={() => undefined} artworks={[artwork]} collections={[collection]} artworkPreference={preference} onArtworkPreferenceChange={() => undefined} questions={questions} manager={manager} onManagerChange={() => undefined} />)

    expect(screen.getByRole('dialog', { name: '相遇卡設定 · Encounter settings' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '關閉設定' })).toHaveFocus()
    await user.click(screen.getByRole('button', { name: 'L2' }))
    expect(onLevelChange).toHaveBeenCalledWith(2)
    await user.click(screen.getByRole('button', { name: '卡片內容' }))
    expect(screen.getByRole('checkbox', { name: '問題 · Question' })).toBeInTheDocument()
    expect(screen.queryByRole('checkbox', { name: /祝福|Blessing/i })).not.toBeInTheDocument()
    expect(screen.getByText(/祝福會固定保留/)).toBeInTheDocument()
  })

  it('selects a governed artwork independently and adds a session-only custom question', async () => {
    const user = userEvent.setup()
    const onArtworkPreferenceChange = vi.fn()
    const onManagerChange = vi.fn()
    render(<MobileSettings open onClose={() => undefined} level={1} mode="random" onLevelChange={() => undefined} onModeChange={() => undefined} artworks={[artwork]} collections={[collection]} artworkPreference={preference} onArtworkPreferenceChange={onArtworkPreferenceChange} questions={questions} manager={manager} onManagerChange={onManagerChange} />)

    await user.click(screen.getByRole('button', { name: '卡庫' }))
    await user.click(screen.getByRole('button', { name: '指定 測試卡' }))
    expect(onArtworkPreferenceChange).toHaveBeenCalledWith({ mode: 'specific', collectionId: 'collection-1', artworkId: 'art-1' })

    await user.click(screen.getByRole('button', { name: '問題庫' }))
    await user.type(screen.getByPlaceholderText('輸入中文問題'), '新的問題')
    await user.click(screen.getByRole('button', { name: '＋ 新增問題' }))
    expect(onManagerChange).toHaveBeenCalledWith(expect.objectContaining({ customQuestions: [expect.objectContaining({ zh: '新的問題', en: '新的問題', level: 1, mode: 'truth' })] }))
  })
})
