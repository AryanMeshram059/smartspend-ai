import express from "express"
import supabase from "../db/supabase.js"

const router = express.Router()

router.get("/test-db", async (req, res) => {
  const { data, error } = await supabase
    .from("test")
    .select("*")

  if (error) {
    return res.status(500).json({
      error: error.message,
    })
  }

  res.json(data)
})

export default router