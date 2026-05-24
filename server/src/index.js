import express from "express"
import cors from "cors"
import helmet from "helmet"
import dotenv from "dotenv"
import testRoutes from "./routes/test.routes.js"

dotenv.config()

const app = express()

app.use(cors())
app.use(helmet())
app.use(express.json())

app.use("/api", testRoutes)

app.get("/", (req, res) => {
  res.json({
    message: "SmartSpend AI Backend Running",
  })
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})