import { ROLE_BY_ID } from './roles.js'

export const SUGGEST_MIN_PLAYERS = 4
export const SUGGEST_MAX_PLAYERS = 24

const WOLF_ID = 'werewolf'
const VILLAGER_ID = 'villager'

/** Vai có chữ "Sói" trong tên (Ma Sói, Sói Con, …). */
export function isWolfNamedRole(id) {
  return (ROLE_BY_ID[id]?.name || '').includes('Sói')
}

/** Số lá Dân Làng (dân thường). */
export function countVillagers(setup) {
  return setup[VILLAGER_ID] || 0
}

/** Tổng số lá có tên chứa "Sói". */
export function countWolfNamed(setup) {
  return Object.entries(setup).reduce(
    (sum, [id, count]) => (isWolfNamedRole(id) ? sum + count : sum),
    0,
  )
}

/** Dân Làng >= số vai tên Sói. */
export function meetsVillagerGteWolf(setup) {
  return countVillagers(setup) >= countWolfNamed(setup)
}

const SPECIAL_TIERS = [
  { id: 'seer', minPlayers: 0 },
  { id: 'guard', minPlayers: 7 },
  { id: 'witch', minPlayers: 8 },
  { id: 'hunter', minPlayers: 10 },
  { id: 'cupid', minPlayers: 12 },
  { id: 'cursed', minPlayers: 12 },
]

const SWAPS = [
  { from: VILLAGER_ID, to: 'cursed' },
  { from: 'cursed', to: VILLAGER_ID },
  { from: VILLAGER_ID, to: 'witch' },
  { from: 'witch', to: VILLAGER_ID },
  { from: VILLAGER_ID, to: 'guard' },
  { from: 'guard', to: VILLAGER_ID },
  { from: VILLAGER_ID, to: 'hunter' },
  { from: 'hunter', to: VILLAGER_ID },
  { from: VILLAGER_ID, to: WOLF_ID },
  { from: WOLF_ID, to: VILLAGER_ID },
]

function specialCountFor(n) {
  return SPECIAL_TIERS.filter((t) => n >= t.minPlayers).length
}

function computeTotalValue(setup) {
  return Object.entries(setup).reduce(
    (sum, [id, count]) => sum + (ROLE_BY_ID[id]?.value || 0) * count,
    0,
  )
}

function canSwap(setup, { from, to }) {
  if ((setup[from] || 0) <= 0) return false
  if (from === WOLF_ID && setup[from] <= 1) return false
  const toRole = ROLE_BY_ID[to]
  if (!toRole) return false
  if ((setup[to] || 0) >= toRole.max) return false

  const next = applySwap(setup, { from, to })
  return meetsVillagerGteWolf(next)
}

function applySwap(setup, { from, to }) {
  const next = { ...setup }
  next[from] -= 1
  if (next[from] <= 0) delete next[from]
  next[to] = (next[to] || 0) + 1
  return next
}

/** Giảm Sói hoặc đổi vai đặc biệt → Dân Làng cho đến khi đủ ràng buộc. */
function enforceVillagerGteWolf(setup) {
  let next = { ...setup }
  while (!meetsVillagerGteWolf(next)) {
    if ((next[WOLF_ID] || 0) > 1) {
      next[WOLF_ID] -= 1
      if (next[WOLF_ID] <= 0) delete next[WOLF_ID]
      next[VILLAGER_ID] = (next[VILLAGER_ID] || 0) + 1
      continue
    }
    const special = [...SPECIAL_TIERS]
      .reverse()
      .find((t) => (next[t.id] || 0) > 0)
    if (!special) break
    next[special.id] -= 1
    if (next[special.id] <= 0) delete next[special.id]
    next[VILLAGER_ID] = (next[VILLAGER_ID] || 0) + 1
  }
  return next
}

/**
 * Gợi ý lineup cân bằng: số lá Dân Làng >= tổng vai có "Sói" trong tên.
 */
export function suggestSetup(totalPlayers) {
  const n = Math.max(
    SUGGEST_MIN_PLAYERS,
    Math.min(SUGGEST_MAX_PLAYERS, Math.floor(totalPlayers) || 0),
  )

  const specials = specialCountFor(n)
  let setup = {}

  // Chỗ cho Dân Làng = n - sói - đặc biệt; cần >= số sói → sói <= (n - đặc biệt) / 2.
  const slotsAfterSpecials = n - specials
  const maxWolves = Math.max(1, Math.floor(slotsAfterSpecials / 2))
  const wolves = Math.min(
    Math.max(1, Math.round(n / 3)),
    maxWolves,
    ROLE_BY_ID[WOLF_ID].max,
  )
  setup[WOLF_ID] = wolves

  let used = wolves
  for (const tier of SPECIAL_TIERS) {
    if (n < tier.minPlayers) continue
    if (used >= n) break
    setup[tier.id] = 1
    used += 1
  }

  if (used < n) setup[VILLAGER_ID] = n - used

  for (let i = 0; i < 12; i++) {
    const total = computeTotalValue(setup)
    if (total >= -3 && total <= 3) break

    let best = null
    let bestDistance = Math.abs(total)
    for (const swap of SWAPS) {
      if (!canSwap(setup, swap)) continue
      const delta =
        (ROLE_BY_ID[swap.to]?.value || 0) - (ROLE_BY_ID[swap.from]?.value || 0)
      const distance = Math.abs(total + delta)
      if (distance < bestDistance) {
        best = swap
        bestDistance = distance
      }
    }

    if (!best) break
    setup = applySwap(setup, best)
  }

  return enforceVillagerGteWolf(setup)
}
