// Kiểm tra tính toàn vẹn của dữ liệu vai/chủ đề — bắt lỗi gõ sai id, thiếu
// trường, trùng mã... thay vì để app im lặng hoạt động sai. Chữ (tên, năng
// lực, câu gọi) được kiểm tra trong src/i18n/i18n.test.js.
import { describe, expect, it } from 'vitest'
import { NIGHT_EXTRAS, PHASE_IDS, ROLES, ROLE_BY_ID, ROLE_SLOTS, TEAMS } from './roles.js'
import { THEMES, THEME_CODE_BY_ID } from './themes.js'

const duplicates = (items) => items.filter((x, i) => items.indexOf(x) !== i)

describe('vai trò', () => {
  it('id không trùng', () => {
    expect(duplicates(ROLES.map((r) => r.id))).toEqual([])
  })

  it.each(ROLES.map((r) => [r.id, r]))('%s có dữ liệu hợp lệ', (id, role) => {
    expect(TEAMS, `team của ${id}`).toHaveProperty(role.team)
    expect(PHASE_IDS, `phase của ${id}`).toContain(role.phase)
    expect(Number.isInteger(role.max) && role.max >= 1, `max của ${id}`).toBe(true)
    expect(typeof role.value, `value của ${id}`).toBe('number')
    if (role.wakesAtNight) {
      expect(Number.isFinite(role.nightOrder), `nightOrder của ${id}`).toBe(true)
    }
  })

  it('bước gọi bổ sung trỏ tới vai có thật', () => {
    for (const extra of Object.values(NIGHT_EXTRAS)) {
      expect(ROLE_BY_ID, extra.id).toHaveProperty(extra.requiresRole)
      expect(PHASE_IDS, extra.id).toContain(extra.phase)
    }
  })
})

describe('ROLE_SLOTS (định dạng mã ván)', () => {
  it('mọi vai đều có slot — vai mới phải chèn vào ĐẦU ROLE_SLOTS', () => {
    const slotted = new Set(ROLE_SLOTS.map(([id]) => id))
    expect(ROLES.map((r) => r.id).filter((id) => !slotted.has(id))).toEqual([])
  })

  it('id slot không trùng, sức chứa là số nguyên dương', () => {
    expect(duplicates(ROLE_SLOTS.map(([id]) => id))).toEqual([])
    for (const [id, cap] of ROLE_SLOTS) {
      expect(Number.isInteger(cap) && cap >= 1, id).toBe(true)
    }
  })
})

describe('chủ đề', () => {
  it('id không trùng', () => {
    expect(duplicates(THEMES.map((t) => t.id))).toEqual([])
  })

  it('mỗi chủ đề có mã 1 ký tự base62, không trùng (kể cả mã đã nghỉ)', () => {
    for (const theme of THEMES) {
      expect(theme.code, theme.id).toMatch(/^[0-9A-Za-z]$/)
    }
    expect(duplicates(Object.values(THEME_CODE_BY_ID))).toEqual([])
  })

  it.each(THEMES.map((t) => [t.id, t]))('%s có dữ liệu hợp lệ', (id, theme) => {
    expect(TEAMS, `favors của ${id}`).toHaveProperty(theme.favors)
    expect(typeof theme.value, `value của ${id}`).toBe('number')
    for (const req of theme.requires) {
      expect(req.min ?? 1, `min của ${id}`).toBeGreaterThanOrEqual(1)
      if (req.team) expect(TEAMS, `requires.team của ${id}`).toHaveProperty(req.team)
      for (const roleId of req.roles ?? []) {
        expect(ROLE_BY_ID, `requires.roles của ${id}`).toHaveProperty(roleId)
      }
    }
  })

  it('bước gọi đêm của chủ đề hợp lệ, id không trùng với nhau và với id chủ đề', () => {
    // Ghi chú chung của chủ đề lưu ở khóa "theme:<id chủ đề>", ghi chú từng bước
    // ở "theme:<id bước>" — trùng id thì hai ô ghi chú dính vào nhau.
    const stepIds = THEMES.flatMap((t) => (t.nightSteps ?? []).map((s) => s.id))
    expect(duplicates(stepIds)).toEqual([])
    const themeIds = new Set(THEMES.map((t) => t.id))
    expect(stepIds.filter((id) => themeIds.has(id))).toEqual([])

    for (const step of THEMES.flatMap((t) => t.nightSteps ?? [])) {
      expect(Number.isFinite(step.nightOrder), step.id).toBe(true)
      expect(PHASE_IDS, step.id).toContain(step.phase)
    }
  })
})
