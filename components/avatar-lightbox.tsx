"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, ZoomIn } from "lucide-react"

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

  // Close on Escape key press and lock background scroll
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      window.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = ""
    }
  }, [isOpen])

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
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-sm bg-black/30 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <ZoomIn className="size-4 text-white drop-shadow" />
        </span>
      </button>

      {/* Smooth Animated Zoom Lightbox */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md transition-all duration-300 animate-in fade-in"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setIsOpen(false)
            }}
            aria-label="Close photo"
            className="absolute right-4 top-4 z-50 flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white shadow-xl backdrop-blur transition-transform hover:scale-110 active:scale-95 hover:bg-black/90"
          >
            <X className="size-5" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-card/40 p-2 shadow-2xl backdrop-blur transition-all duration-300 animate-in zoom-in-75 sm:zoom-in-90"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="max-h-[80vh] max-w-[85vw] rounded-xl object-contain shadow-2xl transition-transform duration-300 sm:max-h-[75vh]"
            />
            <div className="mt-3 flex w-full items-center justify-between px-2 font-mono text-xs text-muted-foreground">
              <span className="font-serif italic text-foreground">{alt}</span>
              <span className="text-muted-foreground/60">Press Esc to close</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
