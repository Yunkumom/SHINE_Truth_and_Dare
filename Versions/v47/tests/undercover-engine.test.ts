import assert from 'node:assert/strict'
import test from 'node:test'
import { assignUndercoverRoles, createUndercoverRoom, resolveUndercoverVotes } from '../app/undercover/engine.ts'
import { UNDERCOVER_WORD_PAIRS } from '../app/undercover/word-pairs.ts'

const NOW = 1_800_000_000_000
const players = (count: number) => Array.from({ length: count }, (_, index) => `uid-${index + 1}`)

test('rooms are anonymous, expire in two hours, and begin in a lobby', () => {
  const room = createUndercoverRoom('ABC234', 'uid-1', NOW)
  assert.equal(room.phase, 'lobby')
  assert.equal(room.expiresAt, NOW + 2 * 60 * 60 * 1000)
  assert.deepEqual(room.members, { 'uid-1': { seat: 1, alive: true, online: true } })
  assert.doesNotMatch(JSON.stringify(room), /name|contact|birthday|answer|note|upload|word|role/i)
})

test('four to seven players receive exactly one undercover assignment', () => {
  const pair = UNDERCOVER_WORD_PAIRS[0]
  const assignments = assignUndercoverRoles(players(7), pair.id, () => 0)
  assert.equal(Object.values(assignments).filter(value => value.role === 'undercover').length, 1)
  assert.equal(new Set(Object.values(assignments).map(value => value.wordSide)).size, 2)
  assert.ok(Object.values(assignments).every(value => value.pairId === pair.id))
})

test('eight to twelve players receive exactly two undercover assignments', () => {
  const assignments = assignUndercoverRoles(players(12), UNDERCOVER_WORD_PAIRS[1].id, () => 0.75)
  assert.equal(Object.values(assignments).filter(value => value.role === 'undercover').length, 2)
  assert.equal(Object.values(assignments).filter(value => value.role === 'civilian').length, 10)
})

test('assignment rejects unsupported player counts and unknown word pairs', () => {
  assert.throws(() => assignUndercoverRoles(players(3), UNDERCOVER_WORD_PAIRS[0].id), /4–12/)
  assert.throws(() => assignUndercoverRoles(players(13), UNDERCOVER_WORD_PAIRS[0].id), /4–12/)
  assert.throws(() => assignUndercoverRoles(players(4), 'missing-pair'), /word pair/i)
})

test('a tied vote eliminates nobody and keeps the game active', () => {
  const result = resolveUndercoverVotes(
    players(4),
    ['uid-4'],
    { 'uid-1': 'uid-3', 'uid-2': 'uid-4', 'uid-3': 'uid-4', 'uid-4': 'uid-3' },
  )
  assert.equal(result.eliminatedUid, null)
  assert.equal(result.winner, null)
  assert.equal(result.tied, true)
})

test('civilians win when the last undercover player is eliminated', () => {
  const result = resolveUndercoverVotes(
    players(5),
    ['uid-5'],
    { 'uid-1': 'uid-5', 'uid-2': 'uid-5', 'uid-3': 'uid-5', 'uid-4': 'uid-2', 'uid-5': 'uid-2' },
  )
  assert.equal(result.eliminatedUid, 'uid-5')
  assert.equal(result.winner, 'civilian')
})

test('undercover wins once undercover players are not outnumbered', () => {
  const result = resolveUndercoverVotes(
    ['uid-1', 'uid-2', 'uid-3'],
    ['uid-3'],
    { 'uid-1': 'uid-2', 'uid-2': 'uid-1', 'uid-3': 'uid-2' },
  )
  assert.equal(result.eliminatedUid, 'uid-2')
  assert.equal(result.winner, 'undercover')
})

