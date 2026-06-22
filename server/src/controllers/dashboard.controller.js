import {
  getDashboardAnalytics,
} from "../services/dashboard.service.js"

export const getDashboard =
  async (req, res, next) => {
    try {
      const analytics =
        await getDashboardAnalytics(
          req.user.id
        )

      res.status(200).json({
        success: true,
        analytics,
      })
    } catch (error) {
      next(error)
    }
  }