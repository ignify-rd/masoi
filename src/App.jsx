import { useEffect, useMemo } from 'react'
import { canIncreaseRole, normalizeSetup } from './data/roles.js'
import { countPlayers, sumRoleValue } from './data/balance.js'
import { THEME_BY_ID, getThemeValue, isThemeAvailable } from './data/themes.js'
import { useStoredState } from './ui/useStoredState.js'
import RoleLibrary from './components/RoleLibrary.jsx'
import SetupPanel from './components/SetupPanel.jsx'
import NightCallOrder from './components/NightCallOrder.jsx'
import MatchHistory from './components/MatchHistory.jsx'
import DiscussionTimer from './components/DiscussionTimer.jsx'

const parseThemeId = (id) => (THEME_BY_ID[id] ? id : null)
const parseTimestamp = (value) => (typeof value === 'string' ? value : null)

export default function App() {
  const [selected, setSelected] = useStoredState('masoi.setup', {}, {
    parse: normalizeSetup,
  })
  const [themeId, setThemeId] = useStoredState('masoi.theme', null, {
    parse: parseThemeId,
  })
  // Lưu lại để tải lại trang giữa ván không bị đá về màn sắp ván.
  const [startedAt, setStartedAt] = useStoredState('masoi.startedAt', null, {
    parse: parseTimestamp,
  })
  const started = startedAt != null

  // Bỏ chủ đề khi setup không còn thỏa yêu cầu vai bắt buộc.
  useEffect(() => {
    const theme = THEME_BY_ID[themeId]
    if (theme && !isThemeAvailable(theme, selected)) setThemeId(null)
  }, [themeId, selected])

  const inc = (id) =>
    setSelected((s) => {
      if (!canIncreaseRole(id, s)) return s
      return { ...s, [id]: (s[id] || 0) + 1 }
    })

  const dec = (id) =>
    setSelected((s) => {
      const next = (s[id] || 0) - 1
      const copy = { ...s }
      if (next <= 0) delete copy[id]
      else copy[id] = next
      return copy
    })

  const remove = (id) =>
    setSelected((s) => {
      const copy = { ...s }
      delete copy[id]
      return copy
    })

  const clear = () => setSelected({})

  const loadSetup = (roles, nextThemeId = null) => {
    setSelected(roles)
    setThemeId(parseThemeId(nextThemeId))
  }

  const stopMatch = () => setStartedAt(null)

  const totalPlayers = useMemo(() => countPlayers(selected), [selected])
  const rolesValue = useMemo(() => sumRoleValue(selected), [selected])
  const totalValue = rolesValue + getThemeValue(themeId, selected)

  const theme = THEME_BY_ID[themeId] || null

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <img src="/wolf.svg" alt="" className="brand-icon" />
          <div className="brand-text">
            <h1>Quản Trò Ma Sói</h1>
            <p className="muted">
              Công cụ sắp ván &amp; gọi vai trò
            </p>
          </div>
        </div>
        {!started && (
          <MatchHistory
            hasCurrentSetup={totalPlayers > 0}
            onLoadSetup={loadSetup}
          />
        )}
      </header>

      {started ? (
        <main className="app-main single">
          <NightCallOrder
            selected={selected}
            theme={theme}
            totalPlayers={totalPlayers}
            startedAt={startedAt}
            onBack={stopMatch}
            onEndMatch={stopMatch}
          />
          <DiscussionTimer />
        </main>
      ) : (
        <main className="app-main">
          <RoleLibrary selected={selected} onAdd={inc} onDec={dec} />
          <SetupPanel
            selected={selected}
            totalPlayers={totalPlayers}
            totalValue={totalValue}
            themeId={themeId}
            onChangeTheme={setThemeId}
            onInc={inc}
            onDec={dec}
            onRemove={remove}
            onClear={clear}
            onLoadSetup={loadSetup}
            onStart={() => setStartedAt(new Date().toISOString())}
          />
        </main>
      )}

      <footer className="app-footer muted">
        Điểm cân bằng dựa trên giá trị nhân vật của Ultimate Werewolf.
      </footer>
    </div>
  )
}
