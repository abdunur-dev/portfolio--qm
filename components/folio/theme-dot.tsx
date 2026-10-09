"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

/**
 * Elegant theme switch inspired by mr.seefun.dev:
 * Displays a sleek half-filled eclipse moon that smoothly rotates 180°
 * when switching between dark and light modes, with View Transitions support.
 */
export function ThemeDot() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = !mounted || resolvedTheme === "dark"

  const toggleTheme = () => {
    const nextTheme = isDark ? "light" : "dark"
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      ;(document as any).startViewTransition(() => {
        setTheme(nextTheme)
      })
    } else {
      setTheme(nextTheme)
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode (t)" : "Switch to dark mode (t)"}
      className="group fixed right-5 top-5 z-50 flex size-8 items-center justify-center rounded-full border border-border/40 bg-card/40 text-muted-foreground backdrop-blur-md transition-all duration-300 hover:border-foreground/40 hover:text-highlighted hover:scale-110 focus-visible:outline-2 focus-visible:outline-primary/50 print:hidden"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        focusable="false"
        className="size-4 transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1)"
        style={{
          transform: isDark ? "rotate(0deg)" : "rotate(180deg)",
        }}
      >
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M12 3a9 9 0 0 0 0 18z" fill="currentColor" />
      </svg>
    </button>
  )
}
