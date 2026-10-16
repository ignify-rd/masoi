// Kiểm tra chữ của mọi ngôn ngữ: đủ cho mọi vai/chủ đề/bước gọi, không thừa
// khóa của thứ đã bị xoá, chữ giao diện đủ khóa và cùng tham số với tiếng Việt.
import { describe, expect, it } from 'vitest'
import { NIGHT_EXTRAS, ROLES, ROLE_BY_ID } from '../data/roles.js'
import { THEMES, THEME_BY_ID } from '../data/themes.js'
import {
  DEFAULT_LANG,
  DICTIONARIES,
  LANGS,
  allNames,
  getLocale,
  interpolate,
} from './index.js'

const filled = (value) =>
  typeof value === 'string' && value.trim() !== '' && value.trim() === value

const forms = (entry) => (typeof entry === 'object' ? Object.values(entry) : [entry])

const placeholders = (entry) =>
  [
    ...new Set(forms(entry).flatMap((s) => [...s.matchAll(/\{(\w+)\}/g)].map((m) => m[1]))),
  ].sort()

const duplicates = (items) => items.filter((x, i) => items.indexOf(x) !== i)

describe.each(LANGS)('chữ ngôn ngữ "%s"', (lang) => {
  const dict = DICTIONARIES[lang]

  it('có tên ngôn ngữ, nhãn ngắn và locale hợp lệ', () => {
    expect(filled(dict.name)).toBe(true)
    expect(filled(dict.short)).toBe(true)
    expect(Intl.DateTimeFormat.supportedLocalesOf([dict.locale])).toEqual([dict.locale])
  })

  it.each(ROLES.map((r) => [r.id, r]))('vai %s có tên, năng lực, câu gọi', (id, role) => {
    const text = dict.roles[id]
    expect(text, `thiếu chữ của vai ${id}`).toBeDefined()
    expect(filled(text.name), `name của ${id}`).toBe(true)
    expect(filled(text.ability), `ability của ${id}`).toBe(true)
    if (role.wakesAtNight) expect(filled(text.script), `script của ${id}`).toBe(true)
    for (const alias of text.aliases ?? []) expect(filled(alias), `alias của ${id}`).toBe(true)
  })

  it('bước gọi bổ sung có tên và câu gọi', () => {
    for (const extra of Object.values(NIGHT_EXTRAS)) {
      const text = dict.extras[extra.id]
      expect(text, `thiếu chữ của ${extra.id}`).toBeDefined()
      expect(filled(text.name) && filled(text.script), extra.id).toBe(true)
    }
  })

  it.each(THEMES.map((t) => [t.id, t]))('chủ đề %s có tên, mô tả, chữ cho bước gọi đêm', (id, theme) => {
    const text = dict.themes[id]
    expect(text, `thiếu chữ của chủ đề ${id}`).toBeDefined()
    expect(filled(text.name), `name của ${id}`).toBe(true)
    expect(filled(text.description), `description của ${id}`).toBe(true)
    for (const step of theme.nightSteps ?? []) {
      const stepText = text.steps?.[step.id]
      expect(stepText, `thiếu chữ của bước ${step.id}`).toBeDefined()
      expect(filled(stepText.name) && filled(stepText.script), step.id).toBe(true)
    }
  })

  it('không có chữ của vai, bước hay chủ đề không còn tồn tại', () => {
    expect(Object.keys(dict.roles).filter((id) => !ROLE_BY_ID[id])).toEqual([])
    expect(Object.keys(dict.extras).filter((id) => !NIGHT_EXTRAS[id])).toEqual([])
    expect(Object.keys(dict.themes).filter((id) => !THEME_BY_ID[id])).toEqual([])
    for (const [id, text] of Object.entries(dict.themes)) {
      const stepIds = new Set((THEME_BY_ID[id]?.nightSteps ?? []).map((s) => s.id))
      expect(Object.keys(text.steps ?? {}).filter((s) => !stepIds.has(s)), id).toEqual([])
    }
  })

  it('tên vai không trùng nhau, tên chủ đề không trùng nhau', () => {
    const lower = (group) => Object.values(dict[group]).map((t) => t.name.toLowerCase())
    expect(duplicates(lower('roles'))).toEqual([])
    expect(duplicates(lower('themes'))).toEqual([])
  })

  it('chữ giao diện đủ khóa như tiếng Việt, cùng tham số {…}', () => {
    const base = DICTIONARIES[DEFAULT_LANG].ui
    expect(Object.keys(dict.ui).sort()).toEqual(Object.keys(base).sort())
    for (const [key, entry] of Object.entries(dict.ui)) {
      expect(placeholders(entry), key).toEqual(placeholders(base[key]))
      if (typeof entry === 'object') expect(filled(entry.other), `${key}.other`).toBe(true)
      for (const form of forms(entry)) expect(form, key).toBeTruthy()
    }
  })
})

