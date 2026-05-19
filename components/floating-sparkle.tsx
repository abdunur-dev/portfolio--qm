"use client"

import { motion } from "motion/react"

export function FloatingSparkle({
  className,
  delay = 0,
}: {
  className?: string
  delay?: number
}) {
  return (
    <motion.span
      aria-hidden
      className={`inline-block font-serif italic text-primary ${className ?? ""}`}
      animate={{
        rotate: [0, 12, -8, 0],
        y: [0, -3, 2, 0],
      }}
      transition={{
        duration: 5,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
        delay,
      }}
    >
      ✦
    </motion.span>
  )
}
