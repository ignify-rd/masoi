import { ROLES, clampRoleCount } from './roles.js'
import { THEMES, THEME_BY_ID } from './themes.js'

// Bảng ký tự base62 — không có ký tự trùng nhau dễ nhầm khi đọc/gõ tay.
const ALPHABET =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const BASE = BigInt(ALPHABET.length)
const CHAR_INDEX = new Map([...ALPHABET].map((ch, i) => [ch, i]))

// Chủ đề được gắn vào cuối mã, sau dấu phân cách: "<mã vai trò>-<mã chủ đề>".
// Mã cũ (không có phần này) vẫn giải mã bình thường.
const THEME_SEPARATOR = '-'

/**
 * Mã hoá setup (vai trò -> số lượng) thành 1 chuỗi ngắn (thường 5-8 ký tự)
 * bằng cách gộp số lượng từng vai trò (theo thứ tự cố định trong ROLES)
 * thành 1 số nguyên lớn (hệ cơ số hỗn hợp theo max của từng vai trò),
 * rồi chuyển số đó sang base62. Nếu có chủ đề, nối thêm mã chủ đề ở cuối.
 */
export function encodeSetupCode(selected, themeId = null) {
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

  const themeIndex = THEMES.findIndex((theme) => theme.id === themeId)
  if (themeIndex >= 0) out += THEME_SEPARATOR + ALPHABET[themeIndex]

  return out
}

/**
 * Giải mã chuỗi code thành { roles: { roleId: count }, themeId }.
 * Trả về null nếu code sai định dạng hoặc không hợp lệ.
 */
export function decodeSetupCode(code) {
  const trimmed = (code || '').trim()
  if (!trimmed) return null

  const [rolesPart, themePart, ...rest] = trimmed.split(THEME_SEPARATOR)
  if (rest.length > 0 || !rolesPart) return null

  let themeId = null
  if (themePart != null) {
    if (themePart.length !== 1) return null
    const themeIndex = CHAR_INDEX.get(themePart)
    if (themeIndex == null || !THEMES[themeIndex]) return null
    themeId = THEMES[themeIndex].id
  }

  let n = 0n
  for (const ch of rolesPart) {
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

  return { roles: result, themeId: THEME_BY_ID[themeId] ? themeId : null }
}
