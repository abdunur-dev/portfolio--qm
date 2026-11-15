import type { CSSProperties } from "react"
import Link from "next/link"
import { Clock, Github, Linkedin, Mail, Twitter } from "lucide-react"
import { experience } from "@/lib/cv-data"
import { socialLinks } from "@/lib/social-links"
import { gatherings } from "@/lib/gatherings-data"
import { getPosts, getProjects } from "@/lib/content"
import { Divider, FolioShell, MoreLink, SectionTitle } from "@/components/folio/ui"
import { Fade, STEP } from "@/components/minimal/fade"
import { DitherFigure } from "@/components/minimal/dither-figure"
import { ScrambleText } from "@/components/minimal/scramble-text"
import { Badge, Entry, ListRow, ProjectEntry, externalProps, roleIcon } from "@/components/minimal/entry"

export const dynamic = "force-dynamic"

const socialIcon = { GitHub: Github, Twitter, LinkedIn: Linkedin, Email: Mail } as const

export default async function HomePage() {
  const [posts, projects] = await Promise.all([getPosts(), getProjects()])
  let d = 1 // running stagger index

  return (
    <FolioShell>
      <div className="flex flex-col gap-9 sm:gap-14">
        {/* Hero: poster-style ASCII mark beside an editorial definition */}
        <section aria-labelledby="hero-name" className="grid items-center gap-5 sm:grid-cols-[1fr_1.15fr] sm:gap-6">
          <Fade delay={STEP * d++} className="order-2 flex flex-col gap-3.5 sm:order-1 sm:gap-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Seek · Build · Share</p>
            {/* Greeting decodes in steps: "Hey," → "I'm" → the name. */}
            <h1 id="hero-name" className="flex flex-col gap-1.5 sm:gap-2.5">
              <span className="font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground sm:text-base">
                <span className="hero-step" style={{ "--hero-delay": "0.15s" } as CSSProperties}>
                  <ScrambleText text="Hey," delay={0.15} duration={450} />
                </span>{" "}
                <span className="hero-step" style={{ "--hero-delay": "0.7s" } as CSSProperties}>
                  <ScrambleText text="I'm" delay={0.7} duration={400} />
                </span>
              </span>
              <span className="font-display text-[2.4rem] font-extrabold leading-[0.92] tracking-[-0.03em] sm:text-[3.3rem]">
                <span className="hero-step" style={{ "--hero-delay": "1.1s" } as CSSProperties}>
                  <ScrambleText text="Abdurhaman" delay={1.1} duration={800} />
                </span>
                <br />
                <span className="hero-step" style={{ "--hero-delay": "1.4s" } as CSSProperties}>
                  <ScrambleText text="Nur" delay={1.4} duration={500} />
                </span>
              </span>
            </h1>
            <div className="flex flex-col gap-2">
              <p className="text-xs font-semibold uppercase tracking-wide">
                Building as <span className="font-display normal-case tracking-tight">Burhan</span>
              </p>
              <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">Burhan</span>{" "}
                <span lang="ar">(بُرهان)</span>, noun: proof; clear evidence. It&apos;s the name I build under, and the
                standard behind it: let the work be the evidence. I&apos;m a full-stack &amp; Web3 engineer from Addis
                Ababa shipping web apps, AI interfaces and on-chain products, and filling rooms with builders.
              </p>
            </div>
          </Fade>
          <Fade delay={0} className="order-1 mx-auto w-full max-w-[13rem] sm:order-2 sm:mr-0 sm:max-w-[17rem]">
            <DitherFigure
              src="/hero/burhan-hey.png"
              cols={170}
              label="Burhan waving hello at the Raycast meetup in Addis Ababa, drawn in dithered dots"
              className="cursor-crosshair"
            />
          </Fade>
        </section>

        <Divider />

        {/* About */}
        <section id="about">
          <Fade delay={STEP * d++}>
            <h2 className="text-lg font-semibold sm:text-xl">
              <ScrambleText text="About" trigger="view" />
            </h2>
            <div className="mt-3 space-y-3 text-pretty text-sm leading-relaxed text-muted-foreground sm:mt-4 sm:space-y-4 sm:text-base [&_a]:text-foreground [&_a]:underline [&_a]:decoration-border [&_a]:underline-offset-4 [&_a]:transition-colors [&_a:hover]:decoration-foreground">
              <p>
                I&apos;m Abdurhaman Nur, though most people know me as Burhan. I build web apps, AI interfaces and
                on-chain products — right now as a contract
                engineer for <span className="text-foreground">Zero Hunger AI</span> in Germany.
              </p>
              <p>
                I&apos;m also a Vercel Super Host and Raycast Ambassador, which means I spend a lot of time bringing
                builders together in Addis. I write about <Link href="/writing">building software and community</Link>.
              </p>
            </div>
            <div className="mt-4 -ml-1 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm text-muted-foreground">
              {socialLinks.map((l) => {
                const Icon = socialIcon[l.label as keyof typeof socialIcon]
                return (
                  <span key={l.label} className="contents">
                    <a
                      href={l.href}
                      aria-label={l.label}
                      title={l.handle}
                      {...externalProps(l.href)}
                      className="inline-flex size-7 items-center justify-center rounded-full text-foreground transition-all hover:-translate-y-0.5 hover:bg-muted"
                    >
                      <Icon aria-hidden className="size-4" strokeWidth={1.75} />
                    </a>
                    <span aria-hidden>·</span>
                  </span>
                )
              })}
              <Link href="/cv" className="font-medium text-foreground underline underline-offset-4">
                CV
              </Link>
            </div>
          </Fade>
        </section>

        <Divider />

        {/* Journey */}
        <section id="work" className="flex flex-col gap-y-4 sm:gap-y-6">
          <Fade delay={STEP * d++}>
            <SectionTitle action={<MoreLink href="/cv">Full CV</MoreLink>}>Journey</SectionTitle>
          </Fade>
          <div className="flex flex-col divide-y divide-dashed">
            {experience.slice(0, 2).map((e) => (
              <Fade key={e.title + e.range} delay={STEP * d++} className="py-4 first:pt-0 last:pb-0 sm:py-6">
                <Entry
                  badge={<Badge name={e.org ?? e.title} icon={roleIcon(e.org ?? "", e.title)} />}
                  title={e.org?.replace(/\s*\(.*?\)\s*/g, "") ?? e.title}
                  subtitle={
                    <>
                      {e.title}
                      <span className="mt-0.5 block text-xs tabular-nums sm:hidden">
                        {e.range.replace("—", "-").replace("now", "Present")}
                      </span>
                    </>
                  }
                  aside={
                    <div className="hidden flex-none text-right text-xs tabular-nums text-muted-foreground sm:block">
                      {e.range.replace("—", "-").replace("now", "Present")}
                    </div>
                  }
                >
                  {e.desc && <p className="line-clamp-3">{e.desc}</p>}
                </Entry>
              </Fade>
            ))}
          </div>
        </section>

        <Divider />

        {/* Projects */}
        <section id="projects" className="flex flex-col gap-y-4 sm:gap-y-6">
          <Fade delay={STEP * d++}>
            <SectionTitle action={<MoreLink href="/all">View all</MoreLink>}>Projects</SectionTitle>
          </Fade>
          {projects.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nothing here yet.</p>
          ) : (
            <div className="flex flex-col divide-y divide-dashed">
              {projects.slice(0, 3).map((p) => (
                <Fade key={p.title} delay={STEP * d++} className="py-4 first:pt-0 last:pb-0 sm:py-6">
                  <ProjectEntry p={p} />
                </Fade>
              ))}
            </div>
          )}
        </section>

        <Divider />

        {/* Writings */}
        <section id="blog" className="flex flex-col gap-y-3 sm:gap-y-6">
          <Fade delay={STEP * d++}>
            <SectionTitle action={<MoreLink href="/writing">View all</MoreLink>}>Writings</SectionTitle>
          </Fade>
          <Fade delay={STEP * d++}>
            {posts.length === 0 ? (
              <p className="text-sm text-muted-foreground">Nothing published yet.</p>
            ) : (
              <div className="-mx-3 flex flex-col gap-1">
                {posts.slice(0, 4).map((post) => (
                  <ListRow
                    key={post.slug}
                    href={post.href ?? `/writing/${post.slug}`}
                    title={post.title}
                    meta={
                      <>
                        <time className="tabular-nums">{post.date}</time>
                        {post.reading && (
                          <>
                            <span aria-hidden>·</span>
                            <span className="inline-flex items-center gap-1">
                              <Clock aria-hidden className="size-3" />
                              {post.reading}
                            </span>
                          </>
                        )}
                      </>
                    }
                  />
                ))}
              </div>
            )}
          </Fade>
        </section>

        <Divider />

        {/* Community */}
        <section id="community" className="flex flex-col gap-y-3 sm:gap-y-6">
          <Fade delay={STEP * d++}>
            <SectionTitle action={<MoreLink href="/highlights">Highlights</MoreLink>}>Community</SectionTitle>
          </Fade>
          <Fade delay={STEP * d++}>
            <div className="-mx-3 flex flex-col gap-1">
              {gatherings.map((g) => (
                <ListRow
                  key={g.slug}
                  href={`/writing/${g.slug}`}
                  title={g.name}
                  meta={
                    <>
                      <time className="tabular-nums">{g.date}</time>
                      <span aria-hidden>·</span>
                      <span>{g.partner}</span>
                      <span aria-hidden>·</span>
                      <span className="tabular-nums text-foreground">{g.stat}</span>
                      <span className="hidden sm:inline">{g.statLabel}</span>
                    </>
                  }
                />
              ))}
            </div>
          </Fade>
        </section>
      </div>
    </FolioShell>
  )
}
