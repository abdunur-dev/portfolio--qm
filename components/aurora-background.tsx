"use client"

import { useEffect } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"

/**
 * Ambient animated background:
 *  - subtle pixel/dot grid layer (CSS radial-gradient pattern)
 *  - drifting blurred orbs in brand color
 *  - cursor-following spotlight orb
 *  - faint SVG noise grain
 * Sits fixed behind content with `pointer-events-none`.
 */
export function AuroraBackground() {
  // Cursor-tracked spotlight (smoothed with springs so it eases behind the cursor)
  const mouseX = useMotionValue(typeof window !== "undefined" ? window.innerWidth / 2 : 0)
  const mouseY = useMotionValue(typeof window !== "undefined" ? window.innerHeight / 2 : 0)
  const sx = useSpring(mouseX, { stiffness: 60, damping: 20, mass: 0.6 })
  const sy = useSpring(mouseY, { stiffness: 60, damping: 20, mass: 0.6 })
  // Offset so the orb is centered on the cursor (orb is 32rem = 512px)
  const cx = useTransform(sx, (v) => v - 256)
  const cy = useTransform(sy, (v) => v - 256)

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    const handleTouch = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!t) return
      mouseX.set(t.clientX)
      mouseY.set(t.clientY)
    }
    window.addEventListener("mousemove", handleMove)
    window.addEventListener("touchmove", handleTouch, { passive: true })
    return () => {
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("touchmove", handleTouch)
    }
  }, [mouseX, mouseY])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Base wash */}
      <div className="absolute inset-0 bg-background" />

      {/* Pixel / dot grid */}
      <div
        className="absolute inset-0 opacity-60 dark:opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, color-mix(in oklch, var(--foreground) 28%, transparent) 1.2px, transparent 1.2px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse at center, black 50%, transparent 92%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 50%, transparent 92%)",
        }}
      />

      {/* Square pixel accents — small static squares scattered like 8-bit confetti */}
      <div className="absolute inset-0">
        {[
          { top: "12%", left: "8%", size: 6, c: "var(--primary)", o: 0.55 },
          { top: "22%", left: "82%", size: 4, c: "var(--foreground)", o: 0.35 },
          { top: "48%", left: "5%", size: 5, c: "var(--primary)", o: 0.45 },
          { top: "62%", left: "90%", size: 3, c: "var(--foreground)", o: 0.4 },
          { top: "78%", left: "14%", size: 4, c: "var(--primary)", o: 0.5 },
          { top: "34%", left: "70%", size: 3, c: "var(--accent)", o: 0.6 },
          { top: "86%", left: "60%", size: 5, c: "var(--primary)", o: 0.4 },
          { top: "8%", left: "50%", size: 3, c: "var(--foreground)", o: 0.3 },
        ].map((p, i) => (
          <motion.span
            key={i}
            className="absolute"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              backgroundColor: p.c,
              opacity: p.o,
            }}
            animate={{ opacity: [p.o, p.o * 0.3, p.o], scale: [1, 1.3, 1] }}
            transition={{
              duration: 4 + (i % 4),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      {/* Cursor-following spotlight orb */}
      <motion.div
        className="absolute h-[32rem] w-[32rem] rounded-full opacity-50 blur-3xl mix-blend-screen dark:mix-blend-screen"
        style={{
          x: cx,
          y: cy,
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--foreground) 22%, transparent) 0%, transparent 60%)",
        }}
      />

      {/* Drifting orbs */}
      <motion.div
        className="absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--primary) 0%, transparent 65%)",
        }}
        animate={{ x: [0, 80, -40, 0], y: [0, 60, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 -right-32 h-[40rem] w-[40rem] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--primary) 0%, transparent 65%)",
        }}
        animate={{ x: [0, -60, 40, 0], y: [0, -40, 20, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/3 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--accent) 0%, transparent 65%)",
        }}
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Noise grain */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.035] mix-blend-multiply">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  )
}
      {/* Base wash */}
      <div className="absolute inset-0 bg-background" />

      {/* Pixel / dot grid */}
      <div
        className="absolute inset-0 opacity-60 dark:opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, color-mix(in oklch, var(--foreground) 28%, transparent) 1.2px, transparent 1.2px)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse at center, black 50%, transparent 92%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, black 50%, transparent 92%)",
        }}
      />

      {/* Square pixel accents — small static squares scattered like 8-bit confetti */}
      <div className="absolute inset-0">
        {[
          { top: "12%", left: "8%", size: 6, c: "var(--primary)", o: 0.55 },
          { top: "22%", left: "82%", size: 4, c: "var(--foreground)", o: 0.35 },
          { top: "48%", left: "5%", size: 5, c: "var(--primary)", o: 0.45 },
          { top: "62%", left: "90%", size: 3, c: "var(--foreground)", o: 0.4 },
          { top: "78%", left: "14%", size: 4, c: "var(--primary)", o: 0.5 },
          { top: "34%", left: "70%", size: 3, c: "var(--accent)", o: 0.6 },
          { top: "86%", left: "60%", size: 5, c: "var(--primary)", o: 0.4 },
          { top: "8%", left: "50%", size: 3, c: "var(--foreground)", o: 0.3 },
        ].map((p, i) => (
          <motion.span
            key={i}
            className="absolute"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              backgroundColor: p.c,
              opacity: p.o,
            }}
            animate={{ opacity: [p.o, p.o * 0.3, p.o], scale: [1, 1.3, 1] }}
            transition={{
              duration: 4 + (i % 4),
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      {/* Drifting orbs */}
      <motion.div
        className="absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--primary) 0%, transparent 65%)",
        }}
        animate={{ x: [0, 80, -40, 0], y: [0, 60, 20, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-40 -right-32 h-[40rem] w-[40rem] rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--primary) 0%, transparent 65%)",
        }}
        animate={{ x: [0, -60, 40, 0], y: [0, -40, 20, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/3 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, var(--accent) 0%, transparent 65%)",
        }}
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -50, 30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Noise grain */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.035] mix-blend-multiply">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  )
}
