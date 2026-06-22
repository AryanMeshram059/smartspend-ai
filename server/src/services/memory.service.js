import supabase from "../db/supabase.js"

export const getMemory = async (
  userId
) => {

  const {
    data,
    error
  } = await supabase
    .from("agent_memory")
    .select("*")
    .eq(
      "user_id",
      userId
    )
    .maybeSingle()

  if (error) throw error

  return data
}

export const updateMemory =
  async (
    userId,
    updates
  ) => {

    const {
      data,
      error
    } = await supabase
      .from("agent_memory")
      .upsert(
        {
          user_id: userId,
          ...updates,
          updated_at:
            new Date()
              .toISOString()
        }
      )
      .select()
      .single()

    if (error) throw error

    return data
  }