import supabase from "../db/supabase.js"

export const createGoal = async (userId, goal) => {
  const { data, error } = await supabase
    .from("goals")
    .insert([
      {
        user_id: userId,
        title: goal.title,
        target_amount: goal.target_amount,
        current_amount: goal.current_amount || 0,
        deadline: goal.deadline,
        completed: false,
      },
    ])
    .select()
    .single()

  if (error) throw error

  return data
}

export const getGoals = async (userId) => {
  const { data, error } = await supabase
    .from("goals")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    })

  if (error) throw error

  return data
}

export const updateGoal = async (
  userId,
  goalId,
  updates
) => {
  const { data, error } = await supabase
    .from("goals")
    .update(updates)
    .eq("id", goalId)
    .eq("user_id", userId)
    .select()
    .single()

  if (error) throw error

  return data
}

export const deleteGoal = async (
  userId,
  goalId
) => {
  const { error } = await supabase
    .from("goals")
    .delete()
    .eq("id", goalId)
    .eq("user_id", userId)

  if (error) throw error

  return true
}

export const addSavings = async (
  userId,
  goalId,
  amount
) => {
  // Fetch current goal
  const { data: goal, error: fetchError } =
    await supabase
      .from("goals")
      .select("*")
      .eq("id", goalId)
      .eq("user_id", userId)
      .single()

  if (fetchError) throw fetchError

  const newAmount =
    Number(goal.current_amount) + Number(amount)

  const completed =
    newAmount >= Number(goal.target_amount)

  const { data, error } = await supabase
    .from("goals")
    .update({
      current_amount: newAmount,
      completed,
    })
    .eq("id", goalId)
    .eq("user_id", userId)
    .select()
    .single()

  if (error) throw error

  return data
}