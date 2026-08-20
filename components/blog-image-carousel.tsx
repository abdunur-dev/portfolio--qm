"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function BlogImageCarousel({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0)
  if (images.length === 0) return null
  const next = () => setActive((index) => (index + 1) % images.length)
  const previous = () => setActive((index) => (index - 1 + images.length) % images.length)

  return (
    <section className="mt-10" aria-label={`${title} image gallery`}>
      <div className="relative overflow-hidden rounded-2xl border border-border/60 bg-secondary/20">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[active]}
          alt={`${title} image ${active + 1} of ${images.length}`}
          className="aspect-[16/10] w-full object-cover"
        />
        {images.length > 1 && (
          <>
            <button type="button" onClick={previous} aria-label="Previous image" className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-border/60 bg-background/85 p-2 text-foreground shadow-sm backdrop-blur transition hover:bg-background">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button type="button" onClick={next} aria-label="Next image" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-border/60 bg-background/85 p-2 text-foreground shadow-sm backdrop-blur transition hover:bg-background">
              <ChevronRight className="h-4 w-4" />
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="mt-3 flex items-center justify-center gap-1.5" aria-label="Choose gallery image">
          {images.map((image, index) => (
            <button key={`${image}-${index}`} type="button" onClick={() => setActive(index)} aria-label={`Show image ${index + 1}`} aria-current={active === index} className={`h-1.5 rounded-full transition-all ${active === index ? "w-6 bg-foreground" : "w-1.5 bg-muted-foreground/40"}`} />
          ))}
        </div>
      )}
    </section>
  )
}
