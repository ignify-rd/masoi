// Dữ liệu role dựa trên Ultimate Werewolf / Werewolves Big Box (Pegasus).
// File này chỉ chứa luật; tên, năng lực, câu gọi của từng vai nằm trong
// src/i18n/<ngôn ngữ>/roles.js, khóa theo id.
// value: điểm cân bằng (dương = lợi cho Dân làng, âm = lợi cho Sói/Ma cà rồng).
// max: số lượng tối đa trong một ván (mặc định 1 cho vai đặc biệt).
// recommended: vai trò gợi ý cho ván cơ bản, ưu tiên hiển thị đầu danh sách.
// nightOrder: thứ tự được gọi dậy trong đêm (chuẩn rulebook).
// phase: 'every' = gọi mỗi đêm | 'night1' = chỉ đêm 1 | 'night2' = chỉ đêm 2
//        | 'fromNight2' = từ đêm 2 trở đi.
// randomPair: bước gọi đêm có nút chọn ngẫu nhiên 2 số người chơi.
//
// File này phải là dữ liệu thuần (không dùng API riêng của Vite) để
// scripts/google-sheets/build.mjs chạy được bằng node.

export const TEAMS = {
  village: { id: 'village', color: '#74b85f' },
  werewolf: { id: 'werewolf', color: '#e35d4d' },
  vampire: { id: 'vampire', color: '#b47fe0' },
  other: { id: 'other', color: '#62a8d9' },
}

export const TEAM_IDS = Object.keys(TEAMS)

export const PHASE_IDS = ['every', 'night1', 'night2', 'fromNight2']

/** Bước gọi đêm bổ sung (không phải vai trò chọn trong ván). */
export const NIGHT_EXTRAS = {
  lovers: {
    id: 'lovers',
    requiresRole: 'cupid',
    nightOrder: 1.5,
    phase: 'every',
  },
  cupidThirdTeam: {
    id: 'cupidThirdTeam',
    requiresRole: 'cupid',
    minPlayers: 13,
    nightOrder: 1.55,
    phase: 'night1',
  },
}

