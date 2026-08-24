import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth, inMemoryPersistence, setPersistence, signInAnonymously } from 'firebase/auth'
import { get, getDatabase, onDisconnect, onValue, ref, runTransaction, update } from 'firebase/database'
import { assignUndercoverRoles, createUndercoverRoom, resolveUndercoverVotes, UNDERCOVER_MAX_PLAYERS, UNDERCOVER_MIN_PLAYERS } from './engine.ts'
import { UNDERCOVER_WORD_PAIRS } from './word-pairs.ts'
import type { UndercoverPrivatePlayer, UndercoverRoom } from './types.ts'

const ROOM_PATH = 'undercoverRooms'
const PRIVATE_PATH = 'undercoverPrivate'
const ROOM_CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
const FIREBASE_CONFIG_URL = 'https://shine-truth-or-dare-share.web.app/__/firebase/init.json'

interface FirebaseServices {
  auth: ReturnType<typeof getAuth>
  database: ReturnType<typeof getDatabase>
  uid: string
}

let servicesPromise: Promise<FirebaseServices> | null = null

function normalizeCode(value: string) {
  return value.toUpperCase().replace(/[^A-HJ-NP-Z2-9]/g, '').slice(0, 6)
}

async function firebaseConfig() {
  const localConfigUrl = `${window.location.origin}/__/firebase/init.json`
  const url = window.location.host === 'shine-truth-or-dare-share.web.app' ? localConfigUrl : FIREBASE_CONFIG_URL
  const response = await fetch(url, { cache: 'no-store' })
  if (!response.ok) throw new Error('Firebase configuration is unavailable')
  return response.json()
}

async function services() {
  if (!servicesPromise) servicesPromise = (async () => {
    const app = getApps().length ? getApp() : initializeApp(await firebaseConfig())
    const auth = getAuth(app)
    await setPersistence(auth, inMemoryPersistence)
    const credential = auth.currentUser ? { user: auth.currentUser } : await signInAnonymously(auth)
    return { auth, database: getDatabase(app), uid: credential.user.uid }
  })().catch(error => {
    servicesPromise = null
    throw error
  })
  return servicesPromise
}

function createCode(random: () => number = Math.random) {
  return Array.from({ length: 6 }, () => ROOM_CODE_ALPHABET[Math.floor(random() * ROOM_CODE_ALPHABET.length)]).join('')
}

function activeRoom(value: unknown): UndercoverRoom {
  if (!value || typeof value !== 'object') throw new Error('Room not found')
  const room = value as UndercoverRoom
  if (room.expiresAt <= Date.now()) throw new Error('Room expired')
  return room
}

export async function currentUndercoverUid() {
  return (await services()).uid
}

export async function createSyncedUndercoverRoom() {
  const { database, uid } = await services()
  for (let attempt = 0; attempt < 8; attempt += 1) {
    const code = createCode()
    const roomRef = ref(database, `${ROOM_PATH}/${code}`)
    const result = await runTransaction(roomRef, current => current === null ? createUndercoverRoom(code, uid) : undefined, { applyLocally: false })
    if (result.committed) {
      await onDisconnect(roomRef).cancel()
      return { code, uid, room: activeRoom(result.snapshot.val()) }
    }
  }
  throw new Error('Could not reserve a room code')
}

export async function joinSyncedUndercoverRoom(rawCode: string) {
  const code = normalizeCode(rawCode)
  if (code.length !== 6) throw new Error('Enter a six-character room code')
  const { database, uid } = await services()
  const roomRef = ref(database, `${ROOM_PATH}/${code}`)
  const room = activeRoom((await get(roomRef)).val())
  if (room.phase !== 'lobby') throw new Error('This game has already started')
  const existing = room.members[uid]
  if (!existing && Object.keys(room.members).length >= UNDERCOVER_MAX_PLAYERS) throw new Error('This room is full')
  const seat = existing?.seat ?? Math.max(0, ...Object.values(room.members).map(member => member.seat)) + 1
  const memberRef = ref(database, `${ROOM_PATH}/${code}/members/${uid}`)
  const result = await runTransaction(memberRef, current => current ?? { seat, alive: true, online: true }, { applyLocally: false })
  if (!result.committed) throw new Error('Could not join this room')
  await onDisconnect(memberRef).update({ online: false })
  return { code, uid, room: activeRoom((await get(roomRef)).val()) }
}

