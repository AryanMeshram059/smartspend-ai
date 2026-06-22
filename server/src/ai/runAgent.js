import { model } from "./model.js"
import { executeTool } from "./toolExecutor.js"

export const runAgent = async (
  message,
  userId,
  history=[]
) => {

  const historyText =
    history
      .slice(-20)
      .map(
        msg =>
          `${msg.role}: ${msg.content}`
      )
      .join("\n")

  let currentPrompt = `
  Conversation History:

  ${historyText}

  Current User Message:

  ${message}

  You are SmartSpend AI.

  Use the conversation history
  to understand references like:

  - it
  - that transaction
  - the last one
  - delete it
  - update it

  If tools are needed,
  call them.
  `

  for (
    let step = 0;
    step < 5;
    step++
  ) {

    console.log(
      `Agent Step ${step + 1}`
    )

    const result =
      await model.generateContent(
        currentPrompt
      )

    const response =
      result.response

    const candidate =
      response.candidates?.[0]

    const functionCall =
      candidate?.content?.parts?.find(
        part =>
          part.functionCall
      )?.functionCall

    console.log(
      "Function Call:",
      functionCall
    )

    if (!functionCall) {

      const text =
        response.text()

      console.log(
        "Final Answer:",
        text
      )

      return text
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

    currentPrompt = `
    Conversation History:

    ${historyText}

    Original User Request:

    ${message}

    Tool Executed:

    ${functionCall.name}

    Tool Result:

    ${JSON.stringify(
      toolResult,
      null,
      2
    )}

    You are SmartSpend AI.

    Decide whether:

    1. Another tool is required

    OR

    2. You can answer the user

    If another tool is required,
    call it.
    `
  }

  return `
Unable to complete request.
`
}