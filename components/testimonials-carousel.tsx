'use client'

import * as React from 'react'
import { Star } from 'lucide-react'
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
  rating: number
  avatar: string
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    author: 'Sarah Chen',
    role: 'Product Lead @ TechCorp',
    content:
      'Abdurhaman delivered an exceptional Web3 solution that exceeded our expectations. His attention to detail and deep understanding of blockchain architecture made all the difference.',
    rating: 5,
    avatar: 'SC',
  },
  {
    id: '2',
    author: 'Marcus Johnson',
    role: 'CEO @ StartupXYZ',
    content:
      'Working with Abdurhaman was a game-changer for our startup. He not only built the product but also mentored our team on best practices. Highly recommend!',
    rating: 5,
    avatar: 'MJ',
  },
  {
    id: '3',
    author: 'Elena Rodriguez',
    role: 'Design Director @ Design Studio',
    content:
      'Rare to find a developer who understands design so deeply. The collaboration was seamless, and the final product was beautiful and performant.',
    rating: 5,
    avatar: 'ER',
  },
  {
    id: '4',
    author: 'James Wilson',
    role: 'CTO @ FinanceApp',
    content:
      'Abdurhaman solved complex technical challenges we thought were impossible. His problem-solving skills and communication are top-notch.',
    rating: 5,
    avatar: 'JW',
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
                  <div className="h-full rounded-xl border border-border/60 bg-card/40 p-6 backdrop-blur-sm transition-all hover:border-primary/60 hover:bg-card/70">
                    {/* Rating stars */}
                    <div className="flex gap-1">
                      {Array.from({ length: testimonial.rating }).map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-primary text-primary"
                          />
                        ),
                      )}
                    </div>

                    {/* Testimonial text */}
                    <p className="mt-4 text-sm leading-relaxed text-foreground/85">
                      "{testimonial.content}"
                    </p>

                    {/* Author with avatar */}
                    <div className="mt-6 flex items-center gap-3 border-t border-border/40 pt-4">
                      {/* Avatar */}
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border/60 bg-secondary/60 font-mono font-semibold text-foreground">
                        {testimonial.avatar}
                      </div>
                      {/* Author info */}
                      <div>
                        <p className="font-serif font-semibold text-foreground">
                          {testimonial.author}
                        </p>
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
