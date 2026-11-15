import type { CSSProperties } from "react"
import Link from "next/link"
import { Github, Linkedin, Mail, Twitter } from "lucide-react"
import { experience } from "@/lib/cv-data"
import { socialLinks } from "@/lib/social-links"
import { gatherings } from "@/lib/gatherings-data"
import { getPosts, getProjects } from "@/lib/content"
import { FolioShell } from "@/components/folio/ui"
import { Fade, STEP } from "@/components/minimal/fade"
import { DitherFigure } from "@/components/minimal/dither-figure"
import { ScrambleText } from "@/components/minimal/scramble-text"
import { LedgerMore, LedgerRow, SectionMark } from "@/components/minimal/ledger"
import { externalProps } from "@/components/minimal/entry"

export const dynamic = "force-dynamic"

const socialIcon = { GitHub: Github, Twitter, LinkedIn: Linkedin, Email: Mail } as const

/** "2025 — now" → "2025 —", "2023 — 2024" stays. */
const shortRange = (r: string) => r.replace(/\s*now$/i, "")

export default async function HomePage() {
  const [posts, projects] = await Promise.all([getPosts(), getProjects()])
  let d = 1 // running stagger index

  return (
    <FolioShell>
      <div className="flex flex-col gap-12 sm:gap-16">
        {/* Hero: who I am, in one breath. No separate About: this is it. */}
        <section aria-labelledby="hero-name" className="grid items-center gap-6 sm:grid-cols-[1.3fr_1fr] sm:gap-8">
          <Fade delay={STEP * d++} className="order-2 flex flex-col gap-5 sm:order-1">
            {/* Greeting decodes in steps: "Hey," → "I'm" → the name. */}
            <h1 id="hero-name" className="flex flex-col gap-2.5">
              <span className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <span className="hero-step" style={{ "--hero-delay": "0.15s" } as CSSProperties}>
                  <ScrambleText text="Hey," delay={0.15} duration={450} />
                </span>
                <span className="hero-step" style={{ "--hero-delay": "0.7s" } as CSSProperties}>
                  <ScrambleText text="I'm" delay={0.7} duration={400} />
                </span>
                {/* terminal caret, like the decode effect is still "typing" */}
                <span aria-hidden className="hero-step -ml-1" style={{ "--hero-delay": "1s" } as CSSProperties}>
                  <span className="tw-blink block h-3 w-[7px] bg-foreground/70" />
                </span>
              </span>
              <span className="whitespace-nowrap font-display text-[2rem] font-normal leading-10 text-foreground lg:text-[2.6rem]">
                <span className="hero-step" style={{ "--hero-delay": "1.1s" } as CSSProperties}>
                  <ScrambleText text="Abdurhaman" delay={1.1} duration={800} />
                </span>{" "}
                <span className="hero-step italic" style={{ "--hero-delay": "1.4s" } as CSSProperties}>
                  <ScrambleText text="Nur" delay={1.4} duration={500} />
                </span>
              </span>
            </h1>
            <p className="max-w-prose text-pretty text-[15px] leading-7 text-muted-foreground">
              Full-Stack &amp; <em className="font-display text-base text-foreground">Frontend</em> Engineer at{" "}
              <span className="whitespace-nowrap border-b border-foreground/60 font-medium text-foreground">
                Zero Hunger AI
              </span>
              . I build as <em className="font-display text-base text-foreground">Burhan</em>{" "}
              <span lang="ar" dir="rtl" className="font-sans text-[13px] text-muted-foreground">
                (بُرهان)
              </span>
              , meaning proof, so I let the work speak from Addis Ababa.
            </p>
            {/* Roles as a quiet mono tag line */}
            <ul className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground/70">
              {["Vercel Super Host", "Raycast Ambassador", "Addis Ababa"].map((t, i) => (
                <li key={t} className="flex items-center gap-2.5">
                  {i > 0 && <span aria-hidden className="size-1 rounded-full bg-muted-foreground/40" />}
                  {t}
                </li>
              ))}
            </ul>
          </Fade>
          <Fade delay={0} className="order-1 mx-auto w-full max-w-[13rem] sm:order-2 sm:mr-0 sm:max-w-[15rem]">
            <DitherFigure
              src="/hero/burhan-hey.png"
              cols={170}
              label="Burhan waving hello at the Raycast meetup in Addis Ababa, drawn in dithered dots"
              className="cursor-crosshair"
            />
          </Fade>
        </section>

        {/* I. Contact */}
        <Fade delay={STEP * d++}>
          <section aria-labelledby="contact">
            <SectionMark numeral="I" label="Contact" id="contact" />
            <nav aria-label="Contact and socials" className="flex min-h-10 flex-wrap items-center gap-5 py-2">
              {socialLinks.map((l) => {
                const Icon = socialIcon[l.label as keyof typeof socialIcon]
                return (
                  <a
                    key={l.label}
                    href={l.href}
                    aria-label={l.label}
                    title={l.handle}
                    {...externalProps(l.href)}
                    className="inline-flex text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <Icon aria-hidden className="size-[18px]" strokeWidth={1.75} />
                  </a>
                )
              })}
              <Link
                href="/cv"
                className="font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground transition-colors hover:text-foreground"
              >
                CV
              </Link>
            </nav>
          </section>
        </Fade>

        {/* II. Experience */}
        <Fade delay={STEP * d++}>
          <section aria-labelledby="experience" className="flex flex-col">
            <SectionMark numeral="II" label="Experience" id="experience" />
            <ol className="flex flex-col">
              {experience.slice(0, 4).map((e) => (
                <li key={e.title + e.range}>
                  <LedgerRow
                    href={e.href}
                    title={e.org?.replace(/\s*\(.*?\)\s*/g, "") ?? e.title}
                    sub={e.org ? e.title : undefined}
                    meta={shortRange(e.range)}
                  />
                </li>
              ))}
            </ol>
            <LedgerMore href="/cv">Full CV</LedgerMore>
          </section>
        </Fade>

        {/* III. Projects */}
        <Fade delay={STEP * d++}>
          <section aria-labelledby="projects" className="flex flex-col">
            <SectionMark numeral="III" label="Projects" id="projects" />
            {projects.length === 0 ? (
              <p className="py-2 text-sm text-muted-foreground">Nothing here yet.</p>
            ) : (
              <ol className="flex flex-col">
                {projects.slice(0, 4).map((p, i) => (
                  <li key={p.title}>
                    <LedgerRow
                      index={String(i + 1).padStart(2, "0")}
                      href={p.href ?? p.links[0]?.href ?? "/all"}
                      title={p.title}
                      sub={p.description}
                      meta={p.kind || p.year}
                    />
                  </li>
                ))}
              </ol>
            )}
            <LedgerMore href="/all">All projects</LedgerMore>
          </section>
        </Fade>

        {/* IV. Writing */}
        <Fade delay={STEP * d++}>
          <section aria-labelledby="writing" className="flex flex-col">
            <SectionMark numeral="IV" label="Writing" id="writing" />
            {posts.length === 0 ? (
              <p className="py-2 text-sm text-muted-foreground">Nothing published yet.</p>
            ) : (
              <ol className="flex flex-col">
                {posts.slice(0, 4).map((post) => (
                  <li key={post.slug}>
                    <LedgerRow href={post.href ?? `/writing/${post.slug}`} title={post.title} meta={post.date} />
                  </li>
                ))}
              </ol>
            )}
            <LedgerMore href="/writing">All writing</LedgerMore>
          </section>
        </Fade>

        {/* V. Community */}
        <Fade delay={STEP * d++}>
          <section aria-labelledby="community" className="flex flex-col">
            <SectionMark numeral="V" label="Community" id="community" />
            <ol className="flex flex-col">
              {gatherings.map((g) => (
                <li key={g.slug}>
                  <LedgerRow
                    href={`/writing/${g.slug}`}
                    title={g.name}
                    sub={`${g.partner} · ${g.stat} ${g.statLabel}`}
                    meta={g.date}
                  />
                </li>
              ))}
            </ol>
            <LedgerMore href="/highlights">Highlights</LedgerMore>
          </section>
        </Fade>
      </div>
    </FolioShell>
  )
}
