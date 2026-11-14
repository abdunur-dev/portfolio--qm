"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"

/**
 * Typewriter: reveals text one character at a time with a single ink
 * caret that moves along with the typing. Starts when scrolled into view.
 * The untyped remainder is rendered invisibly so the layout never shifts.
 */
export function Typewriter({
  text,
  delay = 0,
  speed = 55,
  caret = true,
  className = "",
}: {
  text: string
  /** ms before the first character */
  delay?: number
  /** ms per character */
  speed?: number
  /** keep a blinking caret after the last character */
  caret?: boolean
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" })
  const reduce = useReducedMotion()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (reduce) {
      setCount(text.length)
      return
    }
    if (!inView) return
    let n = 0
    let interval: number | undefined
    const start = window.setTimeout(() => {
      interval = window.setInterval(() => {
        n += 1
        setCount(n)
        if (n >= text.length) window.clearInterval(interval)
      }, speed)
    }, delay)
    return () => {
      window.clearTimeout(start)
      window.clearInterval(interval)
    }
  }, [inView, reduce, delay, speed, text])

  const typing = count < text.length
  const showCaret = !reduce && inView && (typing || caret)

  return (
    <span ref={ref} aria-label={text} className={className}>
      <span aria-hidden>{text.slice(0, count)}</span>
      {showCaret && <span aria-hidden className={`tw-caret ${typing ? "" : "tw-caret-idle"}`} />}
      <span aria-hidden className="invisible">
        {text.slice(count)}
      </span>
    </span>
  )
}

/**
 * Reveal: slides content up into place as it scrolls into view.
 * Use `index` to stagger siblings one after another.
 */
export function Reveal({
  children,
  index = 0,
  step = 0.08,
  y = 22,
  className = "",
}: {
  children: ReactNode
  index?: number
  step?: number
  y?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.6, delay: index * step, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
