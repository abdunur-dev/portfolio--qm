'use client'

import React from 'react'
import Image from 'next/image'
import { FadeUp } from '@/components/fade-up'

interface Testimonial {
  id: string
  author: string
  role: string
  content: string
  avatar: string
  verified?: boolean
  company?: string
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    author: 'Guillermo Rauch',
    role: 'CEO @ Vercel',
    content: 'awesome. Love the components, especially slide-to-unlock. Great job',
    avatar: '/avatars/guillermo.png',
    company: 'Vercel',
    verified: true,
  },
  {
    id: '2',
    author: 'shacdn',
    role: 'Creator of shadcn/ui',
    content: "You're doing amazing work.",
    avatar: '/avatars/shacdn.png',
    company: 'shadcn/ui',
    verified: true,
  },
  {
    id: '3',
    author: 'khushi.vy',
    role: 'Software Engineer',
    content: 'Goated portfolio. I love the whole UI in Vercel style',
    avatar: '/avatars/khushi.png',
    company: 'Tech',
    verified: true,
  },
  {
    id: '4',
    author: 'Megh',
    role: 'Creator of patterns.dev',
    content: 'The best looking website @iamncdai portfolio!',
    avatar: '/avatars/megh.png',
    company: 'patterns.dev',
    verified: true,
  },
  {
    id: '5',
    author: 'jordwalke',
    role: 'Creator of React',
    content: 'Also, cool wheel picker!',
    avatar: '/avatars/jordwalke.png',
    company: 'React',
    verified: true,
  },
]

export function TestimonialsCarousel() {
  return (
    <FadeUp delay={0.65}>
      <div className="mt-20 border-t border-border/60 pt-20">
        <div className="text-center mb-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-3">
            TRUSTED BY
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground">
            Used by amazing people
          </h2>
          <p className="mt-4 text-sm text-foreground/70 max-w-md mx-auto">
            Join builders and creators who trust my work
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-max">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group relative rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/60 hover:bg-card/70 hover:shadow-lg shadow-md"
            >
              {/* Quote Text */}
              <p className="text-sm leading-relaxed text-foreground/85 mb-6">
                "{testimonial.content}"
              </p>

              {/* Divider */}
              <div className="border-t border-border/40 pt-4 flex items-center gap-3">
                {/* Avatar */}
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-border/60 bg-secondary/60">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>

                {/* Author Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="font-serif font-semibold text-foreground truncate">
                      {testimonial.author}
                    </p>
                    {testimonial.verified && (
                      <span className="text-xs text-primary shrink-0">✓</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </FadeUp>
  )
}
