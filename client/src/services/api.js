import axios from "axios"
import supabase from "../lib/supabase" // adjust path if needed

const api = axios.create({
  baseURL: "http://localhost:5000/api",
})

api.interceptors.request.use(
  async (config) => {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (session?.access_token) {
      config.headers.Authorization = `Bearer ${session.access_token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

export default api