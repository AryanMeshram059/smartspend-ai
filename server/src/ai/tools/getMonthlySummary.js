import * as transactionService from "../../services/transaction.service.js"

export const getMonthlySummary =
  async (userId) => {
    const transactions =
      await transactionService.getTransactions(
        userId
      )

    const now = new Date()

    const currentMonth =
      now.getMonth()

    const currentYear =
      now.getFullYear()

    let monthlyIncome = 0
    let monthlyExpenses = 0

    transactions.forEach((transaction) => {
      const date = new Date(
        transaction.transaction_date
      )

      if (
        date.getMonth() ===
          currentMonth &&
        date.getFullYear() ===
          currentYear
      ) {
        const amount = Number(
          transaction.amount || 0
        )

        if (
          transaction.type ===
          "income"
        ) {
          monthlyIncome += amount
        } else {
          monthlyExpenses += amount
        }
      }
    })

    return {
      month:
        currentMonth + 1,
      year:
        currentYear,

      monthlyIncome,

      monthlyExpenses,

      monthlyBalance:
        monthlyIncome -
        monthlyExpenses,
    }
  }