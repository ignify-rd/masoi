/**
 * Chủ đề ván (theme) — thay cho cốt truyện mở đầu.
 *
 * Mỗi chủ đề đổi luật một chút và buff cho một phe. File này chỉ chứa luật;
 * tên, mô tả và chữ của bước gọi đêm nằm trong src/i18n/<ngôn ngữ>/themes.js.
 * - value: điểm cộng thẳng vào điểm cân bằng (dương = lợi Dân làng, âm = lợi Sói/Ma cà rồng).
 * - favors: phe được hưởng lợi (dùng để tô màu UI).
 * - requires: danh sách điều kiện BẮT BUỘC, tất cả phải thỏa thì mới chọn được chủ đề.
 *     { roles: [...id], min: 1 }  -> tổng số lượng các vai trong danh sách >= min
 *     { team: 'vampire', min: 1 } -> tổng số vai thuộc phe đó >= min
 *   Nhãn hiển thị của điều kiện được sinh tự động theo ngôn ngữ.
 * - nightSteps: bước gọi đêm thêm vào { id, nightOrder, phase }.
 */

import { ROLE_BY_ID } from './roles.js'

// Mã cố định (1 ký tự base62) dùng để nhúng theme vào code chia sẻ setup.
// QUY TẮC: KHÔNG BAO GIỜ đổi/xoá/dùng lại mã của theme đã tồn tại — mọi code
// cũ đã share sẽ giải mã sai theme nếu mã bị đổi. Thêm theme mới thì luôn
// gán 1 ký tự CHƯA từng dùng (xem roleCode.js để biết cách sinh ký tự tiếp theo).
// Xoá theme thì GIỮ dòng mã ở đây để ký tự đó không bị dùng lại.
// Sửa xong chạy `npm run gen:sheet` để cập nhật Google Sheet script.
export const THEME_CODE_BY_ID = {
  endless_night: '0',
  distant_howl: '1',
  thick_fog: '2',
  blood_moon: '3',
  mob_rule: '4',
  wolf_covenant: '5',
  night_of_vengeance: '6',
  creeping_curse: '7',
  red_thread: '8',
  blood_pact: '9',
  blood_thirst: 'A',
  last_stand: 'B',
  scent_of_blood: 'C',
  long_night: 'D',
  reverse_trial: 'E',
  great_storm: 'F',
  tidal_moon: 'G',
  wolf_leader: 'H',
  sheriff: 'I',
  forest_journey: 'J',
  lunar_eclipse: 'K',
  royal_decree: 'L',
  first_dawn: 'M',
  holy_antidote: 'N',
  silver_claw: 'O',
  garlic_harvest: 'P',
  night_watch: 'Q',
  village_ledger: 'R',
  rumor_mill: 'S',
  village_militia: 'T',
  white_list: 'U',
  price_of_truth: 'V',
  inquisition: 'W',
  silver_bullet: 'X',
  witch_sabbath: 'Y',
  talking_graveyard: 'Z',
  death_note: 'a',
  undying_village: 'b',
  double_trial: 'c',
  bite_mark: 'd',
  body_count: 'e',
  holy_water: 'f',
  talisman: 'g',
  alpha_curse: 'h',
  mole: 'i',
}

