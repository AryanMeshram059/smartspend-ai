import { Pencil, Trash2, Plus } from "lucide-react"

export default function GoalCard({
  goal,
  onEdit,
  onDelete,
  onAddSavings,
}) {
  const progress = Math.min(
    (Number(goal.current_amount) /
      Number(goal.target_amount)) *
      100,
    100
  )

  const completed =
    Number(goal.current_amount) >=
    Number(goal.target_amount)

  const remaining = Math.max(
    Number(goal.target_amount) -
      Number(goal.current_amount),
    0
  )

  return (
    <div
      className="rounded-2xl p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1"
      style={{
        background: "var(--ss-surface)",
        border: "1px solid var(--ss-border)",
      }}
    >
      <div>
        <div className="flex justify-between items-start">
          <div>
            <h3
              className="font-semibold text-xl"
              style={{
                color: "var(--ss-text-1)",
              }}
            >
              {goal.title}
            </h3>

            <p
              className="text-sm mt-1"
              style={{
                color: "var(--ss-text-3)",
              }}
            >
              {goal.deadline
                ? `Deadline ${new Date(
                    goal.deadline
                  ).toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }
                  )}`
                : "No deadline"}
            </p>
          </div>

          {completed && (
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                background:
                  "rgba(34,197,94,.15)",
                color:
                  "var(--ss-success)",
              }}
            >
              🏆 Completed
            </span>
          )}

          {goal.pendingSync && (
            <span
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                background:
                  "var(--ss-accent-subtle)",
                color:
                  "var(--ss-accent)",
              }}
            >
              Pending Sync
            </span>
          )}
        </div>

        {/* Progress */}

        <div
          className="w-full h-2 rounded-full overflow-hidden mt-6"
          style={{
            background:
              "var(--ss-border)",
          }}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              background:
                "var(--ss-accent)",
            }}
          />
        </div>

        {/* Amount */}

        <div
          className="flex justify-between mt-4 font-semibold"
          style={{
            color: "var(--ss-text-1)",
          }}
        >
          <span>
            ₹
            {Number(
              goal.current_amount
            ).toLocaleString()}
          </span>

          <span>
            ₹
            {Number(
              goal.target_amount
            ).toLocaleString()}
          </span>
        </div>

        {!completed && (
          <p
            className="mt-3 text-sm"
            style={{
              color:
                "var(--ss-text-3)",
            }}
          >
            ₹
            {remaining.toLocaleString()}{" "}
            remaining
          </p>
        )}
      </div>

      {/* Buttons */}

      <div className="flex gap-2 mt-7">
        <button
          onClick={() =>
            onAddSavings(goal)
          }
          className="flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 font-medium transition-all hover:opacity-90"
          style={{
            background:
              "var(--ss-accent)",
            color:
              "var(--ss-bg)",
          }}
        >
          <Plus size={17} />
          Add
        </button>

        <button
          onClick={() =>
            onEdit(goal)
          }
          className="p-2.5 rounded-xl transition-colors"
          style={{
            background:
              "var(--ss-surface)",
            border:
              "1px solid var(--ss-border)",
            color:
              "var(--ss-text-2)",
          }}
        >
          <Pencil size={17} />
        </button>

        <button
          onClick={() =>
            onDelete(goal)
          }
          className="p-2.5 rounded-xl transition-colors"
          style={{
            background:
              "var(--ss-surface)",
            border:
              "1px solid var(--ss-border)",
            color:
              "var(--ss-danger)",
          }}
        >
          <Trash2 size={17} />
        </button>
      </div>
    </div>
  )
}
