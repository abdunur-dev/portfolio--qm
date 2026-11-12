import Link from "next/link"
import type { ReactNode } from "react"
import { CrossMark, FolioShell, InlineLink, MoreLink, SectionTitle, Tag } from "@/components/folio/ui"
import { Reveal, Typewriter } from "@/components/folio/motion"
import { SocialIcons } from "@/components/folio/social-icons"
import { AvatarLightbox } from "@/components/avatar-lightbox"
import { VisitorCounter } from "@/components/visitor-counter"
import { experience } from "@/lib/cv-data"
import { ProjectsGrid } from "@/components/home/projects-grid"
import { Gatherings } from "@/components/home/gatherings"
import { Timeline } from "@/components/home/timeline"
import { Stack, stackGroups } from "@/components/home/stack"
import { gatherings } from "@/lib/gatherings-data"
import { getPosts, getProjects } from "@/lib/content"

export const dynamic = "force-dynamic"

function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`relative border-b border-border px-5 py-10 sm:px-8 sm:py-12 ${className}`}>{children}</section>
}

function Stat({ value, label }: { value: ReactNode; label: string }) {
  return (
    <div className="flex flex-col gap-1 px-4 py-3">
      <span className="text-sm tabular-nums text-highlighted">{value}</span>
      <span className="text-[10px] text-muted-foreground">{label}</span>
    </div>
  )
}

