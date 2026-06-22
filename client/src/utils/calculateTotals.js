export const calculateTotals = (transactions = []) => {
  return transactions.reduce(
    (acc, t) => {
      if (t.type === "income") acc.income += Number(t.amount)
      else acc.expenses += Number(t.amount)
      return acc
    },
    { income: 0, expenses: 0 }
  )
}

export const calculateSavings = (transactions = []) => {
  const { income, expenses } = calculateTotals(transactions)
  return income - expenses
}

export const groupByCategory = (transactions = []) => {
  return transactions.reduce((acc, t) => {
    if (t.type === "expense") {
      acc[t.category] = (acc[t.category] || 0) + Number(t.amount)
    }
    return acc
  }, {})
}

export const groupByMonth = (transactions = []) => {
  return transactions.reduce((acc, t) => {
    const date = new Date(t.transaction_date)
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
    if (!acc[key]) acc[key] = { income: 0, expenses: 0 }
    if (t.type === "income") acc[key].income += Number(t.amount)
    else acc[key].expenses += Number(t.amount)
    return acc
  }, {})
}
