import { describe, expect, it } from 'vitest'
import { ROLE_BY_ID } from './roles.js'
import { countPlayers } from './balance.js'
import {
  SUGGEST_MAX_PLAYERS,
  SUGGEST_MIN_PLAYERS,
  suggestSetup,
} from './suggestSetup.js'

const sizes = Array.from(
  { length: SUGGEST_MAX_PLAYERS - SUGGEST_MIN_PLAYERS + 1 },
  (_, i) => SUGGEST_MIN_PLAYERS + i,
)

const countWolves = (setup) =>
  Object.entries(setup).reduce(
    (sum, [id, c]) => (ROLE_BY_ID[id].team === 'werewolf' ? sum + c : sum),
    0,
  )

describe('suggestSetup', () => {
  it.each(sizes)('%i người: đủ lá, phe Sói <= 1/3, Dân Làng >= phe Sói', (n) => {
    const setup = suggestSetup(n)
    const wolves = countWolves(setup)

    expect(countPlayers(setup)).toBe(n)
    expect(wolves).toBeGreaterThanOrEqual(1)
    expect(wolves * 3).toBeLessThanOrEqual(n)
    expect(setup.villager || 0).toBeGreaterThanOrEqual(wolves)
    for (const [id, count] of Object.entries(setup)) {
      expect(count, id).toBeLessThanOrEqual(ROLE_BY_ID[id].max)
    }
  })

  it('kẹp số người vào khoảng cho phép', () => {
    expect(countPlayers(suggestSetup(1))).toBe(SUGGEST_MIN_PLAYERS)
    expect(countPlayers(suggestSetup(100))).toBe(SUGGEST_MAX_PLAYERS)
  })
})