export default async function HomePage() {
  const [posts, projects] = await Promise.all([getPosts(), getProjects()])
  const current = experience.find((e) => /now/i.test(e.range)) ?? experience[0]

  return (
    <FolioShell bleed>
      {/* ------------------------------------------------------------ Hero */}
      <div className="relative border-b border-border px-4 pt-8 pb-6 sm:px-6 sm:pt-10">
        <h1
          aria-label="Abdurhaman Nur"
          className="flex flex-wrap justify-between gap-x-6 font-display font-extrabold uppercase leading-[0.82] tracking-[-0.02em] text-highlighted text-[clamp(3.4rem,11.5vw,9.5rem)]"
        >
          <span aria-hidden>
            <Typewriter text="Abdur" speed={110} delay={150} caret={false} />
            <span className="tw-blink text-primary">_</span>
          </span>
          <span aria-hidden>
            <Typewriter text="haman" speed={110} delay={800} caret={false} />
          </span>
        </h1>
        <CrossMark className="absolute -bottom-3 left-0 hidden md:flex" />
      </div>

      {/* ----------------------------------------------- Intro / featured */}
      <div className="grid border-b border-border md:grid-cols-4">
        {/* Bio + count */}
        <Reveal index={0} className="flex flex-col justify-between border-b border-border md:border-r md:border-b-0">
          <div className="flex flex-col gap-5 px-5 py-6 sm:px-6">
            <p className="flex gap-3 text-pretty text-xs leading-relaxed text-foreground">
              <span aria-hidden className="mt-[6px] size-1.5 shrink-0 bg-highlighted" />
              <span>
                Systems &amp; Web3 engineer. I build protocol primitives, dApps and quiet systems from Addis
                Ababa — and host gatherings for local builders. Read my{" "}
                <InlineLink href="/cv">CV</InlineLink>.
              </span>
            </p>
            <SocialIcons />
          </div>
          <div className="border-t border-border px-5 py-4 sm:px-6">
            <p className="text-[11px] text-foreground">Projects</p>
            <p className="font-display text-4xl font-extrabold leading-none tabular-nums text-highlighted">
              {String(projects.length).padStart(2, "0")}
            </p>
          </div>
        </Reveal>

        {/* Portrait in crop marks */}
        <Reveal index={1} className="flex items-start justify-center border-b border-border p-6 md:justify-end md:border-b-0 md:p-0">
          <div className="lab-crop flex size-40 items-center justify-center border border-border bg-card md:size-[9.5rem] md:border-t-0 md:border-r-0">
            <span className="lab-crop-mark left-1.5 top-1.5 border-t border-l" />
            <span className="lab-crop-mark right-1.5 top-1.5 border-t border-r" />
            <span className="lab-crop-mark bottom-1.5 left-1.5 border-b border-l" />
            <span className="lab-crop-mark bottom-1.5 right-1.5 border-b border-r" />
            <AvatarLightbox
              src="/images/burhan-portrait.jpg"
              alt="Abdurhaman Nur"
              size={104}
              className="size-26 object-cover object-top grayscale transition-[filter] duration-500 hover:grayscale-0"
            />
          </div>
        </Reveal>

        {/* Featured: current role */}
        <Reveal index={2} className="md:col-span-2">
        <article className="flex h-full flex-col border-border bg-card md:border-l">
          <div className="flex">
            <Tag tone="accent" className="border-t-0 border-l-0">Now</Tag>
            <Tag className="border-t-0 border-l-0">{current.range}</Tag>
          </div>
          <div className="grid flex-1 items-center gap-4 px-5 py-6 sm:grid-cols-[1fr_1.1fr] sm:px-6">
            <div className="flex items-center gap-3">
              <span aria-hidden className="flex size-8 shrink-0 items-center justify-center rounded-full border-[5px] border-highlighted border-dashed" />
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold leading-tight text-highlighted">
                  <Typewriter text={current.title} speed={40} delay={600} />
                </span>
                {current.org && <span className="text-[11px] text-muted-foreground">{current.org}</span>}
              </div>
            </div>
            {current.desc && <p className="line-clamp-4 text-[11px] leading-relaxed text-foreground">{current.desc}</p>}
          </div>
          <div className="grid grid-cols-[1fr_auto] border-t border-border">
            <div className="grid grid-cols-2 sm:grid-cols-4">
              <Stat value={String(projects.length)} label="Projects shipped" />
              <Stat value={String(gatherings.length)} label="Events hosted" />
              <Stat value={`${experience.length}`} label="Roles" />
              <Stat value={<VisitorCounter numberOnly />} label="Site visits" />
            </div>
            <Link
              href="/cv"
              aria-label="Open full CV"
              className="flex w-14 items-center justify-center border-l border-border text-highlighted transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              →
            </Link>
          </div>
        </article>
        </Reveal>
      </div>

      {/* ------------------------------------------- 01 Experience + Stack */}
      <div className="grid border-b border-border md:grid-cols-2">
        <section className="flex flex-col gap-6 border-b border-border px-5 py-10 sm:px-8 sm:py-12 md:border-r md:border-b-0">
          <SectionTitle index={1} meta={`${experience.length} roles`} action={<MoreLink href="/cv">Full CV</MoreLink>}>
            Experience
          </SectionTitle>
          <Timeline items={experience} />
        </section>
        <section className="flex flex-col gap-6 px-5 py-10 sm:px-8 sm:py-12">
          <SectionTitle index={2} meta={`${stackGroups.reduce((n, g) => n + g.items.length, 0)} entries`}>
            Stack
          </SectionTitle>
          <Stack />
        </section>
      </div>

      {/* ------------------------------------------------------ 03 Projects */}
      <ProjectsGrid projects={projects} limit={6} index={3} />

      {/* ------------------------------------------------------- 04 Writing */}
      <Panel>
        <div className="flex flex-col gap-2">
          <SectionTitle index={4} action={<MoreLink href="/writing">All articles</MoreLink>}>
            Writing
          </SectionTitle>
          {posts.length === 0 ? (
            <p className="py-4 text-xs text-muted-foreground">Nothing published yet — return soon.</p>
          ) : (
            <ul className="flex flex-col">
              {posts.slice(0, 3).map((post, i) => (
                <li key={post.slug} className="border-b border-border last:border-b-0">
                  <Reveal index={i}>
                    <Link
                      href={post.href ?? `/writing/${post.slug}`}
                      className="group grid gap-1 py-4 transition-transform duration-300 hover:translate-x-1 sm:grid-cols-[7rem_1fr_auto] sm:items-baseline sm:gap-6"
                    >
                      <span className="text-[11px] tabular-nums text-muted-foreground">{post.date}</span>
                      <span className="flex min-w-0 flex-col gap-1">
                        <span className="text-sm font-medium text-highlighted transition-colors group-hover:text-primary">
                          {post.title}
                        </span>
                        {post.excerpt && (
                          <span className="line-clamp-1 text-[11px] leading-relaxed text-muted-foreground">{post.excerpt}</span>
                        )}
                      </span>
                      <span aria-hidden className="hidden text-highlighted transition-transform group-hover:translate-x-1 sm:block">
                        →
                      </span>
                    </Link>
                  </Reveal>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Panel>

      {/* ---------------------------------------------------- 05 Highlights */}
      <Panel className="border-b-0">
        <div className="flex flex-col gap-6">
          <SectionTitle index={5} meta={`${gatherings.length} events`} action={<MoreLink href="/highlights">All highlights</MoreLink>}>
            Highlights
          </SectionTitle>
          <Reveal>
            <p className="max-w-prose text-pretty text-xs leading-relaxed text-foreground">
              Gatherings I host for builders in Addis Ababa with the tools I use every day, so local developers get a
              seat at global tables.
            </p>
          </Reveal>
          <Gatherings />
        </div>
      </Panel>
    </FolioShell>
  )
}
