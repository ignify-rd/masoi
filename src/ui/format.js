/** Điểm cân bằng có dấu: 3 -> "+3", -2 -> "-2", 0 -> "0". */
export function formatValue(value) {
  return value > 0 ? `+${value}` : String(value)
}

/** Class CSS theo dấu của điểm: 'pos' | 'neg' | 'zero'. */
export function valueTone(value) {
  if (value > 0) return 'pos'
  if (value < 0) return 'neg'
  return 'zero'
}
