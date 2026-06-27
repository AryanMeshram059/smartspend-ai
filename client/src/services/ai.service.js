import api from "./api"
import { isOnline } from "../pwa/cacheManager"

export const chatWithAI = async (
  message,
  sessionId
) => {
  if (!isOnline()) {
    throw new Error("AI requires an internet connection.")
  }

  const { data } = await api.post(
    "/ai/chat",
    {
      message,
      sessionId,
    }
  )

  return data
}
