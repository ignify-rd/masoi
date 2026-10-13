import { ROLE_BY_ID } from './roles.js'

// Tổng điểm trong khoảng [-BALANCED_RANGE, +BALANCED_RANGE] coi là cân bằng.
export const BALANCED_RANGE = 3

export function countPlayers(selected) {
  return Object.values(selected || {}).reduce((sum, c) => sum + c, 0)
}

/** Tổng điểm cân bằng của các vai trong setup (chưa tính chủ đề). */
export function sumRoleValue(selected) {
  return Object.entries(selected || {}).reduce(
    (sum, [id, count]) => sum + (ROLE_BY_ID[id]?.value || 0) * count,
    0,
  )
}

export function isBalanced(total) {
  return Math.abs(total) <= BALANCED_RANGE
}

/** Phe đang có lợi: 'village' | 'werewolf' | 'balanced' (dùng làm class CSS). */
export function balanceTone(total) {
  if (total > BALANCED_RANGE) return 'village'
  if (total < -BALANCED_RANGE) return 'werewolf'
  return 'balanced'
}
