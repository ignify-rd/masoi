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
    value: 3,
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
      'Làng đông người và đang giận dữ: Chọn 1 buổi sáng trong game, làng được treo cổ 2 người (bỏ phiếu hai lượt liên tiếp).',
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
    value: 1,
    favors: 'village',
    requires: [{ roles: ['prince'], min: 1, label: 'Có Hoàng Tử' }],
  },
  {
    id: 'death_note',
    name: 'Sổ Tang',
    description:
      'Làng ghi lại lời trăng trối: mỗi người chết ban đêm được để lại MỘT câu trước khi rời game. Quản trò sẽ quyết định câu đấy có hợp pháp hay không, chỉ được nói về người khác, không được khai vai của mình. Phe sói sẽ được quyền xóa lời trăn trối của người bị cắn 1 lần 1 game.',
    value: 3,
    favors: 'village',
    requires: [],
  },
  {
    id: 'creeping_curse',
    name: 'Lời Nguyền Lan Rộng',
    description:
      'Lời nguyền lan theo máu: Kẻ Bị Nguyền hoá sói khi bị cắn HOẶC khi ngồi cạnh (trái/phải, tính trong số người còn sống) nạn nhân bị Sói cắn đêm đó.',
    value: -3,
    favors: 'werewolf',
    requires: [{ roles: ['cursed'], min: 1, label: 'Có Kẻ Bị Nguyền' }],
  },
  {
    id: 'reverse_trial',
    name: 'Phiên Toà Ngược',
    description:
      'Bị cáo được quyền có luật sư: người bị treo cổ chọn một người bào chữa, người này phản biện hộ người bị treo cổ. Nếu bị cáo bị treo thì luật sư mất quyền vote ngày hôm sau; bị cáo thoát thì luật sư được tính 2 vote trong ngày hôm sau.',
    value: 0,
    favors: 'other',
    requires: [],
  },
  {
    id: 'sheriff',
    name: 'Cảnh Sát Trưởng',
    description:
      'Làng lập lại trật tự: ngày đầu tiên cả làng bầu công khai một Cảnh Sát Trưởng. Từ đó mọi phiên vote treo cổ nếu hoà phiếu thì Cảnh Sát Trưởng quyết định ai bị treo. Cảnh Sát Trưởng chết thì làng bầu người mới ngay trong ngày hôm đó.',
    value: 1,
    favors: 'village',
    requires: [],
  },
  {
    id: 'first_dawn',
    name: 'Bình Minh Đầu Tiên',
    description:
      'Ván mở màn giữa ban ngày: Trò chơi bắt đầu vào ban ngày thay vì ban đêm. Làng thảo luận và treo cổ một người trước khi đêm thật sự bắt đầu.',
    value: 1,
    favors: 'village',
    requires: [],
  },
  {
    id: 'undying_village',
    name: 'Làng Bất Tử',
    description:
      'Không ai thật sự rời làng: người bị cắn hay bị treo cổ vẫn ngồi lại, vẫn nói và vote như thường, chỉ mất năng lực của vai mình. Phe Sói / Ma Cà Rồng chỉ mất quyền cắn khi cả phe đã chết. Phù Thủy không được biết ai bị cắn, chỉ chọn cứu hay không cứu nạn nhân đêm đó. Quản trò âm thầm ghi ai đã chết thật và tự tuyên bố khi ván kết thúc.',
    value: 3,
    favors: 'village',
    requires: [],
  },
  {
    id: 'night_watch',
    name: 'Đèn Canh Đêm',
    description:
      'Làng cắt cử người thức gác: mỗi đêm trước khi trời tối, cả làng công khai chọn một người gác đêm. Người đó không thể bị giết trong đêm ấy, nhưng cũng không được dùng năng lực ban đêm của mình.',
    value: 2,
    favors: 'village',
    requires: [],
  },
  {
    id: 'village_ledger',
    name: 'Nhật Ký Làng',
    description:
      'Làng ghi biên bản mọi lời khai: ai đã công khai nhận mình là một vai cụ thể thì quản trò ghi lại, và người đó không được đổi lời khai cho tới hết ván. Nói mập mờ không tính là khai, nhưng đã nêu tên vai thì bị ghi.',
    value: 2,
    favors: 'village',
    requires: [],
  },
  {
    id: 'rumor_mill',
    name: 'Lời Đồn',
    description:
      'Tin đồn bay khắp làng: mỗi sáng quản trò đưa kín cho một người còn sống ngẫu nhiên một mẩu giấy ghi phe của một người còn sống ngẫu nhiên khác. Người nhận được toàn quyền giữ kín, công bố hay bịa lại.',
    value: 2,
    favors: 'village',
    requires: [],
  },
  {
    id: 'distant_howl',
    name: 'Tiếng Hú Xa',
    description:
      'Bầy Sói đánh hơi được sức mạnh: đêm 1 quản trò cho bầy Sói biết những ai có năng lực ban đêm, nhưng không cho biết đó là vai gì.',
    value: -5,
    favors: 'werewolf',
    requires: [],
  },
  {
    id: 'endless_night',
    name: 'Đêm Vô Tận',
    description:
      'Mặt trời gần như không mọc: cứ sau mỗi ngày lại có hai đêm liên tiếp, bầy Sói được cắn ở cả hai đêm rồi làng mới được họp lại.',
    value: -7,
    favors: 'werewolf',
    requires: [],
  },
  {
    id: 'talisman',
    name: 'Bùa Hộ Mệnh',
    description:
      'Cả làng đeo bùa: đầu ván mỗi người được phát một lá bùa dùng một lần. Ai cũng sẽ có 2 mạng. Nếu bị cắn hoặc bị treo cổ, người đó tiếp tục sống tiếp như không có chuyện gì xảy ra.',
    value: 6,
    favors: 'village',
    requires: [],
  },
  {
    id: 'body_count',
    name: 'Đếm Xác',
    description:
      'Làng điểm danh mỗi sáng: quản trò công bố số lượng vai phe Sói và phe Ma Cà Rồng còn sống, chỉ con số chứ không nói danh tính.',
    value: 4,
    favors: 'village',
    requires: [],
  },
  {
    id: 'holy_water',
    name: 'Nước Thánh',
    description:
      'Làng còn giữ một bình nước thánh: một lần duy nhất trong cả ván, nếu quá bán số người còn sống cùng chỉ vào một người thì quản trò công bố công khai người đó thuộc phe nào.',
    value: 4,
    favors: 'village',
    requires: [],
  },
  {
    id: 'double_trial',
    name: 'Toà Án Kép',
    description:
      'Toà xử không nghỉ: mỗi ngày làng treo cổ hai người thay vì một, bằng cách bỏ phiếu hai lượt liên tiếp.',
    value: 5,
    favors: 'village',
    requires: [],
  },
  {
    id: 'great_storm',
    name: 'Cơn Bão',
    description:
      'Một đêm nào đó bão sẽ ập xuống: quản trò bí mật chọn trước một đêm trong ván, đêm ấy mọi năng lực ban đêm đều thất bại, kể cả đòn cắn. Sáng ra không ai chết và không ai biết mình đã bị bão chặn.',
    value: 0,
    favors: 'other',
    requires: [],
  },
  {
    id: 'holy_antidote',
    name: 'Thuốc Giải Thánh',
    description:
      'Phù Thủy giữ được thuốc giải cho vết cắn ma cà rồng: khi có người chết vào buổi sáng vì Ma Cà Rồng, Phù Thủy được quyền lật bài công khai và dùng bình cứu ngay tại chỗ để cứu người đó.',
    value: 1,
    favors: 'village',
    requires: [
      { roles: ['witch'], min: 1, label: 'Có Phù Thủy' },
      { team: 'vampire', min: 1, label: 'Có ít nhất 1 vai phe Ma cà rồng' },
    ],
  },
  {
    id: 'blood_thirst',
    name: 'Cơn Khát',
    description:
      'Bầy Sói biết nhịn: nếu đêm nào bầy Sói tự nguyện không cắn ai thì đêm hôm sau chúng được cắn hai người.',
    value: -2,
    favors: 'werewolf',
    requires: [],
  },
  {
    id: 'tidal_moon',
    name: 'Trăng Định Kỳ',
    description:
      'Trăng lên theo chu kỳ: các đêm chẵn bầy Sói được cắn hai người, các đêm lẻ chúng hoàn toàn không được cắn ai.',
    value: 0,
    favors: 'other',
    requires: [],
  },
  {
    id: 'last_stand',
    name: 'Sói Cùng Đường',
    description:
      'Con sói cuối cùng liều mạng: khi phe Sói chỉ còn đúng một thành viên sống sót, một lần duy nhất trong ván nó được chọn một đêm để cắn hai người thay vì một. Nó tự chọn đêm nào, làng không được báo trước.',
    value: -2,
    favors: 'werewolf',
    requires: [{ team: 'werewolf', min: 1, label: 'Có ít nhất 1 vai phe Sói' }],
  },
  {
    id: 'white_list',
    name: 'Danh Sách Trắng',
    description:
      'Làng lập danh sách người trong sạch: mỗi sáng quản trò công bố tên một người thuộc phe Dân làng, mỗi người chỉ được công bố một lần trong ván. Một lần duy nhất, bầy Sói được thay tên hôm đó bằng tên một con sói mà không tốn lượt cắn, và làng không có cách nào biết ngày nào bị thay.',
    value: 2,
    favors: 'village',
    requires: [],
  },
  {
    id: 'bite_mark',
    name: 'Dấu Răng',
    description:
      'Vết cắn để lại dấu chỉ hướng: mỗi sáng quản trò công bố khoảng cách từ nạn nhân đêm qua tới con Sói gần nhất là chẵn hay lẻ, tính theo số ghế trong vòng tròn người còn sống và theo chiều ngắn hơn. Nếu chính nạn nhân là Sói thì khoảng cách tính là 0, tức chẵn.',
    value: 3,
    favors: 'village',
    requires: [{ team: 'werewolf', min: 1, label: 'Có ít nhất 1 vai phe Sói' }],
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
