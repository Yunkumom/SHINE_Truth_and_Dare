export type UndercoverRole = 'civilian' | 'undercover'
export type UndercoverPhase = 'lobby' | 'reveal' | 'discussion' | 'voting' | 'result'
export type UndercoverWinner = UndercoverRole | null
export type UndercoverWordSide = 'a' | 'b'

export interface UndercoverMember {
  seat: number
  alive: boolean
  online: boolean
}

export interface UndercoverRoom {
  code: string
  hostUid: string
  phase: UndercoverPhase
  members: Record<string, UndercoverMember>
  round: number
  speakerIndex: number
  voteCount: number
  lastEliminatedUid: string | null
  winner: UndercoverWinner
  createdAt: number
  updatedAt: number
  expiresAt: number
  version: 1
}

export interface UndercoverPrivatePlayer {
  role: UndercoverRole
  pairId: string
  wordSide: UndercoverWordSide
  voteUid: string | null
}

export interface UndercoverWordPair {
  id: string
  a: { en: string, zh: string }
  b: { en: string, zh: string }
}

export interface UndercoverRoundResult {
  eliminatedUid: string | null
  tied: boolean
  winner: UndercoverWinner
  tallies: Record<string, number>
}

