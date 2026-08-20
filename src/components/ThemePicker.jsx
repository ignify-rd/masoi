import { useMemo } from 'react'
import { TEAMS } from '../data/roles.js'
import {
  THEMES,
  THEME_BY_ID,
  isThemeAvailable,
  pickRandomTheme,
  requirementLabel,
} from '../data/themes.js'

function valueLabel(value) {
  return value > 0 ? `+${value}` : String(value)
}

function valueClass(value) {
  if (value > 0) return 'pos'
  if (value < 0) return 'neg'
  return 'zero'
}

export default function ThemePicker({ selected, themeId, onChangeTheme }) {
  const options = useMemo(
    () =>
      THEMES.map((theme) => ({
        theme,
        available: isThemeAvailable(theme, selected),
      })),
    [selected],
  )

  const current = THEME_BY_ID[themeId] || null
  const currentAvailable = current ? isThemeAvailable(current, selected) : true
  const availableCount = options.filter((o) => o.available).length

  const handleRandom = () => {
    const theme = pickRandomTheme(selected, { excludeId: themeId })
    if (!theme) {
      window.alert('Không có chủ đề nào hợp lệ với setup hiện tại.')
      return
    }
    onChangeTheme(theme.id)
  }

  return (
    <div className="theme-picker">
      <div className="theme-row">
        <label className="theme-label" htmlFor="theme-select">
          Chủ đề
        </label>
        <select
          id="theme-select"
          className="theme-select"
          value={themeId || ''}
          onChange={(e) => onChangeTheme(e.target.value || null)}
        >
          <option value="">Mặc định (không chủ đề)</option>
          {options.map(({ theme, available }) => (
            <option key={theme.id} value={theme.id} disabled={!available}>
              {theme.name} ({valueLabel(theme.value)})
              {available ? '' : ' — thiếu vai bắt buộc'}
            </option>
          ))}
        </select>
        <button
          type="button"
          className="ghost-btn small"
          onClick={handleRandom}
          disabled={availableCount === 0}
          title="Random một chủ đề hợp lệ với setup hiện tại"
        >
          Random
        </button>
      </div>

      {current ? (
        <div
          className="theme-card"
          style={{ '--team-color': TEAMS[current.favors]?.color ?? '#eab308' }}
        >
          <div className="theme-card-head">
            <strong className="theme-card-name">{current.name}</strong>
            <span className={`theme-card-value ${valueClass(current.value)}`}>
              {valueLabel(current.value)}
            </span>
          </div>
          <p className="theme-card-desc">{current.description}</p>
          <div className="theme-card-meta">
            <span
              className="team-tag small"
              style={{ '--team-color': TEAMS[current.favors]?.color ?? '#eab308' }}
            >
              Lợi cho {TEAMS[current.favors]?.label ?? 'phe thứ 3'}
            </span>
            {current.requires.length > 0 && (
              <span className="muted theme-card-req">
                Yêu cầu: {current.requires.map(requirementLabel).join(' • ')}
              </span>
            )}
          </div>
          {!currentAvailable && (
            <p className="theme-card-warning">
              Setup hiện tại chưa thỏa yêu cầu của chủ đề này — điểm chủ đề không
              được tính.
            </p>
          )}
        </div>
      ) : (
        <p className="muted theme-empty">
          Chơi mặc định. Chọn một chủ đề để đổi luật và cộng điểm cân bằng.
        </p>
      )}
    </div>
  )
}
