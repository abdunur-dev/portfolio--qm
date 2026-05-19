import type { Metadata } from "next"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { AuroraBackground } from "@/components/aurora-background"
import { FadeUp } from "@/components/fade-up"
import { PrintCvButton } from "@/components/print-cv-button"

export const metadata: Metadata = {
  title: "CV · Abdurhaman Nur",
  description:
    "Curriculum vitae of Abdurhaman Nur — Web3 & full-stack developer based in Addis Ababa.",
}

type Entry = {
  range: string
  title: string
  org?: string
  desc?: string
  href?: string
}

const experience: Entry[] = [
  {
    range: "2024 — present",
    title: "Frontend Lead, TibebChain",
    href: "https://tibebchain.com",
    desc: "Leading the frontend for an NFT publishing platform built for African creators. Smart-contract integration on Base & Scroll, design system, marketplace UX, and creator onboarding flows.",
  },
  {
    range: "2024 — present",
    title: "Organiser & Speaker, v0 IRL Addis Ababa",
    href: "https://v0.app",
    desc: "Hosting v0 IRL community events in Ethiopia — gathering local devs, designers, and founders for talks, hackathons, and hands-on workshops on shipping with v0, AI-assisted product building, and modern Next.js. Partnering with Vercel and v0 to bring the global community to Addis.",
  },
  {
    range: "2022 — 2024",
    title: "Full-Stack & Smart Contract Developer, Freelance / Indie",
    desc: "Shipped dApps on Base and Scroll with TypeScript and Solidity. Built design systems and frontends for early-stage startups across Web3, productivity, and AI.",
  },
  {
    range: "2020 — 2022",
    title: "Self-taught Developer",
    desc: "Started coding during the 2020 lockdown — late-night Udemy tutorials, side experiments, and a slow slide into full-stack. Fell in love with creating things on the web.",
  },
]

const projects: Entry[] = [
  {
    range: "2024 — present",
    title: "TibebChain",
    href: "https://tibebchain.com",
    desc: "An NFT publishing platform giving African creators a self-serve way to mint, distribute, and monetize their work on-chain.",
  },
  {
    range: "2024",
    title: "VibeVerse",
    href: "/all",
    desc: "A 3D NFT marketplace exploring spatial commerce — browsing collections inside an interactive, scrollable 3D world.",
  },
  {
    range: "2024",
    title: "GuardHer AI",
    href: "/all",
    desc: "An AI safety tool that filters harmful content — focused on protecting women and vulnerable users in online spaces.",
  },
]

const events: Entry[] = [
  {
    range: "2024 — present",
    title: "v0 IRL Addis Ababa",
    org: "Host & Organiser",
    href: "https://v0.app",
    desc: "A community event series partnered with Vercel and v0 to gather Ethiopian developers, designers, and founders. Curated speaker lineups, hackathons, and workshops to grow the local AI and Web3 builder scene.",
  },
]

const education: Entry[] = [
  {
    range: "2020 — present",
    title: "Self-Directed Learning",
    org: "Internet & open-source",
    desc: "Web development, smart contracts, design, and product — through open courses, docs, and shipping in public.",
  },
]

const skills = [
  "frontend engineering",
  "smart contract development",
  "design systems",
  "product thinking",
  "community building",
  "public speaking",
  "mentorship",
  "technical writing",
]

const tools = [
  "figma",
  "github",
  "notion",
  "linear",
  "vercel",
  "v0",
  "claude",
  "cursor",
]

const technology = [
  "typescript",
  "react",
  "next.js",
  "tailwind",
  "solidity",
  "ethers / viem",
  "base",
  "scroll",
  "supabase",
  "node.js",
  "ai sdk",
]

function Section({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <section className="border-t-2 border-foreground/30 py-10 sm:py-12 print:border-foreground/40 print:py-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground print:text-foreground">
        {label}
      </p>
      <div className="mt-6 print:mt-3">{children}</div>
    </section>
  )
}

