/**
 * Google Apps Script: sinh mã ván giống nút "Copy mã" trong app, để dán vào ô
 * "Nhập mã" của app.
 *
 * Cài đặt: Google Sheet -> Tiện ích mở rộng -> Apps Script -> dán toàn bộ file
 * này vào Code.gs -> Lưu -> tải lại trang sheet. Cần runtime V8 (mặc định của
 * dự án Apps Script mới).
 *
 * Cách dùng: bấm vào một ô bất kỳ trên dòng ván cần lấy mã, rồi
 *   - menu "Ma Sói" -> "Copy mã ván (dòng đang chọn)", hoặc
 *   - bấm nút tự vẽ: Chèn -> Bản vẽ -> vẽ nút -> Lưu, bấm dấu ⋮ trên nút ->
 *     "Chỉ định tập lệnh" (Assign script) -> gõ copyMaVan.
 * Hộp thoại hiện mã kèm nút Copy. Cột được nhận theo tên ở dòng tiêu đề
 * (HEADER_ROW): cột nào trùng tên vai là số lượng vai đó, cột "Chủ đề" là chủ
 * đề, cột "Số Người" (nếu có) dùng để đối chiếu tổng số lá.
 *
 * Tên vai/chủ đề so khớp không phân biệt hoa thường và dấu ("Tiên tri" =
 * "tien tri"), nhận cả tên trên sheet, tên trong app lẫn id ("seer").
 *
 * ĐỒNG BỘ VỚI APP: phần ROLE_SLOTS/THEMES nằm giữa hai dòng ">>> / <<< DỮ LIỆU
 * SINH TỰ ĐỘNG" được sinh từ src/data/roles.js + themes.js bằng
 * `npm run gen:sheet` — đừng sửa tay. Tên cột trên sheet khác tên vai trong
 * app thì thêm vào `aliases` của vai đó (tên cột không khớp sẽ bị bỏ qua).
 * Sinh lại xong nhớ dán lại toàn bộ file này vào Apps Script.
 */

var HEADER_ROW = 1

var ALPHABET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

// >>> DỮ LIỆU SINH TỰ ĐỘNG
// Sinh bởi scripts/google-sheets/build.mjs (`npm run gen:sheet`) — ĐỪNG SỬA TAY.

