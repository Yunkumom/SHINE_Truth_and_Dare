import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import QRCode from 'qrcode'
import type { Language } from '../types'
import type { UndercoverPrivatePlayer, UndercoverRoom } from '../../undercover/types.ts'
import { undercoverWordPair } from '../../undercover/word-pairs.ts'
import {
  advanceUndercoverSpeaker,
  beginUndercoverDiscussion,
  closeUndercoverRoom,
  createSyncedUndercoverRoom,
  currentUndercoverUid,
  joinSyncedUndercoverRoom,
  settleUndercoverRound,
  startSyncedUndercoverGame,
  submitUndercoverVote,
  undercoverInvitationUrl,
  watchHostUndercoverPrivate,
  watchUndercoverPrivate,
  watchUndercoverRoom,
} from '../../undercover/firebase.ts'
import SurfaceMenu from './SurfaceMenu'
import type { SurfaceMenuNavigationProps } from './SurfaceMenu'

interface WhoIsUndercoverProps extends SurfaceMenuNavigationProps {
  language: Language
  initialCode?: string
  onBack: () => void
}

function localize(language: Language, en: string, zh: string) {
  if (language === 'en') return en
  if (language === 'zh') return zh
  return `${zh} · ${en}`
}

function errorMessage(language: Language, error: unknown) {
  const message = error instanceof Error ? error.message : 'Connection unavailable'
  const known: Record<string, string> = {
    'Room not found': '找不到房間',
    'Room expired': '房間已逾時',
    'This game has already started': '遊戲已經開始',
    'This room is full': '房間已滿',
    'Enter a six-character room code': '請輸入六碼房號',
    'Who Is the Undercover requires 4–12 online players': '需要 4–12 位在線玩家',
  }
  return localize(language, message, known[message] ?? '連線暫時無法使用，請稍後再試')
}

