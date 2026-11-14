"use client"

import { useEffect, useState } from "react"

/** Live Addis Ababa time (UTC+3), ticking every second. */
export function SysClock({ className = "" }: { className?: string }) {
  const [now, setNow] = useState<string | null>(null)

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Addis_Ababa",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
    const tick = () => setNow(fmt.format(new Date()))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <span className={`tabular-nums ${className}`} suppressHydrationWarning>
      {now ?? "--:--:--"}
    </span>
  )
}