const THEMES_DATA = [
  {
    id: 'endless_night',
    value: -7,
    favors: 'werewolf',
    requires: [],
  },
  {
    id: 'distant_howl',
    nightSteps: [{ id: 'distant_howl_reveal', nightOrder: 900.99, phase: 'night1' }],
    value: -5,
    favors: 'werewolf',
    requires: [],
  },
  {
    id: 'mole',
    nightSteps: [
      { id: 'mole_pick', nightOrder: 3.01, phase: 'night1' },
      { id: 'mole_wake', nightOrder: 3.02, phase: 'every' },
    ],
    value: -5,
    favors: 'werewolf',
    requires: [{ team: 'werewolf', min: 1 }],
  },
  {
    id: 'thick_fog',
    value: -4,
    favors: 'werewolf',
    requires: [
      {
        roles: ['seer', 'aura_seer', 'mystic_seeker', 'apprentice_seer', 'investigator'],
        min: 1,
      },
    ],
  },
  {
    id: 'blood_moon',
    value: -3,
    favors: 'werewolf',
    requires: [{ team: 'werewolf', min: 2 }],
  },
  {
    id: 'mob_rule',
    value: -3,
    favors: 'werewolf',
    requires: [],
  },
  {
    id: 'alpha_curse',
    nightSteps: [{ id: 'alpha_curse_mark', nightOrder: 3.35, phase: 'every' }],
    value: -3,
    favors: 'werewolf',
    requires: [{ roles: ['alpha_wolf'], min: 1 }],
  },
  {
    id: 'wolf_covenant',
    value: -2,
    favors: 'werewolf',
    requires: [{ roles: ['minion', 'sorceress'], min: 1 }],
  },
  {
    id: 'night_of_vengeance',
    value: -3,
    favors: 'werewolf',
    requires: [{ team: 'werewolf', min: 2 }],
  },
  {
    id: 'creeping_curse',
    value: -2,
    favors: 'werewolf',
    requires: [{ roles: ['cursed'], min: 1 }],
  },
  {
    id: 'red_thread',
    value: -2,
    favors: 'other',
    requires: [{ roles: ['cupid'], min: 1 }],
  },
  {
    id: 'blood_pact',
    value: -2,
    favors: 'other',
    requires: [{ roles: ['tanner'], min: 1 }],
  },
  {
    id: 'blood_thirst',
    value: -2,
    favors: 'werewolf',
    requires: [],
  },
  {
    id: 'last_stand',
    value: -2,
    favors: 'werewolf',
    requires: [{ team: 'werewolf', min: 1 }],
  },
  {
    id: 'scent_of_blood',
    value: -2,
    favors: 'werewolf',
    requires: [{ team: 'werewolf', min: 1 }],
  },
  {
    id: 'long_night',
    value: -1,
    favors: 'werewolf',
    requires: [],
  },
  {
    id: 'reverse_trial',
    value: 0,
    favors: 'other',
    requires: [],
  },
  {
    id: 'great_storm',
    value: 1,
    favors: 'other',
    requires: [],
  },
  {
    id: 'tidal_moon',
    value: 0,
    favors: 'other',
    requires: [],
  },
  {
    id: 'wolf_leader',
    nightSteps: [
      { id: 'wolf_leader_pick', nightOrder: 3.05, phase: 'night1' },
      { id: 'wolf_leader_peek', nightOrder: 3.06, phase: 'every' },
    ],
    value: 0,
    favors: 'other',
    requires: [{ team: 'werewolf', min: 2 }],
  },
  {
    id: 'sheriff',
    value: 0,
    favors: 'other',
    requires: [],
  },
  {
    id: 'forest_journey',
    nightSteps: [{ id: 'forest_journey_item', nightOrder: 0.5, phase: 'every' }],
    value: 0,
    favors: 'other',
    requires: [{ roles: ['old_hag'], min: 1 }],
  },
  {
    id: 'lunar_eclipse',
    value: 1,
    favors: 'village',
    requires: [{ team: 'werewolf', min: 1 }],
  },
  {
    id: 'royal_decree',
    value: 1,
    favors: 'village',
    requires: [{ roles: ['prince'], min: 1 }],
  },
  {
    id: 'first_dawn',
    value: 1,
    favors: 'village',
    requires: [],
  },
  {
    id: 'holy_antidote',
    value: 1,
    favors: 'village',
    requires: [{ roles: ['witch'], min: 1 }, { team: 'vampire', min: 1 }],
  },
  {
    id: 'silver_claw',
    value: 2,
    favors: 'werewolf',
    requires: [{ team: 'vampire', min: 1 }],
  },
  {
    id: 'garlic_harvest',
    value: 2,
    favors: 'village',
    requires: [{ team: 'vampire', min: 1 }],
  },
  {
    id: 'night_watch',
    value: 2,
    favors: 'village',
    requires: [],
  },
  {
    id: 'village_ledger',
    value: 2,
    favors: 'village',
    requires: [],
  },
  {
    id: 'rumor_mill',
    value: 2,
    favors: 'village',
    requires: [],
  },
  {
    id: 'village_militia',
    value: 2,
    favors: 'village',
    requires: [],
  },
  {
    id: 'white_list',
    nightSteps: [{ id: 'white_list_swap', nightOrder: 3.999, phase: 'every' }],
    value: 2,
    favors: 'village',
    requires: [],
  },
  {
    id: 'price_of_truth',
    value: 2,
    favors: 'village',
    requires: [],
  },
  {
    id: 'inquisition',
    value: 3,
    favors: 'village',
    requires: [],
  },
  {
    id: 'silver_bullet',
    value: 3,
    favors: 'village',
    requires: [{ roles: ['hunter', 'huntress'], min: 1 }],
  },
  {
    id: 'witch_sabbath',
    value: 3,
    favors: 'village',
    requires: [{ roles: ['witch'], min: 1 }],
  },
  {
    id: 'talking_graveyard',
    value: 3,
    favors: 'village',
    requires: [],
  },
  {
    id: 'death_note',
    nightSteps: [{ id: 'death_note_erase', nightOrder: 0.6, phase: 'every' }],
    value: 3,
    favors: 'village',
    requires: [],
  },
  {
    id: 'undying_village',
    value: 3,
    favors: 'village',
    requires: [],
  },
  {
    id: 'double_trial',
    value: 3,
    favors: 'village',
    requires: [],
  },
  {
    id: 'bite_mark',
    value: 3,
    favors: 'village',
    requires: [{ team: 'werewolf', min: 1 }],
  },
  {
    id: 'body_count',
    value: 4,
    favors: 'village',
    requires: [],
  },
  {
    id: 'holy_water',
    value: 4,
    favors: 'village',
    requires: [],
  },
  {
    id: 'talisman',
    value: 6,
    favors: 'village',
    requires: [],
  },
]

