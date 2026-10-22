import { describe, expect, it } from 'vitest'
import { buildNightSteps } from './nightSteps.js'
import { getLocale } from '../i18n/index.js'

const vi = getLocale('vi')
const en = getLocale('en')
const keys = (steps) => steps.map((s) => s.key)

describe('buildNightSteps', () => {
  it('sắp theo nightOrder, bỏ vai không thức dậy', () => {
    const steps = buildNightSteps({ villager: 5, seer: 1, werewolf: 2, guard: 1 }, 9, [], vi)
    expect(keys(steps)).toEqual(['role:guard', 'role:werewolf', 'role:seer'])
  })

  it('bước bổ sung của Cupid theo số người chơi', () => {
    const selected = { cupid: 1, werewolf: 3, villager: 8 }
    expect(keys(buildNightSteps(selected, 12, [], vi))).toEqual([
      'role:cupid',
      'extra:lovers',
      'role:werewolf',
    ])
    expect(keys(buildNightSteps(selected, 13, [], vi))).toContain('extra:cupidThirdTeam')
  })

  it('chèn bước của chủ đề đúng chỗ', () => {
    const steps = buildNightSteps(
      { werewolf: 2, seer: 1, villager: 4 },
      7,
      ['wolf_leader'],
      vi,
    )
    expect(keys(steps)).toEqual([
      'role:werewolf',
      'theme:wolf_leader_pick',
      'theme:wolf_leader_peek',
      'role:seer',
    ])
    expect(steps[1]).toMatchObject({ kind: 'theme', nested: true, hideable: true })
  })

  it('mọi bước có đủ trường để hiển thị', () => {
    const steps = buildNightSteps(
      { cupid: 1, werewolf: 2, seer: 1, gambler: 1, villager: 9 },
      14,
      ['forest_journey'],
      vi,
    )
    expect(new Set(keys(steps)).size).toBe(steps.length)
    for (const step of steps) {
      expect(step.name, step.key).toBeTruthy()
      expect(step.script, step.key).toBeTruthy()
      expect(step.tags.length, step.key).toBeGreaterThan(0)
      for (const tag of step.tags) expect(tag.team?.label ?? tag.label, step.key).toBeTruthy()
    }
    const byKey = Object.fromEntries(steps.map((s) => [s.key, s]))
    expect(byKey['role:cupid'].randomPair).toBe(true)
    expect(byKey['role:cupid'].hideable).toBe(true) // chỉ đêm 1
    expect(byKey['role:seer'].hideable).toBe(false) // mỗi đêm
    expect(byKey['role:gambler'].hideable).toBe(false) // từ đêm 2
  })

  it('gộp bước của nhiều chủ đề theo thứ tự gọi', () => {
    const steps = buildNightSteps(
      { alpha_wolf: 1, werewolf: 2, seer: 1, villager: 5 },
      9,
      ['alpha_curse', 'mole'],
      vi,
    )
    expect(keys(steps)).toEqual([
      'role:werewolf',
      'theme:mole_pick',
      'theme:mole_wake',
      'role:alpha_wolf',
      'theme:alpha_curse_mark',
      'role:seer',
    ])
  })

  it('đổi ngôn ngữ chỉ đổi chữ, không đổi khóa và thứ tự', () => {
    const selected = { cupid: 1, werewolf: 3, seer: 1, villager: 8 }
    const viSteps = buildNightSteps(selected, 13, ['wolf_leader'], vi)
    const enSteps = buildNightSteps(selected, 13, ['wolf_leader'], en)
    expect(keys(enSteps)).toEqual(keys(viSteps))

    const byKey = Object.fromEntries(enSteps.map((s) => [s.key, s]))
    expect(byKey['role:seer'].name).toBe('Seer')
    expect(byKey['role:seer'].tags).toEqual([
      { team: expect.objectContaining({ label: 'Village' }) },
      { label: 'Every night' },
    ])
    expect(byKey['extra:lovers'].tags).toContainEqual({
      label: 'With Cupid',
      variant: 'parent',
    })
    expect(byKey['theme:wolf_leader_pick'].name).toBe('Pack Leader — choose the leader')
  })
})
