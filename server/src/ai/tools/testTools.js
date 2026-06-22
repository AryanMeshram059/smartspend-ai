import { getBalance } from "./getBalance.js"
import { getLastTransaction } from "./getLastTransaction.js"
import { getMonthlySummary } from "./getMonthlySummary.js"

const userId =
  "PUT_REAL_USER_ID_HERE"

console.log(
  await getBalance(userId)
)

console.log(
  await getLastTransaction(userId)
)

console.log(
  await getMonthlySummary(userId)
)