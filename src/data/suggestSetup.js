import { ROLE_BY_ID } from './roles.js'
import { countPlayers, isBalanced, sumRoleValue } from './balance.js'

export const SUGGEST_MIN_PLAYERS = 4
export const SUGGEST_MAX_PLAYERS = 24

const WOLF_ID = 'werewolf'
const VILLAGER_ID = 'villager'

function countWolves(setup) {
  return Object.entries(setup).reduce(
    (sum, [id, count]) =>
      ROLE_BY_ID[id]?.team === 'werewolf' ? sum + count : sum,
    0,
  )
}

/** Ràng buộc của setup gợi ý: phe Sói <= 1/3 số người và Dân Làng >= phe Sói. */
function meetsWolfLimits(setup) {
  const wolves = countWolves(setup)
  return wolves * 3 <= countPlayers(setup) && (setup[VILLAGER_ID] || 0) >= wolves
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

function canSwap(setup, { from, to }) {
  if ((setup[from] || 0) <= 0) return false
  if (from === WOLF_ID && setup[from] <= 1) return false
  const toRole = ROLE_BY_ID[to]
  if (!toRole) return false
  if ((setup[to] || 0) >= toRole.max) return false

  return meetsWolfLimits(applySwap(setup, { from, to }))
}

function applySwap(setup, { from, to }) {
  const next = { ...setup }
  next[from] -= 1
  if (next[from] <= 0) delete next[from]
  next[to] = (next[to] || 0) + 1
  return next
}

/** Giảm Sói hoặc đổi vai đặc biệt → Dân Làng cho đến khi đủ ràng buộc. */
function enforceWolfLimits(setup) {
  let next = { ...setup }
  while (!meetsWolfLimits(next)) {
    if ((next[WOLF_ID] || 0) > 1) {
      next = applySwap(next, { from: WOLF_ID, to: VILLAGER_ID })
      continue
    }
    const special = [...SPECIAL_TIERS]
      .reverse()
      .find((t) => (next[t.id] || 0) > 0)
    if (!special) break
    next = applySwap(next, { from: special.id, to: VILLAGER_ID })
  }
  return next
}

/**
 * Gợi ý lineup cân bằng: phe Sói <= 1/3 số người, số lá Dân Làng >= phe Sói,
 * tổng điểm trong khoảng cân bằng nếu đổi vai được.
 */
export function suggestSetup(totalPlayers) {
  const n = Math.max(
    SUGGEST_MIN_PLAYERS,
    Math.min(SUGGEST_MAX_PLAYERS, Math.floor(totalPlayers) || 0),
  )

  const specials = specialCountFor(n)
  let setup = {}

  // Chỗ cho Dân Làng = n - sói - đặc biệt; cần >= số sói → sói <= (n - đặc biệt) / 2.
  const maxWolves = Math.max(1, Math.floor((n - specials) / 2))
  const wolves = Math.min(
    Math.max(1, Math.floor(n / 3)),
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
    const total = sumRoleValue(setup)
    if (isBalanced(total)) break

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

  return enforceWolfLimits(setup)
}