// [id, sức chứa, [tên gọi...]] — thứ tự và sức chứa y hệt ROLE_SLOTS trong app.
var ROLE_SLOTS = [
  ['tanner', 1, ['Chán Đời', 'Tanner']],
  ['prince', 1, ['Hoàng Tử', 'Prince']],
  ['lone_wolf', 1, ['Sói đơn độc', 'Lone Wolf']],
  ['halfblood', 1, ['Con Lai', 'Halfblood']],
  ['mayor', 1, ['Thị Trưởng', 'Mayor']],
  ['tough_guy', 1, ['Thanh Niên Cứng', 'Tough Guy', 'TN cứng']],
  ['terrorist', 1, ['Kẻ Khủng Bố', 'Terrorist', 'Khủng bố']],
  ['rusty_knight', 1, ['Hiệp sĩ Kiếm Rỉ', 'Rusty Knight', 'Kiếm rỉ']],
  ['diseased', 1, ['Người Bệnh', 'Diseased']],
  ['hoodlum', 1, ['Du Côn', 'Hoodlum']],
  ['cupid', 1, ['Thần Tình Yêu', 'Cupid']],
  ['guard', 1, ['Bảo Vệ', 'Guard']],
  ['priest', 1, ['Mục sư', 'Priest']],
  ['werewolf', 10, ['Ma Sói', 'Werewolf']],
  ['fruit_wolf', 1, ['Sói Ăn Chay', 'Fruit Wolf']],
  ['wolf_cub', 1, ['Sói Con', 'Wolf Cub']],
  ['wolf_man', 1, ['Người sói', 'Wolf Man']],
  ['minion', 1, ['Kẻ phản bội', 'Minion', 'Phản bội']],
  ['alpha_wolf', 1, ['Sói Đầu đàn', 'Alpha Wolf']],
  ['fang_face', 1, ['Nanh Sói', 'Fang Face']],
  ['white_wolf', 1, ['Sói Trắng', 'White Wolf']],
  ['vampire', 6, ['Ma Cà Rồng', 'Vampire']],
  ['dracula', 1, ['Dracula']],
  ['witch', 1, ['Phù Thủy', 'Witch']],
  ['seer', 1, ['Tiên Tri', 'Seer']],
  ['aura_seer', 1, ['Tiên Tri Hào Quang', 'Aura Seer', 'Tiên tri aura']],
  ['mystic_seeker', 1, ['Tiên Tri Bí Ẩn', 'Mystic Seeker']],
  ['apprentice_seer', 1, ['Tiên Tri Tập sự', 'Apprentice Seer']],
  ['sorceress', 1, ['Bà Đồng', 'Sorceress']],
  ['hunter', 1, ['Thợ Săn', 'Hunter']],
  ['huntress', 1, ['Nữ Thợ Săn', 'Huntress']],
  ['investigator', 1, ['Thám Tử', 'Investigator']],
  ['spellcaster', 1, ['Pháp sư', 'Spellcaster']],
  ['cursed', 1, ['Kẻ Bị Nguyền', 'Cursed', 'Bán Sói']],
  ['old_hag', 1, ['Mụ Già', 'Old Hag']],
  ['mentalist', 1, ['Nhà ngoại cảm', 'Mentalist', 'Ngoại cảm']],
  ['gambler', 1, ['Con Bạc', 'Gambler']],
  ['cult_leader', 1, ['Chủ Giáo Phái', 'Cult Leader']],
  ['villager', 30, ['Dân Làng', 'Villager']],
  ['insomniac', 1, ['Kẻ Mất Ngủ', 'Insomniac', 'Mất Ngủ']],
  ['big_bad_wolf', 1, ['Sói Đại Ca', 'Big Bad Wolf']],
  ['dire_wolf', 1, ['Sói Tuyết', 'Dire Wolf']],
  ['wolverine', 1, ['Wolverine']],
  ['haunted_ghost', 1, ['Ma Ám', 'Haunted Ghost']],
  ['bigfoot', 1, ['Chân To', 'Big Foot']],
  ['dream_wolf', 1, ['Sói Mơ Mộng', 'Dreamwolf']],
  ['the_thing', 1, ['The Thing']],
  ['beholder', 1, ['Người quan Sát', 'Beholder']],
  ['illusion_artist', 1, ['Họa Sĩ Ảo Ảnh', 'The Illusion Artist', 'Họa sĩ']],
  ['evil_empath', 1, ['Kẻ Đọc Vị', 'Evil Empath', 'Đọc vị']],
  ['one_eye_seer', 1, ['Tiên Tri Chột', 'One-Eye Seer']],
  ['exposer', 1, ['Người Khám Phá', 'Exposer', 'Khám phá']],
]

// id: [mã 1 ký tự, [tên gọi...]] — mã y hệt THEME_CODE_BY_ID trong app.
var THEMES = {
  endless_night: ['0', ['Đêm Vô Tận']],
  distant_howl: ['1', ['Tiếng Hú Xa']],
  thick_fog: ['2', ['Sương Mù Dày']],
  blood_moon: ['3', ['Trăng Máu']],
  mob_rule: ['4', ['Luật Đám Đông']],
  wolf_covenant: ['5', ['Khế Ước Bầy Sói']],
  night_of_vengeance: ['6', ['Đêm Trả Thù']],
  creeping_curse: ['7', ['Lời Nguyền Lan Rộng']],
  red_thread: ['8', ['Sợi Chỉ Đỏ']],
  blood_pact: ['9', ['Giao Ước Máu']],
  blood_thirst: ['A', ['Cơn Khát']],
  last_stand: ['B', ['Sói Cùng Đường']],
  scent_of_blood: ['C', ['Mùi Máu']],
  long_night: ['D', ['Đêm Dài']],
  reverse_trial: ['E', ['Phiên Toà Ngược']],
  great_storm: ['F', ['Cơn Bão']],
  tidal_moon: ['G', ['Trăng Định Kỳ']],
  wolf_leader: ['H', ['Sói Trưởng']],
  sheriff: ['I', ['Cảnh Sát Trưởng']],
  forest_journey: ['J', ['Chuyến Đi Rừng']],
  lunar_eclipse: ['K', ['Nguyệt Thực']],
  royal_decree: ['L', ['Chiếu Chỉ Hoàng Gia']],
  first_dawn: ['M', ['Bình Minh Đầu Tiên']],
  holy_antidote: ['N', ['Thuốc Giải Thánh']],
  silver_claw: ['O', ['Sói Bạc']],
  garlic_harvest: ['P', ['Mùa Tỏi']],
  night_watch: ['Q', ['Đèn Canh Đêm']],
  village_ledger: ['R', ['Nhật Ký Làng']],
  rumor_mill: ['S', ['Lời Đồn']],
  village_militia: ['T', ['Dân Quân Tự Vệ']],
  white_list: ['U', ['Danh Sách Trắng']],
  price_of_truth: ['V', ['Giá Của Sự Thật']],
  inquisition: ['W', ['Toà Án Dị Giáo']],
  silver_bullet: ['X', ['Đạn Bạc']],
  witch_sabbath: ['Y', ['Đêm Hội Phù Thủy', 'Hội Phù Thủy']],
  talking_graveyard: ['Z', ['Nghĩa Địa Biết Nói']],
  death_note: ['a', ['Sổ Tang']],
  undying_village: ['b', ['Làng Bất Tử']],
  double_trial: ['c', ['Toà Án Kép']],
  bite_mark: ['d', ['Dấu Răng']],
  body_count: ['e', ['Đếm Xác']],
  holy_water: ['f', ['Nước Thánh']],
  talisman: ['g', ['Bùa Hộ Mệnh']],
}
// <<< DỮ LIỆU SINH TỰ ĐỘNG

