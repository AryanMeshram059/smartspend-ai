import DotField from "../DotField"
import MagnetLines from "../MagnetLines"

export default function DesktopBackground() {
  return (
    <div className="fixed inset-0 z-0 hidden overflow-hidden lg:block" aria-hidden>
      <div className="pointer-events-none absolute inset-0 bg-zinc-950" />
      <div className="absolute inset-0 opacity-[0.4]">
        <DotField
          className="h-full w-full"
          dotRadius={1}
          dotSpacing={22}
          cursorRadius={420}
          bulgeStrength={40}
          glowRadius={120}
          sparkle={false}
          waveAmplitude={0}
          gradientFrom="rgba(161, 161, 170, 0.14)"
          gradientTo="rgba(82, 82, 91, 0.06)"
          glowColor="#18181b"
        />
      </div>
      <div className="absolute -right-[12vmin] top-[18vh] opacity-[0.07]">
        <MagnetLines
          rows={7}
          columns={7}
          containerSize="55vmin"
          lineColor="#a1a1aa"
          lineWidth="0.6vmin"
          lineHeight="5vmin"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/20 via-transparent to-zinc-950/80" />
    </div>
  )
}
