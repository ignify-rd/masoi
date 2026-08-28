import { ROLE_BY_ID, ROLE_SLOTS, clampRoleCount } from './roles.js'
import { THEME_BY_ID, THEME_BY_CODE } from './themes.js'

// Bảng ký tự base62 — không có ký tự trùng nhau dễ nhầm khi đọc/gõ tay.
const ALPHABET =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const BASE = BigInt(ALPHABET.length)
const CHAR_INDEX = new Map([...ALPHABET].map((ch, i) => [ch, i]))

// Chủ đề được gắn vào cuối mã, sau dấu phân cách: "<mã vai trò>-<mã chủ đề>".
// Mã cũ (không có phần này) vẫn giải mã bình thường.
// Mã chủ đề là 1 ký tự CỐ ĐỊNH gắn theo id (xem THEME_CODE_BY_ID trong
// themes.js), KHÔNG phải vị trí trong mảng THEMES — nhờ vậy thêm/sắp xếp
// lại theme không làm hỏng các code đã chia sẻ trước đó.
const THEME_SEPARATOR = '-'

/**
 * Mã hoá setup (vai trò -> số lượng) thành 1 chuỗi ngắn (thường 5-8 ký tự)
 * bằng cách gộp số lượng từng vai trò (theo thứ tự slot CỐ ĐỊNH trong
 * ROLE_SLOTS, không phải thứ tự hiển thị trong ROLES) thành 1 số nguyên lớn
 * (hệ cơ số hỗn hợp theo sức chứa của từng slot), rồi chuyển số đó sang base62.
 * Nếu có chủ đề, nối thêm mã chủ đề ở cuối.
 */
export function encodeSetupCode(selected, themeId = null) {
  let n = 0n
  for (const [id, cap] of ROLE_SLOTS) {
    const radix = BigInt(cap + 1)
    const digit = BigInt(Math.min(clampRoleCount(id, selected?.[id] || 0), cap))
    n = n * radix + digit
  }

  if (n === 0n) return ''

  let out = ''
  while (n > 0n) {
    out = ALPHABET[Number(n % BASE)] + out
    n /= BASE
  }

  const theme = THEME_BY_ID[themeId]
  if (theme?.code) out += THEME_SEPARATOR + theme.code

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
    const theme = THEME_BY_CODE[themePart]
    if (!theme) return null
    themeId = theme.id
  }

  let n = 0n
  for (const ch of rolesPart) {
    const value = CHAR_INDEX.get(ch)
    if (value == null) return null
    n = n * BASE + BigInt(value)
  }

  const result = {}
  for (let i = ROLE_SLOTS.length - 1; i >= 0; i--) {
    const [id, cap] = ROLE_SLOTS[i]
    const radix = BigInt(cap + 1)
    const digit = n % radix
    n /= radix
    if (digit <= 0n) continue
    // Slot của vai đã bị bỏ khỏi bảng dữ liệu -> lược đi thay vì làm hỏng code.
    if (!ROLE_BY_ID[id]) continue
    const count = clampRoleCount(id, Number(digit))
    if (count > 0) result[id] = count
  }

  // Còn dư sau khi tách hết vai trò -> code không thuộc bảng dữ liệu hiện tại.
  if (n !== 0n) return null

  return { roles: result, themeId: THEME_BY_ID[themeId] ? themeId : null }
}
