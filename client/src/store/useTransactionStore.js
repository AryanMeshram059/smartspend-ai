import { create } from "zustand"
import transactionService from "../services/transactionService"

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
    const data =
      await transactionService.createTransaction(
        transaction
      )

    set((state) => ({
      transactions: [
        data.transaction,
        ...state.transactions,
      ],
    }))

    return data
  },

  updateTransaction: async (
    id,
    updates
  ) => {
    const data =
      await transactionService.updateTransaction(
        id,
        updates
      )

    set((state) => ({
      transactions:
        state.transactions.map((t) =>
          t.id === id
            ? data.transaction
            : t
        ),
    }))
  },

  deleteTransaction: async (id) => {
    await transactionService.deleteTransaction(
      id
    )

    set((state) => ({
      transactions:
        state.transactions.filter(
          (t) => t.id !== id
        ),
    }))
  },
}))

export default useTransactionStore