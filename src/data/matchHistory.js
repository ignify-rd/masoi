import { TEAM_IDS } from './roles.js'
import { normalizeThemeIds } from './themes.js'
import { readStored, writeStored } from './storage.js'

const MATCHES_STORAGE_KEY = 'masoi.matches'

export const WINNER_TEAM_IDS = TEAM_IDS

function newId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}

export function loadMatches() {
  return readStored(MATCHES_STORAGE_KEY, [], (value) =>
    Array.isArray(value) ? value : null,
  )
}

function storeMatches(matches) {
  writeStored(MATCHES_STORAGE_KEY, matches)
  return matches
}

/**
 * Các chủ đề của ván đã lưu (mảng rỗng nếu chơi mặc định). Ván cũ lưu một
 * `themeId`, ván mới lưu mảng `themeIds`; chủ đề đã bị xoá thì bỏ qua.
 */
export function themeIdsOfMatch(match) {
  return normalizeThemeIds(match?.themeIds ?? match?.themeId)
}

export function saveMatch({
  startedAt,
  totalPlayers,
  roles,
  notes = {},
  winner,
  themeIds = [],
}) {
  const match = {
    id: newId(),
    playedAt: new Date().toISOString(),
    startedAt: startedAt || null,
    totalPlayers,
    roles: { ...roles },
    notes: { ...notes },
    winner: winner || null,
    themeIds: normalizeThemeIds(themeIds),
  }

  storeMatches([match, ...loadMatches()])
  return match
}

export function deleteMatch(id) {
  return storeMatches(loadMatches().filter((match) => match.id !== id))
}

export function updateMatchWinner(id, winner) {
  return storeMatches(
    loadMatches().map((match) =>
      match.id === id ? { ...match, winner: winner || null } : match,
    ),
  )
}
