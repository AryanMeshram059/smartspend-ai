import express from "express"
import { getMe, createProfile } from "../controllers/auth.controller.js"
import protect from "../middleware/auth.middleware.js"

const router = express.Router()

router.get("/me", protect, getMe)
router.post("/profile", createProfile)

export default router