export const getSavedValue = (key, fallback) => {
  const rawValue = localStorage.getItem(key)
  if (!rawValue) return fallback

  try {
    return JSON.parse(rawValue)
  } catch {
    return fallback
  }
}
