import supabase from "../db/supabase.js"

function assertNumericId(id, label) {
  if (!/^\d+$/.test(String(id))) {
    const error = new Error(
      `${label} was created offline but has no server id yet.`
    )
    error.status = 409
    throw error
  }
}

function notFound(message) {
  const error = new Error(message)
  error.status = 404
  throw error
}

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
  assertNumericId(goalId, "Goal")

  const { data, error } = await supabase
    .from("goals")
    .update(updates)
    .eq("id", goalId)
    .eq("user_id", userId)
    .select()
    .maybeSingle()

  if (error) throw error
  if (!data) {
    notFound(
      "Goal no longer exists or belongs to another user."
    )
  }

  return data
}

export const deleteGoal = async (
  userId,
  goalId
) => {
  assertNumericId(goalId, "Goal")

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
  assertNumericId(goalId, "Goal")

  // Fetch current goal
  const { data: goal, error: fetchError } =
    await supabase
      .from("goals")
      .select("*")
      .eq("id", goalId)
      .eq("user_id", userId)
      .maybeSingle()

  if (fetchError) throw fetchError
  if (!goal) {
    notFound(
      "Goal no longer exists or belongs to another user."
    )
  }

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
    .maybeSingle()

  if (error) throw error
  if (!data) {
    notFound(
      "Goal no longer exists or belongs to another user."
    )
  }

  return data
}