function EntryRow({ e }: { e: Entry }) {
  const TitleEl = e.href ? "a" : "span"
  return (
    <div className="grid gap-1 py-4 sm:grid-cols-[160px_1fr] sm:gap-6 sm:py-5 print:py-2">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground print:text-foreground/70">
        {e.range}
      </p>
      <div>
        <p className="font-serif text-lg leading-snug text-foreground sm:text-xl">
          <TitleEl
            {...(e.href
              ? {
                  href: e.href,
                  target: e.href.startsWith("http") ? "_blank" : undefined,
                  rel: e.href.startsWith("http") ? "noreferrer" : undefined,
                  className:
                    "group inline-flex items-baseline gap-1.5 underline decoration-foreground/30 decoration-1 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary",
                }
              : {})}
          >
            {e.title}
            {e.href && (
              <span className="font-mono text-[11px] text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary">
                ↗
              </span>
            )}
          </TitleEl>
          {e.org && (
            <span className="text-foreground/60">
              {" "}
              <span className="text-foreground/40">·</span> {e.org}
            </span>
          )}
        </p>
        {e.desc && (
          <p className="mt-1.5 max-w-2xl text-pretty text-sm leading-relaxed text-foreground/75 print:text-foreground/80">
            {e.desc}
          </p>
        )}
      </div>
    </div>
  )
}

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((s) => (
        <li
          key={s}
          className="rounded-md border border-border/70 bg-card/40 px-2.5 py-1 font-mono text-[11px] lowercase tracking-wide text-foreground/80 backdrop-blur-sm print:border-foreground/40 print:bg-transparent"
        >
          {s}
        </li>
      ))}
    </ul>
  )
}

export default function CvPage() {
  return (
    <div className="relative min-h-screen">
      <div className="print:hidden">
        <AuroraBackground />
      </div>
      <div className="relative z-10">
        <div className="print:hidden">
          <SiteNav />
        </div>

        <main className="mx-auto w-full max-w-4xl px-5 pb-20 pt-8 sm:px-6 sm:pb-24 sm:pt-12 print:max-w-full print:px-0 print:pt-0">
          {/* Header */}
          <FadeUp>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                  curriculum vitae
                </p>
                <h1 className="mt-3 font-serif text-5xl leading-[0.95] tracking-tight text-foreground sm:text-6xl">
                  Abdurhaman Nur<span className="text-primary">.</span>
                </h1>
                <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-foreground/75">
                  Web3 &amp; full-stack developer based in Addis Ababa, also
                  known as Burhan online. I build dApps, design systems, and
                  modern web experiences — and occasionally write about the
                  quiet places where design, code, and faith overlap.
                </p>
              </div>

              <PrintCvButton />
            </div>
          </FadeUp>

          {/* Experience */}
          <FadeUp delay={0.05}>
            <Section label="Experience">
              <div className="divide-y divide-foreground/20 print:divide-foreground/30">
                {experience.map((e) => (
                  <EntryRow key={e.title + e.range} e={e} />
                ))}
              </div>
            </Section>
          </FadeUp>

          {/* Projects */}
          <FadeUp delay={0.05}>
            <Section label="Projects">
              <div className="divide-y divide-foreground/20 print:divide-foreground/30">
                {projects.map((e) => (
                  <EntryRow key={e.title + e.range} e={e} />
                ))}
              </div>
            </Section>
          </FadeUp>

          {/* Events */}
          <FadeUp delay={0.05}>
            <Section label="Events">
              <div className="divide-y divide-foreground/20 print:divide-foreground/30">
                {events.map((e) => (
                  <EntryRow key={e.title + e.range} e={e} />
                ))}
              </div>
            </Section>
          </FadeUp>

          {/* Education */}
          <FadeUp delay={0.05}>
            <Section label="Education">
              <div className="divide-y divide-foreground/20 print:divide-foreground/30">
                {education.map((e) => (
                  <EntryRow key={e.title + e.range} e={e} />
                ))}
              </div>
            </Section>
          </FadeUp>

          {/* Workflow */}
          <FadeUp delay={0.05}>
            <Section label="Workflow">
              <div className="grid gap-8 sm:grid-cols-3">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    Skills
                  </p>
                  <div className="mt-3">
                    <Chips items={skills} />
                  </div>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    Tools
                  </p>
                  <div className="mt-3">
                    <Chips items={tools} />
                  </div>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    Technology
                  </p>
                  <div className="mt-3">
                    <Chips items={technology} />
                  </div>
                </div>
              </div>
            </Section>
          </FadeUp>
        </main>

        <div className="print:hidden">
          <SiteFooter />
        </div>
      </div>
    </div>
  )
}
