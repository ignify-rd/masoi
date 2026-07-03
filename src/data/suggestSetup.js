import { ROLE_BY_ID } from './roles.js'

export const SUGGEST_MIN_PLAYERS = 4
export const SUGGEST_MAX_PLAYERS = 24

const WOLF_ID = 'werewolf'
const VILLAGER_ID = 'villager'

/** Bậc mở khóa vai chức năng làng theo số người chơi. */
const SPECIAL_TIERS = [
  { id: 'seer', minPlayers: 0 },
  { id: 'guard', minPlayers: 7 },
  { id: 'witch', minPlayers: 8 },
  { id: 'hunter', minPlayers: 10 },
  { id: 'cupid', minPlayers: 12 },
  { id: 'cursed', minPlayers: 12 },
]

/**
 * Các cặp hoán đổi dùng để tinh chỉnh cân bằng mà không đổi tổng số người.
 * delta = value[to] - value[from]; chọn cặp đưa tổng điểm về gần 0 nhất.
 */
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

function computeTotalValue(setup) {
  return Object.entries(setup).reduce(
    (sum, [id, count]) => sum + (ROLE_BY_ID[id]?.value || 0) * count,
    0,
  )
}

function canSwap(setup, { from, to }) {
  if ((setup[from] || 0) <= 0) return false
  // Luôn giữ lại ít nhất 1 Sói để ván chơi hợp lệ.
  if (from === WOLF_ID && setup[from] <= 1) return false
  const toRole = ROLE_BY_ID[to]
  if (!toRole) return false
  return (setup[to] || 0) < toRole.max
}

function applySwap(setup, { from, to }) {
  const next = { ...setup }
  next[from] -= 1
  if (next[from] <= 0) delete next[from]
  next[to] = (next[to] || 0) + 1
  return next
}

/**
 * Gợi ý một lineup cân bằng cho số người chơi cho trước.
 * Trả về object { roleId: count } với tổng count = totalPlayers.
 */
export function suggestSetup(totalPlayers) {
  const n = Math.max(
    SUGGEST_MIN_PLAYERS,
    Math.min(SUGGEST_MAX_PLAYERS, Math.floor(totalPlayers) || 0),
  )

  let setup = {}

  // Khoảng 1 Sói cho mỗi 3 người chơi.
  const wolves = Math.min(
    Math.max(1, Math.round(n / 3)),
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

  // Tinh chỉnh: hoán đổi vai để tổng điểm về khoảng cân bằng ±3.
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

  return setup
}
