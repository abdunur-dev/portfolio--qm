import Link from "next/link"
import type { ReactNode } from "react"
import { ArrowUpRight, Boxes, Cpu, Terminal, Users, type LucideIcon } from "lucide-react"
import { FolioShell, LabButton, MoreLink, Plus, SectionTitle } from "@/components/folio/ui"
import { Reveal, Typewriter } from "@/components/folio/motion"
import { VoxelDither } from "@/components/folio/voxel-dither"
import { VisitorCounter } from "@/components/visitor-counter"
import { experience, technology } from "@/lib/cv-data"
import { socialLinks } from "@/lib/social-links"
import { ProjectsGrid } from "@/components/home/projects-grid"
import { Gatherings } from "@/components/home/gatherings"
import { gatherings } from "@/lib/gatherings-data"
import { getPosts, getProjects } from "@/lib/content"

export const dynamic = "force-dynamic"

const roleIcons: LucideIcon[] = [Cpu, Users, Boxes, Terminal]

function Panel({ children, className = "", id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <section id={id} className={`relative scroll-mt-20 border-b border-border px-5 py-10 sm:px-8 lg:px-14 ${className}`}>
      {children}
    </section>
  )
}

/** A labelled meter row for the "system status" block. */
function Meter({ label, value, pct }: { label: string; value: ReactNode; pct: number }) {
  return (
    <div className="grid grid-cols-[5.5rem_1fr_auto] items-center gap-3 text-[10px] uppercase tracking-wide">
      <span className="text-highlighted">{label}</span>
      <span className="relative h-2 bg-muted">
        <span
          className="absolute inset-y-0 left-0 bg-[repeating-linear-gradient(90deg,var(--highlighted)_0_2px,transparent_2px_4px)]"
          style={{ width: `${Math.max(4, Math.min(100, pct))}%` }}
        />
      </span>
      <span className="min-w-14 text-right tabular-nums text-highlighted">{value}</span>
    </div>
  )
}

