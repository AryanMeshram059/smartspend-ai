export const DEMO_USER = {
  id: "demo-user",
  name: "Alex Student",
  email: "alex@university.edu",
  avatar: null,
  streak: 12,
  xp: 2840,
  level: 7,
}

export const DEMO_TRANSACTIONS = [
  {
    id: "1",
    title: "Campus Cafeteria",
    category: "Food",
    amount: 320,
    type: "expense",
    transaction_date: "2026-05-25",
  },
  {
    id: "2",
    title: "Freelance Design",
    category: "Income",
    amount: 2500,
    type: "income",
    transaction_date: "2026-05-24",
  },
  {
    id: "3",
    title: "Uber Ride",
    category: "Travel",
    amount: 180,
    type: "expense",
    transaction_date: "2026-05-24",
  },
  {
    id: "4",
    title: "Spotify",
    category: "Entertainment",
    amount: 119,
    type: "expense",
    transaction_date: "2026-05-23",
  },
  {
    id: "5",
    title: "Textbooks",
    category: "Education",
    amount: 890,
    type: "expense",
    transaction_date: "2026-05-22",
  },
  {
    id: "6",
    title: "Gym Membership",
    category: "Health",
    amount: 499,
    type: "expense",
    transaction_date: "2026-05-20",
  },
]

export const DEMO_BUDGETS = [
  { id: "b1", category: "Food", limit: 5000, spent: 3200 },
  { id: "b2", category: "Travel", limit: 2000, spent: 1450 },
  { id: "b3", category: "Entertainment", limit: 1500, spent: 980 },
  { id: "b4", category: "Education", limit: 3000, spent: 2100 },
]

export const DEMO_GOALS = [
  {
    id: "g1",
    title: "Emergency Fund",
    target: 50000,
    current: 28400,
    deadline: "2026-12-31",
  },
  {
    id: "g2",
    title: "New Laptop",
    target: 75000,
    current: 42000,
    deadline: "2026-08-15",
  },
]

export const DEMO_ACHIEVEMENTS = [
  { id: "a1", title: "First Save", description: "Saved ₹1,000", unlocked: true },
  { id: "a2", title: "Week Streak", description: "7-day tracking streak", unlocked: true },
  { id: "a3", title: "Budget Master", description: "Stay under budget for a month", unlocked: false },
  { id: "a4", title: "AI Explorer", description: "Used AI assistant 10 times", unlocked: true },
]

export const AI_SUGGESTIONS = [
  "How much did I spend on food this month?",
  "Add ₹300 Uber expense",
  "Set monthly food budget to ₹5000",
  "Show my biggest expenses",
  "What's my savings rate?",
]

export const AI_HISTORY = [
  {
    id: "h1",
    role: "user",
    content: "How much did I spend on food?",
    timestamp: "2026-05-25T10:30:00",
  },
  {
    id: "h2",
    role: "assistant",
    content:
      "You've spent ₹3,200 on food this month — 64% of your ₹5,000 food budget. You're on track if you keep daily spending under ₹120.",
    timestamp: "2026-05-25T10:30:05",
  },
]
