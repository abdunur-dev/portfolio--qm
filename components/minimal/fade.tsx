import type { CSSProperties, ReactNode } from "react"

/** CSS-only blur-fade entrance (see `.blur-fade` in globals.css). Delay is in seconds. */
export function Fade({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <div
      className={`blur-fade ${className}`}
      style={
        {
          "--blur-fade-duration": "0.4s",
          "--blur-fade-delay": `${delay}s`,
          "--blur-fade-y": "-6px",
          "--blur-fade-blur": "6px",
        } as CSSProperties
      }
    >
      {children}
    </div>
  )
}

/** Base delay step between blocks on the page. */
export const STEP = 0.04
