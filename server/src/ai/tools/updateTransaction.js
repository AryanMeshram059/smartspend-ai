import * as transactionService from "../../services/transaction.service.js"

export const updateTransaction = async (
  userId,
  args
) => {

  const updates = {}

  if (args.amount !== undefined) {
    updates.amount =
      Number(args.amount)
  }

  if (args.description) {
    updates.note =
      args.description
  }

  if (args.category) {
    updates.category =
      args.category
  }

  const transaction =
    await transactionService.updateTransaction(
      userId,
      args.transactionId,
      updates
    )

  return {
    success: true,
    transaction,
  }
}