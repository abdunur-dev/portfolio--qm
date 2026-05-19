"use client"

import { motion, type Variants } from "motion/react"
import type { ReactNode } from "react"

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

export function FadeUp({
  children,
  delay = 0,
  className,
  as: As = "div",
}: {
  children: ReactNode
  delay?: number
  className?: string
  as?: "div" | "section" | "article" | "li"
}) {
  const MotionTag = motion[As] as typeof motion.div

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  )
}
