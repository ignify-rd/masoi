// Kiểm tra Google Apps Script (MaSoiCode.gs) khớp với app: dữ liệu đã sinh
// lại mới nhất và bộ mã hoá trên sheet cho ra đúng mã như app.
import { readFileSync } from 'node:fs'
import vm from 'node:vm'
import { describe, expect, it } from 'vitest'
import { SHEET_SCRIPT_PATH, buildSheetScript } from './build.mjs'
import { encodeSetupCode } from '../../src/data/roleCode.js'
import { ROLES } from '../../src/data/roles.js'
import { THEMES } from '../../src/data/themes.js'

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

  it('sinh mã giống hệt app (đặt tên cột theo tên vai, tên tắt hoặc id)', () => {
    const gs = loadSheetScript()
    let seed = 7
    const random = () => {
      seed = (seed * 16807) % 2147483647
      return seed / 2147483647
    }
    const nameForms = (role) => [role.name, role.id, ...(role.aliases ?? [])]

    for (let i = 0; i < 100; i++) {
      const counts = {}
      const roles = {}
      for (const role of ROLES) {
        if (random() >= 0.2) continue
        const count = 1 + Math.floor(random() * role.max)
        const forms = nameForms(role)
        counts[forms[Math.floor(random() * forms.length)]] = count
        roles[role.id] = count
      }
      if (Object.keys(roles).length === 0) continue
      const theme = random() < 0.5 ? THEMES[Math.floor(random() * THEMES.length)] : null

      const result = gs.buildCode_(counts, theme ? theme.name : '')
      expect(result.code).toBe(encodeSetupCode(roles, theme?.id))
    }
  })

  it('báo lỗi khi sheet có tên vai app chưa có', () => {
    const gs = loadSheetScript()
    expect(() => gs.buildCode_({ 'Vai Không Có': 1 }, '')).toThrow(/chưa có vai/)
  })
})
