import { describe, expect, it } from 'vitest'
import { decodeSetupCode, encodeSetupCode } from './roleCode.js'
import { ROLES } from './roles.js'
import { MAX_THEMES, THEMES, normalizeThemeIds } from './themes.js'

// Mã đã chia sẻ cho người chơi — phải giải ra ĐÚNG setup này mãi mãi.
// Test đỏ ở đây nghĩa là ROLE_SLOTS hoặc THEME_CODE_BY_ID vừa bị sửa sai cách
// (chèn giữa / append cuối / xoá / đổi sức chứa / đổi mã). Vai mới phải chèn
// vào ĐẦU ROLE_SLOTS. Đừng sửa test này để nó xanh lại.
const SHARED_CODES = [
  ['8T6mF0Oe', { seer: 1, werewolf: 2, villager: 5 }, []],
  [
    '1hrWDsXAm-3',
    { werewolf: 3, seer: 1, witch: 1, guard: 1, hunter: 1, villager: 6 },
    ['blood_moon'],
  ],
  [
    'ndu4qQINnt-g',
    { tanner: 1, werewolf: 10, vampire: 6, villager: 30, exposer: 1 },
    ['talisman'],
  ],
  ['ndDhit4Qy0', { tanner: 1 }, []],
  ['1-0', { exposer: 1 }, ['endless_night']],
]

describe('mã ván đã chia sẻ', () => {
  it.each(SHARED_CODES)('%s vẫn giải ra đúng setup', (code, roles, themeIds) => {
    expect(decodeSetupCode(code)).toEqual({ roles, themeIds })
  })

  it.each(SHARED_CODES)('setup sinh lại đúng mã %s', (code, roles, themeIds) => {
    expect(encodeSetupCode(roles, themeIds)).toBe(code)
  })
})

describe('nhiều chủ đề', () => {
  it('nối mã các chủ đề theo thứ tự chọn, giải ngược lại đúng', () => {
    const themeIds = ['blood_moon', 'alpha_curse', 'talisman']
    const code = encodeSetupCode({ exposer: 1 }, themeIds)
    expect(code).toBe('1-3hg')
    expect(decodeSetupCode(code)).toEqual({ roles: { exposer: 1 }, themeIds })
  })

  it('vẫn nhận 1 id chủ đề dạng chuỗi như trước', () => {
    expect(encodeSetupCode({ exposer: 1 }, 'endless_night')).toBe('1-0')
  })

  it('mã có chủ đề xung đột thì giữ chủ đề đứng trước', () => {
    // 3 = Trăng Máu, K = Nguyệt Thực
    expect(decodeSetupCode('1-3K')).toEqual({ roles: { exposer: 1 }, themeIds: ['blood_moon'] })
  })

  it.each(['1-00', '1-' + '0123456789'.slice(0, MAX_THEMES + 1)])(
    'mã "%s" (trùng chủ đề / quá nhiều chủ đề) trả về null',
    (code) => {
      expect(decodeSetupCode(code)).toBeNull()
    },
  )
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
      const themeIds = normalizeThemeIds(
        Array.from(
          { length: Math.floor(random() * (MAX_THEMES + 1)) },
          () => THEMES[Math.floor(random() * THEMES.length)].id,
        ),
      )
      const decoded = decodeSetupCode(encodeSetupCode(roles, themeIds))
      expect(decoded).toEqual({ roles, themeIds })
    }
  })

  it('setup rỗng cho mã rỗng', () => {
    expect(encodeSetupCode({}, ['talisman'])).toBe('')
  })

  it.each(['', '   ', '!!', 'abc-', 'abc-??', '8T6mF0Oe-~', 'a-b-c'])(
    'mã sai "%s" trả về null',
    (code) => {
      expect(decodeSetupCode(code)).toBeNull()
    },
  )
})
