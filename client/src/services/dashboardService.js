import supabase from "../lib/supabase"
import {
  CACHE_KEYS,
  fetchJsonWithCache,
} from "../pwa/cacheManager"

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api"

const getToken = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return session?.access_token
}

export const getDashboardData =
  async () => {
    const token = await getToken()

    return fetchJsonWithCache({
      url: `${API_URL}/dashboard`,
      cacheKey: CACHE_KEYS.dashboard,
      options: {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      },
    })
  }
