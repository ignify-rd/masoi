import { useEffect, useMemo, useState } from 'react'
import { ROLE_BY_ID, canIncreaseRole, clampRoleCount } from './data/roles.js'
import RoleLibrary from './components/RoleLibrary.jsx'
import SetupPanel from './components/SetupPanel.jsx'
import NightCallOrder from './components/NightCallOrder.jsx'
import MatchHistory from './components/MatchHistory.jsx'
import DiscussionTimer from './components/DiscussionTimer.jsx'
import { THEME_BY_ID, getThemeValue, isThemeAvailable } from './data/themes.js'

const STORAGE_KEY = 'masoi.setup'
const THEME_STORAGE_KEY = 'masoi.theme'

function loadSelected() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    // chỉ giữ lại các id hợp lệ
    return Object.fromEntries(
      Object.entries(parsed)
        .filter(([id, c]) => ROLE_BY_ID[id] && Number(c) > 0)
        .map(([id, c]) => [id, clampRoleCount(id, Number(c))])
        .filter(([, c]) => c > 0),
    )
  } catch {
    return {}
  }
}

function loadThemeId() {
  try {
    const raw = localStorage.getItem(THEME_STORAGE_KEY)
    return raw && THEME_BY_ID[raw] ? raw : null
  } catch {
    return null
  }
}

export default function App() {
  const [selected, setSelected] = useState(loadSelected)
  const [themeId, setThemeId] = useState(loadThemeId)
  const [started, setStarted] = useState(false)
  const [startedAt, setStartedAt] = useState(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selected))
  }, [selected])

  useEffect(() => {
    if (themeId) localStorage.setItem(THEME_STORAGE_KEY, themeId)
    else localStorage.removeItem(THEME_STORAGE_KEY)
  }, [themeId])

  // Bỏ chủ đề khi setup không còn thỏa yêu cầu vai bắt buộc.
  useEffect(() => {
    const theme = THEME_BY_ID[themeId]
    if (theme && !isThemeAvailable(theme, selected)) setThemeId(null)
  }, [themeId, selected])

  const add = (id) =>
    setSelected((s) => {
      if (!canIncreaseRole(id, s)) return s
      return { ...s, [id]: (s[id] || 0) + 1 }
    })

  const inc = add

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
    setThemeId(THEME_BY_ID[nextThemeId] ? nextThemeId : null)
  }

  const totalPlayers = useMemo(
    () => Object.values(selected).reduce((a, b) => a + b, 0),
    [selected],
  )

  const rolesValue = useMemo(
    () =>
      Object.entries(selected).reduce(
        (sum, [id, c]) => sum + (ROLE_BY_ID[id]?.value || 0) * c,
        0,
      ),
    [selected],
  )

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
            onBack={() => {
              setStarted(false)
              setStartedAt(null)
            }}
            onEndMatch={() => {
              setStarted(false)
              setStartedAt(null)
            }}
          />
          <DiscussionTimer />
        </main>
      ) : (
        <main className="app-main">
          <RoleLibrary selected={selected} onAdd={add} />
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
            onStart={() => {
              setStartedAt(new Date().toISOString())
              setStarted(true)
            }}
          />
        </main>
      )}

      <footer className="app-footer muted">
        Điểm cân bằng dựa trên giá trị nhân vật của Ultimate Werewolf.
      </footer>
    </div>
  )
}
