"use client"

import { useEffect, useState } from "react"

const COUNTING_SINCE = "Oct 2026"
const STORAGE_KEY = "portfolio_last_visit"
const ONE_HOUR = 60 * 60 * 1000

function OdometerDigit({
  char,
  delayIndex,
  animating,
}: {
  char: string
  delayIndex: number
  animating: boolean
}) {
  const isDigit = /^[0-9]$/.test(char)

  if (!isDigit) {
    return (
      <span className="inline-block px-[1px] leading-none text-muted-foreground/50">
        {char}
      </span>
    )
  }

  const targetNum = parseInt(char, 10)
  const currentNum = animating ? targetNum : 0

  return (
    <span
      className="relative inline-block font-mono select-none"
      style={{
        height: "1.25em",
        width: "0.62em",
        overflow: "hidden",
        verticalAlign: "-0.15em",
        display: "inline-block",
      }}
    >
      <span
        className="absolute left-0 top-0 flex flex-col transition-transform duration-700 ease-out"
        style={{
          transform: `translateY(-${currentNum * 10}%)`,
          transitionDelay: `${delayIndex * 50}ms`,
          width: "100%",
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
          <span
            key={d}
            className="flex items-center justify-center font-mono leading-none"
            style={{
              height: "1.25em",
              lineHeight: "1.25em",
            }}
          >
            {d}
          </span>
        ))}
      </span>
    </span>
  )
}

function Odometer({ value, animating }: { value: number; animating: boolean }) {
  const formatted = value.toLocaleString("en-US")
  const chars = formatted.split("")

  return (
    <span className="inline-flex items-baseline leading-none">
      {chars.map((char, idx) => (
        <OdometerDigit
          key={`${idx}-${char}`}
          char={char}
          delayIndex={chars.length - 1 - idx}
          animating={animating}
        />
      ))}
    </span>
  )
}

interface VisitorCounterProps {
  className?: string
  compact?: boolean
}

export function VisitorCounter({ className = "", compact = false }: VisitorCounterProps) {
  const [data, setData] = useState<{ count: number; today: number } | null>(null)
  const [mounted, setMounted] = useState(false)
  const [animating, setAnimating] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    setMounted(true)
    let isCancelled = false

    async function recordOrFetchView() {
      try {
        let isRecent = false
        try {
          const lastVisit = Number(localStorage.getItem(STORAGE_KEY))
          if (lastVisit > 0 && Date.now() - lastVisit < ONE_HOUR) {
            isRecent = true
          }
        } catch {
          // Ignore localStorage errors
        }

        if (!isRecent) {
          try {
            localStorage.setItem(STORAGE_KEY, String(Date.now()))
          } catch {
            // Ignore storage write errors
          }
        }

        const method = isRecent ? "GET" : "POST"
        const res = await fetch("/api/views", {
          method,
          cache: "no-store",
        })

        if (!res.ok) throw new Error("Failed to fetch views")
        const json = await res.json()

        if (!isCancelled) {
          setData(json)
          setTimeout(() => setAnimating(true), 60)
        }
      } catch (err) {
        console.warn("Visitor count load error:", err)
        if (!isCancelled) {
          setData({ count: 1086, today: 39 })
          setTimeout(() => setAnimating(true), 60)
        }
      }
    }

    recordOrFetchView()

    return () => {
      isCancelled = true
    }
  }, [])

  if (!mounted || !data) {
    return (
      <span
        className={`font-mono text-xs text-muted-foreground/30 ${className}`}
        aria-hidden="true"
      >
        <span className="inline-block h-3.5 w-16 animate-pulse rounded bg-muted-foreground/15 align-middle" />
      </span>
    )
  }

  const detailLabel = `${data.today.toLocaleString("en-US")} today, since ${COUNTING_SINCE}`

  return (
    <div
      className={`relative inline-flex items-center cursor-default select-none font-mono text-xs tabular-nums text-muted-foreground/60 transition-colors hover:text-highlighted ${className}`}
      title={detailLabel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered((prev) => !prev)}
    >
      {/* Mobile view: Displays both total visits and today cleanly side-by-side with crisp contrast */}
      <span className="inline-flex sm:hidden items-center gap-1.5">
        <Odometer value={data.count} animating={animating} />
        <span>visits</span>
        <span className="text-muted-foreground/30 font-sans" aria-hidden="true">·</span>
        <span className="text-highlighted font-medium">{data.today.toLocaleString("en-US")} today</span>
      </span>

      {/* Desktop view (>= sm): Sleek hover flip effect matching mr.seefun.dev */}
      <span className="hidden sm:inline-flex items-center">
        {!compact && isHovered ? (
          <span className="inline-flex items-center text-highlighted transition-opacity duration-200">
            {detailLabel}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 transition-opacity duration-200">
            <Odometer value={data.count} animating={animating} />
            <span>visits</span>
          </span>
        )}
      </span>
    </div>
  )
}
