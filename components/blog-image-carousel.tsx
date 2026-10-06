"use client"

import { useState, useRef, type TouchEvent } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function BlogImageCarousel({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

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
    <section className="mt-8 select-none" aria-label={`${title} image gallery`}>
      <div
        className="group relative aspect-[16/9] w-full overflow-hidden rounded-md border border-border/60 bg-muted/20 touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Images sliding track */}
        <div
          className="flex h-full w-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {images.map((src, i) => (
            <div
              key={src + i}
              className="relative h-full w-full min-w-full shrink-0"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`${title} photo ${i + 1} of ${images.length}`}
                className="h-full w-full object-cover object-center"
                loading="eager"
                draggable={false}
              />
            </div>
          ))}
        </div>

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
  )
}
