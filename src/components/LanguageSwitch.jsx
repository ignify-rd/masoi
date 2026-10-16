import { DICTIONARIES, LANGS } from '../i18n/index.js'
import { useI18n } from '../i18n/useI18n.js'
import './LanguageSwitch.css'

/**
 * Desktop: nhóm nút VI | EN. Mobile: một nút gọn hiện ngôn ngữ đang dùng, bấm
 * để chuyển sang ngôn ngữ tiếp theo — header mobile không đủ chỗ cho cả nhóm.
 */
export default function LanguageSwitch() {
  const { lang, setLang, t } = useI18n()
  const next = LANGS[(LANGS.indexOf(lang) + 1) % LANGS.length]

  return (
    <>
      <div className="lang-switch" role="group" aria-label={t('lang.label')}>
        {LANGS.map((id) => (
          <button
            key={id}
            type="button"
            lang={id}
            className={`lang-switch-btn${id === lang ? ' active' : ''}`}
            aria-pressed={id === lang}
            title={DICTIONARIES[id].name}
            onClick={() => setLang(id)}
          >
            {DICTIONARIES[id].short}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="lang-toggle"
        aria-label={`${t('lang.label')}: ${DICTIONARIES[lang].name} → ${DICTIONARIES[next].name}`}
        title={DICTIONARIES[next].name}
        onClick={() => setLang(next)}
      >
        {DICTIONARIES[lang].short}
      </button>
    </>
  )
}
