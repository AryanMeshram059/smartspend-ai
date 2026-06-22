import { GoogleGenerativeAI } from "@google/generative-ai"
import { functionDeclarations } from "./toolRegistry.js"

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
)

export const model =
  genAI.getGenerativeModel({
    model: "gemini-2.5-flash",

    tools: [
      {
        functionDeclarations,
      },
    ],
  })

export { genAI }