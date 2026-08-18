import { useMemo, useState } from 'react'
import { ROLES, TEAMS, PHASE_LABEL, getRoleImageSrc } from '../data/roles.js'

const ROLE_ORDER = new Map(ROLES.map((role, index) => [role.id, index]))

const FILTERS = [
  { id: 'all', label: 'Tất cả' },
  { id: 'village', label: TEAMS.village.label },
  { id: 'werewolf', label: TEAMS.werewolf.label },
  { id: 'vampire', label: TEAMS.vampire.label },
  { id: 'other', label: TEAMS.other.label },
]

function ValueBadge({ value }) {
  const cls = value > 0 ? 'pos' : value < 0 ? 'neg' : 'zero'
  return (
    <span className={`value-badge ${cls}`} title="Điểm cân bằng">
      {value > 0 ? `+${value}` : value}
    </span>
  )
}

export default function RoleLibrary({ selected, onAdd }) {
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')

  const roles = useMemo(() => {
    const q = query.trim().toLowerCase()
    return ROLES.filter((r) => {
      const okTeam = filter === 'all' || r.team === filter
      const okQuery =
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.nameEn.toLowerCase().includes(q)
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
      <div className="role-library-sticky">
        <div className="panel-head">
          <h2>Thư viện vai trò</h2>
          <span className="muted">{roles.length} vai trò</span>
        </div>

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

      <div className="role-grid">
        {roles.map((role) => {
          const team = TEAMS[role.team]
          const count = selected[role.id] || 0
          const atMax = count >= role.max
          const imageSrc = getRoleImageSrc(role.id)
          return (
            <article
              key={role.id}
              className={`role-card${role.recommended ? ' recommended' : ''}${imageSrc ? ' has-img' : ''}`}
            >
              {imageSrc && (
                <img
                  src={imageSrc}
                  alt=""
                  className="role-card-img"
                  style={{ borderColor: team.color }}
                />
              )}
              <div className="role-card-top">
                <div>
                  <h3 className="role-name">{role.name}</h3>
                  <span className="role-en">{role.nameEn}</span>
                </div>
                <ValueBadge value={role.value} />
              </div>

              <div className="role-tags">
                <span
                  className="team-tag"
                  style={{ '--team-color': team.color }}
                >
                  {team.label}
                </span>
                {role.recommended && (
                  <span className="recommended-tag">Đề xuất</span>
                )}
                {role.wakesAtNight ? (
                  <span className="phase-tag">
                    Gọi: {PHASE_LABEL[role.phase]}
                  </span>
                ) : (
                  <span className="phase-tag sleep">Không thức dậy</span>
                )}
                {role.max > 1 && (
                  <span className="limit-tag">Tối đa {role.max}</span>
                )}
              </div>

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
    </section>
  )
}
