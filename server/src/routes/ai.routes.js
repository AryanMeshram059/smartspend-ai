import express from "express"
import { chatWithAI } from "../ai/ai.controller.js"
import protect from "../middleware/auth.middleware.js"

const router = express.Router()

router.post(
  "/chat",
  protect,
  chatWithAI
)

export default router