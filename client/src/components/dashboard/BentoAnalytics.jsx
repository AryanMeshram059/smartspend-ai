import { Particles } from "@/components/Particles";

const ANALYTICS_CARDS = [
  {
    id: "ai-overview",
    title: "AI Financial Health",
    subtitle: "Your financial wellness score",
    value: "8.2",
    unit: "/10",
    metric: "Excellent",
    color: "#399E5A",
    size: "large",
    icon: "🧠",
  },
  {
    id: "savings-goal",
    title: "Savings Goal",
    subtitle: "This month progress",
    value: "68",
    unit: "%",
    metric: "₹4,080 saved",
    color: "#399E5A",
    size: "medium",
    icon: "🎯",
  },
  {
    id: "streak",
    title: "No-Spend Streak",
    subtitle: "Consecutive days",
    value: "8",
    unit: "days",
    metric: "Keep it up! 🔥",
    color: "#F59E0B",
    size: "medium",
    icon: "🔥",
  },
  {
    id: "budget-health",
    title: "Budget Health",
    subtitle: "Category breakdown",
    value: "4/6",
    unit: "on track",
    metric: "Swiggy needs attention",
    color: "#EF4444",
    size: "medium",
    icon: "📊",
  },
  {
    id: "spending-trend",
    title: "Spending Trend",
    subtitle: "Last 30 days",
    value: "↓",
    unit: "12%",
    metric: "Better than last month",
    color: "#399E5A",
    size: "medium",
    icon: "📉",
  },
  {
    id: "forecast",
    title: "Month Forecast",
    subtitle: "Based on current pace",
    value: "₹38,000",
    unit: "projected",
    metric: "Under budget by ₹2,000",
    color: "#399E5A",
    size: "medium",
    icon: "🔮",
  },
];

function AnalyticsCard({ card }) {
  return (
    <div
      className="card relative overflow-hidden group cursor-pointer"
      style={{
        background: `linear-gradient(135deg, rgba(${
          card.color === "#399E5A"
            ? "57, 158, 90"
            : card.color === "#F59E0B"
              ? "245, 158, 11"
              : "239, 68, 68"
        }, 0.05) 0%, rgba(${
          card.color === "#399E5A"
            ? "57, 158, 90"
            : card.color === "#F59E0B"
              ? "245, 158, 11"
              : "239, 68, 68"
        }, 0.02) 100%)`,
      }}
    >
      {/* Subtle background effect */}
      <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
        <Particles />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between mb-4">
            <div>
              <p
                className="text-xs font-medium uppercase tracking-wider"
                style={{ color: "var(--color-text-muted)" }}
              >
                {card.subtitle}
              </p>
              <h3
                className="text-lg font-semibold mt-2"
                style={{ color: "var(--color-text-primary)" }}
              >
                {card.title}
              </h3>
            </div>
            <span className="text-3xl">{card.icon}</span>
          </div>

          <div className="flex items-baseline gap-1 mb-3">
            <span
              className="text-display text-3xl md:text-4xl font-bold"
              style={{ color: card.color }}
            >
              {card.value}
            </span>
            <span
              className="text-sm font-medium"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {card.unit}
            </span>
          </div>
        </div>

        <p
          className="text-sm"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {card.metric}
        </p>
      </div>
    </div>
  );
}

export default function BentoAnalytics() {
  return (
    <section className="space-y-4">
      <div>
        <h2
          className="text-display text-3xl md:text-4xl font-bold mb-2"
          style={{ color: "var(--color-text-primary)" }}
        >
          Your Financial Insights
        </h2>
        <p
          className="text-lg"
          style={{ color: "var(--color-text-secondary)" }}
        >
          AI-powered analytics to help you make better decisions
        </p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {ANALYTICS_CARDS.map((card, idx) => (
          <div
            key={card.id}
            className={`${
              card.size === "large"
                ? "md:col-span-2 md:row-span-2"
                : "md:col-span-1"
            }`}
            style={{ animation: `fadeIn 0.5s ease-out ${idx * 0.1}s both` }}
          >
            <AnalyticsCard card={card} />
          </div>
        ))}
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
