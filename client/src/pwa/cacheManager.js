const CACHE_PREFIX = "smartspend:cache:"

export const CACHE_KEYS = {
  dashboard: "dashboard",
  transactions: "transactions",
  goals: "goals",
}

export const isOnline = () => {
  if (typeof navigator === "undefined") return true
  return navigator.onLine
}

export const saveCachedData = (key, data) => {
  if (typeof localStorage === "undefined") return

  localStorage.setItem(
    `${CACHE_PREFIX}${key}`,
    JSON.stringify({
      data,
      cachedAt: new Date().toISOString(),
    })
  )
}

export const getCachedData = (key) => {
  if (typeof localStorage === "undefined") return null

  const raw = localStorage.getItem(`${CACHE_PREFIX}${key}`)
  if (!raw) return null

  try {
    return JSON.parse(raw).data
  } catch (error) {
    console.warn("Failed to read cached SmartSpend data", error)
    return null
  }
}

export const updateCachedData = (key, updater) => {
  const current = getCachedData(key)
  const next = updater(current)
  saveCachedData(key, next)
  return next
}

export const fetchJsonWithCache = async ({
  url,
  options = {},
  cacheKey,
}) => {
  if (!isOnline()) {
    const cached = getCachedData(cacheKey)
    if (cached) return cached
    throw new Error("No cached data available while offline.")
  }

  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      throw new Error(`Request failed with ${response.status}`)
    }

    const data = await response.json()
    saveCachedData(cacheKey, data)
    return data
  } catch (error) {
    const cached = getCachedData(cacheKey)
    if (cached) return cached
    throw error
  }
}