export const THEMES = THEMES_DATA.map((theme) => ({
  requires: [],
  favors: 'village',
  ...theme,
  code: THEME_CODE_BY_ID[theme.id],
}))

export const THEME_BY_ID = Object.fromEntries(THEMES.map((t) => [t.id, t]))
export const THEME_BY_CODE = Object.fromEntries(THEMES.map((t) => [t.code, t]))

/** Số chủ đề tối đa trong một ván. */
export const MAX_THEMES = 5

// Cặp chủ đề không được chọn chung vì luật mâu thuẫn hoặc trùng nhau (thứ tự
// trong cặp không quan trọng). Sửa xong chạy `npm run gen:sheet`.
export const THEME_CONFLICTS = [
  // Trăng Định Kỳ đã cố định số lượt cắn theo đêm chẵn/lẻ.
  ['tidal_moon', 'blood_moon'],
  ['tidal_moon', 'lunar_eclipse'],
  ['tidal_moon', 'blood_thirst'],
  ['tidal_moon', 'night_of_vengeance'],
  ['tidal_moon', 'last_stand'],
  ['tidal_moon', 'endless_night'],
  // Đêm 1 cắn 2 người / đêm 1 không được cắn.
  ['blood_moon', 'lunar_eclipse'],
  // Ngày đầu không treo cổ / mở màn bằng một lần treo cổ.
  ['long_night', 'first_dawn'],
  // Ngày nào cũng treo 2 người thì "1 lần treo 2" thành thừa.
  ['double_trial', 'village_militia'],
  // Phải quá bán mới treo được thì không bao giờ có hoà phiếu.
  ['mob_rule', 'sheriff'],
  // Chọn 3 bình độc là mất bình cứu.
  ['witch_sabbath', 'holy_antidote'],
  // Đầu đàn đổi cắn lấy soi, Sói Đầu đàn lại nguyền chính mục tiêu đó.
  ['wolf_leader', 'alpha_curse'],
  // Làng Bất Tử giấu ai đã chết thật và không ai rời game.
  ['undying_village', 'talking_graveyard'],
  ['undying_village', 'death_note'],
  ['undying_village', 'body_count'],
  ['undying_village', 'holy_antidote'],
  ['undying_village', 'inquisition'],
  ['undying_village', 'talisman'],
  // Người bị treo vẫn còn mạng thì có bị lật bài không.
  ['talisman', 'inquisition'],
]

const CONFLICTS_BY_ID = new Map()
for (const [a, b] of THEME_CONFLICTS) {
  if (!CONFLICTS_BY_ID.has(a)) CONFLICTS_BY_ID.set(a, new Set())
  if (!CONFLICTS_BY_ID.has(b)) CONFLICTS_BY_ID.set(b, new Set())
  CONFLICTS_BY_ID.get(a).add(b)
  CONFLICTS_BY_ID.get(b).add(a)
}

/** Các chủ đề trong `themeIds` xung đột với `themeId`. */
export function themeConflicts(themeId, themeIds) {
  const conflicts = CONFLICTS_BY_ID.get(themeId)
  return conflicts ? themeIds.filter((id) => conflicts.has(id)) : []
}

/**
 * Làm sạch danh sách chủ đề đọc từ nguồn ngoài (localStorage, lịch sử, mã ván).
 * Nhận cả giá trị cũ là một id; bỏ id không còn tồn tại, trùng, hoặc xung đột
 * với chủ đề đứng trước; giữ tối đa MAX_THEMES.
 */
export function normalizeThemeIds(value) {
  const ids = Array.isArray(value) ? value : value ? [value] : []
  const result = []
  for (const id of ids) {
    if (result.length >= MAX_THEMES) break
    if (typeof id !== 'string' || !THEME_BY_ID[id] || result.includes(id)) continue
    if (themeConflicts(id, result).length > 0) continue
    result.push(id)
  }
  return result
}

function countRequirement(req, selected) {
  let total = 0
  for (const [id, count] of Object.entries(selected || {})) {
    if (!count || count <= 0) continue
    const role = ROLE_BY_ID[id]
    if (!role) continue
    if (req.roles && req.roles.includes(id)) total += count
    else if (req.team && role.team === req.team) total += count
  }
  return total
}

export function isThemeAvailable(theme, selected) {
  if (!theme) return true
  return (theme.requires || []).every(
    (req) => countRequirement(req, selected) >= (req.min ?? 1),
  )
}

/** Tổng điểm các chủ đề cộng vào điểm cân bằng (chủ đề thiếu vai bắt buộc không tính). */
export function getThemesValue(themeIds, selected) {
  return normalizeThemeIds(themeIds).reduce((sum, id) => {
    const theme = THEME_BY_ID[id]
    return isThemeAvailable(theme, selected) ? sum + theme.value : sum
  }, 0)
}