const ROLES_DATA = [
  {
    id: 'dream_wolf',
    team: 'werewolf',
    value: -5,
    wakesAtNight: true,
    nightOrder: 0,
    phase: 'night1',
  },
  {
    id: 'bigfoot',
    team: 'village',
    value: -2,
    wakesAtNight: true,
    nightOrder: 0,
    phase: 'night1',
  },
  {
    id: 'tanner',
    team: 'other',
    value: -2,
    wakesAtNight: true,
    nightOrder: 0,
    phase: 'night1',
  },
  {
    id: 'prince',
    team: 'village',
    value: 2,
    wakesAtNight: true,
    nightOrder: 0,
    phase: 'night1',
  },
  {
    id: 'lone_wolf',
    team: 'werewolf',
    value: -4,
    wakesAtNight: true,
    nightOrder: 0,
    phase: 'night1',
  },
  {
    id: 'halfblood',
    team: 'village',
    value: 0,
    wakesAtNight: true,
    nightOrder: 0,
    phase: 'night1',
  },
  {
    id: 'mayor',
    team: 'village',
    value: 2,
    wakesAtNight: true,
    nightOrder: 0,
    phase: 'night1',
  },
  {
    id: 'tough_guy',
    team: 'village',
    value: 3,
    wakesAtNight: true,
    nightOrder: 0,
    phase: 'night1',
  },
  {
    id: 'terrorist',
    team: 'village',
    value: -1,
    wakesAtNight: true,
    nightOrder: 0,
    phase: 'night1',
  },
  {
    id: 'rusty_knight',
    team: 'village',
    value: 5,
    wakesAtNight: true,
    nightOrder: 0,
    phase: 'night1',
  },
  {
    id: 'diseased',
    team: 'village',
    value: 3,
    wakesAtNight: true,
    nightOrder: 0,
    phase: 'night1',
  },
  {
    id: 'hoodlum',
    team: 'other',
    value: 0,
    wakesAtNight: true,
    nightOrder: 0,
    phase: 'night1',
  },
  {
    id: 'cupid',
    team: 'village',
    value: 3,
    recommended: true,
    randomPair: true,
    wakesAtNight: true,
    nightOrder: 1,
    phase: 'night1',
  },
  {
    id: 'guard',
    team: 'village',
    value: 4,
    recommended: true,
    wakesAtNight: true,
    nightOrder: 2,
    phase: 'every',
  },
  {
    id: 'priest',
    team: 'village',
    value: 3,
    wakesAtNight: true,
    nightOrder: 2,
    phase: 'night1',
  },
  {
    id: 'werewolf',
    team: 'werewolf',
    value: -6,
    max: 10,
    recommended: true,
    wakesAtNight: true,
    nightOrder: 3,
    phase: 'every',
  },
  {
    id: 'fruit_wolf',
    team: 'werewolf',
    value: -3,
    wakesAtNight: true,
    nightOrder: 3.1,
    phase: 'night1',
  },
  {
    id: 'wolf_cub',
    team: 'werewolf',
    value: -8,
    wakesAtNight: true,
    nightOrder: 3.2,
    phase: 'night1',
  },
  {
    id: 'wolf_man',
    team: 'werewolf',
    value: -7,
    wakesAtNight: true,
    nightOrder: 3.2,
    phase: 'night1',
  },
  {
    id: 'wolverine',
    team: 'werewolf',
    value: -4,
    wakesAtNight: true,
    nightOrder: 3.2,
    phase: 'night1',
  },
  {
    id: 'big_bad_wolf',
    team: 'werewolf',
    value: -9,
    wakesAtNight: true,
    nightOrder: 3.2,
    phase: 'night1',
  },
  {
    id: 'minion',
    team: 'werewolf',
    value: -4,
    wakesAtNight: true,
    nightOrder: 3.3,
    phase: 'night1',
  },
  {
    id: 'alpha_wolf',
    team: 'werewolf',
    value: -9,
    wakesAtNight: true,
    nightOrder: 3.3,
    phase: 'every',
  },
  {
    id: 'dire_wolf',
    team: 'werewolf',
    value: -4,
    wakesAtNight: true,
    nightOrder: 3.3,
    phase: 'night1',
  },
  {
    id: 'fang_face',
    team: 'werewolf',
    value: -5,
    wakesAtNight: true,
    nightOrder: 3.4,
    phase: 'every',
  },
  {
    id: 'white_wolf',
    team: 'other',
    value: -2,
    wakesAtNight: true,
    nightOrder: 3.99,
    phase: 'every',
  },
  {
    id: 'vampire',
    team: 'vampire',
    value: -7,
    max: 6,
    wakesAtNight: true,
    nightOrder: 4,
    phase: 'every',
  },
  {
    id: 'dracula',
    team: 'vampire',
    value: -10,
    wakesAtNight: true,
    nightOrder: 4.1,
    phase: 'every',
  },
  {
    id: 'witch',
    team: 'village',
    value: 5,
    recommended: true,
    wakesAtNight: true,
    nightOrder: 5,
    phase: 'every',
  },
  {
    id: 'illusion_artist',
    team: 'werewolf',
    value: -4,
    wakesAtNight: true,
    nightOrder: 5.9,
    phase: 'every',
  },
  {
    id: 'seer',
    team: 'village',
    value: 7,
    recommended: true,
    wakesAtNight: true,
    nightOrder: 6,
    phase: 'every',
  },
  {
    id: 'one_eye_seer',
    team: 'village',
    value: 4,
    wakesAtNight: true,
    nightOrder: 6,
    phase: 'every',
  },
  {
    id: 'aura_seer',
    team: 'village',
    value: 3,
    wakesAtNight: true,
    nightOrder: 100,
    phase: 'every',
  },
  {
    id: 'mystic_seeker',
    team: 'village',
    value: 9,
    wakesAtNight: true,
    nightOrder: 100,
    phase: 'every',
  },
  {
    id: 'apprentice_seer',
    team: 'village',
    value: 4,
    wakesAtNight: true,
    nightOrder: 6.5,
    phase: 'every',
  },
  {
    id: 'beholder',
    team: 'village',
    value: 3,
    wakesAtNight: true,
    nightOrder: 6.9999,
    phase: 'night1',
  },
  {
    id: 'sorceress',
    team: 'werewolf',
    value: -3,
    wakesAtNight: true,
    nightOrder: 6.9,
    phase: 'every',
  },
  {
    id: 'hunter',
    team: 'village',
    value: 3,
    recommended: true,
    wakesAtNight: true,
    nightOrder: 7,
    phase: 'every',
  },
  {
    id: 'huntress',
    team: 'village',
    value: 4,
    wakesAtNight: true,
    nightOrder: 7.1,
    phase: 'every',
  },
  {
    id: 'exposer',
    team: 'village',
    value: 4,
    wakesAtNight: true,
    nightOrder: 8,
    phase: 'every',
  },
  {
    id: 'evil_empath',
    team: 'werewolf',
    value: -5,
    wakesAtNight: true,
    nightOrder: 8,
    phase: 'every',
  },
  {
    id: 'investigator',
    team: 'village',
    value: 4,
    wakesAtNight: true,
    nightOrder: 8,
    phase: 'every',
  },
  {
    id: 'spellcaster',
    team: 'village',
    value: 1,
    wakesAtNight: true,
    nightOrder: 8,
    phase: 'every',
  },
  {
    id: 'cursed',
    team: 'village',
    value: -2,
    recommended: true,
    wakesAtNight: true,
    nightOrder: 8,
    phase: 'every',
  },
  {
    id: 'old_hag',
    team: 'village',
    value: 1,
    wakesAtNight: true,
    nightOrder: 8,
    phase: 'every',
  },
  {
    id: 'mentalist',
    team: 'village',
    value: 4,
    wakesAtNight: true,
    nightOrder: 8,
    phase: 'every',
  },
  {
    id: 'gambler',
    team: 'village',
    value: 2,
    wakesAtNight: true,
    nightOrder: 8,
    phase: 'fromNight2',
  },
  {
    id: 'the_thing',
    team: 'village',
    value: 2,
    wakesAtNight: true,
    nightOrder: 8,
    phase: 'every',
  },
  {
    id: 'haunted_ghost',
    team: 'village',
    value: -2,
    wakesAtNight: true,
    nightOrder: 8,
    phase: 'night1',
  },
  {
    id: 'cult_leader',
    team: 'other',
    value: 1,
    wakesAtNight: true,
    nightOrder: 9,
    phase: 'every',
  },
  {
    id: 'insomniac',
    team: 'village',
    value: 3,
    wakesAtNight: true,
    nightOrder: 100,
    phase: 'every',
  },
  {
    id: 'villager',
    team: 'village',
    value: 1,
    max: 30,
    recommended: true,
    wakesAtNight: false,
    nightOrder: 999,
    phase: 'every',
  },
]

