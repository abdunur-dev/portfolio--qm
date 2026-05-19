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
        <main className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-6 sm:py-12">
          <AnimatedHeading
            text="Hi, I'm Burhan_"
            className="text-5xl sm:text-6xl md:text-7xl"
          />

          <FadeUp delay={0.4}>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-foreground/75">
              <span className="font-serif italic text-primary">⋆.˚ ☾⭒</span>{" "}
              welcome to my little corner of the internet — pull up a chair,
              the coffee&apos;s on me. I tinker with{" "}
              <span className="font-serif italic">decentralised apps</span>,
              ship modern web experiences, and occasionally write about the
              quiet places where design, code, and faith overlap
              <FloatingSparkle className="ml-2 inline-block" />
            </p>
          </FadeUp>

          <FadeUp delay={0.5}>
            <figure className="mt-10 overflow-hidden rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/burhan-portrait.jpg"
                  alt="Burhan presenting at the v0 IRL event in Addis Ababa"
                  fill
                  priority
                  sizes="(min-width: 768px) 720px, 100vw"
                  className="object-cover grayscale"
                />
              </div>
            </figure>
          </FadeUp>

          <FadeUp delay={0.55}>
            <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              find me elsewhere
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
                    <span className="flex min-w-0 flex-col">
                      <span className="font-serif text-base text-foreground transition-colors group-hover:text-primary">
                        {l.label}
                      </span>
                      <span className="truncate font-mono text-[10px] text-muted-foreground">
                        {l.handle}
                      </span>
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
