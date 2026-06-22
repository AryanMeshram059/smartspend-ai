import supabase from "../db/supabase.js"

export const createUserProfile = async (
  id,
  name,
  email
) => {
  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        id,
        name,
        email,
        level: 1,
        xp: 0,
        streak: 0,
      },
    ])
    .select()

  if (error) throw error

  return data
}