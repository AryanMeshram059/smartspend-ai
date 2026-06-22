import * as transactionService from "../../services/transaction.service.js"

export const deleteTransaction = async (
  userId,
  args
) => {
  await transactionService.deleteTransaction(
    userId,
    args.transactionId
  )

  return {
    success: true,
    transactionId:
      args.transactionId,
  }
}