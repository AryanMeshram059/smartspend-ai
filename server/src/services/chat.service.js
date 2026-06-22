import supabase from "../db/supabase.js"

export const createSession = async (
  userId
) => {

  const { data, error } =
    await supabase
      .from("chat_sessions")
      .insert([
        {
          user_id: userId
        }
      ])
      .select()
      .single()

  if (error) throw error

  return data
}

export const saveMessage = async (
  sessionId,
  role,
  content
) => {

  const { error } =
    await supabase
      .from("chat_messages")
      .insert([
        {
          session_id: sessionId,
          role,
          content
        }
      ])

  if (error) throw error
}

export const getRecentMessages =
  async (
    sessionId,
    limit = 20
  ) => {

    const {
      data,
      error
    } = await supabase
      .from("chat_messages")
      .select("*")
      .eq(
        "session_id",
        sessionId
      )
      .order(
        "created_at",
        {
          ascending: true
        }
      )
      .limit(limit)

    if (error) throw error

    return data
  }

export const getLatestSession =
  async (
    userId
  ) => {

    const {
      data,
      error
    } = await supabase
      .from("chat_sessions")
      .select("*")
      .eq(
        "user_id",
        userId
      )
      .order(
        "created_at",
        {
          ascending: false
        }
      )
      .limit(1)
      .maybeSingle()

    if (error) throw error

    return data
  }