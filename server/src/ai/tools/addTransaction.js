import * as transactionService
from "../../services/transaction.service.js"

export const addTransaction =
  async (
    userId,
    args
  ) => {

    const transaction =
      await transactionService.createTransaction(
        userId,
        {
          amount:
            Math.abs(Number(args.amount)),

          description:
            args.description,
        }
      )

    return {
      success: true,
      transaction,
    }
  }