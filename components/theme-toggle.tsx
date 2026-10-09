"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = mounted && resolvedTheme === "dark"

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
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className="relative inline-flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground/80 transition-colors hover:border-foreground/40 hover:text-foreground"
    >
      <Sun
        className={`size-4 transition-all ${
          isDark ? "scale-0 -rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
        }`}
        aria-hidden
      />
      <Moon
        className={`absolute size-4 transition-all ${
          isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0"
        }`}
        aria-hidden
      />
    </button>
  )
}
