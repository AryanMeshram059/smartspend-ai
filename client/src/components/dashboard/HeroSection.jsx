import { useState, useEffect } from "react";
import { Particles } from "@/components/Particles";
import { BlurText } from "@/components/BlurText";

const AI_INSIGHTS = [
  {
    userMessage: "My finances are hot garbage 🗑️🔥",
    aiResponse: "You say this every Sunday 🙂\n\nLet's fix that.\nI'll create a plan.",
    emoji: "🗑️",
  },
  {
    userMessage: "I'm spending like a billionaire on Swiggy 💳",
    aiResponse: "Friday is attacking your budget again 📉\n\nWe need to talk about this pattern.",
    emoji: "🍔",
  },
  {
    userMessage: "Can I save more?",
    aiResponse: "You survived 8 no-spend days 🎉\n\nThat's progress. Keep going.",
    emoji: "💰",
  },
  {
    userMessage: "What should I do with my money?",
    aiResponse: "Your savings increased 18% this month ↗️\n\nLet's build on that momentum.",
    emoji: "📈",
  },
];

export default function HeroSection({ userName = "Aryan" }) {
  const [currentInsight, setCurrentInsight] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentInsight((prev) => (prev + 1) % AI_INSIGHTS.length);
        setIsAnimating(false);
      }, 300);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const insight = AI_INSIGHTS[currentInsight];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-16 px-4 md:px-8">
      {/* Subtle background particles */}
      <div className="absolute inset-0 opacity-30">
        <Particles />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl w-full mx-auto text-center">
        {/* Greeting */}
        <div className="mb-12 md:mb-16 fade-in">
          <h1
            className="text-display text-6xl md:text-7xl font-bold tracking-tight mb-4"
            style={{ color: "var(--color-text-primary)" }}
          >
            Hey {userName}
          </h1>
          <p
            className="text-lg md:text-xl"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Let's talk about your money
          </p>
        </div>

        {/* Chat Bubble Container */}
        <div className="space-y-6 md:space-y-8">
          {/* User Message - Right aligned */}
          <div className={`flex justify-end ${isAnimating ? "blur-in" : "fade-in"}`}>
            <div
              className="max-w-xs md:max-w-sm px-6 py-4 rounded-3xl text-left"
              style={{
                backgroundColor: "var(--color-accent-primary)",
                color: "var(--color-white)",
                borderBottomRightRadius: "8px",
                boxShadow: "var(--shadow-md)",
              }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{insight.emoji}</span>
              </div>
              <p className="font-medium text-sm md:text-base">
                {insight.userMessage}
              </p>
            </div>
          </div>

          {/* AI Response - Left aligned */}
          <div className={`flex justify-start ${isAnimating ? "blur-in" : "fade-in"}`}>
            <div
              className="max-w-xs md:max-w-sm px-6 py-4 rounded-3xl text-left"
              style={{
                backgroundColor: "var(--color-white)",
                color: "var(--color-text-primary)",
                borderBottomLeftRadius: "8px",
                boxShadow: "var(--shadow-lg)",
                border: "1px solid var(--color-bg-tertiary)",
              }}
            >
              <p
                className="text-sm md:text-base whitespace-pre-line leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                <BlurText text={insight.aiResponse} delay={0.1} />
              </p>
            </div>
          </div>
        </div>

        {/* Indicator dots */}
        <div className="flex justify-center gap-2 mt-12">
          {AI_INSIGHTS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsAnimating(true);
                setTimeout(() => {
                  setCurrentInsight(idx);
                  setIsAnimating(false);
                }, 300);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentInsight ? "w-8" : "w-2"
              }`}
              style={{
                backgroundColor:
                  idx === currentInsight
                    ? "var(--color-accent-primary)"
                    : "var(--color-text-light)",
              }}
              aria-label={`Insight ${idx + 1}`}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 md:mt-16">
          <button
            className="btn btn-primary btn-pill text-base md:text-lg px-8 py-3"
            style={{ backgroundColor: "var(--color-accent-primary)" }}
          >
            Start Your Journey →
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 fade-in">
        <div className="flex flex-col items-center gap-2">
          <p
            className="text-xs font-medium uppercase tracking-wider"
            style={{ color: "var(--color-text-muted)" }}
          >
            Scroll to explore
          </p>
          <svg
            className="w-5 h-5 animate-bounce"
            style={{ color: "var(--color-accent-primary)" }}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
