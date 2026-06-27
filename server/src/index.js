import express from "express"
import cors from "cors"
import helmet from "helmet"
import dotenv from "dotenv"

import authRoutes from "./routes/auth.routes.js"
import testRoutes from "./routes/test.routes.js"
import transactionRoutes from "./routes/transaction.routes.js"
import dashboardRoutes from "./routes/dashboard.routes.js"
import aiRoutes from "./routes/ai.routes.js"
import chatRoutes from "./routes/chat.routes.js"
import goalRoutes from "./routes/goal.routes.js"

import errorMiddleware from "./middleware/error.middleware.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())

app.get("/", (req, res) => {
  res.json({
    message: "SmartSpend AI Backend Running",
  })
})

app.use("/api", testRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/transactions", transactionRoutes)
app.use("/api/dashboard",dashboardRoutes)
app.use("/api/ai", aiRoutes)
app.use("/api/chat", chatRoutes)
app.use("/api/goals", goalRoutes)

app.use(errorMiddleware)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})