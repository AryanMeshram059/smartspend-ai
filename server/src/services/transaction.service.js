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

function assertNumericId(transactionId) {
  if (!/^\d+$/.test(String(transactionId))) {
    const error = new Error(
      "Transaction was created offline but has no server id yet."
    )
    error.status = 409
    throw error
  }
}

function sanitizeTransactionUpdates(updates = {}) {
  const allowedFields = [
    "amount",
    "type",
    "category",
    "note",
    "transaction_date",
    "is_recurring",
  ]

  const sanitized = {}

  allowedFields.forEach((field) => {
    if (updates[field] !== undefined) {
      sanitized[field] = updates[field]
    }
  })

  if (
    sanitized.note === undefined &&
    updates.description !== undefined
  ) {
    sanitized.note = updates.description
  }

  return sanitized
}

function notFound(message) {
  const error = new Error(message)
  error.status = 404
  throw error
}

export const createTransaction = async (
  userId,
  transaction
) => {
  const description =
    transaction.description ||
    transaction.note ||
    "Transaction"

  const category = detectCategory(
    description
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
        note: description,
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
  assertNumericId(transactionId)

  const sanitizedUpdates =
    sanitizeTransactionUpdates(updates)

  const { data, error } = await supabase
    .from("transactions")
    .update(sanitizedUpdates)
    .eq("id", transactionId)
    .eq("user_id", userId)
    .select()
    .maybeSingle()

  if (error) throw error
  if (!data) {
    notFound(
      "Transaction no longer exists or belongs to another user."
    )
  }

  return data
}

export const deleteTransaction = async (
  userId,
  transactionId
) => {
  assertNumericId(transactionId)

  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", transactionId)
    .eq("user_id", userId)

  if (error) throw error

  return true
}
