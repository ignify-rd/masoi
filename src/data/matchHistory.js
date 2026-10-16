import { TEAM_IDS } from './roles.js'
import { THEME_BY_ID } from './themes.js'
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

/** Chủ đề của ván đã lưu (null nếu ván chơi mặc định hoặc chủ đề đã bị xóa). */
export function normalizeThemeFromMatch(themeId) {
  return themeId && THEME_BY_ID[themeId] ? themeId : null
}

export function saveMatch({
  startedAt,
  totalPlayers,
  roles,
  notes = {},
  winner,
  themeId = null,
}) {
  const match = {
    id: newId(),
    playedAt: new Date().toISOString(),
    startedAt: startedAt || null,
    totalPlayers,
    roles: { ...roles },
    notes: { ...notes },
    winner: winner || null,
    themeId: normalizeThemeFromMatch(themeId),
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
