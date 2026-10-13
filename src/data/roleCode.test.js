import { describe, expect, it } from 'vitest'
import { decodeSetupCode, encodeSetupCode } from './roleCode.js'
import { ROLES } from './roles.js'
import { THEMES } from './themes.js'

// Mã đã chia sẻ cho người chơi — phải giải ra ĐÚNG setup này mãi mãi.
// Test đỏ ở đây nghĩa là ROLE_SLOTS hoặc THEME_CODE_BY_ID vừa bị sửa sai cách
// (chèn giữa / append cuối / xoá / đổi sức chứa / đổi mã). Vai mới phải chèn
// vào ĐẦU ROLE_SLOTS. Đừng sửa test này để nó xanh lại.
const SHARED_CODES = [
  ['8T6mF0Oe', { seer: 1, werewolf: 2, villager: 5 }, null],
  [
    '1hrWDsXAm-3',
    { werewolf: 3, seer: 1, witch: 1, guard: 1, hunter: 1, villager: 6 },
    'blood_moon',
  ],
  [
    'ndu4qQINnt-g',
    { tanner: 1, werewolf: 10, vampire: 6, villager: 30, exposer: 1 },
    'talisman',
  ],
  ['ndDhit4Qy0', { tanner: 1 }, null],
  ['1-0', { exposer: 1 }, 'endless_night'],
]

describe('mã ván đã chia sẻ', () => {
  it.each(SHARED_CODES)('%s vẫn giải ra đúng setup', (code, roles, themeId) => {
    expect(decodeSetupCode(code)).toEqual({ roles, themeId })
  })

  it.each(SHARED_CODES)('setup sinh lại đúng mã %s', (code, roles, themeId) => {
    expect(encodeSetupCode(roles, themeId)).toBe(code)
  })
})

describe('encode/decode', () => {
  it('giải mã ngược lại đúng setup ngẫu nhiên', () => {
    let seed = 42
    const random = () => {
      seed = (seed * 16807) % 2147483647
      return seed / 2147483647
    }
    for (let i = 0; i < 200; i++) {
      const roles = {}
      for (const role of ROLES) {
        if (random() < 0.2) roles[role.id] = 1 + Math.floor(random() * role.max)
      }
      if (Object.keys(roles).length === 0) continue
      const theme = random() < 0.5 ? THEMES[Math.floor(random() * THEMES.length)] : null
      const decoded = decodeSetupCode(encodeSetupCode(roles, theme?.id))
      expect(decoded).toEqual({ roles, themeId: theme?.id ?? null })
    }
  })

  it('setup rỗng cho mã rỗng', () => {
    expect(encodeSetupCode({}, 'talisman')).toBe('')
  })

  it.each(['', '   ', '!!', 'abc-', 'abc-??', '8T6mF0Oe-~', 'a-b-c'])(
    'mã sai "%s" trả về null',
    (code) => {
      expect(decodeSetupCode(code)).toBeNull()
    },
  )
})
