"use client"

import { useEffect, useRef, useState } from "react"

const GLYPHS = "!<>-_\\/[]{}=+*^?#01ABCDEFGHJKLMNPQRSTUVWXYZ"

/**
 * Text that decodes itself: each letter cycles through random glyphs and
 * locks in left to right. The real text is rendered invisibly underneath to
 * hold the width, so nothing around it shifts while it scrambles.
 * Server render and reduced motion both show the final text.
 *
 * Single-line text only (the scrambled layer doesn't wrap).
 */
export function ScrambleText({
  text,
  delay = 0,
  duration,
  trigger = "mount",
  className = "",
}: {
  text: string
  /** seconds before decoding starts (after the trigger) */
  delay?: number
  /** ms for the whole text to lock in; defaults to scale with length */
  duration?: number
  /** "view" waits until the text scrolls into view */
  trigger?: "mount" | "view"
  className?: string
}) {
  const [shown, setShown] = useState(text)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    setShown(text)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const total = duration ?? Math.min(1100, 300 + text.length * 45)
    let raf = 0
    let io: IntersectionObserver | undefined

    const scramble = (locked: number) =>
      text
        .split("")
        .map((ch, i) => (i < locked || ch === " " ? ch : GLYPHS[(Math.random() * GLYPHS.length) | 0]))
        .join("")

    const run = () => {
      let start = 0
      let last = 0
      setShown(scramble(0))
      const tick = (now: number) => {
        if (!start) start = now + delay * 1000
        const t = now - start
        if (t >= total) {
          setShown(text)
          return
        }
        raf = requestAnimationFrame(tick)
        if (now - last < 45) return // ~22fps reads as "decoding", not noise
        last = now
        setShown(scramble(t < 0 ? 0 : Math.floor((t / total) * text.length)))
      }
      raf = requestAnimationFrame(tick)
    }

    if (trigger === "view" && ref.current) {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            io?.disconnect()
            run()
          }
        },
        { rootMargin: "0px 0px -15% 0px" },
      )
      io.observe(ref.current)
    } else {
      run()
    }

    return () => {
      cancelAnimationFrame(raf)
      io?.disconnect()
    }
  }, [text, delay, duration, trigger])

  return (
    <span ref={ref} className={`relative inline-block ${className}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden className="invisible">
        {text}
      </span>
      <span aria-hidden className="absolute inset-0 whitespace-nowrap">
        {shown}
      </span>
    </span>
  )
}
