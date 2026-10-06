"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

/**
 * Minimal hugorcd.com-style theme switch: a tiny filled dot fixed in the
 * top-right corner. Click it to flip between light and dark.
 */
export function ThemeDot() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const isDark = !mounted || resolvedTheme === "dark"

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className="group fixed right-6 top-6 z-50 flex size-6 items-center justify-center rounded-full outline-primary/25 focus-visible:outline-3 print:hidden"
    >
      <span className="size-3 rounded-full bg-highlighted transition-transform duration-200 group-hover:scale-125" />
    </button>
  )
}
