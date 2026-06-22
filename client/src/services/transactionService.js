import supabase from "../lib/supabase"

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api"

const getToken = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return session?.access_token
}

const transactionService = {
  async getTransactions() {
    const token = await getToken()

    const response = await fetch(
      `${API_URL}/transactions`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return response.json()
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

    return response.json()
  },

  async updateTransaction(id, data) {
    const token = await getToken()

    const response = await fetch(
      `${API_URL}/transactions/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    )

    return response.json()
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

    return response.json()
  },
}

export default transactionService