/**
 * Dựng danh sách bước gọi ban đêm từ 3 nguồn: vai trong ván, bước bổ sung
 * (NIGHT_EXTRAS) và bước của chủ đề. `locale` (getLocale trong src/i18n) quyết
 * định ngôn ngữ của tên, câu gọi và nhãn. Mọi bước có cùng một dạng để UI chỉ
 * việc hiển thị:
 *   key        khóa ổn định cho ghi chú và ẩn/hiện ("role:seer", "extra:lovers",
 *              "theme:<id bước>") — đừng đổi, ghi chú đã lưu dùng khóa này
 *   kind       'role' | 'extra' | 'theme'
 *   order      thứ tự gọi (nightOrder)
 *   phase      id phase (xem PHASE_IDS)
 *   name, script, note (ghi chú cho quản trò, có thể không có)
 *   tags       nhãn sau tên, theo thứ tự hiển thị:
 *              { team } | { label, variant? }
 *   nested     bước phụ (không phải vai) -> thụt vào, có mũi tên
 *   hideable   không phải đêm nào cũng gọi -> có nút Ẩn
 *   randomPair có nút chọn ngẫu nhiên 2 số người chơi
 */
export function buildNightSteps(selected, totalPlayers, themeId, locale) {
  const roles = Object.keys(selected)
    .filter((id) => (selected[id] || 0) > 0)
    .map((id) => locale.roleById[id])
    .filter((role) => role?.wakesAtNight)
    .sort((a, b) => a.nightOrder - b.nightOrder)

  const theme = locale.themeById[themeId]

  const steps = [
    ...roles.map((role) => roleStep(role, locale)),
    ...locale.extras
      .filter((extra) => shouldIncludeExtra(extra, selected, totalPlayers))
      .map((extra) => extraStep(extra, locale)),
    ...(theme?.nightSteps ?? []).map((step) => themeStep(step, locale)),
  ]

  // sort ổn định: cùng `order` thì giữ thứ tự vai -> bước bổ sung -> chủ đề.
  return steps.sort((a, b) => a.order - b.order)
}

function shouldIncludeExtra(extra, selected, totalPlayers) {
  if ((selected[extra.requiresRole] || 0) <= 0) return false
  if (extra.minPlayers != null && totalPlayers < extra.minPlayers) return false
  return true
}

function baseStep(kind, source) {
  return {
    key: `${kind}:${source.id}`,
    kind,
    order: source.nightOrder,
    phase: source.phase,
    name: source.name,
    script: source.script,
    note: source.moderatorNote ?? null,
    nested: kind !== 'role',
    hideable: source.phase !== 'every' && source.phase !== 'fromNight2',
    randomPair: Boolean(source.randomPair),
  }
}

const phaseTag = (phase, locale) => ({ label: locale.phases[phase] })

function roleStep(role, locale) {
  return {
    ...baseStep('role', role),
    tags: [{ team: locale.teams[role.team] }, phaseTag(role.phase, locale)],
  }
}

function extraStep(extra, locale) {
  return {
    ...baseStep('extra', extra),
    tags: [
      phaseTag(extra.phase, locale),
      extra.playerCondition && {
        label: extra.playerCondition,
        variant: 'condition',
      },
      {
        label: locale.t('night.withRole', {
          role: locale.roleById[extra.requiresRole]?.name,
        }),
        variant: 'parent',
      },
    ].filter(Boolean),
  }
}

function themeStep(step, locale) {
  return {
    ...baseStep('theme', step),
    tags: [
      { label: locale.t('night.themeTag'), variant: 'condition' },
      phaseTag(step.phase, locale),
    ],
  }
}
