import { model, genAI } from "./model.js";
import { SYSTEM_PROMPT } from "./prompts.js";
import { functionDeclarations } from "./toolRegistry.js";
import { executeTool } from "./toolExecutor.js";
import { getLastTransaction } from "./tools/getLastTransaction.js";
import { deleteTransaction } from "./tools/deleteTransaction.js";
import { updateTransaction } from "./tools/updateTransaction.js";
import { runAgent } from "./runAgent.js";
import { getMemory } from "../services/memory.service.js";


export const generateAIResponse = async (
  message,
  context,
  chatHistory = []
) => {
  try {
    const historyText =
      chatHistory.length > 0
        ? chatHistory
            .map(
              (msg) =>
                `${msg.role.toUpperCase()}: ${msg.content}`
            )
            .join("\n")
        : "No previous conversation.";

    const fullPrompt = `
${SYSTEM_PROMPT}

CHAT HISTORY:

${historyText}

FINANCIAL CONTEXT:

${JSON.stringify(context, null, 2)}

USER MESSAGE:

${message}

Respond as SmartSpend AI.
`;

    let result

    for (let attempt = 1; attempt <= 3; attempt++) {
    try {
        result =
        await model.generateContent(
            fullPrompt
        )

        break
    } catch (error) {
        if (
        error.status === 503 &&
        attempt < 3
        ) {
        console.log(
            `Retrying Gemini... Attempt ${attempt}`
        )

        await new Promise((resolve) =>
            setTimeout(resolve, 2000)
        )

        continue
        }

        throw error
    }
    }

    const response = result.response.text();

    return response;
  } catch (error) {
    console.error(
      "Gemini Service Error:",
      error
    );

    throw new Error(
      "Failed to generate AI response"
    );
  }
};

export const generateToolResponse =
  async (
    message,
    userId,
    history=[]
  ) => {
    try {
      const lowerMessage =
        message.toLowerCase()
      
      if (
        lowerMessage.includes(
          "delete my last transaction"
        ) ||
        lowerMessage.includes(
          "remove my last transaction"
        ) ||
        lowerMessage.includes(
          "undo my last transaction"
        )
      ) {

        const lastTransaction =
          await getLastTransaction(
            userId
          )

        if (
          !lastTransaction.found
        ) {
          return "No transaction found."
        }

        await deleteTransaction(
          userId,
          {
            transactionId:
              lastTransaction.transaction.id,
          }
        )

        return `
      ✅ Deleted transaction

      Amount: ₹${lastTransaction.transaction.amount}

      Category: ${lastTransaction.transaction.category}
      `
      }

      if (
        lowerMessage.includes(
          "update my last transaction"
        ) ||
        lowerMessage.includes(
          "change my last transaction"
        )
      ) {

        const lastTransaction =
          await getLastTransaction(
            userId
          )

        if (
          !lastTransaction.found
        ) {
          return "No transaction found."
        }

        const extractionPrompt = `
      You are a JSON extraction engine.

      Extract transaction updates from this request.

      User Request:
      "${message}"

      Return ONLY valid JSON.

      Examples:

      Request:
      "Change my last transaction to 1200"

      Response:
      {
        "amount": 1200
      }

      Request:
      "Change category to Food"

      Response:
      {
        "category": "Food"
      }

      Request:
      "Change category to Food and note to Zomato"

      Response:
      {
        "category": "Food",
        "description": "Zomato"
      }

      Return only JSON.
      `

        const extractionResult =
          await genAI
            .getGenerativeModel({
              model: "gemini-2.5-flash"
            })
            .generateContent(
              extractionPrompt
            )

        let updates = {}

        try {

          const jsonText =
            extractionResult.response
              .text()
              .replace(
                /```json|```/g,
                ""
              )
              .trim()

          updates =
            JSON.parse(
              jsonText
            )

        } catch (error) {

          console.error(
            "Update extraction error:",
            error
          )

          return `
      I couldn't understand the requested update.
      `
        }

        if (
          Object.keys(updates)
            .length === 0
        ) {
          return `
      Please specify what should be updated.
      `
        }

        await updateTransaction(
          userId,
          {
            transactionId:
              lastTransaction.transaction.id,

            ...updates,
          }
        )

        return `
      ✅ Transaction updated successfully.
      `
      }
      

      return await runAgent(
        message,
        userId,
        history
      )

      const response =
        result.response

      const candidate =
        response.candidates?.[0]

      const functionCall =
        candidate?.content?.parts?.find(
          (part) =>
            part.functionCall
        )?.functionCall

      console.log(
        "Function Call:",
        functionCall
      )  


      if (!functionCall) {
        return response.text()
      }

      const toolResult =
        await executeTool(
          functionCall.name,
          userId,
          functionCall.args || {}
        )
      console.log(
        "Tool Result:",
        toolResult
      )

      const finalPrompt = `
      You are SmartSpend AI, an intelligent financial analyst.

      The user asked:

      "${message}"

      Tool Used:
      ${functionCall.name}

      Tool Result:
      ${JSON.stringify(
        toolResult,
        null,
        2
      )}

      Instructions:

      - Analyze the tool data thoroughly.
      - Perform calculations when needed.
      - Calculate averages if asked.
      - Identify spending trends.
      - Compare transactions.
      - Detect unusual spending patterns.
      - Group expenses by category when useful.
      - Provide financial insights, not just raw data.
      - Use Indian Rupee formatting (₹).
      - Be concise but helpful.
      - Never expose raw JSON.
      - Answer naturally.

      Respond to the user's question using the tool data.
      `

      const finalResult =
        await model.generateContent(
          finalPrompt
        )

      return finalResult.response.text()
    } catch (error) {
      console.error(error)
      throw error
    }
  }