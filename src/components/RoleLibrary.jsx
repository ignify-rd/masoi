import { useMemo, useState } from 'react'
import { ROLES, TEAM_IDS } from '../data/roles.js'
import { getRoleImageSrc } from '../data/roleImages.js'
import { useI18n } from '../i18n/useI18n.js'
import { formatValue, valueTone } from '../ui/format.js'
import { useMediaQuery } from '../ui/useMediaQuery.js'
import './RoleLibrary.css'

// Cùng mốc với @media (max-width: 920px) trong CSS.
const MOBILE_QUERY = '(max-width: 920px)'

const ROLE_ORDER = new Map(ROLES.map((role, index) => [role.id, index]))

const FILTER_IDS = ['all', ...TEAM_IDS]

function ValueBadge({ value }) {
  const { t } = useI18n()
  return (
    <span
      className={`value-badge ${valueTone(value)}`}
      title={t('common.balancePoints')}
    >
      {formatValue(value)}
    </span>
  )
}

function RoleTags({ role }) {
  const { t, teams, phases } = useI18n()
  const team = teams[role.team]
  return (
    <div className="role-tags">
      <span className="team-tag" style={{ '--team-color': team.color }}>
        {team.label}
      </span>
      {role.recommended && (
        <span className="recommended-tag">{t('library.recommended')}</span>
      )}
      {role.wakesAtNight ? (
        <span className="phase-tag">
          {t('library.wakes', { phase: phases[role.phase] })}
        </span>
      ) : (
        <span className="phase-tag sleep">{t('library.noWake')}</span>
      )}
      {role.max > 1 && (
        <span className="limit-tag">{t('common.max', { max: role.max })}</span>
      )}
    </div>
  )
}

/** Tên trên lá bài gốc, chỉ hiện khi khác tên đang hiển thị. */
const cardNameOf = (role) => (role.cardName !== role.name ? role.cardName : null)

/** Mobile: mỗi vai một dòng gọn, chạm vào dòng để xem năng lực. */
function RoleRow({ role, count, open, onToggle, onAdd, onDec }) {
  const { t, teams, phases } = useI18n()
  const imageSrc = getRoleImageSrc(role.id)
  const cardName = cardNameOf(role)
  return (
    <li
      className={`role-row${count > 0 ? ' selected' : ''}`}
      style={{ '--team-color': teams[role.team].color }}
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
            {cardName && <>{cardName} · </>}
            {role.wakesAtNight ? phases[role.phase] : t('library.noWake')}
          </span>
        </span>
      </button>

      {count > 0 ? (
        <div className="stepper">
          <button
            type="button"
            onClick={onDec}
            aria-label={t('role.decrease', { role: role.name })}
          >
            −
          </button>
          <span className="stepper-count">{count}</span>
          <button
            type="button"
            onClick={onAdd}
            disabled={count >= role.max}
            aria-label={t('role.increase', { role: role.name })}
          >
            +
          </button>
        </div>
      ) : (
        <button
          type="button"
          className="role-row-add"
          onClick={onAdd}
          aria-label={t('role.add', { role: role.name })}
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
  return role.searchNames.some((name) => name.toLowerCase().includes(q))
}

export default function RoleLibrary({ selected, onAdd, onDec }) {
  const { t, teams, roleById } = useI18n()
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [openId, setOpenId] = useState(null)
  const isMobile = useMediaQuery(MOBILE_QUERY)

  const roles = useMemo(() => {
    const q = query.trim().toLowerCase()
    return ROLES.map((r) => roleById[r.id])
      .filter((r) => {
        const okTeam = filter === 'all' || r.team === filter
        const okQuery = !q || matchesQuery(r, q)
        return okTeam && okQuery
      })
      .sort((a, b) => {
        if (Boolean(b.recommended) !== Boolean(a.recommended)) {
          return b.recommended ? 1 : -1
        }
        return ROLE_ORDER.get(a.id) - ROLE_ORDER.get(b.id)
      })
  }, [filter, query, roleById])

  return (
    <section className="panel">
      <div className="panel-head">
        <h2>{t('library.heading')}</h2>
        <span className="muted">
          {t('library.count', { count: roles.length })}
        </span>
      </div>

      <div className="role-library-sticky">
        <div className="toolbar">
          <input
            className="search"
            type="text"
            placeholder={t('library.search')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="filters">
            {FILTER_IDS.map((id) => (
              <button
                key={id}
                className={`chip ${filter === id ? 'active' : ''}`}
                onClick={() => setFilter(id)}
              >
                {id === 'all' ? t('library.filterAll') : teams[id].label}
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
            const cardName = cardNameOf(role)
            return (
              <article
                key={role.id}
                className={`role-card${role.recommended ? ' recommended' : ''}`}
              >
                <div className="role-card-top">
                  <div>
                    <h3 className="role-name">{role.name}</h3>
                    {cardName && <span className="role-en">{cardName}</span>}
                  </div>
                  <ValueBadge value={role.value} />
                </div>
  
                <RoleTags role={role} />
  
                <p className="role-ability">{role.ability}</p>
  
                <button
                  className="add-btn"
                  disabled={atMax}
                  title={atMax ? t('library.atMax', { max: role.max }) : undefined}
                  onClick={() => onAdd(role.id)}
                >
                  {atMax ? t('library.full') : t('library.addButton')}
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