export default function WhoIsUndercover({ language, initialCode = '', onBack, ...navigation }: WhoIsUndercoverProps) {
  const [roomCode, setRoomCode] = useState('')
  const [joinCode, setJoinCode] = useState(initialCode)
  const [uid, setUid] = useState('')
  const [room, setRoom] = useState<UndercoverRoom | null>(null)
  const [privatePlayer, setPrivatePlayer] = useState<UndercoverPrivatePlayer | null>(null)
  const [hostPrivate, setHostPrivate] = useState<Record<string, UndercoverPrivatePlayer>>({})
  const [qrDataUrl, setQrDataUrl] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [wordVisible, setWordVisible] = useState(false)
  const attemptedInitialJoin = useRef(false)

  const orderedMembers = useMemo(() => room ? Object.entries(room.members).sort((a, b) => a[1].seat - b[1].seat) : [], [room])
  const activeMembers = orderedMembers.filter(([, member]) => member.alive)
  const isHost = Boolean(room && uid === room.hostUid)
  const mySeat = room?.members[uid]?.seat ?? 0
  const pair = privatePlayer ? undercoverWordPair(privatePlayer.pairId) : null
  const visibleWord = pair && privatePlayer ? pair[privatePlayer.wordSide] : null
  const currentSpeaker = activeMembers[room?.speakerIndex ?? 0]

  const enterRoom = useCallback(async (action: () => Promise<{ code: string, uid: string, room: UndercoverRoom }>) => {
    setBusy(true); setError('')
    try {
      const joined = await action()
      setUid(joined.uid); setRoomCode(joined.code); setRoom(joined.room)
      window.history.replaceState(null, '', undercoverInvitationUrl(joined.code))
    } catch (caught) { setError(errorMessage(language, caught)) } finally { setBusy(false) }
  }, [language])

  useEffect(() => {
    if (!initialCode || attemptedInitialJoin.current) return
    attemptedInitialJoin.current = true
    void enterRoom(() => joinSyncedUndercoverRoom(initialCode))
  }, [initialCode, enterRoom])

  useEffect(() => {
    if (!roomCode) return
    let stopRoom: (() => void) | undefined
    let stopPrivate: (() => void) | undefined
    let cancelled = false
    void currentUndercoverUid().then(currentUid => { if (!cancelled) setUid(currentUid) })
    void watchUndercoverRoom(roomCode, value => {
      setRoom(value)
      if (!value) { setRoomCode(''); setPrivatePlayer(null); setError(localize(language, 'The host closed the room', '房主已關閉房間')) }
    }).then(stop => { if (cancelled) stop(); else stopRoom = stop })
    void watchUndercoverPrivate(roomCode, setPrivatePlayer).then(stop => { if (cancelled) stop(); else stopPrivate = stop })
    return () => { cancelled = true; stopRoom?.(); stopPrivate?.() }
  }, [roomCode, language])

  useEffect(() => {
    if (!roomCode || !isHost) return
    let stopPrivate: (() => void) | undefined
    let cancelled = false
    void watchHostUndercoverPrivate(roomCode, setHostPrivate).then(stop => { if (cancelled) stop(); else stopPrivate = stop })
    return () => { cancelled = true; stopPrivate?.() }
  }, [roomCode, isHost])

  useEffect(() => {
    if (!isHost || room?.phase !== 'voting') return
    void settleUndercoverRound(room.code, hostPrivate).catch(caught => setError(errorMessage(language, caught)))
  }, [hostPrivate, isHost, room?.code, room?.phase, language])

  useEffect(() => {
    if (!roomCode) return
    void QRCode.toDataURL(undercoverInvitationUrl(roomCode), { width: 248, margin: 1, color: { dark: '#17303f', light: '#fffaf0' } }).then(setQrDataUrl).catch(() => setQrDataUrl(''))
  }, [roomCode])

  async function run(action: () => Promise<unknown>) {
    setBusy(true); setError('')
    try { await action() } catch (caught) { setError(errorMessage(language, caught)) } finally { setBusy(false) }
  }

  async function shareInvitation() {
    if (!room) return
    const url = undercoverInvitationUrl(room.code)
    const shareData = { title: localize(language, 'Who Is the Undercover? · V47', '誰是臥底 · V47'), text: localize(language, `Join room ${room.code}`, `加入房間 ${room.code}`), url }
    if (navigator.share) await navigator.share(shareData)
    else await navigator.clipboard.writeText(url)
  }

  async function leave() {
    if (roomCode) await closeUndercoverRoom(roomCode).catch(() => undefined)
    const url = new URL(window.location.href); url.searchParams.delete('undercoverRoom'); window.history.replaceState(null, '', url)
    setRoomCode(''); setRoom(null); setPrivatePlayer(null); setHostPrivate({}); onBack()
  }

  const header = <header className="undercover-header">
    <button type="button" className="undercover-back" onClick={() => void leave()} aria-label={localize(language, 'Back', '返回')}>←</button>
    <div><h1>{localize(language, 'WHO IS THE UNDERCOVER?', '誰是臥底')}</h1><small>SYNCED ROOM · V47</small></div>
    <SurfaceMenu language={language} {...navigation} />
  </header>

  if (!room) return <section className="undercover-canvas" aria-label={localize(language, 'Who Is the Undercover?', '誰是臥底')}>
    {header}
    <div className="undercover-entry">
      <div className="undercover-intro"><span aria-hidden="true">◐</span><small>4–12 PLAYERS · LIVE SYNC</small><h2>{localize(language, 'One room, two words, no obvious clues.', '同一個房間、兩個相近詞，誰藏得最好？')}</h2><p>{localize(language, 'Each phone privately reveals one word; describe it without saying it, then vote together.', '每支手機只顯示自己的詞語；不能直接說答案，描述後一起投票。')}</p></div>
      <button type="button" className="undercover-primary" disabled={busy} onClick={() => void enterRoom(createSyncedUndercoverRoom)}><b>{localize(language, 'Create room', '建立房間')}</b><small>HOST A GAME</small><i>→</i></button>
      <div className="undercover-divider"><span>{localize(language, 'or join', '或加入')}</span></div>
      <form className="undercover-join" onSubmit={event => { event.preventDefault(); void enterRoom(() => joinSyncedUndercoverRoom(joinCode)) }}>
        <label>{localize(language, 'Room code', '房間代碼')}<input value={joinCode} onChange={event => setJoinCode(event.target.value.toUpperCase())} inputMode="text" autoCapitalize="characters" autoComplete="off" maxLength={6} placeholder="ABC234" /></label>
        <button type="submit" disabled={busy || joinCode.length < 6}>{localize(language, 'Join room', '加入房間')}</button>
      </form>
      <p className="undercover-privacy">{localize(language, 'Anonymous seats only · No profiles or conversation uploads', '只使用匿名座位 · 不建立個人檔案、不上傳對話')}</p>
      {error && <p className="undercover-error" role="alert">{error}</p>}
    </div>
  </section>

  const seatLabel = (seat: number) => localize(language, `Player ${seat}`, `玩家 ${seat}`)

  return <section className="undercover-canvas" aria-label={localize(language, 'Who Is the Undercover room', '誰是臥底房間')}>
    {header}
    <div className="undercover-room-bar"><span>{localize(language, 'ROOM', '房間')}</span><b>{room.code}</b><small>{localize(language, `You are ${seatLabel(mySeat)}`, `你是${seatLabel(mySeat)}`)}</small></div>
    {room.phase === 'lobby' && <div className="undercover-lobby">
      <div className="undercover-qr">{qrDataUrl && <img src={qrDataUrl} alt={localize(language, `QR code for room ${room.code}`, `房間 ${room.code} 的 QR Code`)} />}<div><b>{room.code}</b><span>{localize(language, 'Scan or enter the code', '掃描或輸入房號')}</span><button type="button" onClick={() => void run(shareInvitation)}>{localize(language, 'Share invitation', '分享邀請')}</button></div></div>
      <div className="undercover-members"><header><b>{localize(language, 'Players', '玩家')}</b><span>{orderedMembers.length} / 12</span></header>{orderedMembers.map(([playerUid, member]) => <div key={playerUid} className={member.online ? '' : 'offline'}><i>{member.seat}</i><span>{seatLabel(member.seat)}</span><small>{playerUid === room.hostUid ? localize(language, 'HOST', '房主') : member.online ? localize(language, 'READY', '已加入') : localize(language, 'OFFLINE', '離線')}</small></div>)}</div>
      {isHost ? <button type="button" className="undercover-primary" disabled={busy || orderedMembers.filter(([, member]) => member.online).length < 4} onClick={() => void run(() => startSyncedUndercoverGame(room.code))}><b>{localize(language, 'Start game', '開始遊戲')}</b><small>{localize(language, '4–12 online players', '需要 4–12 位在線玩家')}</small><i>→</i></button> : <div className="undercover-waiting"><span className="undercover-pulse" />{localize(language, 'Waiting for the host to start…', '等待房主開始遊戲⋯')}</div>}
    </div>}

    {room.phase === 'reveal' && <div className="undercover-stage undercover-reveal-stage">
      <div className="undercover-stage-copy"><small>PRIVATE REVEAL · {seatLabel(mySeat)}</small><h2>{localize(language, 'Press and hold to see your word', '按住卡片查看你的詞語')}</h2><p>{localize(language, 'Keep the screen away from other players.', '請遮住畫面，不要讓其他玩家看到。')}</p></div>
      <button type="button" className={`undercover-word-card${wordVisible ? ' is-visible' : ''}`} onPointerDown={() => setWordVisible(true)} onPointerUp={() => setWordVisible(false)} onPointerCancel={() => setWordVisible(false)} onPointerLeave={() => setWordVisible(false)}>
        {wordVisible && privatePlayer && visibleWord ? <><small>{localize(language, privatePlayer.role === 'undercover' ? 'UNDERCOVER' : 'CIVILIAN', privatePlayer.role === 'undercover' ? '臥底' : '平民')}</small><b>{language === 'zh' ? visibleWord.zh : visibleWord.en}</b>{language === 'bilingual' && <span>{visibleWord.zh}</span>}</> : <><span aria-hidden="true">◐</span><b>{localize(language, 'HOLD TO REVEAL', '按住揭曉')}</b></>}
      </button>
      {isHost ? <button type="button" className="undercover-primary" disabled={busy} onClick={() => void run(() => beginUndercoverDiscussion(room.code))}><b>{localize(language, 'Everyone is ready', '大家都看完了')}</b><small>{localize(language, 'Begin descriptions', '開始描述')}</small><i>→</i></button> : <div className="undercover-waiting"><span className="undercover-pulse" />{localize(language, 'Check your word, then wait for the host.', '看完你的詞語後，等待房主繼續。')}</div>}
    </div>}

    {room.phase === 'discussion' && <div className="undercover-stage undercover-discussion-stage">
      <div className="undercover-round"><small>{localize(language, 'ROUND', '回合')}</small><b>{String(room.round).padStart(2, '0')}</b></div>
      {room.lastEliminatedUid && <p className="undercover-round-result">{localize(language, `${seatLabel(room.members[room.lastEliminatedUid]?.seat ?? 0)} left the round.`, `${seatLabel(room.members[room.lastEliminatedUid]?.seat ?? 0)}已離開本回合。`)}</p>}
      <div className="undercover-speaker"><span>{localize(language, 'CURRENT SPEAKER', '目前描述者')}</span><b>{currentSpeaker ? seatLabel(currentSpeaker[1].seat) : '—'}</b><p>{localize(language, 'Give one useful clue without saying the word.', '提供一個有用線索，但不能直接說出詞語。')}</p></div>
      <ol className="undercover-speaker-order">{activeMembers.map(([playerUid, member], index) => <li key={playerUid} className={index === room.speakerIndex ? 'active' : ''}><i>{member.seat}</i><span>{seatLabel(member.seat)}</span>{playerUid === uid && <small>{localize(language, 'YOU', '你')}</small>}</li>)}</ol>
      {isHost ? <button type="button" className="undercover-primary" disabled={busy} onClick={() => void run(() => advanceUndercoverSpeaker(room.code))}><b>{room.speakerIndex + 1 >= activeMembers.length ? localize(language, 'Start voting', '開始投票') : localize(language, 'Next speaker', '下一位')}</b><small>{room.speakerIndex + 1} / {activeMembers.length}</small><i>→</i></button> : <div className="undercover-waiting"><span className="undercover-pulse" />{localize(language, 'The host controls the speaking order.', '房主正在控制描述順序。')}</div>}
    </div>}

    {room.phase === 'voting' && <div className="undercover-stage undercover-voting-stage">
      <div className="undercover-stage-copy"><small>SECRET BALLOT · ROUND {room.round}</small><h2>{localize(language, 'Who sounds different?', '誰的描述不太一樣？')}</h2><p>{localize(language, 'Choose one active player; your vote stays private until the round resolves.', '選擇一位仍在場的玩家；結果結算前投票會保持私密。')}</p></div>
      <div className="undercover-ballot">{activeMembers.filter(([playerUid]) => playerUid !== uid).map(([playerUid, member]) => <button type="button" key={playerUid} disabled={busy || Boolean(privatePlayer?.voteUid)} aria-pressed={privatePlayer?.voteUid === playerUid} onClick={() => void run(() => submitUndercoverVote(room.code, playerUid))}><i>{member.seat}</i><span>{seatLabel(member.seat)}</span><b>{privatePlayer?.voteUid === playerUid ? '✓' : '○'}</b></button>)}</div>
      <div className="undercover-waiting"><span className="undercover-pulse" />{privatePlayer?.voteUid ? localize(language, `Vote locked · ${room.voteCount}/${activeMembers.length}`, `已完成投票 · ${room.voteCount}/${activeMembers.length}`) : localize(language, 'Choose carefully.', '請仔細選擇。')}</div>
    </div>}

    {room.phase === 'result' && <div className="undercover-stage undercover-result-stage">
      <span className="undercover-result-mark" aria-hidden="true">✓</span><small>GAME COMPLETE · V47</small><h2>{room.winner === 'civilian' ? localize(language, 'Civilians found the undercover!', '平民成功找出臥底！') : localize(language, 'The undercover survived!', '臥底成功存活！')}</h2><p>{localize(language, `You were ${privatePlayer?.role === 'undercover' ? 'the undercover' : 'a civilian'}.`, `你的身分是${privatePlayer?.role === 'undercover' ? '臥底' : '平民'}。`)}</p>
      {visibleWord && <div className="undercover-final-word"><small>{localize(language, 'YOUR WORD', '你的詞語')}</small><b>{language === 'zh' ? visibleWord.zh : visibleWord.en}</b>{language === 'bilingual' && <span>{visibleWord.zh}</span>}</div>}
      {isHost && <button type="button" className="undercover-primary" disabled={busy} onClick={() => void run(() => startSyncedUndercoverGame(room.code))}><b>{localize(language, 'Play again', '再玩一局')}</b><small>{localize(language, 'New words, same room', '同一房間、全新詞語')}</small><i>↻</i></button>}
      <button type="button" className="undercover-secondary" onClick={() => void leave()}>{localize(language, 'Return to experiences', '返回遊戲選擇')}</button>
    </div>}
    {error && <p className="undercover-error undercover-room-error" role="alert">{error}</p>}
  </section>
}