export async function reconnectUndercoverRoom(rawCode: string) {
  const code = normalizeCode(rawCode)
  const { database, uid } = await services()
  const roomRef = ref(database, `${ROOM_PATH}/${code}`)
  const room = activeRoom((await get(roomRef)).val())
  if (!room.members[uid]) return joinSyncedUndercoverRoom(code)
  await update(ref(database, `${ROOM_PATH}/${code}/members/${uid}`), { online: true })
  return { code, uid, room }
}

export async function watchUndercoverRoom(code: string, listener: (room: UndercoverRoom | null) => void) {
  const { database } = await services()
  return onValue(ref(database, `${ROOM_PATH}/${normalizeCode(code)}`), snapshot => listener(snapshot.exists() ? activeRoom(snapshot.val()) : null))
}

export async function watchUndercoverPrivate(code: string, listener: (value: UndercoverPrivatePlayer | null) => void) {
  const { database, uid } = await services()
  return onValue(ref(database, `${PRIVATE_PATH}/${normalizeCode(code)}/${uid}`), snapshot => listener(snapshot.exists() ? snapshot.val() as UndercoverPrivatePlayer : null))
}

export async function watchHostUndercoverPrivate(code: string, listener: (value: Record<string, UndercoverPrivatePlayer>) => void) {
  const { database } = await services()
  return onValue(ref(database, `${PRIVATE_PATH}/${normalizeCode(code)}`), snapshot => listener(snapshot.val() ?? {}))
}

export async function startSyncedUndercoverGame(code: string) {
  const { database, uid } = await services()
  const roomRef = ref(database, `${ROOM_PATH}/${normalizeCode(code)}`)
  const room = activeRoom((await get(roomRef)).val())
  if (room.hostUid !== uid) throw new Error('Only the host can start')
  const activeUids = Object.entries(room.members).filter(([, member]) => member.online).sort((a, b) => a[1].seat - b[1].seat).map(([playerUid]) => playerUid)
  if (activeUids.length < UNDERCOVER_MIN_PLAYERS || activeUids.length > UNDERCOVER_MAX_PLAYERS) throw new Error('Who Is the Undercover requires 4–12 online players')
  const pair = UNDERCOVER_WORD_PAIRS[Math.floor(Math.random() * UNDERCOVER_WORD_PAIRS.length)]
  const assignments = assignUndercoverRoles(activeUids, pair.id)
  const changes: Record<string, unknown> = {
    [`${ROOM_PATH}/${room.code}/phase`]: 'reveal',
    [`${ROOM_PATH}/${room.code}/round`]: 1,
    [`${ROOM_PATH}/${room.code}/speakerIndex`]: 0,
    [`${ROOM_PATH}/${room.code}/voteCount`]: 0,
    [`${ROOM_PATH}/${room.code}/lastEliminatedUid`]: null,
    [`${ROOM_PATH}/${room.code}/winner`]: null,
    [`${ROOM_PATH}/${room.code}/updatedAt`]: Date.now(),
  }
  for (const [playerUid, assignment] of Object.entries(assignments)) {
    changes[`${ROOM_PATH}/${room.code}/members/${playerUid}/alive`] = true
    changes[`${PRIVATE_PATH}/${room.code}/${playerUid}`] = assignment
  }
  await update(ref(database), changes)
}

