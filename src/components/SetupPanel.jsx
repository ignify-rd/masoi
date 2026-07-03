import { useState } from 'react'
import {
  ROLE_BY_ID,
  TEAMS,
  canIncreaseRole,
  getRoleImageSrc,
} from '../data/roles.js'
import {
  SUGGEST_MAX_PLAYERS,
  SUGGEST_MIN_PLAYERS,
  suggestSetup,
} from '../data/suggestSetup.js'
import BalanceMeter from './BalanceMeter.jsx'

const TEAM_ORDER = ['other', 'vampire', 'werewolf', 'village']

function teamSortIndex(teamId) {
  const index = TEAM_ORDER.indexOf(teamId)
  return index === -1 ? TEAM_ORDER.length : index
}

function countByTeam(entries) {
  const counts = Object.fromEntries(TEAM_ORDER.map((id) => [id, 0]))
  for (const [id, count] of entries) {
    const team = ROLE_BY_ID[id]?.team
    if (team && team in counts) counts[team] += count
  }
  return counts
}

function sortEntriesByTeam(entries) {
  return [...entries].sort((a, b) => {
    const teamDiff =
      teamSortIndex(ROLE_BY_ID[a[0]]?.team) -
      teamSortIndex(ROLE_BY_ID[b[0]]?.team)
    if (teamDiff !== 0) return teamDiff
    return ROLE_BY_ID[b[0]].value - ROLE_BY_ID[a[0]].value
  })
}

function TeamBreakdown({ counts }) {
  const items = TEAM_ORDER.filter((id) => counts[id] > 0)
  if (items.length === 0) return null

  return (
    <div className="setup-team-stats">
      {items.map((teamId) => {
        const team = TEAMS[teamId]
        return (
          <span
            key={teamId}
            className="team-tag small"
            style={{ '--team-color': team.color }}
          >
            {team.label} {counts[teamId]}
          </span>
        )
      })}
    </div>
  )
}

function balanceClass(total) {
  if (total > 3) return 'village'
  if (total < -3) return 'werewolf'
  return 'balanced'
}

