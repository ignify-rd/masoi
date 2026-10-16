// Sinh phần dữ liệu (ROLE_SLOTS, THEMES) trong MaSoiCode.gs từ src/data, kèm
// tên ở mọi ngôn ngữ trong src/i18n (sheet đặt tên cột tiếng nào cũng nhận).
//   npm run gen:sheet            ghi đè MaSoiCode.gs
//   npm run gen:sheet -- --check  chỉ kiểm tra, lỗi nếu file đang lệch
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { ROLE_BY_ID, ROLE_SLOTS } from '../../src/data/roles.js'
import { MAX_THEMES, THEMES, THEME_CONFLICTS } from '../../src/data/themes.js'
import { allNames } from '../../src/i18n/index.js'

export const SHEET_SCRIPT_PATH = fileURLToPath(
  new URL('./MaSoiCode.gs', import.meta.url),
)

const BEGIN = '// >>> DỮ LIỆU SINH TỰ ĐỘNG'
const END = '// <<< DỮ LIỆU SINH TỰ ĐỘNG'

/** Giống normalize_ trong MaSoiCode.gs. */
function normalize(s) {
  return String(s)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

const quote = (s) => `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
const list = (names) => `[${names.map(quote).join(', ')}]`

/** Bỏ tên trùng sau khi chuẩn hoá (giữ tên xuất hiện trước). */
function uniqueNames(names) {
  const seen = new Set()
  return names.filter((name) => {
    const key = normalize(name)
    if (!key || seen.has(key)) return false
    seen.add(key)
    return true
  })
}

/** Báo lỗi nếu một tên (sau chuẩn hoá) trỏ tới 2 id khác nhau. */
function assertNoCollision(kind, entries) {
  const owner = new Map()
  for (const [id, names] of entries) {
    for (const name of [id, ...names]) {
      const key = normalize(name)
      if (owner.has(key) && owner.get(key) !== id) {
        throw new Error(
          `Tên ${kind} "${name}" bị trùng giữa "${owner.get(key)}" và "${id}".`,
        )
      }
      owner.set(key, id)
    }
  }
}

export function renderSheetData() {
  const roles = ROLE_SLOTS.map(([id, cap]) => {
    // Slot của vai đã bỏ khỏi app vẫn phải giữ để thứ tự/cơ số không đổi.
    const names = ROLE_BY_ID[id] ? uniqueNames(allNames('roles', id)) : []
    return [id, cap, names]
  })
  const themes = THEMES.map((t) => [t.id, t.code, uniqueNames(allNames('themes', t.id))])

  assertNoCollision('vai', roles.map(([id, , names]) => [id, names]))
  assertNoCollision('chủ đề', themes.map(([id, , names]) => [id, names]))

  return [
    BEGIN,
    '// Sinh bởi scripts/google-sheets/build.mjs (`npm run gen:sheet`) — ĐỪNG SỬA TAY.',
    '',
    '// [id, sức chứa, [tên gọi...]] — thứ tự và sức chứa y hệt ROLE_SLOTS trong app.',
    'var ROLE_SLOTS = [',
    ...roles.map(([id, cap, names]) => `  [${quote(id)}, ${cap}, ${list(names)}],`),
    ']',
    '',
    '// id: [mã 1 ký tự, [tên gọi...]] — mã y hệt THEME_CODE_BY_ID trong app.',
    'var THEMES = {',
    ...themes.map(([id, code, names]) => `  ${id}: [${quote(code)}, ${list(names)}],`),
    '}',
    '',
    '// Cặp chủ đề không được chọn chung — y hệt THEME_CONFLICTS trong app.',
    'var THEME_CONFLICTS = [',
    ...THEME_CONFLICTS.map((pair) => `  ${list(pair)},`),
    ']',
    '',
    `var MAX_THEMES = ${MAX_THEMES}`,
    END,
  ].join('\n')
}

/** Thay phần giữa hai dòng đánh dấu trong nội dung file .gs. */
export function buildSheetScript(source) {
  const eol = source.includes('\r\n') ? '\r\n' : '\n'
  const text = source.replace(/\r\n/g, '\n')
  const start = text.indexOf(BEGIN)
  const end = text.indexOf(END)
  if (start < 0 || end < start) {
    throw new Error(`Không tìm thấy dòng "${BEGIN}" / "${END}" trong file .gs.`)
  }
  const next = text.slice(0, start) + renderSheetData() + text.slice(end + END.length)
  return next.replace(/\n/g, eol)
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const current = readFileSync(SHEET_SCRIPT_PATH, 'utf8')
  const next = buildSheetScript(current)
  if (process.argv.includes('--check')) {
    if (next !== current) {
      console.error('MaSoiCode.gs đang lệch với src/data — chạy `npm run gen:sheet`.')
      process.exit(1)
    }
    console.log('MaSoiCode.gs đã khớp với src/data.')
  } else if (next === current) {
    console.log('MaSoiCode.gs đã khớp, không có gì thay đổi.')
  } else {
    writeFileSync(SHEET_SCRIPT_PATH, next)
    console.log('Đã cập nhật MaSoiCode.gs — nhớ dán lại vào Apps Script.')
  }
}
