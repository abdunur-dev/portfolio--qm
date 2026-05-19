import type { Metadata } from "next"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { AuroraBackground } from "@/components/aurora-background"
import { FadeUp } from "@/components/fade-up"
import { PrintCvButton } from "@/components/print-cv-button"
import { socialLinks } from "@/lib/social-links"

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
}

const experience: Entry[] = [
  {
    range: "2024 — present",
    title: "Frontend Lead, TibebChain",
    desc: "Leading the frontend for an NFT publishing platform built for African creators. Smart-contract integration on Base & Scroll, design system, marketplace UX, and creator onboarding flows.",
  },
  {
    range: "2024 — present",
    title: "Organiser & Speaker, v0 IRL Addis Ababa",
    desc: "Hosting v0 IRL community events in Ethiopia — gathering local devs, designers, and founders for talks, hackathons, and hands-on workshops on shipping with v0, AI-assisted product building, and modern Next.js. Partnering with Vercel and v0 to bring the global community to Addis.",
  },
  {
    range: "2022 — 2024",
    title: "Full-Stack & Smart Contract Developer, Freelance",
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
    desc: "An NFT publishing platform giving African creators a self-serve way to mint, distribute, and monetize their work on-chain.",
  },
  {
    range: "2024",
    title: "VibeVerse",
    desc: "A 3D NFT marketplace exploring spatial commerce — browsing collections inside an interactive, scrollable 3D world.",
  },
  {
    range: "2024",
    title: "GuardHer AI",
    desc: "An AI safety tool that filters harmful content — focused on protecting women and vulnerable users in online spaces.",
  },
]

const events: Entry[] = [
  {
    range: "2024 — present",
    title: "v0 IRL Addis Ababa",
    org: "Host & Organiser",
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

const certifications: Entry[] = [
  {
    range: "2024",
    title: "The Complete Web Developer Bootcamp",
    org: "Udemy",
    desc: "Full-stack JavaScript, React, Node.js, and modern web fundamentals.",
  },
  {
    range: "2024",
    title: "Ethereum & Solidity: The Complete Developer's Guide",
    org: "Udemy",
    desc: "Smart contract development, dApp architecture, and on-chain testing patterns.",
  },
  {
    range: "2023",
    title: "Responsive Web Design",
    org: "freeCodeCamp",
    desc: "Semantic HTML, CSS layout, accessibility, and responsive design principles.",
  },
  {
    range: "2023",
    title: "JavaScript Algorithms & Data Structures",
    org: "freeCodeCamp",
    desc: "Modern JavaScript, functional programming, and core data structures.",
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
    <section className="border-t-2 border-foreground/30 py-10 sm:py-12 print:border-t print:border-foreground/60 print:py-4">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground print:text-foreground">
        {label}
      </p>
      <div className="mt-6 print:mt-2">{children}</div>
    </section>
  )
}

function EntryRow({ e }: { e: Entry }) {
  return (
    <div className="print-avoid-break grid gap-1 py-4 sm:grid-cols-[160px_1fr] sm:gap-6 sm:py-5 print:grid-cols-[110px_1fr] print:gap-4 print:py-1.5">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground print:text-[9px] print:text-foreground/70">
        {e.range}
      </p>
      <div>
        <p className="font-serif text-lg leading-snug text-foreground sm:text-xl print:text-[12.5px] print:leading-tight">
          {e.title}
          {e.org && (
            <span className="text-foreground/60">
              {" "}
              <span className="text-foreground/40">·</span> {e.org}
            </span>
          )}
        </p>
        {e.desc && (
          <p className="mt-1.5 max-w-2xl text-pretty text-sm leading-relaxed text-foreground/75 print:mt-0.5 print:text-[10.5px] print:leading-snug print:text-foreground/80">
            {e.desc}
          </p>
        )}
      </div>
    </div>
  )
}

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5 print:gap-1">
      {items.map((s) => (
        <li
          key={s}
          className="rounded-md border border-border/70 bg-card/40 px-2.5 py-1 font-mono text-[11px] lowercase tracking-wide text-foreground/80 backdrop-blur-sm print:rounded print:border print:border-foreground/40 print:bg-transparent print:px-1.5 print:py-0.5 print:text-[9.5px]"
        >
          {s}
        </li>
      ))}
    </ul>
  )
}

