"use client"

import { useEffect, useRef } from "react"

/**
 * A soft field of small squares that slowly flicker at the top of the page.
 * Reads the foreground colour from CSS so it follows the theme, and fades
 * out downward through a mask.
 */
export function HeaderField({
  height = 100,
  side = "top",
  className = "",
}: {
  height?: number
  /** "bottom" fades upward instead, for use behind the footer */
  side?: "top" | "bottom"
  className?: string
}) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const CELL = 4
    const GAP = 6
    const step = CELL + GAP
    let cols = 0
    let rows = 0
    let alpha: Float32Array = new Float32Array(0)
    let target: Float32Array = new Float32Array(0)
    let raf = 0
    let last = 0

    const ink = () => getComputedStyle(document.documentElement).getPropertyValue("--foreground").trim() || "#0a0a0a"

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = canvas.parentElement?.clientWidth ?? window.innerWidth
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(w / step)
      rows = Math.ceil(height / step)
      alpha = new Float32Array(cols * rows).map(() => Math.random() * 0.12)
      target = alpha.slice()
    }

    const draw = () => {
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = ink()
      for (let i = 0; i < alpha.length; i++) {
        const a = alpha[i]
        if (a < 0.01) continue
        ctx.globalAlpha = a
        ctx.fillRect((i % cols) * step, Math.floor(i / cols) * step, CELL, CELL)
      }
      ctx.globalAlpha = 1
    }

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick)
      if (t - last < 50) return // ~20fps is plenty for a flicker
      last = t
      for (let i = 0; i < alpha.length; i++) {
        if (Math.random() < 0.015) target[i] = Math.random() < 0.15 ? 0.1 + Math.random() * 0.18 : Math.random() * 0.06
        alpha[i] += (target[i] - alpha[i]) * 0.12
      }
      draw()
    }

    resize()
    draw()
    if (!reduce) raf = requestAnimationFrame(tick)
    window.addEventListener("resize", resize)
    // Redraw when the theme class flips so the ink colour updates even with motion off.
    const mo = new MutationObserver(draw)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      mo.disconnect()
    }
  }, [height])

  const mask = `linear-gradient(to ${side === "top" ? "bottom" : "top"}, black, transparent)`
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute z-0 overflow-hidden ${side === "top" ? "inset-x-0 top-0" : ""} ${className}`}
      style={{ height }}
    >
      <div className="size-full" style={{ maskImage: mask, WebkitMaskImage: mask }}>
        <canvas ref={ref} />
      </div>
    </div>
  )
}
