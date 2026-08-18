import { ROLES, clampRoleCount } from './roles.js'

// Bảng ký tự base62 — không có ký tự trùng nhau dễ nhầm khi đọc/gõ tay.
const ALPHABET =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const BASE = BigInt(ALPHABET.length)
const CHAR_INDEX = new Map([...ALPHABET].map((ch, i) => [ch, i]))

/**
 * Mã hoá setup (vai trò -> số lượng) thành 1 chuỗi ngắn (thường 5-8 ký tự)
 * bằng cách gộp số lượng từng vai trò (theo thứ tự cố định trong ROLES)
 * thành 1 số nguyên lớn (hệ cơ số hỗn hợp theo max của từng vai trò),
 * rồi chuyển số đó sang base62.
 */
export function encodeSetupCode(selected) {
  let n = 0n
  for (const role of ROLES) {
    const radix = BigInt(role.max + 1)
    const digit = BigInt(clampRoleCount(role.id, selected?.[role.id] || 0))
    n = n * radix + digit
  }

  if (n === 0n) return ''

  let out = ''
  while (n > 0n) {
    out = ALPHABET[Number(n % BASE)] + out
    n /= BASE
  }
  return out
}

/**
 * Giải mã chuỗi code thành object { roleId: count }.
 * Trả về null nếu code sai định dạng hoặc không hợp lệ.
 */
export function decodeSetupCode(code) {
  const trimmed = (code || '').trim()
  if (!trimmed) return null

  let n = 0n
  for (const ch of trimmed) {
    const value = CHAR_INDEX.get(ch)
    if (value == null) return null
    n = n * BASE + BigInt(value)
  }

  const result = {}
  for (let i = ROLES.length - 1; i >= 0; i--) {
    const role = ROLES[i]
    const radix = BigInt(role.max + 1)
    const digit = n % radix
    n /= radix
    if (digit > 0n) result[role.id] = Number(digit)
  }

  // Còn dư sau khi tách hết vai trò -> code không thuộc bảng dữ liệu hiện tại.
  if (n !== 0n) return null

  return result
}
