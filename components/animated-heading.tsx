"use client"

import { motion } from "motion/react"

type Segment = { text: string; tone: "solid" | "muted" | "accent" }

/**
 * Mayven-style heading where letter groups fade in with staggered opacity,
 * like "may a aven daño". The accent group uses the brand primary.
 *
 * Accepts either explicit `segments`, or a plain `text` string that gets
 * auto-segmented with alternating solid/muted tones (and optional accent dot).
 */
export function AnimatedHeading({
  segments,
  text,
  accentLast = false,
  className = "",
}: {
  segments?: Segment[]
  text?: string
  accentLast?: boolean
  className?: string
}) {
  const resolved: Segment[] = segments ?? autoSegments(text ?? "", accentLast)

  const toneClass: Record<Segment["tone"], string> = {
    solid: "text-foreground",
    muted: "text-foreground/40",
    accent: "text-primary",
  }

  return (
    <h1
      className={`font-serif leading-none tracking-tight ${
        className || "text-6xl sm:text-7xl"
      }`}
    >
      {resolved.map((seg, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.8,
            delay: 0.08 * i,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`inline-block ${toneClass[seg.tone]}`}
        >
          {seg.text}
        </motion.span>
      ))}
    </h1>
  )
}

function autoSegments(text: string, accentLast: boolean): Segment[] {
  // If the text ends with `.`, treat the dot as an accent like "projects."
  if (accentLast && text.endsWith(".")) {
    return [
      { text: text.slice(0, -1), tone: "solid" },
      { text: ".", tone: "accent" },
    ]
  }

  // Otherwise split on whitespace and alternate solid/muted across words,
  // preserving spaces.
  const parts = text.split(/(\s+)/)
  let wordIndex = 0
  return parts.map<Segment>((p) => {
    if (/^\s+$/.test(p)) return { text: p, tone: "solid" }
    const tone: Segment["tone"] = wordIndex % 2 === 0 ? "solid" : "muted"
    wordIndex++
    return { text: p, tone }
  })
}
