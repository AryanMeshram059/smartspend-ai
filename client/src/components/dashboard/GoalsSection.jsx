const GOALS = [
  {
    id: 1,
    title: "Emergency Fund",
    emoji: "🚨",
    current: 45000,
    target: 100000,
    deadline: "Dec 2024",
    color: "#EF4444",
  },
  {
    id: 2,
    title: "Vacation",
    emoji: "✈️",
    current: 28000,
    target: 50000,
    deadline: "Jun 2025",
    color: "#3B82F6",
  },
  {
    id: 3,
    title: "New Laptop",
    emoji: "💻",
    current: 15000,
    target: 100000,
    deadline: "Sep 2025",
    color: "#8B5CF6",
  },
  {
    id: 4,
    title: "Home Investment",
    emoji: "🏠",
    current: 120000,
    target: 500000,
    deadline: "Dec 2025",
    color: "#F59E0B",
  },
];

function GoalCard({ goal }) {
  const percentage = (goal.current / goal.target) * 100;
  const remaining = goal.target - goal.current;

  return (
    <div
      className="card"
      style={{
        background: `linear-gradient(135deg, rgba(${
          goal.color === "#EF4444"
            ? "239, 68, 68"
            : goal.color === "#3B82F6"
              ? "59, 130, 246"
              : goal.color === "#8B5CF6"
                ? "139, 92, 246"
                : "245, 158, 11"
        }, 0.05) 0%, rgba(${
          goal.color === "#EF4444"
            ? "239, 68, 68"
            : goal.color === "#3B82F6"
              ? "59, 130, 246"
              : goal.color === "#8B5CF6"
                ? "139, 92, 246"
                : "245, 158, 11"
        }, 0.02) 100%)`,
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{goal.emoji}</span>
            <h3
              className="text-lg font-semibold"
              style={{ color: "var(--color-text-primary)" }}
            >
              {goal.title}
            </h3>
          </div>
          <p
            className="text-xs"
            style={{ color: "var(--color-text-muted)" }}
          >
            Target by {goal.deadline}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div
          className="h-2 rounded-full overflow-hidden"
          style={{
            backgroundColor: "var(--color-bg-tertiary)",
          }}
        >
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${Math.min(percentage, 100)}%`,
              backgroundColor: goal.color,
            }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t" style={{ borderColor: "var(--color-bg-tertiary)" }}>
        <div>
          <p
            className="text-xs uppercase tracking-wider mb-1"
            style={{ color: "var(--color-text-muted)" }}
          >
            Saved
          </p>
          <p
            className="text-lg font-bold"
            style={{ color: goal.color }}
          >
            ₹{new Intl.NumberFormat("en-IN").format(goal.current)}
          </p>
        </div>
        <div>
          <p
            className="text-xs uppercase tracking-wider mb-1"
            style={{ color: "var(--color-text-muted)" }}
          >
            Remaining
          </p>
          <p
            className="text-lg font-bold"
            style={{ color: "var(--color-text-secondary)" }}
          >
            ₹{new Intl.NumberFormat("en-IN").format(remaining)}
          </p>
        </div>
      </div>

      {/* Progress Percentage */}
      <div className="text-center pt-4 border-t" style={{ borderColor: "var(--color-bg-tertiary)" }}>
        <p
          className="text-sm font-semibold"
          style={{ color: goal.color }}
        >
          {Math.round(percentage)}% Complete
        </p>
      </div>
    </div>
  );
}

export default function GoalsSection({ onCreateGoal, onViewAllGoals }) {
  return (
    <section className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2
            className="text-display text-3xl md:text-4xl font-bold mb-1"
            style={{ color: "var(--color-text-primary)" }}
          >
            Financial Goals
          </h2>
          <p
            className="text-sm md:text-base"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Track your progress and stay motivated
          </p>
        </div>

        <button
          onClick={onCreateGoal}
          className="btn btn-primary btn-pill text-sm md:text-base"
          style={{ backgroundColor: "var(--color-accent-primary)" }}
        >
          <span>+</span> New Goal
        </button>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {GOALS.map((goal, idx) => (
          <div
            key={goal.id}
            style={{
              animation: `fadeIn 0.5s ease-out ${idx * 0.1}s both`,
            }}
          >
            <GoalCard goal={goal} />
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center pt-4">
        <button
          onClick={onViewAllGoals}
          className="btn btn-ghost btn-pill text-sm md:text-base"
          style={{
            borderColor: "var(--color-text-light)",
            color: "var(--color-text-primary)",
          }}
        >
          View All Goals →
        </button>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
