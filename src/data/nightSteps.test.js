import { describe, expect, it } from 'vitest'
import { buildNightSteps } from './nightSteps.js'
import { THEME_BY_ID } from './themes.js'

const keys = (steps) => steps.map((s) => s.key)

describe('buildNightSteps', () => {
  it('sắp theo nightOrder, bỏ vai không thức dậy', () => {
    const steps = buildNightSteps({ villager: 5, seer: 1, werewolf: 2, guard: 1 }, 9, null)
    expect(keys(steps)).toEqual(['role:guard', 'role:werewolf', 'role:seer'])
  })

  it('bước bổ sung của Cupid theo số người chơi', () => {
    const selected = { cupid: 1, werewolf: 3, villager: 8 }
    expect(keys(buildNightSteps(selected, 12, null))).toEqual([
      'role:cupid',
      'extra:lovers',
      'role:werewolf',
    ])
    expect(keys(buildNightSteps(selected, 13, null))).toContain('extra:cupidThirdTeam')
  })

  it('chèn bước của chủ đề đúng chỗ', () => {
    const steps = buildNightSteps(
      { werewolf: 2, seer: 1, villager: 4 },
      7,
      THEME_BY_ID.wolf_leader,
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
      THEME_BY_ID.forest_journey,
    )
    expect(new Set(keys(steps)).size).toBe(steps.length)
    for (const step of steps) {
      expect(step.name, step.key).toBeTruthy()
      expect(step.tags.length, step.key).toBeGreaterThan(0)
    }
    const byKey = Object.fromEntries(steps.map((s) => [s.key, s]))
    expect(byKey['role:cupid'].randomPair).toBe(true)
    expect(byKey['role:cupid'].hideable).toBe(true) // chỉ đêm 1
    expect(byKey['role:seer'].hideable).toBe(false) // mỗi đêm
    expect(byKey['role:gambler'].hideable).toBe(false) // từ đêm 2
  })
})
