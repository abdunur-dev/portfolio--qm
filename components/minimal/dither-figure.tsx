"use client"

import { useEffect, useRef } from "react"

/** 8×8 Bayer matrix, normalised to 0..1 thresholds. */
const BAYER = [
  0, 32, 8, 40, 2, 34, 10, 42, 48, 16, 56, 24, 50, 18, 58, 26, 12, 44, 4, 36, 14, 46, 6, 38, 60, 28, 52, 20, 62, 30, 54,
  22, 3, 35, 11, 43, 1, 33, 9, 41, 51, 19, 59, 27, 49, 17, 57, 25, 15, 47, 7, 39, 13, 45, 5, 37, 63, 31, 55, 23, 61, 29,
  53, 21,
].map((v) => (v + 0.5) / 64)

/**
 * Renders a transparent cutout photo as a 1-bit ordered dither, with the same
 * motion language as AsciiFigure: dots settle top-down, the bottom edge
 * dissolves, a few dots shimmer at rest and they scatter around the pointer.
 *
 * Tone is positive in both themes (dark ink on light, light ink on dark), so
 * the face stays recognisable either way.
 */
export function DitherFigure({
  src,
  cols = 170,
  className = "",
  label,
}: {
  /** a PNG with transparency: only opaque pixels are drawn */
  src: string
  /** dots across */
  cols?: number
  className?: string
  label: string
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!wrap || !canvas || !ctx) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let rows = 0
    let lum = new Float32Array(0)
    let alpha = new Float32Array(0)
    let on = new Uint8Array(0)
    let reveal = new Float32Array(0)
    let cell = 0
    let raf = 0
    let start = 0
    let last = 0
    let ink = "#0a0a0a"
    let cancelled = false
    const pointer = { x: -9999, y: -9999, active: false }

    const readInk = () => {
      ink = getComputedStyle(document.documentElement).getPropertyValue("--foreground").trim() || ink
    }

    // Which dots are inked depends on the theme: always draw the photo positive.
    const threshold = () => {
      const dark = document.documentElement.classList.contains("dark")
      for (let i = 0; i < on.length; i++) {
        if (alpha[i] < 0.35) {
          on[i] = 0
          continue
        }
        const c = i % cols
        const r = (i / cols) | 0
        // A faint floor keeps the dark hoodie's outline visible on a dark page.
        let v = dark ? Math.max(lum[i], 0.1) : 1 - lum[i]
        // Bottom edge dissolves into the page.
        const y = r / rows
        v *= 1 - Math.max(0, (y - 0.78) / 0.22) * 0.85
        on[i] = v > BAYER[(r % 8) * 8 + (c % 8)] ? 1 : 0
      }
    }

    const sample = (img: HTMLImageElement) => {
      rows = Math.round(cols * (img.naturalHeight / img.naturalWidth))
      const off = document.createElement("canvas")
      off.width = cols
      off.height = rows
      const octx = off.getContext("2d", { willReadFrequently: true })!
      octx.drawImage(img, 0, 0, cols, rows)
      const data = octx.getImageData(0, 0, cols, rows).data
      const n = cols * rows
      lum = new Float32Array(n)
      alpha = new Float32Array(n)
      on = new Uint8Array(n)
      reveal = new Float32Array(n)
      for (let i = 0; i < n; i++) {
        const p = i * 4
        lum[i] = (0.299 * data[p] + 0.587 * data[p + 1] + 0.114 * data[p + 2]) / 255
        alpha[i] = data[p + 3] / 255
        const r = (i / cols) | 0
        reveal[i] = reduce ? 0 : r * 7 + Math.random() * 480
      }
      threshold()
    }

    const resize = () => {
      const w = wrap.clientWidth
      cell = w / cols
      const h = cell * rows
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw(performance.now())
    }

    const draw = (now: number) => {
      const t = now - start
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = ink
      const radius = cell * 16
      const dot = cell * 0.92
      for (let i = 0; i < on.length; i++) {
        if (!on[i]) continue
        let x = (i % cols) * cell
        let y = ((i / cols) | 0) * cell
        let a = 1

        if (t < reveal[i]) {
          // Not settled yet: flicker in, or stay hidden.
          if (t < reveal[i] - 220 || Math.random() < 0.5) continue
          a = 0.35
        }

        if (pointer.active) {
          const dx = x - pointer.x
          const dy = y - pointer.y
          const d = Math.hypot(dx, dy)
          if (d < radius) {
            // Push dots outward and jitter them, strongest at the centre.
            const k = 1 - d / radius
            const push = k * k * cell * 5
            x += (dx / (d || 1)) * push + (Math.random() - 0.5) * k * cell * 2
            y += (dy / (d || 1)) * push + (Math.random() - 0.5) * k * cell * 2
          }
        }

        ctx.globalAlpha = a
        ctx.fillRect(x, y, dot, dot)
      }
      ctx.globalAlpha = 1
    }

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      if (now - last < 45) return
      last = now
      // Idle shimmer: a handful of edge dots toggle.
      for (let n = 0; n < on.length * 0.002; n++) {
        const i = (Math.random() * on.length) | 0
        if (alpha[i] >= 0.35 && lum[i] > 0.25 && lum[i] < 0.75) on[i] ^= 1
      }
      draw(now)
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = e.clientX - rect.left
      pointer.y = e.clientY - rect.top
      pointer.active = true
    }
    const onLeave = () => {
      pointer.active = false
      threshold() // settle any shimmer back to the true image
    }

    const img = new Image()
    img.decoding = "async"
    img.src = src
    img.onload = () => {
      if (cancelled) return
      readInk()
      sample(img)
      start = performance.now()
      resize()
      if (!reduce) raf = requestAnimationFrame(tick)
    }

    const ro = new ResizeObserver(() => rows && resize())
    ro.observe(wrap)
    const mo = new MutationObserver(() => {
      readInk()
      if (rows) threshold()
      draw(performance.now())
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    canvas.addEventListener("pointermove", onMove)
    canvas.addEventListener("pointerleave", onLeave)

    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      ro.disconnect()
      mo.disconnect()
      canvas.removeEventListener("pointermove", onMove)
      canvas.removeEventListener("pointerleave", onLeave)
    }
  }, [src, cols])

  return (
    <div ref={wrapRef} className={`relative w-full select-none ${className}`}>
      <canvas ref={canvasRef} role="img" aria-label={label} className="block" />
    </div>
  )
}
