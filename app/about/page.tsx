import type { Metadata } from "next"
import Image from "next/image"
import { SiteNav } from "@/components/site-nav"
import { FadeUp } from "@/components/fade-up"
import { SiteFooter } from "@/components/site-footer"
import { socialLinks } from "@/lib/social-links"

export const metadata: Metadata = {
  title: "About · Abdurhaman_",
  description:
    "Web3 & full-stack developer building decentralized apps and modern web experiences from Addis Ababa.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#08090b] text-[#f4f1eb]">
      <div className="relative z-10">
        <SiteNav />

        <main id="main" className="mx-auto w-full max-w-4xl px-5 pb-20 pt-8 sm:px-6 sm:pb-24 sm:pt-12">
          {/* Image first, About text underneath — Maya-style */}
          <FadeUp>
            <figure className="overflow-hidden rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/burhan-portrait.jpg"
                  alt="Abdurhaman speaking at an IRL meetup in Addis Ababa"
                  fill
                  priority
                  sizes="(min-width: 768px) 720px, 100vw"
                  className="object-cover grayscale"
                />
              </div>
            </figure>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              about
            </p>
            <h1 className="mt-3 font-serif text-5xl leading-[0.95] tracking-tight text-foreground sm:text-6xl md:text-7xl">
              Abdurhaman<span className="text-primary">.</span>
            </h1>
            <span className="mt-5 inline-block rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
              Full-Stack · Web3 · AI / Vibe Coder
            </span>
          </FadeUp>

          {/* Intro */}
          <FadeUp delay={0.2}>
            <div className="mt-12 space-y-6 text-pretty text-base leading-relaxed text-foreground/85">
              <p>Hey, I&apos;m Abdurhaman</p>
              <p>I&apos;m a developer, builder, and community organizer based in Addis Ababa, Ethiopia.</p>
              <p>I enjoy turning rough ideas into useful things for people. Sometimes that means building a web product from scratch. Sometimes it means experimenting with a new idea, connecting different tools and services, or helping a group of people come together and build something of their own.</p>
              <p>My journey into code started during the 2020 lockdown. I began learning through online tutorials during nights and weekends, mostly because I was curious about how the websites and products I used were made. Over time, that curiosity turned into a way of thinking and creating.</p>
              <p>Since then, I&apos;ve worked across different kinds of projects, from early-stage startups and freelance work to digital products, decentralized applications, and tools for creators. I&apos;ve always been drawn to the space between design and engineering — the part where an idea becomes something tangible that another person can actually use.</p>
              <p>Lately, I&apos;ve been exploring a faster and more intuitive way of building with AI-assisted tools. They&apos;ve made it easier to move from an idea to a prototype, but the technology is only one part of the process. What matters most to me is having good taste, understanding the people I&apos;m building for, and making something that feels simple and intentional.</p>
              <p>A big part of what I do now is connected to community. I help organize meetups and events for builders in Addis Ababa, where I get to learn from other curious people, share ideas, and create spaces where people can build together.</p>
              <p>I&apos;m also a collector of curiosities: half-finished side projects, weekend experiments, small tools, and ideas that may or may not become anything. When I&apos;m away from the keyboard, I&apos;m usually walking around Addis Ababa, watching football, sketching in a notebook, reading more books than I finish, or drinking more buna than I should.</p>
            </div>
          </FadeUp>

          <hr className="my-14 border-border/50" />

          {/* Beyond the screen */}
          <FadeUp delay={0.05}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Beyond the screen
            </p>
            <div className="mt-5 space-y-6 text-pretty text-base leading-relaxed text-foreground/85">
              <p>
                I&apos;m drawn to slow mornings, noisy evenings, and the small details that make everyday life feel intentional.
              </p>
              <p>
                I journal in spurts, mentor new builders when I can, and occasionally pull friends into late-night rabbit holes about technology, creativity, and the future.
              </p>
              <p>
                Whether it&apos;s a button, a margin, or a paragraph, I like making small things feel a little more considered than they need to be.
              </p>
            </div>
          </FadeUp>

          <hr className="my-14 border-border/50" />


          {/* Let's connect */}
          <FadeUp delay={0.05}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Let&apos;s connect
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {socialLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1.5 rounded-md border border-border/70 bg-card/40 px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-foreground/80 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary"
                  >
                    {l.label}
                    <span className="text-[10px] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </FadeUp>
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}
