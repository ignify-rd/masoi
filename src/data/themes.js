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

export function getAvailableThemes(selected) {
  return THEMES.filter((theme) => isThemeAvailable(theme, selected))
}

/** Random một chủ đề hợp lệ với setup hiện tại (null nếu không có chủ đề nào hợp lệ). */
export function pickRandomTheme(selected, { excludeId = null } = {}) {
  let pool = getAvailableThemes(selected)
  if (excludeId && pool.length > 1) {
    pool = pool.filter((theme) => theme.id !== excludeId)
  }
  if (pool.length === 0) return null
  return pool[Math.floor(Math.random() * pool.length)]
}

/** Điểm chủ đề cộng vào điểm cân bằng (0 nếu chơi mặc định / chủ đề không còn hợp lệ). */
export function getThemeValue(themeId, selected) {
  const theme = THEME_BY_ID[themeId]
  if (!theme || !isThemeAvailable(theme, selected)) return 0
  return theme.value
}
