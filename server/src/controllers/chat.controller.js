import {
  createSession,
  getLatestSession
}
from "../services/chat.service.js"

export const getOrCreateSession =
  async (
    req,
    res,
    next
  ) => {
    try {

      const userId =
        req.user.id

      let session =
        await getLatestSession(
          userId
        )

      if (!session) {

        session =
          await createSession(
            userId
          )
      }

      res.json({
        success: true,
        sessionId:
          session.id,
      })

    } catch (error) {
      next(error)
    }
  }