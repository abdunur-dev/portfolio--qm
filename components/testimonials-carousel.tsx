'use client'

import React from 'react'
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'
import { FadeUp } from '@/components/fade-up'
import Autoplay from 'embla-carousel-autoplay'

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
  const plugin = React.useRef(
    Autoplay({ delay: 6000, stopOnInteraction: true })
  )

  return (
    <FadeUp delay={0.65}>
      <div className="mt-20 border-t border-border/60 pt-16">
        <div className="mb-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-2">
            testimonials
          </p>
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground">
            What people are saying
          </h2>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative mx-auto overflow-hidden">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
              duration: 60,
              skipSnaps: false,
            }}
            plugins={[plugin.current]}
            className="w-full"
          >
            <CarouselContent className="-ml-4 transition-transform duration-700 ease-out">
              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={testimonial.id}
                  className="pl-4 basis-full sm:basis-1/2 transition-all duration-700 ease-out"
                >
                  <div className="group relative rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/60 hover:bg-card/70 hover:shadow-lg shadow-md h-full hover:-translate-y-1">
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
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation buttons */}
            <div className="mt-6 flex justify-center gap-6">
              <CarouselPrevious className="relative top-0 left-0 h-11 w-11 translate-x-0 translate-y-0 border border-border/60 bg-card/40 text-foreground transition-all duration-200 hover:bg-primary hover:text-background hover:border-primary hover:shadow-md" />
              <CarouselNext className="relative top-0 left-0 h-11 w-11 translate-x-0 translate-y-0 border border-border/60 bg-card/40 text-foreground transition-all duration-200 hover:bg-primary hover:text-background hover:border-primary hover:shadow-md" />
            </div>
          </Carousel>
        </div>
      </div>
    </FadeUp>
  )
}
