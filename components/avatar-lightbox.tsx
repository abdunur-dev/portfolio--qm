"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X } from "lucide-react"

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

  // Close on Escape key press
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    // Prevent background scrolling while open
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
        className="group relative cursor-zoom-in rounded-sm transition-transform active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <Image
          src={src}
          alt={alt}
          width={size}
          height={size}
          priority
          className={`shrink-0 transition-opacity group-hover:opacity-90 ${className}`}
        />
        <span className="sr-only">Click to enlarge</span>
      </button>

      {/* Animated Lightbox Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md animate-in fade-in duration-200"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setIsOpen(false)
            }}
            aria-label="Close photo"
            className="absolute right-4 top-4 z-50 flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white/90 shadow-lg backdrop-blur transition hover:bg-black/90 hover:text-white"
          >
            <X className="size-5" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[88vh] max-w-[88vw] flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-card p-2 shadow-2xl animate-in zoom-in-95 duration-200"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              className="max-h-[82vh] max-w-[85vw] rounded-xl object-contain sm:max-h-[75vh]"
            />
            <div className="mt-3 flex w-full items-center justify-between px-2 pb-1 font-mono text-xs text-muted-foreground">
              <span className="truncate">{alt}</span>
              <span className="shrink-0 text-muted-foreground/60">Press Esc or tap outside</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
