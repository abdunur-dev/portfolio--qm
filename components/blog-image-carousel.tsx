"use client"

import { useState, useRef, useEffect, type TouchEvent } from "react"
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react"

export function BlogImageCarousel({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  // Lightbox keyboard and scroll lock
  useEffect(() => {
    if (!lightboxOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false)
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % images.length)
      if (e.key === "ArrowLeft") setActive((i) => (i - 1 + images.length) % images.length)
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [lightboxOpen, images.length])

  if (images.length === 0) return null

  const next = () => setActive((index) => (index + 1) % images.length)
  const previous = () => setActive((index) => (index - 1 + images.length) % images.length)

  // Touch swipe support for mobile
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchEndX.current = null
  }

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return
    const diff = touchStartX.current - touchEndX.current
    const threshold = 35 // swipe distance threshold

    if (diff > threshold) {
      next()
    } else if (diff < -threshold) {
      previous()
    }

    touchStartX.current = null
    touchEndX.current = null
  }

  return (
    <>
      <section className="mt-8 select-none" aria-label={`${title} image gallery`}>
        <div
          className="group relative overflow-hidden rounded-2xl border border-border/60 bg-muted/20 touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Images sliding track - Natural 4/3 ratio for Raycast photos */}
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${active * 100}%)` }}
          >
            {images.map((src, i) => (
              <div
                key={src + i}
                onClick={() => setLightboxOpen(true)}
                className="relative aspect-[4/3] min-w-full shrink-0 cursor-zoom-in sm:aspect-[16/10]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt={`${title} photo ${i + 1} of ${images.length}`}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                  loading="eager"
                  draggable={false}
                />
              </div>
            ))}
          </div>

          {/* Zoom button hint */}
          <button
            type="button"
            onClick={() => setLightboxOpen(true)}
            aria-label="View photo fullscreen"
            className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-full border border-border/80 bg-background/80 text-foreground/80 opacity-0 backdrop-blur transition group-hover:opacity-100 hover:bg-background hover:text-foreground"
          >
            <Maximize2 className="size-3.5" />
          </button>

          {images.length > 1 && (
            <>
              {/* Prev button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  previous()
                }}
                aria-label="Previous image"
                className="absolute left-2.5 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-border/80 bg-background/85 text-foreground shadow-md backdrop-blur transition active:scale-90 hover:bg-background sm:size-8 sm:opacity-0 sm:group-hover:opacity-100"
              >
                <ChevronLeft className="size-4" />
              </button>

              {/* Next button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  next()
                }}
                aria-label="Next image"
                className="absolute right-2.5 top-1/2 z-10 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-border/80 bg-background/85 text-foreground shadow-md backdrop-blur transition active:scale-90 hover:bg-background sm:size-8 sm:opacity-0 sm:group-hover:opacity-100"
              >
                <ChevronRight className="size-4" />
              </button>

              {/* Mobile badge indicator */}
              <div className="absolute bottom-2.5 right-2.5 z-10 rounded-full border border-border/60 bg-background/85 px-2 py-0.5 font-mono text-[11px] text-muted-foreground backdrop-blur">
                {active + 1} / {images.length}
              </div>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="mt-3 flex items-center justify-center gap-1.5" aria-label="Choose gallery image">
            {images.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show image ${index + 1}`}
                aria-current={active === index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  active === index ? "w-6 bg-foreground" : "w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground/70"
                }`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Fullscreen Lightbox Modal with zoom and touch swipe */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} photo preview`}
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 backdrop-blur-md animate-in fade-in duration-200"
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close fullscreen view"
            className="absolute right-4 top-4 z-50 flex size-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white shadow-lg backdrop-blur transition hover:bg-black/90"
          >
            <X className="size-5" />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  previous()
                }}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 z-50 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white shadow-lg backdrop-blur transition hover:bg-black/90 active:scale-95"
              >
                <ChevronLeft className="size-6" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  next()
                }}
                aria-label="Next image"
                className="absolute right-4 top-1/2 z-50 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white shadow-lg backdrop-blur transition hover:bg-black/90 active:scale-95"
              >
                <ChevronRight className="size-6" />
              </button>
            </>
          )}

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[92vh] max-w-[94vw] flex-col items-center justify-center overflow-hidden rounded-xl animate-in zoom-in-95 duration-200"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={images[active]}
              alt={`${title} photo ${active + 1}`}
              className="max-h-[85vh] max-w-[92vw] rounded-lg object-contain shadow-2xl"
            />
            <div className="mt-2.5 flex w-full items-center justify-between px-2 font-mono text-xs text-white/70">
              <span className="truncate">{title}</span>
              <span>
                {active + 1} / {images.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
