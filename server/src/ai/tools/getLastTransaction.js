import * as transactionService from "../../services/transaction.service.js"
import { updateMemory } from "../../services/memory.service.js"

export const getLastTransaction =
  async (userId) => {
    const transactions =
      await transactionService.getTransactions(
        userId
      )

    if (!transactions.length) {
      return {
        found: false,
        message:
          "No transactions found",
      }
    }

    const transaction =
      transactions[0]

    await updateMemory(
      userId,
      {
        last_transaction_id:
          transaction.id
      }
    )
    return {
      found: true,
      transaction: {
        id:
          transaction.id,
        amount:
          transaction.amount,
        type:
          transaction.type,
        category:
          transaction.category,
        note:
          transaction.note,
        date:
          transaction.transaction_date,
      },
    }
  }