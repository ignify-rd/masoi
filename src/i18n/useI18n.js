import { createContext, useContext } from 'react'

// Tách khỏi I18nProvider.jsx để file đó chỉ export component: sửa từ điển khi
// dev thì HMR nạp lại provider mà context vẫn giữ nguyên, app không bị vỡ.
export const I18nContext = createContext(null)

/**
 * Ngôn ngữ hiện tại: { lang, setLang, t, rich, teams, phases, roles, roleById,
 * themes, themeById, extras, requirementLabel, formatDate }.
 */
export function useI18n() {
  const value = useContext(I18nContext)
  if (!value) throw new Error('useI18n phải nằm trong <I18nProvider>.')
  return value
}
