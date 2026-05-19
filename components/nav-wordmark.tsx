"use client"

import Link from "next/link"
import { motion } from "motion/react"

const segments = [
  { text: "Bur", tone: "solid" as const },
  { text: "han", tone: "muted" as const },
  { text: "_", tone: "accent" as const },
]

const toneClass: Record<"solid" | "muted" | "accent", string> = {
  solid: "text-foreground",
  muted: "text-foreground/55",
  accent: "text-primary",
}

export function NavWordmark() {
  return (
    <Link
      href="/"
      aria-label="Burhan — home"
      className="group inline-flex items-baseline gap-2"
    >
      <span className="relative inline-flex font-serif text-2xl leading-none tracking-tight sm:text-3xl">
        {segments.map((seg, i) => (
          <motion.span
            key={`${seg.text}-${i}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.05 + i * 0.08,
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`inline-block transition-all duration-500 ease-out group-hover:-translate-y-px ${toneClass[seg.tone]}`}
            style={{ transitionDelay: `${i * 40}ms` }}
          >
            <motion.span
              className="inline-block"
              animate={
                seg.tone === "accent"
                  ? { opacity: [1, 0.55, 1] }
                  : undefined
              }
              transition={
                seg.tone === "accent"
                  ? { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
                  : undefined
              }
            >
              {seg.text}
            </motion.span>
          </motion.span>
        ))}
      </span>
      <span className="hidden font-mono text-xs text-muted-foreground transition-colors group-hover:text-foreground/70 sm:inline">
        Bur · han
      </span>
    </Link>
  )
}
