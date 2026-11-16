"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

/** Scatter layouts by card count: [left %, top %, rotation deg]. */
const LAYOUTS: Record<number, [number, number, number][]> = {
  1: [[14, 4, -3]],
  2: [[2, 4, -6], [42, 16, 5]],
  3: [[1, 4, -7], [27, 22, 4], [53, 6, 7]],
  4: [[1, 3, -8], [19, 24, 5], [38, 6, -4], [57, 26, 7]],
}
const WIDTH: Record<number, number> = { 1: 72, 2: 56, 3: 46, 4: 42 }

/** A framed 4:3 print is ~0.7625× as tall as it is wide (photo + border). */
const PRINT_H = 0.7625
/**
 * Board height as a fraction of its width, just tall enough for the lowest
 * print (+ room for its label and the tilt), so there's no empty gap below.
 */
function boardRatio(layout: [number, number, number][], width: number) {
  const w = width / 100
  return Math.max(...layout.map(([, top]) => (PRINT_H * w + 0.08) / (1 - top / 100)))
}

/** A lime pushpin, seen from slightly above. */
function Pin({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 40" aria-hidden className={className}>
      <path d="M17 22 L11 38" stroke="#9ca3af" strokeWidth="1.6" strokeLinecap="round" />
      <ellipse cx="17" cy="23" rx="7.5" ry="3" fill="#5f8f12" />
      <path d="M11 22 C11 15 23 15 23 22 Z" fill="#8fd41c" />
      <circle cx="17" cy="11" r="9" fill="#b6f23a" />
      <circle cx="17" cy="11" r="9" fill="url(#pin-shade)" />
      <ellipse cx="13.5" cy="7.5" rx="3" ry="2.2" fill="#ffffff" opacity="0.75" />
      <defs>
        <radialGradient id="pin-shade" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0.55" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#3f6b06" stopOpacity="0.55" />
        </radialGradient>
      </defs>
    </svg>
  )
}

/**
 * Post photos pinned straight onto the page, title huge and faded behind.
 * - Scrolling in: the prints slide in from the sides one by one and land
 *   tilted, then their pins drop in.
 * - Click: that print slides to the middle and grows, in place (no popup);
 *   the others slide aside. ← → (buttons or keys) slide through every photo
 *   inside it. Click again / Esc puts it back.
 */
