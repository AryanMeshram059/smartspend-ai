import * as transactionService from "../../services/transaction.service.js"

export const getTransactions =
  async (
    userId,
    args = {}
  ) => {

    const transactions =
      await transactionService.getTransactions(
        userId
      )

    let filtered =
      [...transactions]

    if (args.startDate) {
      filtered =
        filtered.filter(
          (transaction) =>
            transaction.transaction_date >=
            args.startDate
        )
    }

    if (args.endDate) {
      filtered =
        filtered.filter(
          (transaction) =>
            transaction.transaction_date <=
            args.endDate
        )
    }

    if (args.category) {
      filtered =
        filtered.filter(
          (transaction) =>
            transaction.category?.toLowerCase() ===
            args.category.toLowerCase()
        )
    }

    if (args.type) {
      filtered =
        filtered.filter(
          (transaction) =>
            transaction.type ===
            args.type
        )
    }

    if (args.limit) {
      filtered =
        filtered.slice(
          0,
          Number(args.limit)
        )
    }

    return filtered
  }