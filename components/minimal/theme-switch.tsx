"use client"

import { useEffect, useState, type MouseEvent } from "react"
import { Monitor, Moon, Sun } from "lucide-react"
import { motion } from "motion/react"
import { useTheme } from "next-themes"

const options = [
  { value: "system", label: "System theme", Icon: Monitor },
  { value: "light", label: "Light theme", Icon: Sun },
  { value: "dark", label: "Dark theme", Icon: Moon },
] as const

type DocWithVT = Document & {
  startViewTransition?: (cb: () => void) => { ready: Promise<void> }
}

/**
 * Theme pill pinned to the side of the viewport: a vertical rail on desktop,
 * a small floating pill bottom-right on phones. Switching themes reveals the
 * new one in a circle growing from the clicked button.
 */
export function ThemeSwitch() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const change = (value: string, e: MouseEvent<HTMLButtonElement>) => {
    if (value === theme) return
    const doc = document as DocWithVT
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (!doc.startViewTransition || reduce) {
      setTheme(value)
      return
    }
    const { clientX: x, clientY: y } = e
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    const vt = doc.startViewTransition(() => setTheme(value))
    vt.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 550, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" },
      )
    })
  }

  return (
    <div
      role="group"
      aria-label="Theme"
      className="blur-fade fixed bottom-4 right-4 z-50 flex items-center gap-1 rounded-full border bg-background/80 p-1 shadow-sm backdrop-blur-md print:hidden lg:bottom-auto lg:right-6 lg:top-1/2 lg:-translate-y-1/2 lg:flex-col"
      style={{ ["--blur-fade-delay" as string]: "0.6s" }}
    >
      {options.map(({ value, label, Icon }) => {
        const active = mounted && theme === value
        return (
          <button
            key={value}
            type="button"
            aria-label={label}
            title={label}
            aria-pressed={active}
            onClick={(e) => change(value, e)}
            className={`relative flex size-7 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-ring ${
              active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {active && (
              <motion.span
                layoutId="theme-active"
                aria-hidden
                className="absolute inset-0 rounded-full bg-muted"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <Icon aria-hidden className="relative size-3.5" strokeWidth={2} />
          </button>
        )
      })}
    </div>
  )
}
