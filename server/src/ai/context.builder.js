import * as transactionService from "../services/transaction.service.js"

export const buildFinancialContext = async (
  userId
) => {
  try {
    const transactions =
      await transactionService.getTransactions(
        userId
      )

    let totalIncome = 0
    let totalExpenses = 0

    const categoryTotals = {}

    transactions.forEach((transaction) => {
      const amount = Number(
        transaction.amount || 0
      )

      if (transaction.type === "income") {
        totalIncome += amount
      } else {
        totalExpenses += amount

        categoryTotals[
          transaction.category
        ] =
          (categoryTotals[
            transaction.category
          ] || 0) + amount
      }
    })

    const topCategory =
      Object.entries(categoryTotals)
        .sort((a, b) => b[1] - a[1])[0]?.[0] ||
      "None"

    const recentTransactions =
      transactions.slice(0, 10).map(
        (transaction) => ({
          amount: transaction.amount,
          type: transaction.type,
          category: transaction.category,
          note: transaction.note,
          date:
            transaction.transaction_date,
        })
      )

    return {
      summary: {
        totalIncome,
        totalExpenses,
        balance:
          totalIncome - totalExpenses,
      },

      topCategory,

      recentTransactions,

      transactionCount:
        transactions.length,
    }
  } catch (error) {
    console.error(
      "Context Builder Error:",
      error
    )

    throw error
  }
}