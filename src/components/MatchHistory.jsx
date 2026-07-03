import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ROLE_BY_ID, TEAMS } from '../data/roles.js'
import {
  WINNER_TEAM_IDS,
  deleteMatch,
  formatMatchDate,
  loadMatches,
  normalizeRolesFromMatch,
  updateMatchWinner,
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

function MatchHistoryItem({ match, onLoad, onDelete, onChangeWinner }) {
  const [editingWinner, setEditingWinner] = useState(false)
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
        {editingWinner ? (
          <div className="history-winner-edit">
            {WINNER_TEAM_IDS.map((teamId) => {
              const team = TEAMS[teamId]
              return (
                <button
                  key={teamId}
                  type="button"
                  className={`winner-btn small${
                    match.winner === teamId ? ' active' : ''
                  }`}
                  style={{ '--team-color': team.color }}
                  onClick={() => {
                    onChangeWinner(match.id, teamId)
                    setEditingWinner(false)
                  }}
                >
                  {team.label}
                </button>
              )
            })}
            <button
              type="button"
              className="ghost-btn small"
              onClick={() => setEditingWinner(false)}
            >
              Hủy
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="history-winner-btn"
            onClick={() => setEditingWinner(true)}
            title="Bấm để đổi phe thắng"
          >
            {winnerTeam ? (
              <span
                className="team-tag small history-winner"
                style={{ '--team-color': winnerTeam.color }}
              >
                {winnerTeam.label} thắng
              </span>
            ) : (
              <span className="history-winner unknown">
                Chưa ghi phe thắng
              </span>
            )}
            <span className="history-winner-edit-hint" aria-hidden="true">
              ✎
            </span>
          </button>
        )}
        {roleSummary && (
          <p className="history-item-roles muted">{roleSummary}</p>
        )}
      </div>
      <div className="history-item-actions">
        <button
          type="button"
          className="ghost-btn small history-load-btn"
          onClick={() => onLoad(match)}
        >
          Dùng lại
        </button>
        <button
          type="button"
          className="ghost-btn small danger history-delete-btn"
          onClick={() => onDelete(match)}
        >
          Xóa
        </button>
      </div>
    </li>
  )
}

export default function MatchHistory({ hasCurrentSetup, onLoadSetup }) {
  const [open, setOpen] = useState(false)
  const [matches, setMatches] = useState(() => loadMatches())
  const matchCount = matches.length

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

  const handleDelete = (match) => {
    if (
      !window.confirm(
        `Xóa ván ${formatMatchDate(match.playedAt)} (${match.totalPlayers} người) khỏi lịch sử?`,
      )
    ) {
      return
    }
    setMatches(deleteMatch(match.id))
  }

  const handleChangeWinner = (id, winner) => {
    setMatches(updateMatchWinner(id, winner))
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

      {open &&
        createPortal(
          <>
            <button
              type="button"
              className="history-backdrop"
              aria-label="Đóng lịch sử"
              onClick={() => setOpen(false)}
            />
            <div
              id="match-history-panel"
              className="history-panel"
              role="dialog"
              aria-label="Lịch sử ván"
            >
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
                      onDelete={handleDelete}
                      onChangeWinner={handleChangeWinner}
                    />
                  ))}
                </ul>
              )}
            </div>
          </>,
          document.body,
        )}
    </div>
  )
}
