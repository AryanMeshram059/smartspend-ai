import supabase from "../lib/supabase"

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

    const response =
      await fetch(
        `${API_URL}/dashboard`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      )

    return response.json()
  }