describe('interpolate / t', () => {
  it('thay tham số, giữ nguyên kiểu và giữ {tên} không truyền', () => {
    const el = { type: 'strong' }
    expect(interpolate('a {x} b {y}', { x: el })).toEqual(['a ', el, ' b ', '{y}'])
    expect(interpolate('{x}', { x: 0 })).toEqual([0])
  })

  it('chọn dạng số ít / số nhiều theo count', () => {
    const en = getLocale('en')
    expect(en.t('common.players', { count: 1 })).toBe('1 player')
    expect(en.t('common.players', { count: 5 })).toBe('5 players')
    expect(getLocale('vi').t('common.players', { count: 1 })).toBe('1 người chơi')
  })

  it('khóa không có trả về chính khóa, ngôn ngữ lạ dùng ngôn ngữ gốc', () => {
    expect(getLocale('en').t('khong.co.khoa')).toBe('khong.co.khoa')
    expect(getLocale('xx').lang).toBe(DEFAULT_LANG)
  })
})

describe('getLocale', () => {
  const vi = getLocale('vi')
  const en = getLocale('en')

  it('ghép luật với chữ, luật giống nhau ở mọi ngôn ngữ', () => {
    expect(vi.roleById.seer).toMatchObject({ name: 'Tiên Tri', team: 'village', value: 7 })
    expect(en.roleById.seer).toMatchObject({ name: 'Seer', team: 'village', value: 7 })
    expect(en.themeById.wolf_leader.nightSteps.map((s) => s.id)).toEqual(
      THEME_BY_ID.wolf_leader.nightSteps.map((s) => s.id),
    )
    expect(en.teams.werewolf).toMatchObject({ label: 'Werewolf', color: expect.any(String) })
    expect(en.phases.night1).toBe('Night 1 only')
  })

  it('tên trên lá bài là tên tiếng Anh, tìm được bằng mọi tên', () => {
    expect(vi.roleById.tough_guy.cardName).toBe('Tough Guy')
    expect(en.roleById.tough_guy.cardName).toBe('Tough Guy')
    expect(vi.roleById.tough_guy.searchNames).toEqual(['Thanh Niên Cứng', 'Tough Guy', 'TN cứng'])
    expect(allNames('themes', 'witch_sabbath')).toEqual([
      'Đêm Hội Phù Thủy',
      "Witches' Sabbath",
      'Hội Phù Thủy',
    ])
  })

  it('sinh nhãn điều kiện của chủ đề theo ngôn ngữ', () => {
    const [covenant] = THEME_BY_ID.wolf_covenant.requires
    expect(vi.requirementLabel(covenant)).toBe('Có Kẻ phản bội hoặc Bà Đồng')
    expect(en.requirementLabel(covenant)).toBe('Minion or Sorceress')
    expect(vi.requirementLabel({ team: 'werewolf', min: 2 })).toBe('Có ít nhất 2 vai phe Sói')
    expect(en.requirementLabel({ team: 'vampire', min: 1 })).toBe(
      'At least 1 role on the Vampire team',
    )
    expect(en.requirementLabel({ roles: ['seer', 'witch'], min: 2 })).toBe(
      'At least 2 of: Seer, Witch',
    )
  })

  it('định dạng ngày theo ngôn ngữ', () => {
    expect(vi.formatDate('2026-10-16T09:05:00')).toMatch(/16\/10\/2026/)
    expect(en.formatDate('2026-10-16T09:05:00')).toMatch(/16\/10\/2026/)
    expect(en.formatDate(null)).toBe('')
  })
})
