import Image from "next/image"
import Link from "next/link"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { AuroraBackground } from "@/components/aurora-background"
import { AnimatedHeading } from "@/components/animated-heading"
import { FadeUp } from "@/components/fade-up"
import { FloatingSparkle } from "@/components/floating-sparkle"
import { socialLinks } from "@/lib/social-links"

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <AuroraBackground />
      <div className="relative z-10">
        <SiteNav />
        <main id="main" className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-6 sm:py-12">
          <div className="grid items-start gap-10 md:grid-cols-[1fr_280px] md:gap-12 lg:grid-cols-[1fr_320px]">
            <div>
              <AnimatedHeading
                text="Hi, I'm Abdurhaman_"
                className="text-5xl sm:text-6xl md:text-7xl"
              />

              <FadeUp delay={0.4}>
                <p className="mt-6 max-w-xl text-pretty text-[1.05rem] leading-[1.7] text-foreground/80">
                  <span className="font-serif italic text-primary">⋆.˚ ☾⭒</span>{" "}
                  Just another curious human being, living in{" "}
                  <span className="italic">Addis Ababa, Ethiopia</span>.
                  Welcome to my space on the internet where I convert my
                  thoughts into pixels™ — pull up a chair, the coffee&apos;s
                  on me. I tinker with{" "}
                  <span className="italic">decentralised apps</span>, ship
                  modern web experiences, and occasionally write about the
                  quiet places where design, code, and faith overlap. I build
                  across multiple chains —{" "}
                  <span className="italic">Ethereum, Solana, Base, and beyond</span>
                  {" "}— and help organize{" "}
                  <span className="italic">v0 IRL</span> meetups for the
                  local builder community
                  <FloatingSparkle className="ml-2 inline-block" />
                </p>
              </FadeUp>

              <FadeUp delay={0.45}>
                <p className="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-muted-foreground">
                  Since <span className="italic text-foreground/80">2020</span>,
                  I&apos;ve shipped projects across{" "}
                  <span className="italic text-foreground/80">
                    Web3, Design, and Community
                  </span>
                  . You&apos;re visitor{" "}
                  <span className="font-mono text-xs tracking-wider text-foreground/80">
                    #00,142
                  </span>
                  .
                </p>
              </FadeUp>
            </div>

            <FadeUp delay={0.5}>
              <figure className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm md:sticky md:top-24">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src="/images/burhan-portrait.jpg"
                    alt="Abdurhaman, full-stack and Web3 developer based in Addis Ababa"
                    fill
                    priority
                    sizes="(min-width: 1024px) 320px, (min-width: 768px) 280px, 100vw"
                    className="object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                </div>
              </figure>
            </FadeUp>
          </div>

          <FadeUp delay={0.55}>
            <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              ⤏ find me elsewhere
            </p>
            <ul className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {socialLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex h-full items-center justify-between gap-3 rounded-xl border border-border/60 bg-card/40 px-4 py-3 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:bg-card/70"
                  >
                    <span className="font-serif text-base text-foreground transition-colors group-hover:text-primary">
                      {l.label}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </FadeUp>

          <FadeUp delay={0.6}>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              <Link
                href="/all"
                className="group flex items-center justify-between rounded-xl border border-border/60 bg-card/40 px-5 py-4 backdrop-blur-sm transition-colors hover:border-primary/60 hover:bg-card/70"
              >
                <span>
                  <span className="block font-serif text-xl text-foreground">
                    projects
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    everything I&apos;ve shipped
                  </span>
                </span>
                <span className="font-mono text-sm text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary">
                  →
                </span>
              </Link>
              <Link
                href="/writing"
                className="group flex items-center justify-between rounded-xl border border-border/60 bg-card/40 px-5 py-4 backdrop-blur-sm transition-colors hover:border-primary/60 hover:bg-card/70"
              >
                <span>
                  <span className="block font-serif text-xl text-foreground">
                    writing
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    notes & essays
                  </span>
                </span>
                <span className="font-mono text-sm text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary">
                  →
                </span>
              </Link>
              <Link
                href="/now"
                className="group flex items-center justify-between rounded-xl border border-border/60 bg-card/40 px-5 py-4 backdrop-blur-sm transition-colors hover:border-primary/60 hover:bg-card/70 sm:col-span-2"
              >
                <span>
                  <span className="block font-serif text-xl text-foreground">
                    now
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    what I&apos;m up to this season
                  </span>
                </span>
                <span className="font-mono text-sm text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary">
                  →
                </span>
              </Link>
            </div>
          </FadeUp>
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}
