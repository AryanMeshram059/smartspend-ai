import { create } from "zustand"
import transactionService from "../services/transactionService"
import {
  CACHE_KEYS,
  isOnline,
  updateCachedData,
} from "../pwa/cacheManager"
import { addOfflineRequest } from "../pwa/offlineQueue"

const createOfflineId = () =>
  `offline-transaction-${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`

const today = () => new Date().toISOString().split("T")[0]

const normalizeTransaction = (transaction) => ({
  ...transaction,
  id:
    transaction.id ||
    createOfflineId(),
  amount: Number(transaction.amount || 0),
  type: transaction.type || "expense",
  category:
    transaction.category || "General",
  note:
    transaction.note ||
    transaction.description ||
    transaction.title ||
    "Transaction",
  transaction_date:
    transaction.transaction_date || today(),
})

const withPendingSync = (transaction) => ({
  ...normalizeTransaction(transaction),
  pendingSync: true,
})

const getResponseTransaction = (data, fallback) => {
  if (
    Array.isArray(data?.transaction) &&
    data.transaction[0]
  ) {
    return normalizeTransaction(data.transaction[0])
  }

  if (data?.transaction) {
    return normalizeTransaction(data.transaction)
  }

  if (data?.id) {
    return normalizeTransaction(data)
  }

  return normalizeTransaction(fallback)
}

const shouldQueueOffline = (error) =>
  !isOnline() ||
  error instanceof TypeError ||
  /failed to fetch|networkerror|load failed/i.test(
    error?.message || ""
  )

const saveTransactionsCache = (transactions) => {
  updateCachedData(CACHE_KEYS.transactions, (cached) => ({
    ...(cached || {}),
    transactions,
  }))
}

const queueAddTransaction = (set, transaction) => {
  const pendingTransaction =
    withPendingSync(transaction)

  addOfflineRequest({
    endpoint: "/transactions",
    method: "POST",
    body: transaction,
  })

  set((state) => {
    const transactions = [
      pendingTransaction,
      ...state.transactions,
    ]

    saveTransactionsCache(transactions)

    return { transactions }
  })

  return {
    transaction: pendingTransaction,
    offline: true,
  }
}

const queueUpdateTransaction = (set, id, updates) => {
  addOfflineRequest({
    endpoint: `/transactions/${id}`,
    method: "PUT",
    body: updates,
  })

  set((state) => {
    const transactions =
      state.transactions.map((t) =>
        t.id === id
          ? withPendingSync({
              ...t,
              ...updates,
              id,
            })
          : t
      )

    saveTransactionsCache(transactions)

    return { transactions }
  })
}

const queueDeleteTransaction = (set, id) => {
  addOfflineRequest({
    endpoint: `/transactions/${id}`,
    method: "DELETE",
    body: null,
  })

  set((state) => {
    const transactions =
      state.transactions.filter(
        (t) => t.id !== id
      )

    saveTransactionsCache(transactions)

    return { transactions }
  })
}

const useTransactionStore = create((set) => ({
  transactions: [],
  loading: false,

  fetchTransactions: async () => {
    set({ loading: true })

    try {
      const data =
        await transactionService.getTransactions()

      set({
        transactions:
          data.transactions || [],
      })
    } catch (error) {
      console.error(error)
    } finally {
      set({ loading: false })
    }
  },

  addTransaction: async (
    transaction
  ) => {
    const normalizedTransaction =
      normalizeTransaction(transaction)

    if (!isOnline()) {
      return queueAddTransaction(
        set,
        normalizedTransaction
      )
    }

    let data

    try {
      data =
        await transactionService.createTransaction(
          normalizedTransaction
        )
    } catch (error) {
      if (shouldQueueOffline(error)) {
        return queueAddTransaction(
          set,
          normalizedTransaction
        )
      }

      throw error
    }

    set((state) => {
      const savedTransaction =
        getResponseTransaction(
          data,
          normalizedTransaction
        )

      const transactions = [
        savedTransaction,
        ...state.transactions,
      ]

      saveTransactionsCache(transactions)

      return { transactions }
    })

    return data
  },

  updateTransaction: async (
    id,
    updates
  ) => {
    if (!isOnline()) {
      queueUpdateTransaction(set, id, updates)

      return
    }

    let data

    try {
      data =
        await transactionService.updateTransaction(
          id,
          updates
        )
    } catch (error) {
      if (shouldQueueOffline(error)) {
        queueUpdateTransaction(
          set,
          id,
          updates
        )
        return
      }

      throw error
    }

    set((state) => {
      const savedTransaction =
        getResponseTransaction(data, {
          ...updates,
          id,
        })

      const transactions =
        state.transactions.map((t) =>
          t.id === id
            ? savedTransaction
            : t
        )

      saveTransactionsCache(transactions)

      return { transactions }
    })
  },

  deleteTransaction: async (id) => {
    if (!isOnline()) {
      queueDeleteTransaction(set, id)
      return
    } else {
      try {
        await transactionService.deleteTransaction(
          id
        )
      } catch (error) {
        if (shouldQueueOffline(error)) {
          queueDeleteTransaction(set, id)
          return
        }

        throw error
      }
    }

    set((state) => {
      const transactions =
        state.transactions.filter(
          (t) => t.id !== id
        )

      saveTransactionsCache(transactions)

      return { transactions }
    })
  },
}))

export default useTransactionStore
