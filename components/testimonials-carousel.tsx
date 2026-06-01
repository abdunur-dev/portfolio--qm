'use client'

import * as React from 'react'
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
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    author: 'Guillermo Rauch',
    role: 'CEO @ Vercel',
    content: 'awesome. Love the components, especially slide-to-unlock. Great job',
    avatar: '/avatars/guillermo.png',
    verified: true,
  },
  {
    id: '2',
    author: 'shacdn',
    role: 'Creator of shadcn/ui',
    content: "You're doing amazing work.",
    avatar: '/avatars/shacdn.png',
    verified: true,
  },
  {
    id: '3',
    author: 'khushi.vy',
    role: 'Software Engineer',
    content: 'Goated portfolio. I love the whole UI in Vercel style',
    avatar: '/avatars/khushi.png',
    verified: true,
  },
  {
    id: '4',
    author: 'Megh',
    role: 'Creator of patterns.dev',
    content: 'The best looking website @iamncdai portfolio!',
    avatar: '/avatars/megh.png',
    verified: true,
  },
  {
    id: '5',
    author: 'jordwalke',
    role: 'Creator of React',
    content: 'Also, cool wheel picker!',
    avatar: '/avatars/jordwalke.png',
    verified: true,
  },
]

export function TestimonialsCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  return (
    <FadeUp delay={0.65}>
      <div className="mt-16 border-t border-border/60 pt-16">
        <div className="mb-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            ⋆ what people say
          </p>
          <h2 className="mt-4 font-serif text-2xl text-foreground sm:text-3xl">
            Testimonials
          </h2>
        </div>

        <div className="relative mx-auto">
          <Carousel
            opts={{
              align: 'start',
              loop: true,
            }}
            plugins={[plugin.current]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={testimonial.id}
                  className="pl-4 basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <div className="h-full rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm transition-all hover:border-primary/60 hover:bg-card/70 hover:shadow-lg shadow-md">
                    {/* Testimonial text */}
                    <p className="text-sm leading-relaxed text-foreground/85">
                      "{testimonial.content}"
                    </p>

                    {/* Author with avatar */}
                    <div className="mt-6 flex items-center gap-3 border-t border-border/40 pt-4">
                      {/* Avatar image */}
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-border/60 bg-secondary/60">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.author}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      </div>
                      {/* Author info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-1.5">
                          <p className="font-serif font-semibold text-foreground">
                            {testimonial.author}
                          </p>
                          {testimonial.verified && (
                            <span className="text-xs text-primary">✓</span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation buttons */}
            <div className="mt-6 flex justify-center gap-4">
              <CarouselPrevious className="relative top-0 left-0 translate-x-0 translate-y-0 border-border/60 bg-card/40 hover:bg-card/70" />
              <CarouselNext className="relative top-0 left-0 translate-x-0 translate-y-0 border-border/60 bg-card/40 hover:bg-card/70" />
            </div>
          </Carousel>
        </div>
      </div>
    </FadeUp>
  )
}
