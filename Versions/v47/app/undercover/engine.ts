import { undercoverWordPair } from './word-pairs.ts'
import type { UndercoverPrivatePlayer, UndercoverRoom, UndercoverRoundResult } from './types.ts'

export const UNDERCOVER_ROOM_TTL_MS = 2 * 60 * 60 * 1000
export const UNDERCOVER_MIN_PLAYERS = 4
export const UNDERCOVER_MAX_PLAYERS = 12

export function createUndercoverRoom(code: string, hostUid: string, now = Date.now()): UndercoverRoom {
  return {
    code,
    hostUid,
    phase: 'lobby',
    members: { [hostUid]: { seat: 1, alive: true, online: true } },
    round: 0,
    speakerIndex: 0,
    voteCount: 0,
    lastEliminatedUid: null,
    winner: null,
    createdAt: now,
    updatedAt: now,
    expiresAt: now + UNDERCOVER_ROOM_TTL_MS,
    version: 1,
  }
}

function shuffled(values: readonly string[], random: () => number) {
  const result = [...values]
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.max(0, Math.min(index, Math.floor(random() * (index + 1))))
    ;[result[index], result[swapIndex]] = [result[swapIndex], result[index]]
  }
  return result
}

export function assignUndercoverRoles(playerUids: readonly string[], pairId: string, random: () => number = Math.random) {
  if (playerUids.length < UNDERCOVER_MIN_PLAYERS || playerUids.length > UNDERCOVER_MAX_PLAYERS) throw new Error('Who Is the Undercover requires 4–12 players')
  if (new Set(playerUids).size !== playerUids.length) throw new Error('Player identifiers must be unique')
  if (!undercoverWordPair(pairId)) throw new Error('Unknown word pair')
  const undercoverCount = playerUids.length >= 8 ? 2 : 1
  const undercoverUids = new Set(shuffled(playerUids, random).slice(0, undercoverCount))
  return Object.fromEntries(playerUids.map(uid => {
    const role = undercoverUids.has(uid) ? 'undercover' : 'civilian'
    const value: UndercoverPrivatePlayer = { role, pairId, wordSide: role === 'undercover' ? 'b' : 'a', voteUid: null }
    return [uid, value]
  }))
}

export function resolveUndercoverVotes(aliveUids: readonly string[], undercoverUids: readonly string[], votes: Readonly<Record<string, string>>): UndercoverRoundResult {
  const alive = new Set(aliveUids)
  if (alive.size !== aliveUids.length || alive.size < 2) throw new Error('At least two unique active players are required')
  const tallies: Record<string, number> = Object.fromEntries(aliveUids.map(uid => [uid, 0]))
  for (const voterUid of aliveUids) {
    const targetUid = votes[voterUid]
    if (!targetUid || !alive.has(targetUid) || targetUid === voterUid) throw new Error('Every active player must vote for another active player')
    tallies[targetUid] += 1
  }
  const highest = Math.max(...Object.values(tallies))
  const leaders = aliveUids.filter(uid => tallies[uid] === highest)
  if (leaders.length !== 1) return { eliminatedUid: null, tied: true, winner: null, tallies }
  const eliminatedUid = leaders[0]
  const remaining = aliveUids.filter(uid => uid !== eliminatedUid)
  const undercover = new Set(undercoverUids)
  const remainingUndercover = remaining.filter(uid => undercover.has(uid)).length
  const remainingCivilian = remaining.length - remainingUndercover
  const winner = remainingUndercover === 0 ? 'civilian' : remainingUndercover >= remainingCivilian ? 'undercover' : null
  return { eliminatedUid, tied: false, winner, tallies }
}
