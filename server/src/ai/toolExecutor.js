import { getBalance } from "./tools/getBalance.js"
import { getLastTransaction } from "./tools/getLastTransaction.js"
import { getMonthlySummary } from "./tools/getMonthlySummary.js"
import { getTransactions } from "./tools/getTransactions.js"
import { addTransaction } from "./tools/addTransaction.js"
import { deleteTransaction } from "./tools/deleteTransaction.js"
import { updateTransaction } from "./tools/updateTransaction.js"

export const executeTool = async (
  functionName,
  userId,
  args={}
) => {
  switch (functionName) {
    case "getBalance":
      return await getBalance(
        userId
      )

    case "getLastTransaction":
      return await getLastTransaction(
        userId
      )

    case "getMonthlySummary":
      return await getMonthlySummary(
        userId
      )

    case "getTransactions":
        return await getTransactions(
            userId,
            args
        )  
    case "addTransaction":
        return await addTransaction(
          userId,
          args
        )
    case "deleteTransaction":
        return await deleteTransaction(
          userId,
          args
        )
    case "updateTransaction":
        return await updateTransaction(
          userId,
          args
        )
    default:
      throw new Error(
        `Unknown tool: ${functionName}`
      )
  }
}