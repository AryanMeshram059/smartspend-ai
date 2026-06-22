import { create } from "zustand"
import supabase from "../lib/supabase"

const useAuthStore = create((set) => ({
  user: null,
  session: null,
  loading: false,

  signUp: async (email, password, name) => {
    const { data, error } =
      await supabase.auth.signUp({
        email,
        password,
      })

    if (error) throw error

    await fetch(
      "http://localhost:5000/api/auth/profile",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: data.user.id,
          name,
          email,
        }),
      }
    )

    set({
      user: {
        id: data.user.id,
        name,
        email,
      },
      session: data.session,
    })

    return data
  },

  signIn: async (email, password) => {
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      })

    if (error) throw error
    console.log(data.session)

    // fetch profile from database
    const profileResponse = await fetch(
      "http://localhost:5000/api/auth/me",
      {
        headers: {
          Authorization: `Bearer ${data.session.access_token}`,
        },
      }
    )

    const profileData =
      await profileResponse.json()

    set({
      user: profileData.user,
      session: data.session,
    })

    return data
  },

  signOut: async () => {
    await supabase.auth.signOut()

    set({
      user: null,
      session: null,
    })
  },
  loadUser: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) return

    const response = await fetch(
      "http://localhost:5000/api/auth/me",
      {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    )

    const profile = await response.json()

    set({
      session,
      user: profile.user,
    })
  },
}))

export default useAuthStore