import { ROLE_BY_ID, ROLE_SLOTS, clampRoleCount } from './roles.js'
import { MAX_THEMES, THEME_BY_ID, THEME_BY_CODE, normalizeThemeIds } from './themes.js'

// Bảng ký tự base62 — không có ký tự trùng nhau dễ nhầm khi đọc/gõ tay.
const ALPHABET =
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const BASE = BigInt(ALPHABET.length)
const CHAR_INDEX = new Map([...ALPHABET].map((ch, i) => [ch, i]))

// Chủ đề được gắn vào cuối mã, sau dấu phân cách: "<mã vai trò>-<mã chủ đề...>",
// mỗi chủ đề 1 ký tự, tối đa MAX_THEMES ký tự. Mã cũ (không có chủ đề hoặc chỉ
// 1 chủ đề) vẫn giải mã bình thường.
// Mã chủ đề là 1 ký tự CỐ ĐỊNH gắn theo id (xem THEME_CODE_BY_ID trong
// themes.js), KHÔNG phải vị trí trong mảng THEMES — nhờ vậy thêm/sắp xếp
// lại theme không làm hỏng các code đã chia sẻ trước đó.
const THEME_SEPARATOR = '-'

/**
 * Mã hoá setup (vai trò -> số lượng) thành 1 chuỗi ngắn (thường 5-8 ký tự)
 * bằng cách gộp số lượng từng vai trò (theo thứ tự slot CỐ ĐỊNH trong
 * ROLE_SLOTS, không phải thứ tự hiển thị trong ROLES) thành 1 số nguyên lớn
 * (hệ cơ số hỗn hợp theo sức chứa của từng slot), rồi chuyển số đó sang base62.
 * Nếu có chủ đề, nối thêm mã các chủ đề ở cuối.
 */
export function encodeSetupCode(selected, themeIds = []) {
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

  const themeCodes = normalizeThemeIds(themeIds)
    .map((id) => THEME_BY_ID[id].code)
    .join('')
  if (themeCodes) out += THEME_SEPARATOR + themeCodes

  return out
}

/**
 * Giải mã chuỗi code thành { roles: { roleId: count }, themeIds }.
 * Trả về null nếu code sai định dạng hoặc không hợp lệ.
 */
export function decodeSetupCode(code) {
  const trimmed = (code || '').trim()
  if (!trimmed) return null

  const [rolesPart, themePart, ...rest] = trimmed.split(THEME_SEPARATOR)
  if (rest.length > 0 || !rolesPart) return null

  const themeIds = []
  if (themePart != null) {
    if (themePart.length === 0 || themePart.length > MAX_THEMES) return null
    for (const ch of themePart) {
      const theme = THEME_BY_CODE[ch]
      if (!theme || themeIds.includes(theme.id)) return null
      themeIds.push(theme.id)
    }
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

  // Mã tự gõ / từ Google Sheet có thể chứa chủ đề xung đột -> giữ chủ đề đứng trước.
  return { roles: result, themeIds: normalizeThemeIds(themeIds) }
}
