import type { Metadata } from "next"
import Image from "next/image"
import { SiteNav } from "@/components/site-nav"
import { AnimatedHeading } from "@/components/animated-heading"
import { FadeUp } from "@/components/fade-up"
import { FloatingSparkle } from "@/components/floating-sparkle"
import { AuroraBackground } from "@/components/aurora-background"

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

        <main className="mx-auto w-full max-w-3xl px-6 pb-24 pt-12">
          <FadeUp>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              about
            </p>
          </FadeUp>

          <FadeUp delay={0.05}>
            <AnimatedHeading
              text="Hii, I'm Burhan_"
              accentLast
              className="mt-3 text-6xl sm:text-7xl"
            />
          </FadeUp>

          <FadeUp delay={0.15}>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-foreground/80">
              Welcome to my little corner of the internet
              <span className="font-serif italic text-primary"> ✦</span>
            </p>
          </FadeUp>

          <FadeUp delay={0.25}>
            <figure className="mt-10 overflow-hidden rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm">
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src="/images/burhan-portrait.jpg"
                  alt="Burhan presenting at the v0 IRL event in Addis Ababa"
                  fill
                  sizes="(min-width: 768px) 720px, 100vw"
                  className="object-cover grayscale"
                />
              </div>
            </figure>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="prose-bio mt-12 space-y-6 text-pretty text-base leading-relaxed text-foreground/85">
              <p>
                I&apos;m a{" "}
                <span className="font-serif italic text-primary">
                  Web3 &amp; full-stack developer
                </span>{" "}
                and builder at heart. I spend most of my days crafting
                decentralized applications and modern web experiences —
                shipping smart contracts, dApps, and the occasional whimsical
                side quest from{" "}
                <span className="border-b border-dashed border-foreground/30 pb-px">
                  Addis Ababa
                </span>
                .
              </p>

              <p>
                My stack lives mostly in TypeScript and Solidity. I work across
                Next.js, React, Ethers.js, and OnchainKit, and I&apos;ve shipped
                projects on Base and Scroll — from{" "}
                <span className="font-serif italic">TibebChain</span>, an NFT
                publishing platform for African creators, to{" "}
                <span className="font-serif italic">VibeVerse</span>, a 3D NFT
                marketplace, and{" "}
                <span className="font-serif italic">GuardHer AI</span>, a
                safety tool that filters harmful content online.
              </p>

              <p>
                Before Web3 swallowed me whole, I was a self-taught developer
                exploring frontend during the lockdown years — long nights
                following tutorials, tiny experiments, and a slow slide into
                full-stack. The rest is history.
              </p>

              <p>
                Most recently I&apos;ve been speaking and organizing at{" "}
                <span className="font-serif italic">v0 IRL</span> events in
                Ethiopia, mentoring new builders, and pushing local Web3
                community forward. You&apos;ll find me at meetups around Addis,
                in Discord servers debugging contracts at 2am, or quietly
                shipping side projects on weekends.
              </p>

              <p>
                I&apos;m a collector of curiosities — I love tinkering with
                small experiments, reading sci-fi, sketching UI ideas in my
                notebook, and brewing way too much coffee. When I&apos;m not at
                the keyboard, I&apos;m probably out walking the city, watching
                football, or arguing with friends about which L2 will actually
                win.
              </p>

              <p className="font-serif text-lg italic text-foreground">
                Building the future of Web3, one block at a time
                <span className="text-primary">.</span>
              </p>
            </div>
          </FadeUp>

          <FadeUp delay={0.4}>
            <div className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border/60 bg-border/60 sm:grid-cols-4">
              {[
                { k: "based in", v: "Addis Ababa" },
                { k: "stack", v: "TS · Solidity" },
                { k: "shipping", v: "Web3 + AI" },
                { k: "status", v: "open to work" },
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
            </div>
          </FadeUp>

          <FadeUp delay={0.5}>
            <p className="mt-14 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              find me elsewhere
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[
                { label: "GitHub", handle: "@burhan", href: "https://github.com" },
                { label: "Twitter", handle: "@burhan_", href: "https://x.com" },
                { label: "LinkedIn", handle: "in/burhan", href: "https://linkedin.com" },
                { label: "Email", handle: "say hi", href: "mailto:hi@burhan.dev" },
              ].map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex h-full items-center justify-between rounded-xl border border-border/60 bg-card/40 px-4 py-3 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:bg-card/70"
                  >
                    <span className="flex flex-col">
                      <span className="font-serif text-base text-foreground transition-colors group-hover:text-primary">
                        {l.label}
                      </span>
                      <span className="font-mono text-[10px] text-muted-foreground">
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

          <FloatingSparkle className="mt-14" />
        </main>
      </div>
    </div>
  )
}
