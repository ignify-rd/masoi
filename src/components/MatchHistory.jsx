import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { normalizeSetup } from '../data/roles.js'
import {
  WINNER_TEAM_IDS,
  deleteMatch,
  loadMatches,
  normalizeThemeFromMatch,
  updateMatchWinner,
} from '../data/matchHistory.js'
import { useI18n } from '../i18n/useI18n.js'
import { showAlert, showConfirm } from '../ui/dialog.js'
import { formatValue } from '../ui/format.js'
import './MatchHistory.css'

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
  const { t, teams, roleById, themeById, formatDate } = useI18n()
  const [editingWinner, setEditingWinner] = useState(false)
  const winnerTeam = match.winner ? teams[match.winner] : null
  const theme = themeById[normalizeThemeFromMatch(match.themeId)] || null
  const roleSummary = Object.entries(match.roles || {})
    .filter(([, c]) => c > 0)
    .map(([id, c]) => {
      const name = roleById[id]?.name || id
      return c > 1 ? `${name} ×${c}` : name
    })
    .join(', ')

  return (
    <li className="history-item">
      <div className="history-item-main">
        <div className="history-item-head">
          <time className="history-item-date">
            {formatDate(match.playedAt)}
          </time>
          <span className="history-item-players">
            {t('common.people', { count: match.totalPlayers })}
          </span>
        </div>
        {theme && (
          <span
            className="team-tag small history-item-theme"
            style={{ '--team-color': teams[theme.favors].color }}
            title={theme.description}
          >
            {theme.name} ({formatValue(theme.value)})
          </span>
        )}
        {editingWinner ? (
          <div className="history-winner-edit">
            {WINNER_TEAM_IDS.map((teamId) => {
              const team = teams[teamId]
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
              {t('common.cancel')}
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="history-winner-btn"
            onClick={() => setEditingWinner(true)}
            title={t('history.changeWinner')}
          >
            {winnerTeam ? (
              <span
                className="team-tag small history-winner"
                style={{ '--team-color': winnerTeam.color }}
              >
                {t('history.winner', { team: winnerTeam.label })}
              </span>
            ) : (
              <span className="history-winner unknown">
                {t('history.noWinner')}
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
          {t('history.reuse')}
        </button>
        <button
          type="button"
          className="ghost-btn small danger history-delete-btn"
          onClick={() => onDelete(match)}
        >
          {t('history.delete')}
        </button>
      </div>
    </li>
  )
}

const SORT_OPTIONS = [
  { value: 'date-desc', label: 'history.sort.dateDesc' },
  { value: 'date-asc', label: 'history.sort.dateAsc' },
  { value: 'players-desc', label: 'history.sort.playersDesc' },
  { value: 'players-asc', label: 'history.sort.playersAsc' },
]

export default function MatchHistory({ hasCurrentSetup, onLoadSetup }) {
  const { t, teams, formatDate } = useI18n()
  const [open, setOpen] = useState(false)
  const [matches, setMatches] = useState(() => loadMatches())
  const [winnerFilter, setWinnerFilter] = useState('all')
  const [sortBy, setSortBy] = useState('date-desc')
  const matchCount = matches.length

  useEffect(() => {
    if (open) setMatches(loadMatches())
  }, [open])

  const visibleMatches = useMemo(() => {
    const filtered =
      winnerFilter === 'all'
        ? matches
        : winnerFilter === 'none'
          ? matches.filter((m) => !m.winner)
          : matches.filter((m) => m.winner === winnerFilter)

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'date-asc':
          return new Date(a.playedAt) - new Date(b.playedAt)
        case 'players-desc':
          return b.totalPlayers - a.totalPlayers
        case 'players-asc':
          return a.totalPlayers - b.totalPlayers
        case 'date-desc':
        default:
          return new Date(b.playedAt) - new Date(a.playedAt)
      }
    })
    return sorted
  }, [matches, winnerFilter, sortBy])

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

  const handleLoad = async (match) => {
    const roles = normalizeSetup(match.roles)
    if (Object.keys(roles).length === 0) {
      showAlert(t('history.invalidMatch'))
      return
    }

    if (
      hasCurrentSetup &&
      !(await showConfirm(t('history.confirmLoad')))
    ) {
      return
    }

    onLoadSetup(roles, normalizeThemeFromMatch(match.themeId))
    setOpen(false)
  }

  const handleDelete = async (match) => {
    if (
      !(await showConfirm(
        t('history.confirmDelete', {
          date: formatDate(match.playedAt),
          players: t('common.people', { count: match.totalPlayers }),
        }),
      ))
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
        aria-label={t('history.buttonAria', { count: matchCount })}
      >
        <HistoryIcon />
        <span className="history-header-label">{t('history.button')}</span>
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
              aria-label={t('history.closeAria')}
              onClick={() => setOpen(false)}
            />
            <div
              id="match-history-panel"
              className="history-panel"
              role="dialog"
              aria-label={t('history.heading')}
            >
              <div className="history-panel-head">
                <h2>{t('history.heading')}</h2>
                <button
                  type="button"
                  className="ghost-btn small history-close-btn"
                  onClick={() => setOpen(false)}
                >
                  {t('history.close')}
                </button>
              </div>

              {matches.length === 0 ? (
                <p className="empty history-empty">{t('history.empty')}</p>
              ) : (
                <>
                  <div className="history-toolbar">
                    <select
                      className="history-filter-select"
                      value={winnerFilter}
                      onChange={(e) => setWinnerFilter(e.target.value)}
                      aria-label={t('history.filterAria')}
                    >
                      <option value="all">{t('history.filterAll')}</option>
                      {WINNER_TEAM_IDS.map((teamId) => (
                        <option key={teamId} value={teamId}>
                          {teams[teamId].label}
                        </option>
                      ))}
                      <option value="none">{t('history.noWinner')}</option>
                    </select>
                    <select
                      className="history-filter-select"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      aria-label={t('history.sortAria')}
                    >
                      {SORT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {t(opt.label)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {visibleMatches.length === 0 ? (
                    <p className="empty history-empty">
                      {t('history.noMatches')}
                    </p>
                  ) : (
                    <ul className="history-list">
                      {visibleMatches.map((match) => (
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
                </>
              )}
            </div>
          </>,
          document.body,
        )}
    </div>
  )
}
