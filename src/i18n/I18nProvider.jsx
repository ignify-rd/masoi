import { Fragment, useEffect, useMemo, useState } from 'react'
import { readStored, writeStored } from '../data/storage.js'
import { DEFAULT_LANG, getLocale, isLang, setActiveLang } from './index.js'
import { I18nContext } from './useI18n.js'

const LANG_STORAGE_KEY = 'masoi.lang'

// Đã có dữ liệu từ trước khi app có tiếng Anh -> người dùng cũ, giữ tiếng Việt.
const EXISTING_USER_KEYS = ['masoi.setup', 'masoi.matches']

/** Ngôn ngữ lúc mở app: đã chọn trước đó > người dùng cũ > ngôn ngữ trình duyệt. */
function detectLang() {
  const stored = readStored(LANG_STORAGE_KEY, null, (v) => (isLang(v) ? v : null))
  if (stored) return stored
  if (EXISTING_USER_KEYS.some((key) => readStored(key, null) != null)) {
    return DEFAULT_LANG
  }
  const preferred =
    typeof navigator === 'undefined'
      ? []
      : navigator.languages?.length
        ? navigator.languages
        : [navigator.language]
  for (const tag of preferred) {
    const base = String(tag || '').toLowerCase().split('-')[0]
    if (isLang(base)) return base
  }
  // Trình duyệt không dùng ngôn ngữ nào app có: tiếng Anh dễ hiểu hơn.
  return 'en'
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(detectLang)

  useEffect(() => {
    writeStored(LANG_STORAGE_KEY, lang)
    setActiveLang(lang)
    document.documentElement.lang = lang
    document.title = getLocale(lang).t('app.documentTitle')
  }, [lang])

  const value = useMemo(() => {
    const locale = getLocale(lang)
    /** Như t nhưng tham số có thể là phần tử React (VD <strong>). */
    const rich = (key, params) =>
      locale.parts(key, params).map((part, i) => <Fragment key={i}>{part}</Fragment>)
    return { ...locale, rich, setLang }
  }, [lang])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