async function requireHostRoom(code: string) {
  const { database, uid } = await services()
  const roomRef = ref(database, `${ROOM_PATH}/${normalizeCode(code)}`)
  const room = activeRoom((await get(roomRef)).val())
  if (room.hostUid !== uid) throw new Error('Only the host can continue')
  return { database, roomRef, room }
}

export async function beginUndercoverDiscussion(code: string) {
  const { roomRef } = await requireHostRoom(code)
  await update(roomRef, { phase: 'discussion', speakerIndex: 0, updatedAt: Date.now() })
}

export async function advanceUndercoverSpeaker(code: string) {
  const { roomRef, room } = await requireHostRoom(code)
  const activeCount = Object.values(room.members).filter(member => member.alive).length
  if (room.speakerIndex + 1 >= activeCount) await update(roomRef, { phase: 'voting', speakerIndex: 0, voteCount: 0, updatedAt: Date.now() })
  else await update(roomRef, { speakerIndex: room.speakerIndex + 1, updatedAt: Date.now() })
}

export async function submitUndercoverVote(code: string, targetUid: string) {
  const { database, uid } = await services()
  if (targetUid === uid) throw new Error('Choose another active player')
  await update(ref(database, `${PRIVATE_PATH}/${normalizeCode(code)}/${uid}`), { voteUid: targetUid })
}

export async function settleUndercoverRound(code: string, privatePlayers: Record<string, UndercoverPrivatePlayer>) {
  const { database, room } = await requireHostRoom(code)
  if (room.phase !== 'voting') return false
  const activeUids = Object.entries(room.members).filter(([, member]) => member.alive).sort((a, b) => a[1].seat - b[1].seat).map(([playerUid]) => playerUid)
  if (!activeUids.every(playerUid => privatePlayers[playerUid]?.voteUid)) {
    await update(ref(database, `${ROOM_PATH}/${room.code}`), { voteCount: activeUids.filter(playerUid => privatePlayers[playerUid]?.voteUid).length })
    return false
  }
  const undercoverUids = activeUids.filter(playerUid => privatePlayers[playerUid].role === 'undercover')
  const votes = Object.fromEntries(activeUids.map(playerUid => [playerUid, privatePlayers[playerUid].voteUid!]))
  const result = resolveUndercoverVotes(activeUids, undercoverUids, votes)
  const changes: Record<string, unknown> = {
    [`${ROOM_PATH}/${room.code}/phase`]: result.winner ? 'result' : 'discussion',
    [`${ROOM_PATH}/${room.code}/round`]: result.winner ? room.round : room.round + 1,
    [`${ROOM_PATH}/${room.code}/speakerIndex`]: 0,
    [`${ROOM_PATH}/${room.code}/voteCount`]: 0,
    [`${ROOM_PATH}/${room.code}/lastEliminatedUid`]: result.eliminatedUid,
    [`${ROOM_PATH}/${room.code}/winner`]: result.winner,
    [`${ROOM_PATH}/${room.code}/updatedAt`]: Date.now(),
  }
  if (result.eliminatedUid) changes[`${ROOM_PATH}/${room.code}/members/${result.eliminatedUid}/alive`] = false
  for (const playerUid of activeUids) changes[`${PRIVATE_PATH}/${room.code}/${playerUid}/voteUid`] = null
  await update(ref(database), changes)
  return true
}

export async function closeUndercoverRoom(code: string) {
  const { database, uid } = await services()
  const normalized = normalizeCode(code)
  const room = activeRoom((await get(ref(database, `${ROOM_PATH}/${normalized}`))).val())
  if (room.hostUid === uid) {
    await update(ref(database), { [`${PRIVATE_PATH}/${normalized}`]: null })
    await update(ref(database), { [`${ROOM_PATH}/${normalized}`]: null })
  }
  else await update(ref(database, `${ROOM_PATH}/${normalized}/members/${uid}`), { online: false })
}

export function undercoverInvitationUrl(code: string) {
  const url = new URL(window.location.href)
  url.searchParams.set('undercoverRoom', normalizeCode(code))
  return url.toString()
}
