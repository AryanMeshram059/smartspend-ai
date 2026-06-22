import supabase from "../db/supabase.js"

export const getDashboardAnalytics = async (
  userId
) => {
  const { data: transactions, error: txError } =
    await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", userId)

  if (txError) throw txError

  const { data: user, error: userError } =
    await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single()

  if (userError) throw userError

  // Summary

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce(
      (sum, t) => sum + Number(t.amount),
      0
    )

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce(
      (sum, t) => sum + Number(t.amount),
      0
    )

  const balance = income - expenses

  // Monthly Overview

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ]

  const monthlyMap = {}

  transactions.forEach((tx) => {
    const month =
      monthNames[
        new Date(
          tx.transaction_date
        ).getMonth()
      ]

    if (!monthlyMap[month]) {
      monthlyMap[month] = {
        month,
        income: 0,
        expenses: 0,
      }
    }

    if (tx.type === "income") {
      monthlyMap[month].income +=
        Number(tx.amount)
    } else {
      monthlyMap[month].expenses +=
        Number(tx.amount)
    }
  })

  const monthlyOverview =
    Object.values(monthlyMap)

  // Category Split

  const categoryMap = {}

  transactions
    .filter(
      (tx) => tx.type === "expense"
    )
    .forEach((tx) => {
      categoryMap[tx.category] =
        (categoryMap[tx.category] || 0) +
        Number(tx.amount)
    })

  const totalCategorySpend =
    Object.values(categoryMap).reduce(
      (a, b) => a + b,
      0
    )

  const categorySplit =
    Object.entries(categoryMap).map(
      ([name, amount]) => ({
        name,
        value:
          totalCategorySpend === 0
            ? 0
            : Math.round(
                (amount /
                  totalCategorySpend) *
                  100
              ),
      })
    )

  // Recent Transactions

  const recentTransactions =
    [...transactions]
      .sort(
        (a, b) =>
          new Date(
            b.created_at
          ) -
          new Date(
            a.created_at
          )
      )
      .slice(0, 5)

  // Gamification

  const level = user.level || 1
  const xp = user.xp || 0
  const nextLevelXp =
    level * 250

  return {
    summary: {
      balance,
      income,
      expenses,
      streak: user.streak || 0,
    },

    monthlyOverview,

    categorySplit,

    recentTransactions,

    gamification: {
      level,
      xp,
      nextLevelXp,
    },
  }
}