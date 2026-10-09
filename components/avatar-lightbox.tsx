"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { X, ZoomIn } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"

type AvatarLightboxProps = {
  src: string
  alt: string
  size?: number
  className?: string
}

export function AvatarLightbox({
  src,
  alt,
  size = 56,
  className = "size-14 rounded-sm object-cover",
}: AvatarLightboxProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  // Close on Escape key press and lock background scroll
  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      window.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = originalOverflow
    }
  }, [isOpen, handleClose])

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label={`Open enlarged photo of ${alt}`}
        className="group relative cursor-zoom-in rounded-sm transition-transform duration-200 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          priority
          className={`shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:ring-2 group-hover:ring-primary/40 ${className}`}
        />
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-sm bg-black/35 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <ZoomIn className="size-4 text-white drop-shadow" />
        </span>
      </button>

      {/* Smooth Spring-Animated Zoom In & Out Lightbox */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="lightbox-overlay"
            role="dialog"
            aria-modal="true"
            aria-label={alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={handleClose}
            className="fixed inset-0 z-50 flex items-center justify-center cursor-zoom-out bg-black/80 p-4 sm:p-6 backdrop-blur-md select-none"
          >
            {/* Close button top right */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close photo"
              className="absolute right-4 top-4 sm:right-6 sm:top-6 z-50 flex size-9 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white/80 shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-black/80 hover:text-white active:scale-95"
            >
              <X className="size-4.5" />
            </button>

            {/* Centered preview modal with desktop-proportional bounds and smooth spring zoom */}
            <motion.div
              key="lightbox-card"
              initial={{ scale: 0.88, opacity: 0, y: 8 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 8 }}
              transition={{
                type: "spring",
                stiffness: 340,
                damping: 28,
                mass: 0.8,
              }}
              className="relative flex w-full max-w-[340px] sm:max-w-[400px] md:max-w-[430px] flex-col items-center overflow-hidden rounded-2xl border border-white/15 bg-[#0b0d10]/95 p-2.5 shadow-2xl backdrop-blur-xl"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt}
                className="w-full max-h-[70vh] rounded-xl object-cover object-top shadow-md"
              />

              {/* Minimal caption and dismiss hint */}
              <div className="mt-3 flex w-full items-center justify-between px-2 font-mono text-xs text-white/50">
                <span className="font-serif italic text-white/90 text-sm">{alt}</span>
                <span className="text-[11px] text-white/40">Click anywhere to close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
