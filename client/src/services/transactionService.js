import supabase from "../lib/supabase"
import {
  CACHE_KEYS,
  fetchJsonWithCache,
} from "../pwa/cacheManager"

const API_URL = `${import.meta.env.VITE_API_URL}/api`

const getToken = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return session?.access_token
}

const readJson = async (response) => {
  const data = await response.json()

  if (!response.ok) {
    throw new Error(
      data?.message ||
        data?.error ||
        `Request failed with ${response.status}`
    )
  }

  return data
}

const sanitizeTransactionUpdate = (data) => {
  const allowedFields = [
    "amount",
    "type",
    "category",
    "note",
    "transaction_date",
    "is_recurring",
  ]

  const updates = {}

  allowedFields.forEach((field) => {
    if (data[field] !== undefined) {
      updates[field] = data[field]
    }
  })

  if (
    updates.note === undefined &&
    data.description !== undefined
  ) {
    updates.note = data.description
  }

  return updates
}

const transactionService = {
  async getTransactions() {
    const token = await getToken()

    return fetchJsonWithCache({
      url: `${API_URL}/transactions`,
      cacheKey: CACHE_KEYS.transactions,
      options: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    })
  },

  async createTransaction(data) {
    const token = await getToken()

    const response = await fetch(
      `${API_URL}/transactions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    )

    return readJson(response)
  },

  async updateTransaction(id, data) {
    const token = await getToken()
    const updates =
      sanitizeTransactionUpdate(data)

    const response = await fetch(
      `${API_URL}/transactions/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      }
    )

    return readJson(response)
  },

  async deleteTransaction(id) {
    const token = await getToken()

    const response = await fetch(
      `${API_URL}/transactions/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return readJson(response)
  },
}

export default transactionService
