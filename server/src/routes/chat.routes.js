import express
from "express"

import  protect 
from "../middleware/auth.middleware.js"

import {
  getOrCreateSession
}
from "../controllers/chat.controller.js"

const router =
  express.Router()

router.get(
  "/session",
  protect,
  getOrCreateSession
)

export default router