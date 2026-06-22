import * as transactionService from "../../services/transaction.service.js"

export const getBalance = async (
  userId
) => {
  const transactions =
    await transactionService.getTransactions(
      userId
    )

  let totalIncome = 0
  let totalExpenses = 0

  transactions.forEach((transaction) => {
    const amount = Number(
      transaction.amount || 0
    )

    if (transaction.type === "income") {
      totalIncome += amount
    } else {
      totalExpenses += amount
    }
  })

  return {
    balance:
      totalIncome - totalExpenses,
    totalIncome,
    totalExpenses,
  }
}