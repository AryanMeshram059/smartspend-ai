import supabase from "../db/supabase.js"

export const getMe = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", req.user.id)
      .single()

    if (error) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      })
    }

    res.status(200).json({
      success: true,
      user: data,
    })
  } catch (error) {
    next(error)
  }
}

export const createProfile = async (
  req,
  res,
  next
) => {
  try {
    const { id, name, email } = req.body

    const { data, error } =
      await supabase
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

    if (error) throw error

    res.status(201).json(data)
  } catch (error) {
    next(error)
  }
}