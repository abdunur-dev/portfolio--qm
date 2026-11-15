"use client"

import { useEffect, useRef } from "react"

/** Dark → bright. Sparse punctuation on the edges, dense glyphs in the body. */
const RAMP = " .:^~!7?YJ5PGB#&"
const NOISE = ".:^~!*"

type Cell = {
  /** index into RAMP, 0 = empty */
  level: number
  char: string
  /** ms after start when the cell settles */
  reveal: number
  /** 0..1 how far down the figure it sits, used for the dissolve */
  y: number
}

/**
 * Renders an image as animated ASCII art, poster style: the shape is built
 * from characters that settle top-down, the lower part dissolves into dots,
 * glyphs shimmer at rest and scramble around the pointer.
 */
export function AsciiFigure({
  src,
  text,
  aspect = 0.8,
  crop = [0, 0, 1, 1],
  cols = 72,
  className = "",
  label,
}: {
  /** an image to trace… */
  src?: string
  /** …or a word/symbol to draw in heavy type and trace instead */
  text?: string
  /** height / width of the text canvas */
  aspect?: number
  /** source crop as fractions: [x, y, w, h] */
  crop?: [number, number, number, number]
  cols?: number
  className?: string
  label: string
}) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const cropKey = crop.join(",")
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!wrap || !canvas || !ctx) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const CHAR_ASPECT = 0.6 // width / height of a monospace glyph
    let rows = 0
    let cells: Cell[] = []
    let cellW = 0
    let cellH = 0
    let raf = 0
    let start = 0
    let last = 0
    let ink = "#0a0a0a"
    const pointer = { x: -9999, y: -9999, active: false }
    let cancelled = false

    const readInk = () => {
      ink = getComputedStyle(document.documentElement).getPropertyValue("--foreground").trim() || ink
    }

    const pick = (s: string) => s[(Math.random() * s.length) | 0]

    // Canvas fonts can't read CSS variables, so resolve the real family name.
    const monoFamily = () => {
      const fam = getComputedStyle(document.documentElement).getPropertyValue("--font-geist-mono").trim()
      return `${fam ? fam + ", " : ""}ui-monospace, SFMono-Regular, Menlo, monospace`
    }

    // Draw the text white-on-black, scaled to fill ~85% of the frame.
    const textSource = (t: string) => {
      const W = 800
      const H = Math.round(W * aspect)
      const c = document.createElement("canvas")
      c.width = W
      c.height = H
      const x = c.getContext("2d")!
      x.fillStyle = "#000"
      x.fillRect(0, 0, W, H)
      const fam = getComputedStyle(document.documentElement).getPropertyValue("--font-geist").trim()
      const font = (size: number) => `800 ${size}px ${fam ? fam + ", " : ""}ui-sans-serif, system-ui, sans-serif`
      x.font = font(100)
      const m = x.measureText(t)
      const h100 = m.actualBoundingBoxAscent + m.actualBoundingBoxDescent || 72
      const size = Math.min((W * 0.85) / m.width, (H * 0.8) / h100) * 100
      x.font = font(size)
      const m2 = x.measureText(t)
      x.fillStyle = "#fff"
      x.textAlign = "center"
      x.textBaseline = "alphabetic"
      x.fillText(t, W / 2, H / 2 + (m2.actualBoundingBoxAscent - m2.actualBoundingBoxDescent) / 2)
      return c
    }

    const sample = (img: HTMLImageElement | HTMLCanvasElement) => {
      const [cx, cy, cw, ch] = cropKey.split(",").map(Number)
      const iw = "naturalWidth" in img ? img.naturalWidth : img.width
      const ih = "naturalHeight" in img ? img.naturalHeight : img.height
      const sw = iw * cw
      const sh = ih * ch
      rows = Math.round((cols * (sh / sw)) * CHAR_ASPECT)
      const off = document.createElement("canvas")
      off.width = cols
      off.height = rows
      const octx = off.getContext("2d", { willReadFrequently: true })!
      octx.drawImage(img, iw * cx, ih * cy, sw, sh, 0, 0, cols, rows)
      const data = octx.getImageData(0, 0, cols, rows).data

      cells = new Array(cols * rows)
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = r * cols + c
          const p = i * 4
          const lum = (0.299 * data[p] + 0.587 * data[p + 1] + 0.114 * data[p + 2]) / 255
          const y = r / rows
          let level = Math.round(lum * (RAMP.length - 1))
          // Lower third dissolves: cells drop out and thin down the ramp.
          const fade = Math.max(0, (y - 0.62) / 0.38)
          if (level > 0 && Math.random() < fade * 0.75) level = Math.random() < 0.5 ? 0 : Math.min(level, 2)
          // A little dust around the shape.
          if (level === 0 && lum > 0.04 && Math.random() < 0.35) level = 1
          if (level === 0 && Math.random() < 0.004) level = 1
          cells[i] = {
            level,
            char: level ? RAMP[level] : " ",
            reveal: reduce ? 0 : r * 22 + Math.random() * 520,
            y,
          }
        }
      }
    }

    const resize = () => {
      const w = wrap.clientWidth
      cellW = w / cols
      cellH = cellW / CHAR_ASPECT
      const h = cellH * rows
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.font = `${cellH * 0.82}px ${monoFamily()}`
      ctx.textBaseline = "top"
      draw(performance.now())
    }

    const draw = (now: number) => {
      const t = now - start
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = ink
      const radius = cellW * 7
      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i]
        if (!cell.level) continue
        const c = i % cols
        const r = (i / cols) | 0
        const x = c * cellW
        const y = r * cellH

        let ch = cell.char
        let alpha = 0.35 + (cell.level / (RAMP.length - 1)) * 0.65
        alpha *= 1 - Math.max(0, cell.y - 0.7) * 1.4

        if (t < cell.reveal) {
          // Not settled yet: flicker in as noise, or stay hidden.
          if (t < cell.reveal - 260) continue
          ch = pick(NOISE)
          alpha *= 0.4
        }

        if (pointer.active) {
          const dx = x + cellW / 2 - pointer.x
          const dy = y + cellH / 2 - pointer.y
          const d = Math.hypot(dx, dy)
          if (d < radius) {
            const k = 1 - d / radius
            if (Math.random() < k * 0.6) ch = pick(RAMP.slice(4))
            alpha = Math.min(1, alpha + k * 0.5)
          }
        }

        ctx.globalAlpha = Math.max(0, alpha)
        ctx.fillText(ch, x, y)
      }
      ctx.globalAlpha = 1
    }

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      if (now - last < 45) return
      last = now
      // Idle shimmer: a few settled cells swap to a neighbouring glyph.
      for (let n = 0; n < cells.length * 0.012; n++) {
        const cell = cells[(Math.random() * cells.length) | 0]
        if (!cell.level) continue
        const lvl = Math.min(RAMP.length - 1, Math.max(1, cell.level + ((Math.random() * 3) | 0) - 1))
        cell.char = RAMP[lvl]
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
    }

    const begin = (source: HTMLImageElement | HTMLCanvasElement) => {
      if (cancelled) return
      readInk()
      sample(source)
      start = performance.now()
      resize()
      if (!reduce) raf = requestAnimationFrame(tick)
    }

    if (text) {
      // Wait for webfonts so the glyph is traced in Geist, not a fallback.
      document.fonts.ready.then(() => begin(textSource(text)))
    } else if (src) {
      const img = new Image()
      img.decoding = "async"
      img.src = src
      img.onload = () => begin(img)
    }

    const ro = new ResizeObserver(() => cells.length && resize())
    ro.observe(wrap)
    const mo = new MutationObserver(() => {
      readInk()
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
  }, [src, text, aspect, cols, cropKey])

  return (
    <div ref={wrapRef} className={`relative w-full select-none ${className}`}>
      <canvas ref={canvasRef} {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })} className="block" />
    </div>
  )
}
