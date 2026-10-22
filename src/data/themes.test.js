import { describe, expect, it } from 'vitest'
import { themeIdsOfMatch } from './matchHistory.js'
import {
  MAX_THEMES,
  THEMES,
  getThemesValue,
  normalizeThemeIds,
  themeConflicts,
} from './themes.js'

describe('normalizeThemeIds', () => {
  it('nhận giá trị cũ là một id', () => {
    expect(normalizeThemeIds('blood_moon')).toEqual(['blood_moon'])
    expect(normalizeThemeIds(null)).toEqual([])
    expect(normalizeThemeIds('')).toEqual([])
  })

  it('bỏ id lạ, trùng, và chủ đề xung đột với chủ đề đứng trước', () => {
    expect(
      normalizeThemeIds(['blood_moon', 'khong_co', 'blood_moon', 'lunar_eclipse', 'talisman', 42]),
    ).toEqual(['blood_moon', 'talisman'])
  })

  it(`giữ tối đa ${MAX_THEMES} chủ đề`, () => {
    const ids = normalizeThemeIds(THEMES.map((t) => t.id))
    expect(ids).toHaveLength(MAX_THEMES)
  })
})

describe('themeConflicts', () => {
  it('xung đột hai chiều', () => {
    expect(themeConflicts('lunar_eclipse', ['blood_moon', 'talisman'])).toEqual(['blood_moon'])
    expect(themeConflicts('blood_moon', ['lunar_eclipse'])).toEqual(['lunar_eclipse'])
    expect(themeConflicts('talisman', ['blood_moon'])).toEqual([])
  })
})

describe('getThemesValue', () => {
  it('cộng điểm các chủ đề, bỏ chủ đề thiếu vai bắt buộc', () => {
    // Trăng Máu (-3) cần ít nhất 2 vai phe Sói, Bùa Hộ Mệnh (+6) không cần gì.
    expect(getThemesValue(['blood_moon', 'talisman'], { werewolf: 2 })).toBe(3)
    expect(getThemesValue(['blood_moon', 'talisman'], { werewolf: 1 })).toBe(6)
    expect(getThemesValue([], { werewolf: 2 })).toBe(0)
  })
})

describe('themeIdsOfMatch', () => {
  it('đọc được cả ván cũ (themeId) và ván mới (themeIds)', () => {
    expect(themeIdsOfMatch({ themeId: 'talisman' })).toEqual(['talisman'])
    expect(themeIdsOfMatch({ themeId: null })).toEqual([])
    expect(themeIdsOfMatch({ themeIds: ['blood_moon', 'talisman'] })).toEqual([
      'blood_moon',
      'talisman',
    ])
    expect(themeIdsOfMatch({ themeId: 'da_bi_xoa' })).toEqual([])
  })
})
