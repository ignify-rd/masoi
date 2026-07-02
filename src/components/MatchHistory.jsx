import { useEffect, useState } from 'react'
import { ROLE_BY_ID, TEAMS } from '../data/roles.js'
import {
  formatMatchDate,
  loadMatches,
  normalizeRolesFromMatch,
} from '../data/matchHistory.js'

function HistoryIcon() {
  return (
    <svg
      className="history-header-icon"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 8v4l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MatchHistoryItem({ match, onLoad }) {
  const winnerTeam = match.winner ? TEAMS[match.winner] : null
  const roleSummary = Object.entries(match.roles || {})
    .filter(([, c]) => c > 0)
    .map(([id, c]) => {
      const name = ROLE_BY_ID[id]?.name || id
      return c > 1 ? `${name} ×${c}` : name
    })
    .join(', ')

  return (
    <li className="history-item">
      <div className="history-item-main">
        <div className="history-item-head">
          <time className="history-item-date">
            {formatMatchDate(match.playedAt)}
          </time>
          <span className="history-item-players">
            {match.totalPlayers} người
          </span>
        </div>
        {winnerTeam ? (
          <span
            className="team-tag small history-winner"
            style={{ '--team-color': winnerTeam.color }}
          >
            {winnerTeam.label} thắng
          </span>
        ) : (
          <span className="history-winner unknown">Chưa ghi phe thắng</span>
        )}
        {roleSummary && (
          <p className="history-item-roles muted">{roleSummary}</p>
        )}
      </div>
      <button
        type="button"
        className="ghost-btn small history-load-btn"
        onClick={() => onLoad(match)}
      >
        Dùng lại
      </button>
    </li>
  )
}

export default function MatchHistory({ hasCurrentSetup, onLoadSetup }) {
  const [open, setOpen] = useState(false)
  const [matches, setMatches] = useState(() => loadMatches())
  const matchCount = loadMatches().length

  useEffect(() => {
    if (open) setMatches(loadMatches())
  }, [open])

  useEffect(() => {
    if (!open) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const handleLoad = (match) => {
    const roles = normalizeRolesFromMatch(match.roles)
    if (Object.keys(roles).length === 0) {
      window.alert('Không thể tải ván này — vai trò không còn hợp lệ.')
      return
    }

    if (
      hasCurrentSetup &&
      !window.confirm('Thay thế ván đấu hiện tại bằng ván từ lịch sử?')
    ) {
      return
    }

    onLoadSetup(roles)
    setOpen(false)
  }

  return (
    <div className={`match-history${open ? ' open' : ''}`}>
      <button
        type="button"
        className="history-header-btn"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="match-history-panel"
        aria-label={`Lịch sử ván, ${matchCount} trận đã lưu`}
      >
        <HistoryIcon />
        <span className="history-header-label">Lịch sử</span>
        {matchCount > 0 && (
          <span className="history-header-badge">{matchCount}</span>
        )}
      </button>

      {open && (
        <>
          <button
            type="button"
            className="history-backdrop"
            aria-label="Đóng lịch sử"
            onClick={() => setOpen(false)}
          />
          <div id="match-history-panel" className="history-panel" role="dialog" aria-label="Lịch sử ván">
            <div className="history-panel-head">
              <h2>Lịch sử ván</h2>
              <button
                type="button"
                className="ghost-btn small history-close-btn"
                onClick={() => setOpen(false)}
              >
                Đóng
              </button>
            </div>

            {matches.length === 0 ? (
              <p className="empty history-empty">
                Chưa có trận nào được lưu. Kết thúc ván để thêm vào lịch sử.
              </p>
            ) : (
              <ul className="history-list">
                {matches.map((match) => (
                  <MatchHistoryItem
                    key={match.id}
                    match={match}
                    onLoad={handleLoad}
                  />
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  )
}
