import { create } from "zustand"
import supabase from "../lib/supabase"
import { isOnline } from "../pwa/cacheManager"
import api from "../services/api"

const getSessionUser = (session) => ({
  id: session.user?.id,
  email: session.user?.email,
  name:
    session.user?.user_metadata?.name ||
    session.user?.email?.split("@")[0] ||
    "SmartSpend User",
})

const useAuthStore = create((set) => ({
  user: null,
  session: null,
  loading: false,

  signUp: async (email, password, name) => {
    if (!isOnline()) {
      throw new Error("Sign up requires an internet connection.")
    }

    const { data, error } =
      await supabase.auth.signUp({
        email,
        password,
      })

    if (error) throw error

    await api.post("/auth/profile", {
      id: data.user.id,
      name,
      email,
    })

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
    if (!isOnline()) {
      throw new Error("Sign in requires an internet connection.")
    }

    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      })

    if (error) throw error

    console.log(data.session)

    const { data: profileData } =
      await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${data.session.access_token}`,
        },
      })

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

    if (!isOnline()) {
      set({
        session,
        user: getSessionUser(session),
      })
      return
    }

    try {
      const { data: profile } =
        await api.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
        })

      set({
        session,
        user: profile.user,
      })
    } catch (error) {
      if (!isOnline() || error instanceof TypeError) {
        set({
          session,
          user: getSessionUser(session),
        })
        return
      }

      throw error
    }
  },
}))

export default useAuthStore