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

const goalService = {
  async getGoals() {
    const token = await getToken()

    return fetchJsonWithCache({
      url: `${API_URL}/goals`,
      cacheKey: CACHE_KEYS.goals,
      options: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    })
  },

  async createGoal(data) {
    const token = await getToken()

    const response = await fetch(
      `${API_URL}/goals`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    )

    return response.json()
  },

  async updateGoal(id, data) {
    const token = await getToken()

    const response = await fetch(
      `${API_URL}/goals/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    )

    return response.json()
  },

  async addSavings(id, amount) {
    const token = await getToken()

    const response = await fetch(
      `${API_URL}/goals/${id}/add`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount,
        }),
      }
    )

    return response.json()
  },

  async deleteGoal(id) {
    const token = await getToken()

    const response = await fetch(
      `${API_URL}/goals/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return response.json()
  },
}

export default goalService
