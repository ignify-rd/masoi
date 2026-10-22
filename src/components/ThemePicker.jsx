import { useMemo } from 'react'
import {
  MAX_THEMES,
  isThemeAvailable,
  themeConflicts,
} from '../data/themes.js'
import { useI18n } from '../i18n/useI18n.js'
import { formatValue, valueTone } from '../ui/format.js'
import './ThemePicker.css'

function ThemeCard({ theme, available, onRemove }) {
  const { t, teams, requirementLabel } = useI18n()
  const team = teams[theme.favors]

  return (
    <div className="theme-card" style={{ '--team-color': team.color }}>
      <div className="theme-card-head">
        <strong className="theme-card-name">{theme.name}</strong>
        <span className="theme-card-actions">
          <span className={`theme-card-value ${valueTone(theme.value)}`}>
            {formatValue(theme.value)}
          </span>
          <button
            type="button"
            className="theme-card-remove"
            onClick={onRemove}
            title={t('theme.remove', { theme: theme.name })}
            aria-label={t('theme.remove', { theme: theme.name })}
          >
            ✕
          </button>
        </span>
      </div>
      <p className="theme-card-desc">{theme.description}</p>
      <div className="theme-card-meta">
        <span className="team-tag small" style={{ '--team-color': team.color }}>
          {t('theme.favors', { team: team.label })}
        </span>
        {theme.requires.length > 0 && (
          <span className="muted theme-card-req">
            {t('theme.requires', {
              list: theme.requires.map(requirementLabel).join(' • '),
            })}
          </span>
        )}
      </div>
      {!available && <p className="theme-card-warning">{t('theme.unmet')}</p>}
    </div>
  )
}

export default function ThemePicker({ selected, themeIds, onChangeThemes }) {
  const { t, themes, themeById } = useI18n()
  const full = themeIds.length >= MAX_THEMES

  // Chủ đề chưa chọn, kèm lý do không chọn được (thiếu vai / xung đột).
  const options = useMemo(
    () =>
      themes
        .filter((theme) => !themeIds.includes(theme.id))
        .map((theme) => {
          const conflicts = themeConflicts(theme.id, themeIds)
          let reason = null
          if (!isThemeAvailable(theme, selected)) {
            reason = t('theme.missingRoles')
          } else if (conflicts.length > 0) {
            reason = t('theme.conflictsWith', {
              themes: conflicts.map((id) => themeById[id].name).join(', '),
            })
          }
          return { theme, reason }
        }),
    [themes, themeById, themeIds, selected, t],
  )

  const addTheme = (id) => {
    if (id && !full) onChangeThemes([...themeIds, id])
  }

  const removeTheme = (id) => onChangeThemes(themeIds.filter((x) => x !== id))

  return (
    <div className="theme-picker">
      <div className="theme-row">
        <label className="theme-label" htmlFor="theme-select">
          {t('theme.label')}
        </label>
        <span className="muted theme-count">
          {themeIds.length}/{MAX_THEMES}
        </span>
        <select
          id="theme-select"
          className="theme-select"
          value=""
          disabled={full}
          onChange={(e) => addTheme(e.target.value)}
        >
          <option value="">
            {full ? t('theme.full', { max: MAX_THEMES }) : t('theme.add')}
          </option>
          {options.map(({ theme, reason }) => (
            <option key={theme.id} value={theme.id} disabled={Boolean(reason)}>
              {theme.name} ({formatValue(theme.value)})
              {reason ? ` — ${reason}` : ''}
            </option>
          ))}
        </select>
      </div>

      {themeIds.length === 0 ? (
        <p className="muted theme-empty">
          {t('theme.empty', { max: MAX_THEMES })}
        </p>
      ) : (
        themeIds.map((id) => (
          <ThemeCard
            key={id}
            theme={themeById[id]}
            available={isThemeAvailable(themeById[id], selected)}
            onRemove={() => removeTheme(id)}
          />
        ))
      )}
    </div>
  )
}
