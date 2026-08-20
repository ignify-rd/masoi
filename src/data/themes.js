/**
 * Chủ đề ván (theme) — thay cho cốt truyện mở đầu.
 *
 * Mỗi chủ đề đổi luật một chút và buff cho một phe.
 * - value: điểm cộng thẳng vào điểm cân bằng (dương = lợi Dân làng, âm = lợi Sói/Ma cà rồng).
 * - favors: phe được hưởng lợi (dùng để tô màu UI).
 * - requires: danh sách điều kiện BẮT BUỘC, tất cả phải thỏa thì mới chọn được chủ đề.
 *     { roles: [...id], min: 1 }  -> tổng số lượng các vai trong danh sách >= min
 *     { team: 'vampire', min: 1 } -> tổng số vai thuộc phe đó >= min
 *     label: mô tả điều kiện để hiển thị.
 */

import { ROLE_BY_ID, TEAMS } from './roles.js'

const THEMES_DATA = [
  {
    id: 'silver_claw',
    name: 'Sói Bạc',
    description:
      'Ma Sói ở làng này có móng vuốt bằng bạc: đòn cắn của Sói giết được Ma Cà Rồng như người thường (Ma Cà Rồng mất khả năng miễn nhiễm với Sói).',
    value: 2,
    favors: 'werewolf',
    requires: [{ team: 'vampire', min: 1, label: 'Có ít nhất 1 vai phe Ma cà rồng' }],
  },
  {
    id: 'blood_moon',
    name: 'Trăng Máu',
    description:
      'Đêm đầu tiên trăng đỏ treo thấp: bầy Sói được cắn 2 người trong đêm 1. Từ đêm 2 trở đi mọi thứ trở lại bình thường.',
    value: -3,
    favors: 'werewolf',
    requires: [{ team: 'werewolf', min: 2, label: 'Có ít nhất 2 vai phe Sói' }],
  },
  {
    id: 'long_night',
    name: 'Đêm Dài',
    description:
      'Mặt trời lên muộn, làng chưa kịp họp: ngày đầu tiên KHÔNG treo cổ ai, chỉ thảo luận rồi vào thẳng đêm 2.',
    value: -1,
    favors: 'werewolf',
    requires: [],
  },
  {
    id: 'lunar_eclipse',
    name: 'Nguyệt Thực',
    description:
      'Không có trăng cho Sói hóa thân: đêm 1 bầy Sói chỉ nhận mặt nhau, không được cắn ai.',
    value: 1,
    favors: 'village',
    requires: [{ team: 'werewolf', min: 1, label: 'Có ít nhất 1 vai phe Sói' }],
  },
  {
    id: 'inquisition',
    name: 'Toà Án Dị Giáo',
    description:
      'Giáo hội giám sát mọi phiên xử: người bị treo cổ luôn bị lật bài, quản trò công bố vai trò của họ cho cả làng.',
    value: 5,
    favors: 'village',
    requires: [],
  },
  {
    id: 'mob_rule',
    name: 'Luật Đám Đông',
    description:
      'Dân làng sợ xử oan: muốn treo cổ phải có quá bán số người còn sống bỏ phiếu cho cùng một người, nếu không thì ngày hôm đó không ai chết.',
    value: -3,
    favors: 'werewolf',
    requires: [],
  },
  {
    id: 'silver_bullet',
    name: 'Đạn Bạc',
    description:
      'Lò rèn của làng đúc thêm đạn: Thợ Săn được thêm 1 phát bắn và có thể chủ động bắn trong ngày (một lần duy nhất) thay vì chỉ bắn khi chết.',
    value: 3,
    favors: 'village',
    requires: [
      { roles: ['hunter', 'huntress'], min: 1, label: 'Có Thợ Săn hoặc Nữ Thợ Săn' },
    ],
  },
  {
    id: 'garlic_harvest',
    name: 'Mùa Tỏi',
    description:
      'Làng vừa được mùa tỏi: mỗi ngày cả làng chọn 1 người để treo tỏi trước cửa; đêm đó Ma Cà Rồng không cắn được người đó.',
    value: 2,
    favors: 'village',
    requires: [{ team: 'vampire', min: 1, label: 'Có ít nhất 1 vai phe Ma cà rồng' }],
  },
  {
    id: 'thick_fog',
    name: 'Sương Mù Dày',
    description:
      'Sương che hết bản dạng: các vai soi chỉ biết được mục tiêu CÓ hay KHÔNG có năng lực ban đêm, không biết phe.',
    value: -4,
    favors: 'werewolf',
    requires: [
      {
        roles: ['seer', 'aura_seer', 'mystic_seeker', 'apprentice_seer', 'investigator'],
        min: 1,
        label: 'Có ít nhất 1 vai soi (Tiên Tri / Thám Tử)',
      },
    ],
  },
  {
    id: 'witch_sabbath',
    name: 'Đêm Hội Phù Thủy',
    description:
      'Đêm hội mở kho thuốc: Phù Thủy được chọn dùng 3 bình giết thay vì 1 bình cứu và 1 bình giết.',
    value: 3,
    favors: 'village',
    requires: [{ roles: ['witch'], min: 1, label: 'Có Phù Thủy' }],
  },
  {
    id: 'talking_graveyard',
    name: 'Nghĩa Địa Biết Nói',
    description:
      'Người chết trong đêm còn kịp để lại dấu: mỗi sáng quản trò công bố vai trò của nạn nhân bị giết đêm qua.',
    value: 3,
    favors: 'village',
    requires: [],
  },
  {
    id: 'red_thread',
    name: 'Sợi Chỉ Đỏ',
    description:
      'Lời thề tình nhân mạnh hơn lời thề với làng: Cặp đôi luôn tách thành phe thứ 3 (bất kể số người chơi) và thắng nếu là hai người cuối cùng còn sống.',
    value: -2,
    favors: 'other',
    requires: [{ roles: ['cupid'], min: 1, label: 'Có Thần Tình Yêu' }],
  },
  {
    id: 'wolf_covenant',
    name: 'Khế Ước Bầy Sói',
    description:
      'Bầy sói ký khế ước với tay trong: Kẻ Phản Bội / Bà Đồng được thức dậy nhận mặt bầy Sói trong đêm 1 (nhưng Sói không biết họ là ai).',
    value: -3,
    favors: 'werewolf',
    requires: [
      { roles: ['minion', 'sorceress'], min: 1, label: 'Có Kẻ Phản Bội hoặc Bà Đồng' },
    ],
  },
  {
    id: 'village_militia',
    name: 'Dân Quân Tự Vệ',
    description:
      'Làng đông người và đang giận dữ: ngày đầu tiên làng được treo cổ 2 người (bỏ phiếu hai lượt liên tiếp).',
    value: 3,
    favors: 'village',
    requires: [{ roles: ['villager'], min: 3, label: 'Có ít nhất 3 Dân Làng' }],
  },
  {
    id: 'blood_pact',
    name: 'Giao Ước Máu',
    description:
      'Kẻ Chán Đời kéo theo người khác xuống mồ: nếu Chán Đời bị treo cổ, người bên phải của Chán đời mà vote giết sẽ chết ngay lập tức.',
    value: -2,
    favors: 'other',
    requires: [{ roles: ['tanner'], min: 1, label: 'Có Chán Đời' }],
  },
  {
    id: 'royal_decree',
    name: 'Chiếu Chỉ Hoàng Gia',
    description:
      'Hoàng Tử nắm quyền phán xử: sau khi lộ thân phận, mỗi ngày phiếu bầu của Hoàng Tử được tính gấp đôi.',
    value: 3,
    favors: 'village',
    requires: [{ roles: ['prince'], min: 1, label: 'Có Hoàng Tử' }],
  },
]

export const THEMES = THEMES_DATA.map((theme) => ({
  requires: [],
  favors: 'village',
  ...theme,
}))

export const THEME_BY_ID = Object.fromEntries(THEMES.map((t) => [t.id, t]))

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

/** Nhãn hiển thị cho một điều kiện. */
export function requirementLabel(req) {
  if (req.label) return req.label
  if (req.team) {
    return `Có ít nhất ${req.min} vai phe ${TEAMS[req.team]?.label ?? req.team}`
  }
  const names = (req.roles || []).map((id) => ROLE_BY_ID[id]?.name ?? id)
  return `Có ít nhất ${req.min} trong: ${names.join(', ')}`
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
