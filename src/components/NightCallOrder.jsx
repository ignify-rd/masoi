import { useEffect, useMemo, useState } from 'react'
import { ROLE_BY_ID, TEAMS, PHASE_LABEL, NIGHT_EXTRAS } from '../data/roles.js'
import { saveMatch, WINNER_TEAM_IDS } from '../data/matchHistory.js'

const NOTES_STORAGE_KEY = 'masoi.nightNotes'
const HIDDEN_STORAGE_KEY = 'masoi.nightHidden'

function loadNotes() {
  try {
    const raw = localStorage.getItem(NOTES_STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

function loadHidden() {
  try {
    const raw = localStorage.getItem(HIDDEN_STORAGE_KEY)
    if (!raw) return new Set()
    const parsed = JSON.parse(raw)
    return new Set(Array.isArray(parsed) ? parsed : [])
  } catch {
    return new Set()
  }
}

/** Khóa ổn định cho ghi chú từng bước (không phụ thuộc thứ tự hiển thị). */
function getStepKey(step) {
  if (step.kind === 'close') {
    const base = step.role?.id ?? `extra:${step.extra?.id}`
    const sub = step.sub?.name ? `:sub:${step.sub.name}` : ''
    return `close:${base}${sub}`
  }
  if (step.kind === 'sub') return `sub:${step.role.id}:${step.sub.name}`
  if (step.kind === 'extra') return `extra:${step.extra.id}`
  return `role:${step.role.id}`
}

function getStepPhase(step) {
  if (step.kind === 'close') {
    if (step.sub) return step.sub.phase
    if (step.role) return step.role.phase
    if (step.extra) return step.extra.phase
    return 'every'
  }
  if (step.kind === 'sub') return step.sub.phase
  if (step.kind === 'extra') return step.extra.phase
  return step.role.phase
}

/** Khóa dùng chung cho bước chính và các bước đóng (close) đi kèm. */
function getVisibilityKey(step) {
  if (step.kind === 'close') {
    if (step.sub) return `sub:${step.role.id}:${step.sub.name}`
    if (step.role) return `role:${step.role.id}`
    if (step.extra) return `extra:${step.extra.id}`
  }
  return getStepKey(step)
}

function getStepLabel(step) {
  if (step.kind === 'close') return 'Đóng mắt'
  if (step.kind === 'sub') return step.sub.name
  if (step.kind === 'extra') return step.extra.name
  return step.role.name
}

function shouldIncludeExtra(extra, selected, totalPlayers) {
  if ((selected[extra.requiresRole] || 0) <= 0) return false
  if (extra.minPlayers != null && totalPlayers < extra.minPlayers) return false
  if (extra.maxPlayers != null && totalPlayers > extra.maxPlayers) return false
  return true
}

/** Mở rộng danh sách role thành các bước gọi đêm (kèm bước phụ / bước bổ sung). */
function buildNightSteps(selected, totalPlayers) {
  const roles = Object.keys(selected)
    .filter((id) => (selected[id] || 0) > 0)
    .map((id) => ROLE_BY_ID[id])
    .filter((role) => role.wakesAtNight)
    .sort((a, b) => a.nightOrder - b.nightOrder)

  const items = []

  for (const role of roles) {
    const base = role.nightOrder
    items.push({ sortKey: base, kind: 'role', role })

    if (role.scriptClose) {
      items.push({ sortKey: base + 0.01, kind: 'close', role, script: role.scriptClose })
    }

    for (const sub of role.nightSubSteps ?? []) {
      items.push({ sortKey: base + 0.02, kind: 'sub', role, sub })
      if (sub.scriptClose) {
        items.push({
          sortKey: base + 0.03,
          kind: 'close',
          role,
          sub,
          script: sub.scriptClose,
        })
      }
    }
  }

  for (const extra of Object.values(NIGHT_EXTRAS)) {
    if (!shouldIncludeExtra(extra, selected, totalPlayers)) continue

    items.push({ sortKey: extra.nightOrder, kind: 'extra', extra })
    if (extra.scriptClose) {
      items.push({
        sortKey: extra.nightOrder + 0.01,
        kind: 'close',
        extra,
        script: extra.scriptClose,
      })
    }
  }

  items.sort((a, b) => a.sortKey - b.sortKey)
  return items
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

function StepCard({
  step,
  index,
  note,
  onNoteChange,
  hidden,
  canToggle,
  onToggleVisibility,
  totalPlayers,
}) {
  const phase = getStepPhase(step)
  const label = getStepLabel(step)

  if (step.kind === 'close') {
    if (hidden) return null
    return (
      <li className="step step-close">
        <span className="step-no dim">{index}</span>
        <div className="step-body">
          <p className="step-script">"{step.script}"</p>
        </div>
      </li>
    )
  }

  if (hidden && canToggle) {
    return (
      <li className="step step-collapsed">
        <button
          type="button"
          className="step-reveal-btn"
          onClick={onToggleVisibility}
        >
          <span className="step-reveal-phase">{PHASE_LABEL[phase]}</span>
          <span className="step-reveal-name">{label}</span>
          <span className="step-reveal-action">Hiện</span>
        </button>
      </li>
    )
  }

  const isSub = step.kind === 'sub'
  const isExtra = step.kind === 'extra'
  const role = step.role
  const sub = step.sub
  const extra = step.extra
  const team = role ? TEAMS[role.team] : null
  const name = isExtra ? extra.name : isSub ? sub.name : role.name
  const script = isExtra ? extra.script : isSub ? sub.script : role.script
  const moderatorNote = isExtra ? extra.moderatorNote : isSub ? sub.moderatorNote : null
  const isCupid = step.kind === 'role' && role?.id === 'cupid'
  const memoPlaceholder = isExtra
    ? 'Ghi chú cho bước này...'
    : `VD: ${name} — Minh, Lan...`

  return (
    <li className={`step ${isSub || isExtra ? 'step-sub' : ''}`}>
      <span className="step-no">{index}</span>
      <div className="step-body">
        <div className="step-title">
          {(isSub || isExtra) && <span className="sub-arrow">↳</span>}
          <span className="step-name">{name}</span>
          {!isSub && !isExtra && team && (
            <span
              className="team-tag small"
              style={{ '--team-color': team.color }}
            >
              {team.label}
            </span>
          )}
          {isSub && sub.optional && (
            <span className="phase-tag small optional">Tùy chọn</span>
          )}
          <span className="phase-tag small">{PHASE_LABEL[phase]}</span>
          {isExtra && extra.playerCondition && (
            <span className="phase-tag small condition">{extra.playerCondition}</span>
          )}
          {isSub && (
            <span className="phase-tag small parent">Sau {role.name}</span>
          )}
          {isExtra && (
            <span className="phase-tag small parent">
              Khi có {ROLE_BY_ID[extra.requiresRole]?.name}
            </span>
          )}
          {canToggle && (
            <button
              type="button"
              className="step-hide-btn"
              onClick={onToggleVisibility}
            >
              Ẩn
            </button>
          )}
        </div>
        {script && <p className="step-script">"{script}"</p>}
        {isCupid && (
          <div className="step-cupid-random">
            <button
              type="button"
              className="ghost-btn small"
              disabled={totalPlayers < 2}
              onClick={() => {
                const pair = pickTwoRandomPlayers(totalPlayers)
                if (pair) onNoteChange(`Số ${pair[0]} và ${pair[1]}`)
              }}
            >
              Chọn ngẫu nhiên 2 số (1–{totalPlayers || '?'})
            </button>
            {totalPlayers < 2 && (
              <span className="step-cupid-random-hint">
                Cần ít nhất 2 người chơi
              </span>
            )}
          </div>
        )}
        {moderatorNote && <p className="step-note">{moderatorNote}</p>}
        <label className="step-memo">
          <span className="step-memo-label">Ghi chú</span>
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
  totalPlayers,
  startedAt,
  onBack,
  onEndMatch,
}) {
  const [notes, setNotes] = useState(loadNotes)
  const [hiddenSteps, setHiddenSteps] = useState(loadHidden)
  const [winner, setWinner] = useState('')

  const steps = useMemo(
    () => buildNightSteps(selected, totalPlayers),
    [selected, totalPlayers],
  )

  useEffect(() => {
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes))
  }, [notes])

  useEffect(() => {
    localStorage.setItem(
      HIDDEN_STORAGE_KEY,
      JSON.stringify([...hiddenSteps]),
    )
  }, [hiddenSteps])

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

  const handleEndMatch = () => {
    if (!winner) {
      window.alert('Hãy chọn phe thắng trước khi lưu.')
      return
    }

    if (
      !window.confirm(
        'Kết thúc trận và lưu vào lịch sử? Ghi chú ban đêm của ván này cũng sẽ được lưu.',
      )
    ) {
      return
    }

    saveMatch({
      startedAt,
      totalPlayers,
      roles: selected,
      notes,
      winner,
    })

    localStorage.removeItem(NOTES_STORAGE_KEY)
    localStorage.removeItem(HIDDEN_STORAGE_KEY)
    setNotes({})
    setHiddenSteps(new Set())
    onEndMatch()
  }

  return (
    <section className="panel call-order">
      <div className="panel-head">
        <h2>Thứ tự gọi ban đêm</h2>
        <button className="ghost-btn small" onClick={onBack}>
          Quay lại
        </button>
      </div>

      <p className="call-intro">
        Đọc to: <em>"Đã khuya rồi, mọi người hãy nhắm mắt lại và đi ngủ."</em>
        {' '}Sau đó gọi lần lượt các vai trò theo thứ tự dưới đây.
        {' '}Bấm <strong>Ẩn</strong> ở các bước không phải mỗi đêm khi sang đêm khác.
        {' '}Dùng ô <strong>Ghi chú</strong> để ghi tên người chơi hoặc nhắc việc cần làm.
        {totalPlayers > 0 && (
          <>
            {' '}Ván hiện tại: <strong>{totalPlayers} người chơi</strong>.
          </>
        )}
      </p>

      {steps.length === 0 ? (
        <p className="empty">
          Không có vai trò nào cần gọi ban đêm trong ván này.
        </p>
      ) : (
        <ol className="steps">
          {(() => {
            let displayIndex = 0
            return steps.map((step) => {
              const stepKey = getStepKey(step)
              const visibilityKey = getVisibilityKey(step)
              const hidden = hiddenSteps.has(visibilityKey)
              const canToggle =
                step.kind !== 'close' && getStepPhase(step) !== 'every' && getStepPhase(step) !== 'fromNight2'

              if (step.kind === 'close' && hidden) return null

              const index = hidden && canToggle ? null : ++displayIndex

              return (
                <StepCard
                  key={stepKey}
                  step={step}
                  index={index}
                  note={notes[stepKey] || ''}
                  onNoteChange={(value) => setNote(stepKey, value)}
                  hidden={hidden}
                  canToggle={canToggle}
                  onToggleVisibility={() => toggleVisibility(visibilityKey)}
                  totalPlayers={totalPlayers}
                />
              )
            })
          })()}
        </ol>
      )}

      <p className="call-outro">
        Khi xong, đọc to: <em>"Trời sáng rồi, mọi người hãy thức dậy!"</em>
      </p>

      <div className="call-footer">
        <div className="winner-pick">
          <span className="winner-pick-label">Phe thắng</span>
          <div className="winner-pick-options">
            {WINNER_TEAM_IDS.map((teamId) => {
              const team = TEAMS[teamId]
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
          Kết thúc trận và lưu lại
        </button>
      </div>
    </section>
  )
}
