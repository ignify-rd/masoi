import { beforeEach, describe, expect, it, vi } from 'vitest'
import { readStored, writeStored } from './storage.js'

function memoryStorage() {
  const data = new Map()
  return {
    getItem: (key) => (data.has(key) ? data.get(key) : null),
    setItem: (key, value) => data.set(key, String(value)),
    removeItem: (key) => data.delete(key),
  }
}

describe('storage', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', memoryStorage())
  })

  it('đọc lại giá trị đã ghi', () => {
    writeStored('k', { a: 1 })
    expect(readStored('k', null)).toEqual({ a: 1 })
  })

  it('đọc được giá trị cũ lưu dạng chuỗi trần', () => {
    localStorage.setItem('k', 'endless_night')
    expect(readStored('k', null)).toBe('endless_night')
  })

  it('dùng fallback khi thiếu key hoặc parse từ chối', () => {
    expect(readStored('missing', 'x')).toBe('x')
    writeStored('k', 5)
    expect(readStored('k', [], (v) => (Array.isArray(v) ? v : null))).toEqual([])
  })

  it('ghi null thì xoá key', () => {
    writeStored('k', 1)
    writeStored('k', null)
    expect(localStorage.getItem('k')).toBeNull()
  })

  it('không ném lỗi khi localStorage bị chặn', () => {
    vi.stubGlobal('localStorage', {
      getItem: () => {
        throw new Error('blocked')
      },
      setItem: () => {
        throw new Error('quota')
      },
    })
    expect(readStored('k', 'fallback')).toBe('fallback')
    expect(() => writeStored('k', 1)).not.toThrow()
  })
})
