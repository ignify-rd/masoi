import { useEffect, useState } from 'react'
import { readStored, writeStored } from '../data/storage.js'

/**
 * useState được lưu vào localStorage theo `key`.
 * - parse: làm sạch giá trị đọc ra (trả về null -> dùng fallback).
 * - serialize: đổi state sang dạng ghi được JSON (VD Set -> mảng).
 */
export function useStoredState(key, fallback, { parse, serialize } = {}) {
  const [value, setValue] = useState(() => readStored(key, fallback, parse))

  useEffect(() => {
    writeStored(key, serialize ? serialize(value) : value)
  }, [key, value])

  return [value, setValue]
}
