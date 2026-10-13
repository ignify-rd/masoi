// Tách khỏi roles.js vì import.meta.glob chỉ chạy được qua Vite.
const ROLE_IMAGE_IDS = new Set(
  Object.keys(import.meta.glob('../../public/roles/*.webp')).map((path) =>
    path.slice(path.lastIndexOf('/') + 1, -'.webp'.length),
  ),
)

export function getRoleImageSrc(id) {
  return ROLE_IMAGE_IDS.has(id) ? `/roles/${id}.webp` : null
}
