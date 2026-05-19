"use client"

import { motion } from "motion/react"

/**
 * Mayven-style heading where letter groups fade in with staggered opacity,
 * like "may a aven daño". The accent group uses the brand primary.
 */
export function AnimatedHeading({
  segments,
}: {
  segments: { text: string; tone: "solid" | "muted" | "accent" }[]
}) {
  const toneClass: Record<typeof segments[number]["tone"], string> = {
    solid: "text-foreground",
    muted: "text-foreground/40",
    accent: "text-primary",
  }

  return (
    <h1 className="font-serif text-6xl leading-none tracking-tight sm:text-7xl">
      {segments.map((seg, i) => (
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
