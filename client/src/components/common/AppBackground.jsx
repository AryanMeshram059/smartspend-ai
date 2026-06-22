import { Particles } from "../react-bits"

export default function AppBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      <Particles
        className="h-full w-full"
        particleCount={100}
        particleSpread={11}
        speed={0.035}
        particleColors={["#52525b", "#71717a", "#a1a1aa"]}
        moveParticlesOnHover={false}
        alphaParticles
        particleBaseSize={70}
        sizeRandomness={0.4}
      />
      <div className="absolute inset-0 bg-zinc-950/80" />
    </div>
  )
}
