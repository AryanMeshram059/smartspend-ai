import { buildFinancialContext } from "./context.builder.js"
import { generateAIResponse, generateToolResponse } from "./ai.service.js"
import { saveMessage, getRecentMessages } from "../services/chat.service.js"

export const chatWithAI = async (
  req,
  res,
  next
) => {
  try {

    const {
      message,
      sessionId,
    } = req.body

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      })
    }

    await saveMessage(
      sessionId,
      "user",
      message
    )

    const history =
      await getRecentMessages(
        sessionId
      )

    const response =
      await generateToolResponse(
        message,
        req.user.id,
        history
      )

    await saveMessage(
      sessionId,
      "assistant",
      response
    )

    res.status(200).json({
      success: true,
      response,
    })

  } catch (error) {
    next(error)
  }
}