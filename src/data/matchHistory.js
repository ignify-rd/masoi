import { ROLE_BY_ID, clampRoleCount } from './roles.js'

export const MATCHES_STORAGE_KEY = 'masoi.matches'

export const WINNER_TEAM_IDS = ['village', 'werewolf', 'vampire', 'other']

function newId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
}

export function loadMatches() {
  try {
    const raw = localStorage.getItem(MATCHES_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function normalizeRolesFromMatch(roles) {
  if (!roles || typeof roles !== 'object') return {}
  return Object.fromEntries(
    Object.entries(roles)
      .filter(([id, c]) => ROLE_BY_ID[id] && Number(c) > 0)
      .map(([id, c]) => [id, clampRoleCount(id, Number(c))])
      .filter(([, c]) => c > 0),
  )
}

export function formatMatchDate(iso) {
  if (!iso) return ''
  try {
    return new Date(iso).toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return ''
  }
}

export function saveMatch({ startedAt, totalPlayers, roles, notes = {}, winner }) {
  const match = {
    id: newId(),
    playedAt: new Date().toISOString(),
    startedAt: startedAt || null,
    totalPlayers,
    roles: { ...roles },
    notes: { ...notes },
    winner: winner || null,
  }

  const matches = loadMatches()
  matches.unshift(match)
  localStorage.setItem(MATCHES_STORAGE_KEY, JSON.stringify(matches))
  return match
}
