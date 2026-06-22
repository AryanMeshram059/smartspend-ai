export const functionDeclarations = [
  {
    name: "getBalance",
    description:
      "Get the user's current balance, total income and total expenses.",
    parameters: {
      type: "OBJECT",
      properties: {},
    },
  },

  {
    name: "getLastTransaction",
    description:
      "Retrieve the user's most recent transaction including its ID. Use this tool whenever the user refers to their latest transaction, last transaction, most recent expense or most recent income.",
    parameters: {
      type: "OBJECT",
      properties: {},
    },
  },

  {
    name: "getMonthlySummary",
    description:
      "Get current month's income, expenses and balance.",
    parameters: {
      type: "OBJECT",
      properties: {},
    },
  },

  {
    name: "getTransactions",

    description:
        "Retrieve user transactions for financial analysis. This tool can be used to calculate averages, identify spending patterns, detect unusual spending, compare periods, analyze categories, and answer transaction-related questions." ,
    parameters: {
        type: "OBJECT",

        properties: {

        startDate: {
            type: "STRING",
            description:
            "Start date in YYYY-MM-DD format"
        },

        endDate: {
            type: "STRING",
            description:
            "End date in YYYY-MM-DD format"
        },

        category: {
            type: "STRING"
        },

        type: {
            type: "STRING"
        },

        limit: {
            type: "NUMBER"
        }
        }
    }
  },
  {
    name: "addTransaction",

    description:
      "Use when the user wants to add, create, log, record or save a new expense or income transaction.",

    parameters: {
      type: "OBJECT",

      properties: {

        amount: {
          type: "NUMBER"
        },

        description: {
          type: "STRING"
        }
      },

      required: [
        "amount",
        "description"
      ]
    }
  },
  {
    name: "deleteTransaction",

    description:
      "Delete a transaction using its transaction ID. If the user wants to delete their last transaction, latest transaction, or a transaction returned from another tool, first retrieve the transaction and then call this tool.",

    parameters: {
      type: "OBJECT",

      properties: {
        transactionId: {
          type: "STRING",
          description:
            "Transaction ID to delete"
        }
      },

      required: [
        "transactionId"
      ]
    }
  },
  {
    name: "updateTransaction",

    description:
      "Update a transaction using its transaction ID. If the user refers to their last transaction or a transaction identified from previous tool results, first retrieve that transaction and then call this tool.",

    parameters: {
      type: "OBJECT",

      properties: {

        transactionId: {
          type: "STRING"
        },

        amount: {
          type: "NUMBER"
        },

        category: {
          type: "STRING"
        },

        description: {
          type: "STRING"
        }
      },

      required: [
        "transactionId"
      ]
    }
  }
]