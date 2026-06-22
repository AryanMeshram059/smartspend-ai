import { Card } from "../ui"
import { CountUp, AnimatedContent } from "../react-bits"
import InteractiveSurface from "../common/InteractiveSurface"

export default function StatCard({ label, value, icon: Icon, prefix = "₹" }) {
  return (
    <AnimatedContent distance={24} duration={0.5}>
      <InteractiveSurface magnetStrength={4} padding={60}>
        <Card>
          <div className="flex items-start justify-between gap-6">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-600">{label}</p>
              <p className="mt-4 text-3xl font-semibold tracking-tight text-white lg:text-4xl">
                {prefix}
                <CountUp to={value} duration={1.2} separator="," />
              </p>
            </div>
            {Icon && (
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950/80">
                <Icon className="h-4 w-4 text-zinc-500" />
              </div>
            )}
          </div>
        </Card>
      </InteractiveSurface>
    </AnimatedContent>
  )
}