export default function SetupPanel({
  selected,
  totalPlayers,
  totalValue,
  onInc,
  onDec,
  onRemove,
  onClear,
  onStart,
  onLoadSetup,
}) {
  const [expanded, setExpanded] = useState(false)
  const [suggestCount, setSuggestCount] = useState('9')

  const handleSuggest = () => {
    const count = Number(suggestCount)
    if (
      !Number.isFinite(count) ||
      count < SUGGEST_MIN_PLAYERS ||
      count > SUGGEST_MAX_PLAYERS
    ) {
      window.alert(
        `Nhập số người chơi từ ${SUGGEST_MIN_PLAYERS} đến ${SUGGEST_MAX_PLAYERS}.`,
      )
      return
    }
    if (
      totalPlayers > 0 &&
      !window.confirm('Thay thế ván đấu hiện tại bằng setup gợi ý?')
    ) {
      return
    }
    onLoadSetup(suggestSetup(count))
  }
  const entries = Object.entries(selected).filter(([, c]) => c > 0)
  const sortedEntries = sortEntriesByTeam(entries)
  const teamCounts = countByTeam(entries)
  const valueLabel = totalValue > 0 ? `+${totalValue}` : String(totalValue)

  return (
    <section
      className={`panel setup${expanded ? ' setup-expanded' : ''}`}
      data-has-roles={entries.length > 0 ? 'true' : 'false'}
    >
      <button
        type="button"
        className="setup-dock-bar"
        onClick={() => setExpanded((open) => !open)}
        aria-expanded={expanded}
        aria-controls="setup-sheet"
      >
        <div className="setup-dock-info">
          {entries.length > 0 && (
            <div className="setup-dock-avatars" aria-hidden="true">
              {sortedEntries.slice(0, 5).map(([id, count]) => {
                const role = ROLE_BY_ID[id]
                const team = TEAMS[role.team]
                const imageSrc = getRoleImageSrc(id)
                return (
                  <span key={id} className="setup-dock-avatar-wrap">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt=""
                        className="setup-dock-avatar"
                        style={{ borderColor: team.color }}
                      />
                    ) : (
                      <span
                        className="setup-dock-avatar setup-dock-avatar-fallback"
                        style={{ background: team.color }}
                      />
                    )}
                    {count > 1 && (
                      <span className="setup-dock-avatar-count">{count}</span>
                    )}
                  </span>
                )
              })}
              {entries.length > 5 && (
                <span className="setup-dock-more">+{entries.length - 5}</span>
              )}
            </div>
          )}
          <strong>{totalPlayers}</strong>
          <span>người chơi</span>
          {entries.length > 0 && <TeamBreakdown counts={teamCounts} />}
        </div>
        <span className={`setup-dock-balance ${balanceClass(totalValue)}`}>
          {valueLabel}
        </span>
        <span className="setup-dock-chevron" aria-hidden="true">
          {expanded ? '▾' : '▴'}
        </span>
      </button>

      <div id="setup-sheet" className="setup-sheet">
        <div className="panel-head">
          <h2>Ván đấu</h2>
          <span className="muted">{totalPlayers} người chơi</span>
        </div>

        <div className="suggest-row">
          <label className="suggest-label" htmlFor="suggest-count">
            Gợi ý setup
          </label>
          <input
            id="suggest-count"
            type="number"
            className="suggest-input"
            min={SUGGEST_MIN_PLAYERS}
            max={SUGGEST_MAX_PLAYERS}
            value={suggestCount}
            onChange={(e) => setSuggestCount(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSuggest()
            }}
            aria-label="Số người chơi cho setup gợi ý"
          />
          <span className="suggest-unit muted">người</span>
          <button
            type="button"
            className="ghost-btn small suggest-btn"
            onClick={handleSuggest}
          >
            Gợi ý
          </button>
        </div>

        {entries.length > 0 && <TeamBreakdown counts={teamCounts} />}

        <BalanceMeter total={totalValue} />

        {entries.length === 0 ? (
          <p className="empty">
            Chưa có vai trò nào. Hãy thêm từ thư viện vai trò.
          </p>
        ) : (
          <ul className="selected-list">
            {sortedEntries.map(([id, count]) => {
              const role = ROLE_BY_ID[id]
              const team = TEAMS[role.team]
              const canInc = canIncreaseRole(id, selected)
              const imageSrc = getRoleImageSrc(id)
              return (
                <li key={id} className="selected-item">
                  {imageSrc ? (
                    <img
                      src={imageSrc}
                      alt=""
                      className="selected-role-img"
                      style={{ borderColor: team.color }}
                      title={team.label}
                    />
                  ) : (
                    <span
                      className="team-dot"
                      style={{ background: team.color }}
                      title={team.label}
                    />
                  )}
                  <div className="selected-main">
                    <span className="selected-name">{role.name}</span>
                    <span
                      className={`selected-value${
                        role.value > 0
                          ? ' pos'
                          : role.value < 0
                            ? ' neg'
                            : ' zero'
                      }`}
                    >
                      {role.value > 0 ? `+${role.value}` : role.value}
                    </span>
                  </div>
                  <div className="stepper">
                    <button
                      type="button"
                      onClick={() => onDec(id)}
                      aria-label={`Giảm ${role.name}`}
                    >
                      −
                    </button>
                    <span className="stepper-count">
                      {count}
                      {role.max > 1 && (
                        <span className="stepper-limit">/{role.max}</span>
                      )}
                    </span>
                    <button
                      type="button"
                      onClick={() => onInc(id)}
                      disabled={!canInc}
                      aria-label={`Tăng ${role.name}`}
                      title={!canInc ? `Tối đa ${role.max}` : undefined}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => onRemove(id)}
                    aria-label={`Xóa ${role.name}`}
                  >
                    ✕
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>

      <div className="setup-actions">
        <button
          type="button"
          className="start-btn"
          disabled={totalPlayers === 0}
          onClick={onStart}
        >
          Bắt đầu
          {totalPlayers > 0 && (
            <span className="start-btn-meta">{totalPlayers} người</span>
          )}
        </button>
        <button
          type="button"
          className="ghost-btn"
          disabled={entries.length === 0}
          onClick={onClear}
        >
          Làm lại
        </button>
      </div>
    </section>
  )
}
