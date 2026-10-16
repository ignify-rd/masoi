import { useMemo } from 'react'
import { isThemeAvailable, pickRandomTheme } from '../data/themes.js'
import { useI18n } from '../i18n/useI18n.js'
import { showAlert } from '../ui/dialog.js'
import { formatValue, valueTone } from '../ui/format.js'
import './ThemePicker.css'

export default function ThemePicker({ selected, themeId, onChangeTheme }) {
  const { t, teams, themes, themeById, requirementLabel } = useI18n()
  const options = useMemo(
    () =>
      themes.map((theme) => ({
        theme,
        available: isThemeAvailable(theme, selected),
      })),
    [themes, selected],
  )

  const current = themeById[themeId] || null
  const currentAvailable = current ? isThemeAvailable(current, selected) : true
  const availableCount = options.filter((o) => o.available).length

  const handleRandom = () => {
    const theme = pickRandomTheme(selected, { excludeId: themeId })
    if (!theme) {
      showAlert(t('theme.noneAvailable'))
      return
    }
    onChangeTheme(theme.id)
  }

  return (
    <div className="theme-picker">
      <div className="theme-row">
        <label className="theme-label" htmlFor="theme-select">
          {t('theme.label')}
        </label>
        <div className="theme-select-wrap">
          <select
            id="theme-select"
            className="theme-select"
            value={themeId || ''}
            onChange={(e) => onChangeTheme(e.target.value || null)}
          >
            <option value="">{t('theme.none')}</option>
            {options.map(({ theme, available }) => (
              <option key={theme.id} value={theme.id} disabled={!available}>
                {theme.name} ({formatValue(theme.value)})
                {available ? '' : ` — ${t('theme.missingRoles')}`}
              </option>
            ))}
          </select>
          {themeId && (
            <button
              type="button"
              className="theme-clear-btn"
              onClick={() => onChangeTheme(null)}
              title={t('theme.clearTitle')}
              aria-label={t('theme.clear')}
            >
              ✕
            </button>
          )}
        </div>
        <button
          type="button"
          className="ghost-btn small"
          onClick={handleRandom}
          disabled={availableCount === 0}
          title={t('theme.randomTitle')}
        >
          {t('theme.random')}
        </button>
      </div>

      {current ? (
        <div
          className="theme-card"
          style={{ '--team-color': teams[current.favors].color }}
        >
          <div className="theme-card-head">
            <strong className="theme-card-name">{current.name}</strong>
            <span className={`theme-card-value ${valueTone(current.value)}`}>
              {formatValue(current.value)}
            </span>
          </div>
          <p className="theme-card-desc">{current.description}</p>
          <div className="theme-card-meta">
            <span
              className="team-tag small"
              style={{ '--team-color': teams[current.favors].color }}
            >
              {t('theme.favors', { team: teams[current.favors].label })}
            </span>
            {current.requires.length > 0 && (
              <span className="muted theme-card-req">
                {t('theme.requires', {
                  list: current.requires.map(requirementLabel).join(' • '),
                })}
              </span>
            )}
          </div>
          {!currentAvailable && (
            <p className="theme-card-warning">{t('theme.unmet')}</p>
          )}
        </div>
      ) : (
        <p className="muted theme-empty">{t('theme.empty')}</p>
      )}
    </div>
  )
}