var NO_THEME = ['', 'khong', 'none']

var SLOT_CAP = {}
ROLE_SLOTS.forEach(function (slot) { SLOT_CAP[slot[0]] = slot[1] })

function roleIndex_() {
  return buildIndex_(ROLE_SLOTS.map(function (s) { return [s[0], s[2]] }))
}

function themeIndex_() {
  return buildIndex_(Object.keys(THEMES).map(function (k) { return [k, THEMES[k][1]] }))
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Ma Sói')
    .addItem('Copy mã ván (dòng đang chọn)', 'copyMaVan')
    .addToUi()
}

/** Gán cho nút trên sheet: sinh mã của dòng đang chọn rồi mở hộp thoại copy. */
function copyMaVan() {
  var ui = SpreadsheetApp.getUi()
  var sheet = SpreadsheetApp.getActiveSheet()
  var row = sheet.getActiveCell().getRow()
  if (row <= HEADER_ROW) {
    ui.alert('Hãy bấm vào một ô trên dòng ván cần lấy mã trước.')
    return
  }

  var lastCol = sheet.getLastColumn()
  var headers = sheet.getRange(HEADER_ROW, 1, 1, lastCol).getValues()[0]
  var values = sheet.getRange(row, 1, 1, lastCol).getValues()[0]

  var roleIndex = roleIndex_()
  var counts = {}
  var theme = ''
  var players = null
  headers.forEach(function (h, i) {
    var key = normalize_(h)
    if (key === 'chu de') theme = values[i]
    else if (key === 'so nguoi') players = Number(values[i]) || null
    else if (roleIndex[key]) counts[h] = values[i]
  })

  var result
  try {
    result = buildCode_(counts, theme)
  } catch (e) {
    ui.alert(e.message)
    return
  }
  if (!result.code) {
    ui.alert('Dòng ' + row + ' chưa có vai nào.')
    return
  }

  var warning = players && players !== result.total
    ? 'Cột "Số Người" là ' + players + ' nhưng mã chỉ có ' + result.total +
      ' lá — có vai app chưa hỗ trợ hoặc vượt số lượng tối đa.'
    : ''
  showCodeDialog_(result, row, warning)
}