export default async function HomePage() {
  const [posts, projects] = await Promise.all([getPosts(), getProjects()])
  const yearsBuilding = new Date().getFullYear() - 2020

  return (
    <FolioShell bleed>
      {/* ============================================================ /01 Hero */}
      <section className="grid border-b border-border lg:grid-cols-[3.5rem_1fr_1fr]">
        {/* Vertical rail */}
        <div className="hidden flex-col items-center justify-between border-r border-border py-8 lg:flex">
          <span aria-hidden className="h-16 border-l border-dashed border-muted-foreground" />
          <span className="rotate-180 text-[10px] uppercase tracking-[0.2em] text-muted-foreground [writing-mode:vertical-rl]">
            Systems engineer · Addis Ababa
          </span>
          <span className="rotate-180 text-[12px] font-medium tabular-nums text-highlighted [writing-mode:vertical-rl]">
            {new Date().getFullYear()}
          </span>
        </div>

        {/* Copy */}
        <div className="flex flex-col justify-center gap-7 px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
          <span className="text-[12px] tabular-nums text-muted-foreground">/01</span>
          <h1
            aria-label="Abdurhaman Nur"
            className="font-display uppercase leading-[0.88] tracking-tight text-highlighted text-[clamp(3.6rem,13vw,7.5rem)] lg:text-[clamp(4rem,7.2vw,7.5rem)]"
          >
            <span aria-hidden className="block">
              <Typewriter text="Abdurhaman" speed={90} delay={150} caret={false} />
            </span>
            <span aria-hidden className="block">
              <Typewriter text="Nur" speed={110} delay={1150} caret={false} />
              <span className="tw-blink">_</span>
            </span>
          </h1>
          <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            <Typewriter text="Systems. Web3. Community." speed={45} delay={1700} caret={false} />
          </p>
          <Reveal index={2}>
            <p className="max-w-md text-pretty text-[13px] leading-[1.75] text-foreground">
              I build protocol primitives, decentralized apps and quiet systems from Addis Ababa — and host gatherings
              that give local builders a seat at global tables.
            </p>
          </Reveal>
          <Reveal index={3} className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <LabButton href="/#work" className="w-full sm:w-auto sm:min-w-44">
              Explore work
            </LabButton>
            <LabButton href="/cv" variant="ghost" className="px-0">
              View CV
            </LabButton>
          </Reveal>
        </div>

        {/* Dithered voxel visual */}
        <div className="relative min-h-[360px] border-t border-border sm:min-h-[440px] lg:border-t-0 lg:border-l">
          <VoxelDither />
        </div>
      </section>

      {/* ====================================================== /02 Experience */}
      <Panel id="experience">
        <div className="flex flex-col gap-8">
          <SectionTitle index={2} meta={`${experience.length} roles · ${yearsBuilding} yrs`} action={<MoreLink href="/cv">Full CV</MoreLink>}>
            Experience
          </SectionTitle>
          <ul className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {experience.slice(0, 4).map((e, i) => {
              const Icon = roleIcons[i % roleIcons.length]
              const current = /now/i.test(e.range)
              return (
                <li key={e.title + e.range} className="bg-background">
                  <Reveal index={i} className="relative flex h-full gap-4 p-5">
                    <Plus className="absolute right-3 top-3" />
                    <Icon aria-hidden className="size-10 shrink-0 text-highlighted" strokeWidth={1} />
                    <div className="flex min-w-0 flex-col gap-2">
                      <h3 className="text-[12px] font-medium uppercase leading-snug tracking-wide text-highlighted">
                        {e.title}
                      </h3>
                      <p className="flex items-center gap-1.5 text-[10px] uppercase tabular-nums text-muted-foreground">
                        {current && <span aria-hidden className="size-1.5 animate-pulse bg-highlighted" />}
                        {e.range}
                      </p>
                      {e.org && <p className="text-[11px] leading-relaxed text-foreground">{e.org}</p>}
                    </div>
                  </Reveal>
                </li>
              )
            })}
          </ul>
        </div>
      </Panel>

      {/* =================================================== /03 Selected work */}
      <ProjectsGrid projects={projects} limit={4} index={3} />

      {/* ========================================================= /04 Writing */}
      <Panel id="writing">
        <div className="flex flex-col gap-6">
          <SectionTitle index={4} action={<MoreLink href="/writing">All articles</MoreLink>}>
            Writing
          </SectionTitle>
          {posts.length === 0 ? (
            <p className="py-4 text-xs text-muted-foreground">Nothing published yet — return soon.</p>
          ) : (
            <ul className="flex flex-col border-t border-border">
              {posts.slice(0, 3).map((post, i) => (
                <li key={post.slug} className="border-b border-border">
                  <Reveal index={i}>
                    <Link
                      href={post.href ?? `/writing/${post.slug}`}
                      className="group grid items-baseline gap-1 py-5 transition-[padding] duration-300 hover:pl-2 sm:grid-cols-[8rem_1fr_auto] sm:gap-8"
                    >
                      <span className="text-[11px] uppercase tabular-nums text-muted-foreground">{post.date}</span>
                      <span className="flex min-w-0 flex-col gap-1.5">
                        <span className="text-[14px] font-medium uppercase tracking-wide text-highlighted">{post.title}</span>
                        {post.excerpt && (
                          <span className="line-clamp-1 text-[11px] leading-relaxed text-muted-foreground">{post.excerpt}</span>
                        )}
                      </span>
                      <ArrowUpRight
                        aria-hidden
                        className="hidden size-5 text-highlighted transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 sm:block"
                        strokeWidth={1.5}
                      />
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Panel>

      {/* ====================================================== /05 Highlights */}
      <Panel id="highlights">
        <div className="flex flex-col gap-7">
          <SectionTitle index={5} meta={`${gatherings.length} events`} action={<MoreLink href="/highlights">All highlights</MoreLink>}>
            Highlights
          </SectionTitle>
          <Gatherings />
        </div>
      </Panel>

      {/* ========================================= /06 /07 /08 Build · Status · Signal */}
      <section className="grid gap-px border-b border-border bg-border md:grid-cols-3">
        <div className="flex flex-col gap-5 bg-background px-5 py-10 sm:px-8 lg:px-14">
          <span className="text-[12px] tabular-nums text-muted-foreground">/06</span>
          <h2 className="text-xl font-bold uppercase leading-tight tracking-tight text-highlighted">
            <Typewriter text="Let's build" speed={60} caret={false} />
            <br />
            <Typewriter text="the next thing" speed={60} delay={700} />
          </h2>
          <p className="max-w-xs text-[12px] leading-relaxed text-foreground">
            Protocols, products or a room full of builders. If it should exist, let&apos;s make it real — together.
          </p>
          <LabButton href="mailto:abdurhamannur894@gmail.com" className="mt-auto w-fit min-w-40">
            Let&apos;s build
          </LabButton>
        </div>

        <div className="flex flex-col gap-5 bg-background px-5 py-10 sm:px-8">
          <span className="text-[12px] tabular-nums text-muted-foreground">/07</span>
          <h2 className="text-xl font-bold uppercase tracking-tight text-highlighted">
            <Typewriter text="System status" speed={60} />
          </h2>
          <Reveal className="flex flex-col gap-4">
            <Meter label="Projects" value={projects.length} pct={projects.length * 10} />
            <Meter label="Events" value={gatherings.length} pct={gatherings.length * 25} />
            <Meter label="Roles" value={experience.length} pct={experience.length * 20} />
            <Meter label="Uptime" value={`${yearsBuilding} yrs`} pct={yearsBuilding * 12} />
            <Meter label="Visits" value={<VisitorCounter numberOnly />} pct={88} />
          </Reveal>
          <div className="mt-auto flex items-center justify-between bg-primary px-4 py-3 text-[10px] uppercase tracking-wide text-primary-foreground">
            All systems operational
            <span aria-hidden className="size-2 animate-pulse rounded-full bg-primary-foreground" />
          </div>
        </div>

        <div className="flex flex-col gap-5 bg-background px-5 py-10 sm:px-8 lg:px-14">
          <span className="text-[12px] tabular-nums text-muted-foreground">/08</span>
          <h2 className="text-xl font-bold uppercase tracking-tight text-highlighted">
            <Typewriter text="Follow the signal" speed={60} />
          </h2>
          <p className="text-[12px] leading-relaxed text-foreground">Builds, events and notes from the lab.</p>
          <ul className="flex flex-col border-t border-border">
            {socialLinks.map((l, i) => (
              <li key={l.label} className="border-b border-border">
                <Reveal index={i}>
                  <a
                    href={l.href}
                    {...(l.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                    className="group flex items-center justify-between gap-3 py-2.5 text-[11px] uppercase tracking-wide text-highlighted"
                  >
                    <span>{l.label === "Twitter" ? "X (Twitter)" : l.label}</span>
                    <span className="flex min-w-0 items-center gap-2 text-muted-foreground">
                      <span className="hidden truncate normal-case xl:inline">{l.handle}</span>
                      <ArrowUpRight aria-hidden className="size-3.5 text-highlighted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
          <div aria-hidden className="mt-auto h-3 bg-[repeating-linear-gradient(135deg,var(--border)_0_2px,transparent_2px_8px)]" />
        </div>
      </section>

      {/* ======================================================= /09 Built with */}
      <Panel className="border-b-0">
        <div className="flex flex-col gap-7">
          <SectionTitle index={9}>Built with</SectionTitle>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-6">
            {technology.slice(0, 6).map((t, i) => (
              <li key={t}>
                <Reveal index={i} className="flex items-center gap-2.5">
                  <span aria-hidden className="size-3 shrink-0 bg-highlighted [clip-path:polygon(50%_0,100%_100%,0_100%)]" />
                  <span className="font-prose text-lg font-semibold tracking-tight text-highlighted sm:text-xl">{t}</span>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Panel>
    </FolioShell>
  )
}
