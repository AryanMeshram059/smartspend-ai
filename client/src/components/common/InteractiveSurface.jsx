import Magnet from "../Magnet"

/**
 * Subtle cursor-follow on desktop only. Mobile renders children as-is.
 */
export default function InteractiveSurface({
  children,
  className = "",
  magnetStrength = 3,
  padding = 80,
}) {
  return (
    <>
      <div className={`hidden lg:block ${className}`}>
        <Magnet magnetStrength={magnetStrength} padding={padding} wrapperClassName="w-full">
          {children}
        </Magnet>
      </div>
      <div className={`lg:hidden ${className}`}>{children}</div>
    </>
  )
}