function showCodeDialog_(result, row, warning) {
  var summary = result.picked.map(function (p) { return p[0] + ' ×' + p[1] }).join(', ')
  var html = `
<style>
  body { font-family: Arial, sans-serif; font-size: 13px; margin: 0; }
  input { width: 100%; box-sizing: border-box; padding: 8px; font: 600 20px monospace; text-align: center; }
  button { width: 100%; margin-top: 8px; padding: 8px; font-size: 14px; cursor: pointer; }
  #status { min-height: 1.2em; margin-top: 6px; color: #188038; }
  .warn { color: #c5221f; }
  .muted { color: #5f6368; margin-top: 6px; }
</style>
<input id="code" readonly value="${esc_(result.code)}">
<button id="copy">Copy</button>
<div id="status"></div>
${warning ? '<div class="warn">' + esc_(warning) + '</div>' : ''}
<div class="muted">${result.total} lá · Chủ đề: ${esc_(result.theme || 'Không')}</div>
<div class="muted">${esc_(summary)}</div>
<script>
  // Bọc trong hàm: biến toàn cục tên "status" sẽ đè lên window.status (chỉ nhận chuỗi).
  (function () {
    var input = document.getElementById('code')
    var msg = document.getElementById('status')
    function done() { msg.textContent = 'Đã copy! Dán vào ô "Nhập mã" trong app.' }
    function fail() { msg.textContent = 'Không copy tự động được, hãy nhấn Ctrl+C.' }
    function tryCopy() {
      input.focus()
      input.select()
      try { return document.execCommand('copy') } catch (e) { return false }
    }
    document.getElementById('copy').onclick = function () {
      if (tryCopy()) return done()
      if (!navigator.clipboard) return fail()
      navigator.clipboard.writeText(input.value).then(done, fail)
    }
    // Thử copy luôn khi mở; trình duyệt chặn thì mã vẫn được bôi đen sẵn.
    if (tryCopy()) done()
  })()
</script>`
  SpreadsheetApp.getUi().showModalDialog(
    HtmlService.createHtmlOutput(html).setWidth(360).setHeight(280),
    'Mã ván — dòng ' + row,
  )
}

/**
 * { tên vai: số lượng } + tên chủ đề -> { code, picked: [[tên, số lượng]], total, theme }.
 * Số lượng vượt sức chứa bị kẹp lại giống app.
 */
function buildCode_(counts, theme) {
  var roleIndex = roleIndex_()
  var selected = {}
  var nameOf = {}
  var order = []
  Object.keys(counts).forEach(function (name) {
    var raw = counts[name]
    if (raw === '' || raw == null) return
    var count = Math.floor(Number(raw))
    if (isNaN(count) || count < 0) throw new Error('Số lượng vai "' + name + '" không hợp lệ: ' + raw)
    if (count === 0) return
    var id = roleIndex[normalize_(name)]
    if (!id) throw new Error('App chưa có vai "' + name + '".')
    if (!selected[id]) {
      order.push(id)
      nameOf[id] = name
    }
    selected[id] = Math.min((selected[id] || 0) + count, SLOT_CAP[id])
  })

  // Gộp số lượng theo hệ cơ số hỗn hợp (cơ số = sức chứa + 1) rồi đổi sang
  // base62 — giống encodeSetupCode, nhưng dùng mảng chữ số base62 thay cho
  // BigInt. Chữ số lưu ngược: digits[0] là hàng đơn vị.
  var digits = []
  ROLE_SLOTS.forEach(function (slot) {
    mulAdd_(digits, slot[1] + 1, selected[slot[0]] || 0)
  })

  var code = ''
  for (var d = digits.length - 1; d >= 0; d--) code += ALPHABET[digits[d]]

  var themeKey = normalize_(theme == null ? '' : theme)
  if (code && NO_THEME.indexOf(themeKey) === -1) {
    var themeId = themeIndex_()[themeKey]
    if (!themeId) throw new Error('App chưa có chủ đề "' + theme + '".')
    code += '-' + THEMES[themeId][0]
  }

  return {
    code: code,
    picked: order.map(function (id) { return [nameOf[id], selected[id]] }),
    total: order.reduce(function (sum, id) { return sum + selected[id] }, 0),
    theme: NO_THEME.indexOf(themeKey) === -1 ? String(theme) : '',
  }
}

function mulAdd_(digits, mul, add) {
  var carry = add
  for (var i = 0; i < digits.length; i++) {
    var v = digits[i] * mul + carry
    digits[i] = v % 62
    carry = Math.floor(v / 62)
  }
  while (carry > 0) {
    digits.push(carry % 62)
    carry = Math.floor(carry / 62)
  }
}

function esc_(s) {
  return String(s).replace(/[&<>"']/g, function (c) { return '&#' + c.charCodeAt(0) + ';' })
}

/** [[id, [tên...]], ...] -> { tên đã chuẩn hoá: id }, tính cả id. */
function buildIndex_(entries) {
  var index = {}
  entries.forEach(function (e) {
    index[normalize_(e[0])] = e[0]
    e[1].forEach(function (name) { index[normalize_(name)] = e[0] })
  })
  return index
}

/** Bỏ dấu, chữ thường, gộp khoảng trắng: "Tiên  Tri" -> "tien tri". */
function normalize_(s) {
  return String(s)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}
