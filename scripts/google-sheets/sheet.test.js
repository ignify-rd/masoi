// Kiểm tra Google Apps Script (MaSoiCode.gs) khớp với app: dữ liệu đã sinh
// lại mới nhất và bộ mã hoá trên sheet cho ra đúng mã như app.
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import { describe, expect, it } from 'vitest'
import { SHEET_SCRIPT_PATH, buildSheetScript } from './build.mjs'
import { encodeSetupCode } from '../../src/data/roleCode.js'
import { ROLES } from '../../src/data/roles.js'
import { MAX_THEMES, THEMES, normalizeThemeIds } from '../../src/data/themes.js'
import { allNames } from '../../src/i18n/index.js'

const source = readFileSync(SHEET_SCRIPT_PATH, 'utf8')

function loadSheetScript() {
  const context = {}
  vm.runInNewContext(source, context)
  return context
}

describe('MaSoiCode.gs', () => {
  it('đã sinh lại theo src/data — nếu đỏ hãy chạy `npm run gen:sheet`', () => {
    expect(buildSheetScript(source)).toBe(source)
  })

  it('sinh mã giống hệt app (đặt tên cột theo tên vai ở mọi ngôn ngữ, tên tắt hoặc id)', () => {
    const gs = loadSheetScript()
    let seed = 7
    const random = () => {
      seed = (seed * 16807) % 2147483647
      return seed / 2147483647
    }
    const pickOne = (items) => items[Math.floor(random() * items.length)]

    for (let i = 0; i < 100; i++) {
      const counts = {}
      const roles = {}
      for (const role of ROLES) {
        if (random() >= 0.2) continue
        const count = 1 + Math.floor(random() * role.max)
        counts[pickOne([role.id, ...allNames('roles', role.id)])] = count
        roles[role.id] = count
      }
      if (Object.keys(roles).length === 0) continue
      const themeIds = normalizeThemeIds(
        Array.from({ length: Math.floor(random() * (MAX_THEMES + 1)) }, () => pickOne(THEMES).id),
      )
      const themeNames = themeIds.map((id) => pickOne(allNames('themes', id))).join(', ')

      const result = gs.buildCode_(counts, themeNames)
      expect(result.code).toBe(encodeSetupCode(roles, themeIds))
    }
  })

  it('báo lỗi khi sheet có tên vai app chưa có', () => {
    const gs = loadSheetScript()
    expect(() => gs.buildCode_({ 'Vai Không Có': 1 }, '')).toThrow(/chưa có vai/)
  })

  it('báo lỗi khi chủ đề xung đột hoặc quá nhiều chủ đề', () => {
    const gs = loadSheetScript()
    expect(() => gs.buildCode_({ seer: 1 }, 'Trăng Máu; Nguyệt Thực')).toThrow(/xung đột/)
    const tooMany = THEMES.slice(0, MAX_THEMES + 1).map((t) => t.id).join(', ')
    expect(() => gs.buildCode_({ seer: 1 }, tooMany)).toThrow(/tối đa/)
  })
})