export default function CvPage() {
  return (
    <div className="cv-print relative min-h-screen">
      <div className="print:hidden">
        <AuroraBackground />
      </div>
      <div className="relative z-10">
        <div className="contents print:hidden">
          <SiteNav />
        </div>

        <main className="mx-auto w-full max-w-4xl px-5 pb-20 pt-8 sm:px-6 sm:pb-24 sm:pt-12 print:max-w-full print:px-0 print:pt-0 print:pb-0">
          {/* Header */}
          <FadeUp>
            <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-start sm:gap-12 print:grid-cols-[1fr_auto] print:gap-6">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground print:text-[10px]">
                  curriculum vitae
                </p>
                <h1 className="mt-3 font-serif text-5xl leading-[0.95] tracking-tight text-foreground sm:text-6xl print:mt-1 print:text-3xl">
                  Abdurhaman Nur<span className="text-primary">.</span>
                </h1>
                <p className="mt-3 max-w-xl text-pretty text-sm leading-relaxed text-foreground/75 print:mt-1 print:max-w-none print:text-[10.5px] print:leading-snug">
                  Web3 &amp; full-stack developer based in Addis Ababa, also
                  known as Burhan online. I build dApps, design systems, and
                  modern web experiences — and occasionally write about the
                  quiet places where design, code, and faith overlap.
                </p>
              </div>

              {/* Right column: links only */}
              <div className="flex flex-col gap-4 sm:min-w-[220px] sm:items-end print:min-w-[180px] print:items-end print:gap-2">
                <ul className="flex flex-col gap-1.5 sm:items-end print:items-end print:gap-0.5">
                  {socialLinks.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-baseline gap-2 font-mono text-xs text-foreground/85 transition-colors hover:text-primary print:text-[10px]"
                      >
                        <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground print:text-[8.5px] print:text-foreground/70">
                          {l.label}
                        </span>
                        <span className="underline decoration-foreground/20 decoration-1 underline-offset-4 group-hover:decoration-primary print:no-underline">
                          {l.href
                            .replace(/^mailto:/, "")
                            .replace(/^https?:\/\//, "")
                            .replace(/\/$/, "")}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeUp>

          {/* Experience */}
          <FadeUp delay={0.05}>
            <Section label="Experience">
              <div className="divide-y divide-foreground/20 print:divide-foreground/40">
                {experience.map((e) => (
                  <EntryRow key={e.title + e.range} e={e} />
                ))}
              </div>
            </Section>
          </FadeUp>

          {/* Projects */}
          <FadeUp delay={0.05}>
            <Section label="Projects">
              <div className="divide-y divide-foreground/20 print:divide-foreground/40">
                {projects.map((e) => (
                  <EntryRow key={e.title + e.range} e={e} />
                ))}
              </div>
            </Section>
          </FadeUp>

          {/* Events / Communities */}
          <FadeUp delay={0.05}>
            <Section label="Events">
              <div className="divide-y divide-foreground/20 print:divide-foreground/40">
                {events.map((e) => (
                  <EntryRow key={e.title + e.range} e={e} />
                ))}
              </div>
            </Section>
          </FadeUp>

          {/* Education */}
          <FadeUp delay={0.05}>
            <Section label="Education">
              <div className="divide-y divide-foreground/20 print:divide-foreground/40">
                {education.map((e) => (
                  <EntryRow key={e.title + e.range} e={e} />
                ))}
              </div>
            </Section>
          </FadeUp>

          {/* Workflow — side-by-side rows like Experience entries */}
          <FadeUp delay={0.05}>
            <Section label="Workflow">
              <div className="divide-y divide-foreground/20 print:divide-foreground/40">
                <div className="print-avoid-break grid gap-2 py-4 sm:grid-cols-[160px_1fr] sm:gap-6 sm:py-5 print:grid-cols-[110px_1fr] print:gap-4 print:py-1.5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground print:text-[9px] print:text-foreground/70">
                    Skills
                  </p>
                  <Chips items={skills} />
                </div>
                <div className="print-avoid-break grid gap-2 py-4 sm:grid-cols-[160px_1fr] sm:gap-6 sm:py-5 print:grid-cols-[110px_1fr] print:gap-4 print:py-1.5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground print:text-[9px] print:text-foreground/70">
                    Tools
                  </p>
                  <Chips items={tools} />
                </div>
                <div className="print-avoid-break grid gap-2 py-4 sm:grid-cols-[160px_1fr] sm:gap-6 sm:py-5 print:grid-cols-[110px_1fr] print:gap-4 print:py-1.5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground print:text-[9px] print:text-foreground/70">
                    Technology
                  </p>
                  <Chips items={technology} />
                </div>
              </div>
            </Section>
          </FadeUp>

          {/* Certifications */}
          <FadeUp delay={0.05}>
            <Section label="Certifications">
              <div className="divide-y divide-foreground/20 print:divide-foreground/40">
                {certifications.map((e) => (
                  <EntryRow key={e.title + e.range} e={e} />
                ))}
              </div>
            </Section>
          </FadeUp>

          {/* Print button — sits at the bottom like a footer action */}
          <div className="mt-12 flex justify-end border-t border-foreground/20 pt-6 print:hidden">
            <PrintCvButton />
          </div>
        </main>

        <div className="contents print:hidden">
          <SiteFooter />
        </div>
      </div>
    </div>
  )
}