export function PinnedBoard({ images, title }: { images: string[]; title: string }) {
  const shown = images.slice(0, 4)
  const layout = LAYOUTS[shown.length] ?? LAYOUTS[4]
  const width = WIDTH[shown.length] ?? 39
  const backdropWords = title.split(/\s+/).slice(0, 4).join(" ")

  const boardRef = useRef<HTMLDivElement>(null)
  const [dealt, setDealt] = useState(false) // slid in yet?
  const [settled, setSettled] = useState(false) // entrance finished (drop the stagger delays)
  const [focus, setFocus] = useState<number | null>(null) // which card is opened
  const [photo, setPhoto] = useState(0) // which image the opened card shows
  const [dir, setDir] = useState(1) // slide direction inside the opened card

  // Deal the cards in when the board scrolls into view.
  useEffect(() => {
    const el = boardRef.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDealt(true)
      setSettled(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect()
          setDealt(true)
          window.setTimeout(() => setSettled(true), 600 + shown.length * 140 + 500)
        }
      },
      { threshold: 0.25 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [shown.length])

  const openCard = (i: number) => {
    if (focus === i) return setFocus(null)
    setDir(1)
    setPhoto(i)
    setFocus(i)
  }
  const step = useCallback(
    (d: number) => {
      setDir(d)
      setPhoto((p) => (p + d + images.length) % images.length)
    },
    [images.length],
  )

  useEffect(() => {
    if (focus === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFocus(null)
      if (e.key === "ArrowRight") step(1)
      if (e.key === "ArrowLeft") step(-1)
    }
    const onOutside = (e: PointerEvent) => {
      if (boardRef.current && !boardRef.current.contains(e.target as Node)) setFocus(null)
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("pointerdown", onOutside)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("pointerdown", onOutside)
    }
  }, [focus, step])

  if (images.length === 0) return null

  return (
    <section aria-label={`${title}: photos`} className="mb-10 mt-10 sm:mb-6">
      {/* Height via padding so it can animate taller when a photo is opened. */}
      <div
        ref={boardRef}
        data-open={focus !== null}
        className="pinned-board relative w-full"
        style={{ ["--ratio" as string]: `${(boardRatio(layout, width) * 100).toFixed(2)}%` }}
      >
        {/* title, huge and faded, behind the prints */}
        <p
          aria-hidden
          className={`pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-sans text-[clamp(2.2rem,11vw,5.5rem)] font-black uppercase leading-[0.9] tracking-tight text-foreground/[0.07] transition-opacity duration-700 ${
            dealt ? "opacity-100" : "opacity-0"
          }`}
        >
          {backdropWords}
        </p>

        {shown.map((src, i) => {
          const [left, top, rot] = layout[i]
          const isOpen = focus === i
          const fromLeft = left + width / 2 < 50
          const state = !dealt ? "out" : isOpen ? "open" : focus !== null ? "aside" : "rest"
          const current = isOpen ? photo : i
          return (
            <div
              key={src + i}
              data-state={state}
              className="pinned-card absolute"
              style={{
                ["--l" as string]: `${left}%`,
                ["--t" as string]: `${top}%`,
                ["--w" as string]: `${width}%`,
                ["--rot" as string]: `${rot}deg`,
                ["--z" as string]: 10 + i,
                ["--from" as string]: fromLeft ? "-130%" : "130%",
                ["--aside" as string]: fromLeft ? "-14%" : "14%",
                ["--delay" as string]: settled ? "0ms" : `${i * 140}ms`,
                // idle sway: each print at its own pace so they never move in sync
                ["--sway-dur" as string]: `${3.4 + ((i * 0.9) % 2.2)}s`,
                ["--sway-delay" as string]: `${-i * 1.3}s`,
                ["--sway-a" as string]: `${i % 2 ? 1.6 : -1.4}deg`,
              }}
            >
              <div className="pinned-sway relative">
              <button
                type="button"
                onClick={() => openCard(i)}
                aria-label={isOpen ? "Put photo back" : `Open photo ${i + 1} of ${images.length}`}
                aria-expanded={isOpen}
                className="group relative block w-full cursor-pointer rounded-[3px] bg-[#f5f4f0] p-[2.5%] shadow-[0_18px_40px_-14px_rgba(0,0,0,0.65)] outline-none ring-1 ring-black/5 transition-shadow duration-500 hover:shadow-[0_28px_55px_-16px_rgba(0,0,0,0.75)] focus-visible:ring-2 focus-visible:ring-[#b6f23a] dark:bg-[#222222] dark:ring-white/10"
              >
                {/* small print border; the inner clip keeps the photo slide inside it */}
                <span className="block overflow-hidden rounded-[1px]">
                {/* key change re-mounts the image so it slides in */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  key={current}
                  src={images[current]}
                  alt={`${title}, photo ${current + 1}`}
                  loading="lazy"
                  draggable={false}
                  className={`aspect-[4/3] w-full object-cover ${isOpen ? (dir > 0 ? "pinned-slide-next" : "pinned-slide-prev") : ""} ${
                    isOpen ? "grayscale-0" : "grayscale-[35%] group-hover:grayscale-0"
                  } block transition-[filter] duration-500`}
                />
                </span>
              </button>

              <span className="pointer-events-none absolute -bottom-5 left-0 font-mono text-[10px] text-muted-foreground/70">
                [{current + 1}]
                {!isOpen && i === shown.length - 1 && images.length > shown.length && (
                  <span className="ml-2">+{images.length - shown.length} more</span>
                )}
              </span>

              <Pin className="pinned-pin pointer-events-none absolute -right-[4%] -top-[9%] w-[13%] min-w-5 drop-shadow-[2px_6px_4px_rgba(0,0,0,0.45)]" />
              </div>

              {isOpen && images.length > 1 && (
                <div className="absolute -bottom-11 right-0 flex items-center gap-1 sm:-bottom-9">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    aria-label="Previous photo"
                    className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground sm:size-7"
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
                    {photo + 1}/{images.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    aria-label="Next photo"
                    className="flex size-9 items-center justify-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground sm:size-7"
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
