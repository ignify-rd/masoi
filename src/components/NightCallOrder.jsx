import { useMemo, useState } from 'react'
import { buildNightSteps } from '../data/nightSteps.js'
import { saveMatch, WINNER_TEAM_IDS } from '../data/matchHistory.js'
import { useI18n } from '../i18n/useI18n.js'
import { showAlert, showConfirm, showPrompt } from '../ui/dialog.js'
import { formatValue, valueTone } from '../ui/format.js'
import { useStoredState } from '../ui/useStoredState.js'
import './NightCallOrder.css'

const NOTES_STORAGE_KEY = 'masoi.nightNotes'
const HIDDEN_STORAGE_KEY = 'masoi.nightHidden'

const parseNotes = (value) =>
  value && typeof value === 'object' && !Array.isArray(value) ? value : null
const parseHidden = (value) => (Array.isArray(value) ? new Set(value) : null)
const serializeHidden = (set) => [...set]

const TEAM_ORDER = ['vampire', 'werewolf', 'village', 'other']

function buildRoleListText(selected, totalPlayers, { roles, t }) {
  const chosen = roles.filter((role) => (selected[role.id] || 0) > 0).sort(
    (a, b) => {
      const teamA = TEAM_ORDER.indexOf(a.team)
      const teamB = TEAM_ORDER.indexOf(b.team)
      if (teamA !== teamB) return teamA - teamB

      if (Boolean(b.recommended) !== Boolean(a.recommended)) {
        return b.recommended ? 1 : -1
      }

      return b.value - a.value
    },
  )
  const lines = chosen.map((role) => {
    const count = selected[role.id]
    return `${count}x ${role.name}`
  })
  const header =
    totalPlayers > 0
      ? t('night.roleListHeader', { count: totalPlayers })
      : t('night.roleListHeaderEmpty')
  return [header, ...lines].join('\n')
}

function pickTwoRandomPlayers(totalPlayers) {
  if (totalPlayers < 2) return null
  const pool = Array.from({ length: totalPlayers }, (_, i) => i + 1)
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return [pool[0], pool[1]].sort((a, b) => a - b)
}

function StepTag({ tag }) {
  if (tag.team) {
    return (
      <span
        className="team-tag small"
        style={{ '--team-color': tag.team.color }}
      >
        {tag.team.label}
      </span>
    )
  }
  return (
    <span className={`phase-tag small${tag.variant ? ` ${tag.variant}` : ''}`}>
      {tag.label}
    </span>
  )
}

function StepCard({
  step,
  index,
  note,
  onNoteChange,
  hidden,
  onToggleVisibility,
  totalPlayers,
}) {
  const { t, phases } = useI18n()

  if (hidden) {
    return (
      <li className="step step-collapsed">
        <button
          type="button"
          className="step-reveal-btn"
          onClick={onToggleVisibility}
        >
          <span className="step-reveal-phase">{phases[step.phase]}</span>
          <span className="step-reveal-name">{step.name}</span>
          <span className="step-reveal-action">{t('night.show')}</span>
        </button>
      </li>
    )
  }

  const memoPlaceholder = step.nested
    ? t('night.stepNotesPlaceholder')
    : t('night.roleNotesPlaceholder', { role: step.name })

  return (
    <li className={step.nested ? 'step step-sub' : 'step'}>
      <span className="step-no">{index}</span>
      <div className="step-body">
        <div className="step-title">
          {step.nested && <span className="sub-arrow">↳</span>}
          <span className="step-name">{step.name}</span>
          {step.tags.map((tag, i) => (
            <StepTag key={i} tag={tag} />
          ))}
          {step.hideable && (
            <button
              type="button"
              className="step-hide-btn"
              onClick={onToggleVisibility}
            >
              {t('night.hide')}
            </button>
          )}
        </div>
        {step.script && <p className="step-script">"{step.script}"</p>}
        {step.randomPair && (
          <div className="step-cupid-random">
            <button
              type="button"
              className="ghost-btn small"
              disabled={totalPlayers < 2}
              onClick={() => {
                const pair = pickTwoRandomPlayers(totalPlayers)
                if (pair) {
                  onNoteChange(t('night.randomPairNote', { a: pair[0], b: pair[1] }))
                }
              }}
            >
              {t('night.randomPair', { max: totalPlayers || '?' })}
            </button>
            {totalPlayers < 2 && (
              <span className="step-cupid-random-hint">
                {t('night.randomPairHint')}
              </span>
            )}
          </div>
        )}
        {step.note && <p className="step-note">{step.note}</p>}
        <label className="step-memo">
          <span className="step-memo-label">{t('night.notes')}</span>
          <input
            type="text"
            className="step-memo-input"
            placeholder={memoPlaceholder}
            value={note}
            onChange={(e) => onNoteChange(e.target.value)}
          />
        </label>
      </div>
    </li>
  )
}

