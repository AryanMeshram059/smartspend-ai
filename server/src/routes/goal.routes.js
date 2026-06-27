import express from "express"

import protect from "../middleware/auth.middleware.js"

import {
  createGoal,
  getGoals,
  updateGoal,
  deleteGoal,
  addSavings,
} from "../controllers/goal.controller.js"

const router = express.Router()

router.use(protect)

router.post("/", createGoal)

router.get("/", getGoals)

router.put("/:id", updateGoal)

router.patch("/:id/add", addSavings)

router.delete("/:id", deleteGoal)

export default router