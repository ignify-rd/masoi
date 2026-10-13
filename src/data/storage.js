// Đọc/ghi localStorage an toàn: dữ liệu hỏng, bị chặn hay hết dung lượng đều
// không làm sập app.

/**
 * Đọc giá trị JSON theo key. `parse` kiểm tra/làm sạch giá trị; trả về
 * null/undefined (hoặc ném lỗi) thì dùng `fallback`.
 */
export function readStored(key, fallback, parse = (value) => value) {
  try {
    const raw = localStorage.getItem(key)
    if (raw == null) return fallback
    let value
    try {
      value = JSON.parse(raw)
    } catch {
      value = raw // giá trị cũ lưu dạng chuỗi trần, không phải JSON
    }
    return parse(value) ?? fallback
  } catch {
    return fallback
  }
}

/** Ghi giá trị dạng JSON; null/undefined thì xoá key. */
export function writeStored(key, value) {
  try {
    if (value == null) localStorage.removeItem(key)
    else localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Bị chặn hoặc hết dung lượng — bỏ qua, app vẫn chạy bằng state trong bộ nhớ.
  }
}
