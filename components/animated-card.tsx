"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function AnimatedCard({
  children,
  className,
  href,
  hover = true,
}: {
  children: ReactNode
  className?: string
  href?: string
  hover?: boolean
}) {
  const cardVariants = {
    rest: {
      scale: 1,
      y: 0,
      boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
    },
    hover: hover
      ? {
          scale: 1.02,
          y: -4,
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
        }
      : {},
  }

  const borderVariants = {
    rest: {
      borderColor: "rgba(0, 0, 0, 0.1)",
    },
    hover: hover
      ? {
          borderColor: "rgba(0, 0, 0, 0.2)",
        }
      : {},
  }

  const content = (
    <motion.div
      initial="rest"
      whileHover="hover"
      variants={cardVariants}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={cn(
        "rounded-xl border border-border/60 bg-card/40 backdrop-blur-sm transition-all",
        "relative overflow-hidden group",
        className
      )}
    >
      {/* Grid overlay on hover */}
      <motion.div
        variants={borderVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Subtle animated line on hover */}
      {hover && (
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileHover={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent"
          style={{ transformOrigin: "left" }}
        />
      )}
    </motion.div>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className="no-underline">
        {content}
      </a>
    )
  }

  return content
}