export default function NightCallOrder({
  selected,
  theme = null,
  totalPlayers,
  startedAt,
  onBack,
  onEndMatch,
}) {
  const locale = useI18n()
  const { t, rich, teams, requirementLabel } = locale
  const [notes, setNotes] = useStoredState(NOTES_STORAGE_KEY, {}, {
    parse: parseNotes,
  })
  const [hiddenSteps, setHiddenSteps] = useStoredState(
    HIDDEN_STORAGE_KEY,
    new Set(),
    { parse: parseHidden, serialize: serializeHidden },
  )
  const [winner, setWinner] = useState('')
  const [copied, setCopied] = useState(false)

  const steps = useMemo(
    () => buildNightSteps(selected, totalPlayers, theme?.id ?? null, locale),
    [selected, totalPlayers, theme, locale],
  )

  const toggleVisibility = (key) => {
    setHiddenSteps((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const setNote = (key, value) => {
    setNotes((prev) => {
      if (!value.trim()) {
        const next = { ...prev }
        delete next[key]
        return next
      }
      return { ...prev, [key]: value }
    })
  }

  const handleReset = async () => {
    if (!(await showConfirm(t('night.confirmReset')))) {
      return
    }
    setNotes({})
    setHiddenSteps(new Set())
  }

  const handleCopyRoleList = async () => {
    const text = buildRoleListText(selected, totalPlayers, locale)
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      await showPrompt(t('night.copyRoleListPrompt'), text)
      return
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleEndMatch = async () => {
    if (!winner) {
      showAlert(t('night.pickWinnerFirst'))
      return
    }

    if (!(await showConfirm(t('night.confirmEnd')))) {
      return
    }

    saveMatch({
      startedAt,
      totalPlayers,
      roles: selected,
      notes,
      winner,
      themeId: theme?.id ?? null,
    })

    setNotes({})
    setHiddenSteps(new Set())
    onEndMatch()
  }

  let displayIndex = 0

  return (
    <section className="panel call-order">
      <div className="panel-head">
        <h2>{t('night.heading')}</h2>
        <div className="panel-head-actions">
          <button
            type="button"
            className="ghost-btn small"
            onClick={handleCopyRoleList}
          >
            {copied ? t('common.copied') : t('night.copyRoleList')}
          </button>
          <button
            type="button"
            className="ghost-btn small"
            onClick={handleReset}
          >
            {t('common.reset')}
          </button>
          <button className="ghost-btn small" onClick={onBack}>
            {t('night.back')}
          </button>
        </div>
      </div>

      {theme && (
        <div
          className="game-theme"
          style={{ '--team-color': teams[theme.favors].color }}
        >
          <div className="game-theme-head">
            <span className="game-theme-label">{t('night.themeLabel')}</span>
            <span className={`game-theme-value ${valueTone(theme.value)}`}>
              {t('night.themePoints', { value: formatValue(theme.value) })}
            </span>
          </div>
          <h3 className="game-theme-title">{theme.name}</h3>
          <p className="game-theme-desc">{theme.description}</p>
          <p className="game-theme-hint muted">
            {t('night.themeHint')}
            {theme.requires.length > 0 && (
              <>
                {' '}
                {t('theme.requires', {
                  list: theme.requires.map(requirementLabel).join(' • '),
                })}
                .
              </>
            )}
          </p>
          <label className="step-memo theme-memo">
            <span className="step-memo-label">{t('night.themeMemoLabel')}</span>
            <textarea
              className="step-memo-input theme-memo-input"
              rows={2}
              placeholder={t('night.themeMemoPlaceholder')}
              value={notes[`theme:${theme.id}`] || ''}
              onChange={(e) => setNote(`theme:${theme.id}`, e.target.value)}
            />
          </label>
        </div>
      )}

      <p className="call-intro">
        {rich('night.intro', {
          sleepLine: <em>{t('night.sleepLine')}</em>,
          hide: <strong>{t('night.hide')}</strong>,
          notes: <strong>{t('night.notes')}</strong>,
        })}
        {totalPlayers > 0 && (
          <>
            {' '}
            {rich('night.currentGame', {
              players: (
                <strong>{t('common.players', { count: totalPlayers })}</strong>
              ),
            })}
          </>
        )}
      </p>

      {steps.length === 0 ? (
        <p className="empty">{t('night.empty')}</p>
      ) : (
        <ol className="steps">
          {steps.map((step) => {
            const hidden = step.hideable && hiddenSteps.has(step.key)
            return (
              <StepCard
                key={step.key}
                step={step}
                index={hidden ? null : ++displayIndex}
                note={notes[step.key] || ''}
                onNoteChange={(value) => setNote(step.key, value)}
                hidden={hidden}
                onToggleVisibility={() => toggleVisibility(step.key)}
                totalPlayers={totalPlayers}
              />
            )
          })}
        </ol>
      )}

      <p className="call-outro">
        {rich('night.outro', { wakeLine: <em>{t('night.wakeLine')}</em> })}
      </p>

      <div className="call-footer">
        <div className="winner-pick">
          <span className="winner-pick-label">{t('night.winnerLabel')}</span>
          <div className="winner-pick-options">
            {WINNER_TEAM_IDS.map((teamId) => {
              const team = teams[teamId]
              return (
                <button
                  key={teamId}
                  type="button"
                  className={`winner-btn${winner === teamId ? ' active' : ''}`}
                  style={{ '--team-color': team.color }}
                  onClick={() => setWinner(teamId)}
                >
                  {team.label}
                </button>
              )
            })}
          </div>
        </div>
        <button
          type="button"
          className="end-match-btn"
          onClick={handleEndMatch}
          disabled={!winner}
        >
          {t('night.endMatch')}
        </button>
      </div>
    </section>
  )
}
