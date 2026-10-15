import { useMemo, useState } from 'react'
import { ROLES, TEAMS, TEAM_IDS, PHASE_LABEL } from '../data/roles.js'
import { getRoleImageSrc } from '../data/roleImages.js'
import { formatValue, valueTone } from '../ui/format.js'
import { useMediaQuery } from '../ui/useMediaQuery.js'
import './RoleLibrary.css'

// Cùng mốc với @media (max-width: 920px) trong CSS.
const MOBILE_QUERY = '(max-width: 920px)'

const ROLE_ORDER = new Map(ROLES.map((role, index) => [role.id, index]))

const FILTERS = [
  { id: 'all', label: 'Tất cả' },
  ...TEAM_IDS.map((id) => ({ id, label: TEAMS[id].label })),
]

function ValueBadge({ value }) {
  return (
    <span className={`value-badge ${valueTone(value)}`} title="Điểm cân bằng">
      {formatValue(value)}
    </span>
  )
}

function RoleTags({ role }) {
  const team = TEAMS[role.team]
  return (
    <div className="role-tags">
      <span className="team-tag" style={{ '--team-color': team.color }}>
        {team.label}
      </span>
      {role.recommended && <span className="recommended-tag">Đề xuất</span>}
      {role.wakesAtNight ? (
        <span className="phase-tag">Gọi: {PHASE_LABEL[role.phase]}</span>
      ) : (
        <span className="phase-tag sleep">Không thức dậy</span>
      )}
      {role.max > 1 && <span className="limit-tag">Tối đa {role.max}</span>}
    </div>
  )
}

/** Mobile: mỗi vai một dòng gọn, chạm vào dòng để xem năng lực. */
function RoleRow({ role, count, open, onToggle, onAdd, onDec }) {
  const imageSrc = getRoleImageSrc(role.id)
  return (
    <li
      className={`role-row${count > 0 ? ' selected' : ''}`}
      style={{ '--team-color': TEAMS[role.team].color }}
    >
      <button
        type="button"
        className="role-row-main"
        onClick={onToggle}
        aria-expanded={open}
      >
        {imageSrc ? (
          <img src={imageSrc} alt="" className="role-row-img" />
        ) : (
          <span className="role-row-img role-row-img-fallback" />
        )}
        <span className="role-row-text">
          <span className="role-row-title">
            <span className="role-row-name">{role.name}</span>
            <ValueBadge value={role.value} />
          </span>
          <span className="role-row-meta">
            {role.nameEn} ·{' '}
            {role.wakesAtNight ? PHASE_LABEL[role.phase] : 'Không thức dậy'}
          </span>
        </span>
      </button>

      {count > 0 ? (
        <div className="stepper">
          <button type="button" onClick={onDec} aria-label={`Giảm ${role.name}`}>
            −
          </button>
          <span className="stepper-count">{count}</span>
          <button
            type="button"
            onClick={onAdd}
            disabled={count >= role.max}
            aria-label={`Tăng ${role.name}`}
          >
            +
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="role-row-add"
          onClick={onAdd}
          aria-label={`Thêm ${role.name}`}
        >
          +
        </button>
      )}

      {open && (
        <div className="role-row-detail">
          <RoleTags role={role} />
          <p className="role-ability">{role.ability}</p>
        </div>
      )}
    </li>
  )
}

function matchesQuery(role, q) {
  return [role.name, role.nameEn, ...(role.aliases ?? [])].some((name) =>
    name.toLowerCase().includes(q),
  )
}

export default function RoleLibrary({ selected, onAdd, onDec }) {
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [openId, setOpenId] = useState(null)
  const isMobile = useMediaQuery(MOBILE_QUERY)

  const roles = useMemo(() => {
    const q = query.trim().toLowerCase()
    return ROLES.filter((r) => {
      const okTeam = filter === 'all' || r.team === filter
      const okQuery = !q || matchesQuery(r, q)
      return okTeam && okQuery
    }).sort((a, b) => {
      if (Boolean(b.recommended) !== Boolean(a.recommended)) {
        return b.recommended ? 1 : -1
      }
      return ROLE_ORDER.get(a.id) - ROLE_ORDER.get(b.id)
    })
  }, [filter, query])

  return (
    <section className="panel">
      <div className="panel-head">
        <h2>Thư viện vai trò</h2>
        <span className="muted">{roles.length} vai trò</span>
      </div>

      <div className="role-library-sticky">
        <div className="toolbar">
          <input
            className="search"
            type="text"
            placeholder="Tìm vai trò..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="filters">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                className={`chip ${filter === f.id ? 'active' : ''}`}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isMobile ? (
        <ul className="role-list">
          {roles.map((role) => (
            <RoleRow
              key={role.id}
              role={role}
              count={selected[role.id] || 0}
              open={openId === role.id}
              onToggle={() =>
                setOpenId((id) => (id === role.id ? null : role.id))
              }
              onAdd={() => onAdd(role.id)}
              onDec={() => onDec(role.id)}
            />
          ))}
        </ul>
      ) : (
        <div className="role-grid">
          {roles.map((role) => {
            const count = selected[role.id] || 0
            const atMax = count >= role.max
            return (
              <article
                key={role.id}
                className={`role-card${role.recommended ? ' recommended' : ''}`}
              >
                <div className="role-card-top">
                  <div>
                    <h3 className="role-name">{role.name}</h3>
                    <span className="role-en">{role.nameEn}</span>
                  </div>
                  <ValueBadge value={role.value} />
                </div>
  
                <RoleTags role={role} />
  
                <p className="role-ability">{role.ability}</p>
  
                <button
                  className="add-btn"
                  disabled={atMax}
                  title={atMax ? `Đã đạt tối đa ${role.max}` : undefined}
                  onClick={() => onAdd(role.id)}
                >
                  {atMax ? 'Đã đủ' : '+ Thêm'}
                  {count > 0 && <span className="count-pill">{count}</span>}
                </button>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}
