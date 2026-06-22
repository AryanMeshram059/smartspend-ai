import supabase from "../db/supabase.js"

function detectCategory(text = "") {
  const value = text.toLowerCase()

  if (
    value.includes("pizza") ||
    value.includes("burger") ||
    value.includes("dominos") ||
    value.includes("zomato") ||
    value.includes("swiggy")
  ) {
    return "Food"
  }

  if (
    value.includes("uber") ||
    value.includes("rapido") ||
    value.includes("ola") ||
    value.includes("metro")
  ) {
    return "Transport"
  }

  if (
    value.includes("netflix") ||
    value.includes("spotify") ||
    value.includes("youtube")
  ) {
    return "Subscriptions"
  }

  if (
    value.includes("salary") ||
    value.includes("freelance") ||
    value.includes("income")
  ) {
    return "Income"
  }

  if (
    value.includes("movie") ||
    value.includes("cinema") ||
    value.includes("game") ||
    value.includes("steam") ||
    value.includes("playstation")
  ) {
    return "Entertainment"
  }

  return "Other"
}

export const createTransaction = async (
  userId,
  transaction
) => {
  const category = detectCategory(
    transaction.description
  )

  const type =
    category === "Income"
      ? "income"
      : "expense"

  const { data, error } = await supabase
    .from("transactions")
    .insert([
      {
        user_id: userId,
        amount: transaction.amount,
        type,
        category,
        note: transaction.description,
        transaction_date: new Date()
          .toISOString()
          .split("T")[0],
        is_recurring: false,
      },
    ])
    .select()
    .single()

  if (error) throw error

  return data
}

export const getTransactions = async (
  userId
) => {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", {
      ascending: false,
    })

  if (error) throw error

  return data
}

export const updateTransaction = async (
  userId,
  transactionId,
  updates
) => {
  const { data, error } = await supabase
    .from("transactions")
    .update(updates)
    .eq("id", transactionId)
    .eq("user_id", userId)
    .select()
    .single()

  if (error) throw error

  return data
}

export const deleteTransaction = async (
  userId,
  transactionId
) => {
  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", transactionId)
    .eq("user_id", userId)

  if (error) throw error

  return true
}