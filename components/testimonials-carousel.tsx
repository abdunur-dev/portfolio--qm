"use client"

import { useEffect, useState } from "react"

interface Testimonial {
  id: string
  author: string
  role: string
  content: string
  avatar: string
  verified?: boolean
  company?: string
  image?: string
  link?: string
}

/**
 * Testimonials list ("Kind words.") — fetched from /api/testimonials and
 * rendered as quiet quote blocks in the hugorcd.com-inspired style.
 */
export function TestimonialsCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("/api/testimonials")
        if (response.ok) {
          const data = await response.json()
          setTestimonials(Array.isArray(data) ? data : [])
        }
      } catch (error) {
        console.error("Failed to fetch testimonials:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchTestimonials()
  }, [])

  if (!loading && testimonials.length === 0) return null

  return (
    <section className="flex flex-col gap-6">
      <h3 className="font-serif text-lg italic text-highlighted">
        Kind words<span className="text-primary">.</span>
      </h3>

      {loading ? (
        <p className="text-sm text-muted-foreground/60">Loading…</p>
      ) : (
        <ul className="flex flex-col gap-8">
          {testimonials.map((t, i) => (
            <li key={t.id} className="folio-in flex flex-col gap-3" style={{ animationDelay: `${i * 40}ms` }}>
              <blockquote className="border-l-2 border-primary/70 pl-4 text-pretty text-sm/6 text-foreground">
                &ldquo;{t.content}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3 pl-4">
                {t.avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={t.avatar} alt="" className="size-7 rounded-sm object-cover" />
                ) : (
                  <span className="flex size-7 items-center justify-center rounded-sm bg-muted font-serif text-sm text-muted-foreground">
                    {(t.author || "?").charAt(0).toUpperCase()}
                  </span>
                )}
                <div className="min-w-0 text-sm">
                  {t.link ? (
                    <a
                      href={t.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-highlighted decoration-primary underline-offset-4 hover:underline"
                    >
                      {t.author}
                    </a>
                  ) : (
                    <span className="font-medium text-highlighted">{t.author}</span>
                  )}
                  {t.verified && <span className="ml-1 text-xs text-primary">✓</span>}
                  <span className="ml-2 text-muted-foreground/70">{t.role || t.company}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
