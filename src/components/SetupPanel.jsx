import { useState } from 'react'
import { ROLE_BY_ID, canIncreaseRole } from '../data/roles.js'
import { getRoleImageSrc } from '../data/roleImages.js'
import { balanceTone } from '../data/balance.js'
import {
  SUGGEST_MAX_PLAYERS,
  SUGGEST_MIN_PLAYERS,
  suggestSetup,
} from '../data/suggestSetup.js'
import { decodeSetupCode, encodeSetupCode } from '../data/roleCode.js'
import { useI18n } from '../i18n/useI18n.js'
import BalanceMeter from './BalanceMeter.jsx'
import ThemePicker from './ThemePicker.jsx'
import { showAlert, showConfirm, showPrompt } from '../ui/dialog.js'
import { formatValue, valueTone } from '../ui/format.js'
import './SetupPanel.css'

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
  const { teams } = useI18n()
  const items = TEAM_ORDER.filter((id) => counts[id] > 0)
  if (items.length === 0) return null

  return (
    <div className="setup-team-stats">
      {items.map((teamId) => {
        const team = teams[teamId]
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

export default function SetupPanel({
  selected,
  totalPlayers,
  totalValue,
  themeIds,
  onChangeThemes,
  onInc,
  onDec,
  onRemove,
  onClear,
  onStart,
  onLoadSetup,
}) {
  const { t, teams, roleById } = useI18n()
  const [expanded, setExpanded] = useState(false)
  const [suggestCount, setSuggestCount] = useState('9')
  const [codeInput, setCodeInput] = useState('')
  const [copiedCode, setCopiedCode] = useState(false)

  const handleCopyCode = async () => {
    const code = encodeSetupCode(selected, themeIds)
    if (!code) {
      showAlert(t('setup.noRolesForCode'))
      return
    }
    try {
      await navigator.clipboard.writeText(code)
    } catch {
      await showPrompt(t('setup.copyCodePrompt'), code)
      return
    }
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const handleLoadCode = async () => {
    const decoded = decodeSetupCode(codeInput)
    if (!decoded || Object.keys(decoded.roles).length === 0) {
      showAlert(t('setup.invalidCode'))
      return
    }
    if (
      totalPlayers > 0 &&
      !(await showConfirm(t('setup.confirmLoadCode')))
    ) {
      return
    }
    onLoadSetup(decoded.roles, decoded.themeIds)
    setCodeInput('')
  }

  const handleSuggest = async () => {
    const count = Number(suggestCount)
    if (
      !Number.isFinite(count) ||
      count < SUGGEST_MIN_PLAYERS ||
      count > SUGGEST_MAX_PLAYERS
    ) {
      showAlert(
        t('setup.suggestRange', {
          min: SUGGEST_MIN_PLAYERS,
          max: SUGGEST_MAX_PLAYERS,
        }),
      )
      return
    }
    if (
      totalPlayers > 0 &&
      !(await showConfirm(t('setup.confirmSuggest')))
    ) {
      return
    }
    onLoadSetup(suggestSetup(count))
  }
  const entries = Object.entries(selected).filter(([, c]) => c > 0)
  const sortedEntries = sortEntriesByTeam(entries)
  const teamCounts = countByTeam(entries)

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
          <strong>{totalPlayers}</strong>
          <span>{t('setup.playersUnit', { count: totalPlayers })}</span>
        </div>
        <span className={`setup-dock-balance ${balanceTone(totalValue)}`}>
          {formatValue(totalValue)}
        </span>
        <span className="setup-dock-chevron" aria-hidden="true">
          {expanded ? '▾' : '▴'}
        </span>
      </button>

      <div id="setup-sheet" className="setup-sheet">
        <div className="panel-head">
          <h2>{t('setup.heading')}</h2>
          <span className="muted">
            {t('common.players', { count: totalPlayers })}
          </span>
        </div>

        <div className="suggest-row">
          <label className="suggest-label" htmlFor="suggest-count">
            {t('setup.suggestLabel')}
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
            aria-label={t('setup.suggestAria')}
          />
          <span className="suggest-unit muted">{t('setup.suggestUnit')}</span>
          <button
            type="button"
            className="ghost-btn small suggest-btn"
            onClick={handleSuggest}
          >
            {t('setup.suggestButton')}
          </button>
        </div>

        <div className="code-row">
          <input
            type="text"
            className="code-input"
            placeholder={t('setup.codePlaceholder')}
            value={codeInput}
            onChange={(e) => setCodeInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleLoadCode()
            }}
            aria-label={t('setup.codeAria')}
          />
          <button
            type="button"
            className="ghost-btn small"
            disabled={!codeInput.trim()}
            onClick={handleLoadCode}
          >
            {t('setup.loadCode')}
          </button>
          <button
            type="button"
            className="ghost-btn small"
            disabled={entries.length === 0}
            onClick={handleCopyCode}
          >
            {copiedCode ? t('common.copied') : t('setup.copyCode')}
          </button>
        </div>

        {entries.length > 0 && <TeamBreakdown counts={teamCounts} />}

        <ThemePicker
          selected={selected}
          themeIds={themeIds}
          onChangeThemes={onChangeThemes}
        />

        <BalanceMeter total={totalValue} />

        {entries.length === 0 ? (
          <p className="empty">{t('setup.empty')}</p>
        ) : (
          <ul className="selected-list">
            {sortedEntries.map(([id, count]) => {
              const role = roleById[id]
              const team = teams[role.team]
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
                    <span className={`selected-value ${valueTone(role.value)}`}>
                      {formatValue(role.value)}
                    </span>
                  </div>
                  <div className="stepper">
                    <button
                      type="button"
                      onClick={() => onDec(id)}
                      aria-label={t('role.decrease', { role: role.name })}
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
                      aria-label={t('role.increase', { role: role.name })}
                      title={!canInc ? t('common.max', { max: role.max }) : undefined}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => onRemove(id)}
                    aria-label={t('role.remove', { role: role.name })}
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
          {t('common.start')}
          {totalPlayers > 0 && (
            <span className="start-btn-meta">
              {t('common.people', { count: totalPlayers })}
            </span>
          )}
        </button>
        <button
          type="button"
          className="ghost-btn"
          disabled={entries.length === 0}
          onClick={onClear}
        >
          {t('setup.clear')}
        </button>
      </div>
    </section>
  )
}
