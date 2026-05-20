import type { Metadata } from "next"
import Image from "next/image"
import { SiteNav } from "@/components/site-nav"
import { FadeUp } from "@/components/fade-up"
import { AuroraBackground } from "@/components/aurora-background"
import { SiteFooter } from "@/components/site-footer"
import { socialLinks } from "@/lib/social-links"

export const metadata: Metadata = {
  title: "About · Burhan_",
  description:
    "Web3 & full-stack developer building decentralized apps and modern web experiences from Addis Ababa.",
}

export default function AboutPage() {
  return (
    <div className="relative min-h-screen">
      <AuroraBackground />
      <div className="relative z-10">
        <SiteNav />

        <main id="main" className="mx-auto w-full max-w-4xl px-5 pb-20 pt-8 sm:px-6 sm:pb-24 sm:pt-12">
          {/* Image first, About text underneath — Maya-style */}
          <FadeUp>
            <figure className="overflow-hidden rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm">
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

          <FadeUp delay={0.1}>
            <p className="mt-12 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              about
            </p>
            <h1 className="mt-3 font-serif text-5xl leading-[0.95] tracking-tight text-foreground sm:text-6xl md:text-7xl">
              Burhan<span className="text-primary">.</span>
            </h1>
            <span className="mt-5 inline-block rounded-full border border-primary/40 bg-primary/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">
              Web3 / Full-Stack Developer
            </span>
          </FadeUp>

          {/* Intro */}
          <FadeUp delay={0.2}>
            <div className="mt-12 space-y-6 text-pretty text-base leading-relaxed text-foreground/85">
              <p>
                Hello! My name is{" "}
                <span className="font-serif italic">Burhan</span> and I enjoy
                creating tech solutions to my daily problems. My interest in
                software development started back in 2020 — late nights during
                lockdown, a Udemy tutorial I almost closed three times, and the
                quiet realization that there&apos;s so much you can build with
                nothing but a text editor and a stubborn curiosity
                <span className="font-serif italic text-primary"> ⋆.˚ ☾⭒</span>
              </p>
              <p>
                Fast-forward to today, and I&apos;ve had the privilege of
                working with{" "}
                <span className="font-serif italic">small startups</span>,
                community-led{" "}
                <span className="font-serif italic">campus clubs</span>, freelance
                clients across Web3 and SaaS, and{" "}
                <span className="font-serif italic">v0 IRL</span> — the local
                builder community I help organize here in Addis Ababa. My main
                focus these days is shipping{" "}
                <span className="font-serif italic">
                  modern, minimal and powerful products
                </span>{" "}
                — decentralized apps on{" "}
                <span className="font-serif italic">Base</span> and{" "}
                <span className="font-serif italic">Scroll</span>, design
                systems, and digital experiences for the world to explore
                <span className="font-serif italic text-primary"> .✦ ݁˖</span>
              </p>
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
                I&apos;m a collector of curiosities. I love tinkering with side
                projects and small web experiments — half-finished prototypes,
                weekend dApps, weird little tools that nobody asked for. The
                joy is in the building.
              </p>
              <p>
                When I&apos;m not at the keyboard, I&apos;m usually walking the
                streets of{" "}
                <span className="border-b border-dashed border-foreground/40 pb-px">
                  Addis Ababa
                </span>
                , watching football, sketching UI ideas in a notebook, and
                drinking way more coffee than I should. I also dabble in
                community organizing, mentoring new builders, and dragging my
                friends into Web3 rabbit holes at 2am.
              </p>
            </div>
          </FadeUp>

          <hr className="my-14 border-border/50" />

          {/* Currently building */}
          <FadeUp delay={0.05}>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Currently building
            </p>
            <ul className="mt-5 space-y-3">
              {[
                {
                  name: "TibebChain",
                  desc: "an NFT publishing platform for African creators",
                  href: "https://tibebchain.com",
                },
                {
                  name: "VibeVerse",
                  desc: "a 3D NFT marketplace",
                  href: "https://vibeverse.app",
                },
                {
                  name: "GuardHer AI",
                  desc: "an AI safety tool that filters harmful content",
                  href: "https://guardher.ai",
                },
              ].map((p) => (
                <li
                  key={p.name}
                  className="flex flex-wrap items-baseline gap-x-3 gap-y-1"
                >
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-baseline gap-1 font-serif text-lg text-foreground transition-colors hover:text-primary"
                  >
                    <span>{p.name}</span>
                    <span className="font-mono text-xs text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary">
                      ↗
                    </span>
                  </a>
                  <span className="text-sm text-foreground/70">{p.desc}</span>
                </li>
              ))}
            </ul>
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
