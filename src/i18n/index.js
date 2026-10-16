// Đa ngôn ngữ: ghép luật (src/data) với chữ (src/i18n/<ngôn ngữ>) thành dữ
// liệu hiển thị của từng ngôn ngữ. Thuần JS, không phụ thuộc React, để test và
// scripts/google-sheets/build.mjs chạy được bằng node.
//
// Thêm ngôn ngữ: tạo thư mục mới cùng cấu trúc với vi/ (index.js, ui.js,
// roles.js, themes.js) rồi thêm vào DICTIONARIES. i18n.test.js sẽ báo thiếu chữ.

import { NIGHT_EXTRAS, PHASE_IDS, ROLES, TEAMS, TEAM_IDS } from '../data/roles.js'
import { THEMES } from '../data/themes.js'
import vi from './vi/index.js'
import en from './en/index.js'

export const DICTIONARIES = { vi, en }
export const LANGS = Object.keys(DICTIONARIES)

/** Ngôn ngữ gốc: ngôn ngữ khác thiếu chữ nào thì lấy chữ ở đây. */
export const DEFAULT_LANG = 'vi'

/** Ngôn ngữ in trên lá bài gốc (Ultimate Werewolf) — tên này hiện kèm tên vai. */
const CARD_LANG = 'en'

export function isLang(value) {
  return typeof value === 'string' && Object.hasOwn(DICTIONARIES, value)
}

const PLACEHOLDER = /\{(\w+)\}/g

/**
 * Thay {tên} trong mẫu bằng params[tên], trả về mảng các đoạn. Tham số giữ
 * nguyên kiểu (VD phần tử React), tham số không truyền thì giữ nguyên {tên}.
 */
export function interpolate(template, params = {}) {
  const parts = []
  let last = 0
  for (const match of template.matchAll(PLACEHOLDER)) {
    parts.push(template.slice(last, match.index))
    parts.push(Object.hasOwn(params, match[1]) ? params[match[1]] : match[0])
    last = match.index + match[0].length
  }
  parts.push(template.slice(last))
  return parts.filter((part) => part !== '')
}

/**
 * Mọi tên của một vai/chủ đề ở mọi ngôn ngữ (tên chính trước, rồi aliases),
 * không trùng — dùng để tìm kiếm và nhận tên cột trên Google Sheet.
 * @param {'roles' | 'themes'} group
 */
export function allNames(group, id) {
  const entries = LANGS.map((lang) => DICTIONARIES[lang][group][id] ?? {})
  const names = [
    ...entries.map((entry) => entry.name),
    ...entries.flatMap((entry) => entry.aliases ?? []),
  ].filter(Boolean)
  return [...new Set(names)]
}

const locales = new Map()

/** Dữ liệu hiển thị của một ngôn ngữ (tạo một lần rồi dùng lại). */
export function getLocale(lang) {
  const key = isLang(lang) ? lang : DEFAULT_LANG
  if (!locales.has(key)) locales.set(key, createLocale(key))
  return locales.get(key)
}

// Ngôn ngữ đang hiển thị, cho code ngoài React (VD popup trong ui/dialog.js).
let activeLang = DEFAULT_LANG

export function setActiveLang(lang) {
  activeLang = isLang(lang) ? lang : DEFAULT_LANG
}

export function getActiveLocale() {
  return getLocale(activeLang)
}

const pick = (source, keys) =>
  Object.fromEntries(keys.map((key) => [key, source[key]]))

function createLocale(lang) {
  const dict = DICTIONARIES[lang]
  const base = DICTIONARIES[DEFAULT_LANG]
  const pluralRules = new Intl.PluralRules(dict.locale)
  const orList = new Intl.ListFormat(dict.locale, { type: 'disjunction' })

  /** Chữ của một vai/chủ đề/bước: lấy theo ngôn ngữ, thiếu trường nào lấy từ ngôn ngữ gốc. */
  const text = (own, fallback, keys) => pick({ ...fallback, ...own }, keys)

  function template(key, params) {
    let entry = dict.ui[key] ?? base.ui[key]
    if (entry == null) return key
    if (typeof entry === 'object') {
      entry = entry[pluralRules.select(params?.count ?? 0)] ?? entry.other
    }
    return entry
  }

  /** Chữ giao diện theo khóa, thay tham số {tên}. */
  const t = (key, params) => interpolate(template(key, params), params).join('')

  /** Như t nhưng trả về mảng đoạn, để chèn phần tử React vào giữa câu. */
  const parts = (key, params) => interpolate(template(key, params), params)

  const teams = Object.fromEntries(
    TEAM_IDS.map((id) => [id, { ...TEAMS[id], label: t(`team.${id}`) }]),
  )
  const phases = Object.fromEntries(PHASE_IDS.map((id) => [id, t(`phase.${id}`)]))

  const roles = ROLES.map((role) => ({
    ...role,
    ...text(dict.roles[role.id], base.roles[role.id], ['name', 'ability', 'script']),
    cardName: DICTIONARIES[CARD_LANG].roles[role.id]?.name,
    searchNames: allNames('roles', role.id),
  }))
  const roleById = Object.fromEntries(roles.map((role) => [role.id, role]))

  const extras = Object.values(NIGHT_EXTRAS).map((extra) => ({
    ...extra,
    ...text(dict.extras[extra.id], base.extras[extra.id], [
      'name',
      'playerCondition',
      'script',
      'moderatorNote',
    ]),
  }))

  const themes = THEMES.map((theme) => {
    const own = dict.themes[theme.id] ?? {}
    const fallback = base.themes[theme.id] ?? {}
    return {
      ...theme,
      ...text(own, fallback, ['name', 'description']),
      nightSteps: (theme.nightSteps ?? []).map((step) => ({
        ...step,
        ...text(own.steps?.[step.id], fallback.steps?.[step.id], [
          'name',
          'script',
          'moderatorNote',
        ]),
      })),
    }
  })
  const themeById = Object.fromEntries(themes.map((theme) => [theme.id, theme]))

  /** Nhãn của một điều kiện trong theme.requires, sinh từ chính điều kiện. */
  function requirementLabel(req) {
    const min = req.min ?? 1
    if (req.team) {
      return t('requirement.team', { count: min, team: teams[req.team]?.label ?? req.team })
    }
    const names = (req.roles ?? []).map((id) => roleById[id]?.name ?? id)
    return min === 1
      ? t('requirement.roles', { roles: orList.format(names) })
      : t('requirement.rolesMin', { count: min, roles: names.join(', ') })
  }

  function formatDate(iso) {
    if (!iso) return ''
    try {
      return new Date(iso).toLocaleString(dict.locale, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return ''
    }
  }

  return {
    lang,
    t,
    parts,
    teams,
    phases,
    roles,
    roleById,
    extras,
    themes,
    themeById,
    requirementLabel,
    formatDate,
  }
}
