import Image from "next/image"
import Link from "next/link"
import { SiteNav } from "@/components/site-nav"
import { AuroraBackground } from "@/components/aurora-background"
import { AnimatedHeading } from "@/components/animated-heading"
import { FadeUp } from "@/components/fade-up"
import { FloatingSparkle } from "@/components/floating-sparkle"

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <AuroraBackground />
      <div className="relative z-10">
        <SiteNav />
        <main className="mx-auto w-full max-w-3xl px-6 py-12">
          <AnimatedHeading
            text="hi, I'm Burhan_"
            className="text-6xl sm:text-7xl"
          />

          <FadeUp delay={0.4}>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-foreground/75">
              web3 & full-stack developer crafting decentralised applications
              and modern web experiences. occasionally writing about the
              intersection of design, code, and faith
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
            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border/60 bg-border/60 sm:grid-cols-4">
              {[
                { k: "based in", v: "Addis Ababa" },
                { k: "stack", v: "TS · Solidity" },
                { k: "shipping", v: "Web3 + AI" },
                { k: "status", v: "open to collab" },
              ].map((s) => (
                <div
                  key={s.k}
                  className="bg-card/60 px-4 py-3 backdrop-blur-sm"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    {s.k}
                  </dt>
                  <dd className="mt-1 font-serif text-sm text-foreground">
                    {s.v}
                  </dd>
                </div>
              ))}
            </dl>
          </FadeUp>

          <FadeUp delay={0.58}>
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              elsewhere
            </p>
            <ul className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              {[
                { label: "GitHub", href: "https://github.com" },
                { label: "X / Twitter", href: "https://x.com" },
                { label: "LinkedIn", href: "https://linkedin.com" },
                { label: "Email", href: "mailto:hi@burhan.dev" },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-baseline gap-1 text-foreground/80 transition-colors hover:text-primary"
                  >
                    <span className="border-b border-dashed border-foreground/30 pb-px group-hover:border-primary">
                      {l.label}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary">
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
      </div>
    </div>
  )
}