export const ROLES = ROLES_DATA.map((role) => ({
  max: 1,
  recommended: false,
  ...role,
}))

export const ROLE_BY_ID = Object.fromEntries(ROLES.map((r) => [r.id, r]))

// Bảng slot cố định dùng để nhúng vai trò vào code chia sẻ setup.
// Mỗi phần tử: [id, sức chứa] — sức chứa là `max` tại thời điểm vai được thêm
// vào bảng, quyết định cơ số của chữ số tương ứng trong mã.
//
// QUY TẮC (giống THEME_CODE_BY_ID trong themes.js): vị trí trong mảng này LÀ
// một phần của định dạng mã. KHÔNG BAO GIỜ chèn vào giữa, xoá dòng, đổi thứ tự
// hay đổi sức chứa của vai đã tồn tại — mọi code cũ đã share sẽ giải mã sai.
// - Thêm vai mới  -> luôn chèn vào ĐẦU bảng (vị trí trong ROLES_DATA thì tuỳ ý).
//   Dòng đầu là chữ số hàng cao nhất, dòng cuối là hàng đơn vị: chèn đầu chỉ
//   thêm số 0 vô nghĩa nên code cũ giữ nguyên giá trị; append cuối sẽ đẩy lệch
//   mọi chữ số và làm code cũ giải ra setup khác.
// - Bỏ vai khỏi ROLES_DATA -> vẫn GIỮ NGUYÊN dòng ở đây (slot bị "chôn"), code
//   cũ chứa vai đó vẫn giải mã được và phần vai đã bỏ sẽ bị lược đi.
// - Đổi `max` trong ROLES_DATA -> an toàn, chỉ giới hạn UI; sức chứa ở đây giữ
//   nguyên, số lượng vượt quá sẽ được kẹp lại khi giải mã.
// - Sửa xong chạy `npm run gen:sheet` để cập nhật Google Sheet script;
//   `npm test` sẽ báo nếu thiếu slot, sai thứ tự hoặc quên cập nhật sheet.
export const ROLE_SLOTS = [
  ['tanner', 1],
  ['prince', 1],
  ['lone_wolf', 1],
  ['halfblood', 1],
  ['mayor', 1],
  ['tough_guy', 1],
  ['terrorist', 1],
  ['rusty_knight', 1],
  ['diseased', 1],
  ['hoodlum', 1],
  ['cupid', 1],
  ['guard', 1],
  ['priest', 1],
  ['werewolf', 10],
  ['fruit_wolf', 1],
  ['wolf_cub', 1],
  ['wolf_man', 1],
  ['minion', 1],
  ['alpha_wolf', 1],
  ['fang_face', 1],
  ['white_wolf', 1],
  ['vampire', 6],
  ['dracula', 1],
  ['witch', 1],
  ['seer', 1],
  ['aura_seer', 1],
  ['mystic_seeker', 1],
  ['apprentice_seer', 1],
  ['sorceress', 1],
  ['hunter', 1],
  ['huntress', 1],
  ['investigator', 1],
  ['spellcaster', 1],
  ['cursed', 1],
  ['old_hag', 1],
  ['mentalist', 1],
  ['gambler', 1],
  ['cult_leader', 1],
  ['villager', 30],
  ['insomniac', 1],
  ['big_bad_wolf', 1],
  ['dire_wolf', 1],
  ['wolverine', 1],
  ['haunted_ghost', 1],
  ['bigfoot', 1],
  ['dream_wolf', 1],
  ['the_thing', 1],
  ['beholder', 1],
  ['illusion_artist', 1],
  ['evil_empath', 1],
  ['one_eye_seer', 1],
  ['exposer', 1],
]

export function canIncreaseRole(id, selected) {
  const role = ROLE_BY_ID[id]
  if (!role) return false
  return (selected[id] || 0) < role.max
}

export function clampRoleCount(id, count) {
  const role = ROLE_BY_ID[id]
  if (!role || count <= 0) return 0
  return Math.min(count, role.max)
}

/**
 * Làm sạch setup đọc từ nguồn ngoài (localStorage, lịch sử ván): bỏ id không
 * còn tồn tại, bỏ số lượng <= 0 và kẹp theo `max`.
 */
export function normalizeSetup(roles) {
  if (!roles || typeof roles !== 'object') return {}
  return Object.fromEntries(
    Object.entries(roles)
      .map(([id, c]) => [id, clampRoleCount(id, Number(c) || 0)])
      .filter(([, c]) => c > 0),
  )
}
