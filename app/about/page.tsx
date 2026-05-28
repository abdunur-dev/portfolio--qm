import type { Metadata } from "next"
import Image from "next/image"
import { SiteNav } from "@/components/site-nav"
import { FadeUp } from "@/components/fade-up"
import { AuroraBackground } from "@/components/aurora-background"
import { SiteFooter } from "@/components/site-footer"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { socialLinks } from "@/lib/social-links"

export const metadata: Metadata = {
  title: "About · Abdurhaman_",
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
              <p>
                Ey up! I&apos;m Abdurhaman{" "}
                <span className="font-serif italic text-primary">⋆.˚ ☾⭒</span>{" "}
                Welcome to my little corner of the internet
                <span className="font-serif italic text-primary"> .✦ ݁˖</span>
              </p>
              <p>
                I&apos;m a{" "}
                <span className="font-serif italic">
                  full-stack developer
                </span>{" "}
                and builder at heart — comfortable across both Web2 and Web3.
                On the Web2 side I ship{" "}
                <span className="font-serif italic">
                  modern web apps
                </span>{" "}
                with{" "}
                <span className="font-serif italic">Next.js</span>,{" "}
                <span className="font-serif italic">TypeScript</span>, and the
                usual SaaS stack — auth, dashboards, APIs, payments. On the
                Web3 side, I&apos;ve spent the last few years deep in
                decentralized apps, shipping smart contracts and dApps across
                multiple chains like{" "}
                <span className="font-serif italic">Ethereum</span>,{" "}
                <span className="font-serif italic">Solana</span>,{" "}
                <span className="font-serif italic">Base</span>, and others —
                bouncing between TypeScript, Solidity, and the messy, magical
                edges of where Web3 meets product. Most recently I&apos;ve
                been leading frontend on{" "}
                <span className="font-serif italic">TibebChain</span>, an NFT
                publishing platform for African creators. Before that I was
                tinkering across small startups, freelance gigs, and side
                quests as a{" "}
                <span className="font-serif italic">design engineer</span>.
              </p>
              <p>
                These days I lean hard into{" "}
                <span className="font-serif italic">AI-assisted</span> and{" "}
                <span className="font-serif italic">vibe coding</span> — pairing
                with tools like{" "}
                <span className="font-serif italic">v0</span>,{" "}
                <span className="font-serif italic">Cursor</span>, and{" "}
                <span className="font-serif italic">Claude</span> to go from a
                rough idea to a working prototype in a single sitting. It&apos;s
                changed how I think about building: less ceremony, more
                shipping, and a lot more space for taste, intuition, and weird
                experiments. I also love wiring up{" "}
                <span className="font-serif italic">integrations</span> — pulling
                in tools, APIs, and AI models so my projects can talk to the
                rest of the internet instead of living in a vacuum.
              </p>
              <p>
                Going back, my journey into code started during the 2020
                lockdown — I got curious and started learning how to build
                things on the web, following Udemy tutorials on the nights and
                weekends until something finally clicked. I fell in love with
                being able to{" "}
                <span className="font-serif italic">
                  create things on the web
                </span>{" "}
                for myself and other humans, and the rest is history.
              </p>
              <p>
                My current venture is exploring both my love for{" "}
                <span className="font-serif italic">
                  community and building
                </span>
                . I help organize{" "}
                <span className="font-serif italic">
                  IRL meetups and events
                </span>{" "}
                in Addis Ababa — a small but growing space for local builders
                to ship together — and I&apos;ll usually be hanging out at
                hackathons, dev meetups, and Web3 events around the city.
              </p>
              <p>
                I&apos;m a collector of curiosities ~ I love tinkering with
                side projects and experiments, half-finished prototypes,
                weekend dApps, and weird little tools nobody asked for. When
                I&apos;m not at the keyboard, I&apos;m usually walking the
                streets of{" "}
                <span className="border-b border-dashed border-foreground/40 pb-px">
                  Addis Ababa
                </span>
                , watching football, sketching UI ideas in a notebook, and
                drinking way more coffee than I should
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
                Outside of code, I&apos;m a quiet enthusiast of slow mornings
                and noisy evenings. I read more than I finish, journal in
                spurts, and like watching how a city wakes up from a third-floor
                window with a cup of buna in hand.
              </p>
              <p>
                I dabble in mentoring new builders, dragging friends into Web3
                rabbit holes at 2am, and trying to make every small thing —
                a button, a margin, a paragraph — feel a little more
                considered than it had to be.
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

          {/* Testimonials section */}
          <TestimonialsCarousel />
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}
