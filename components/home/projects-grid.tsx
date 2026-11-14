"use client"

import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { FolioProject } from "@/lib/content"
import { MoreLink, SectionTitle } from "@/components/folio/ui"
import { Reveal } from "@/components/folio/motion"
import { ProjectCover } from "@/components/folio/project-cover"

/** "Team Chat" -> "TEAM_CHAT" */
function codeName(title: string) {
  return title.trim().toUpperCase().replace(/[^A-Z0-9]+/g, "_").replace(/^_|_$/g, "")
}

function WorkCard({ p }: { p: FolioProject }) {
  const href = p.href ?? p.links[0]?.href ?? "/all"
  const external = !href.startsWith("/")

  return (
    <article className="group relative flex h-full flex-col border border-border bg-card p-1.5 transition-colors hover:border-highlighted">
      <div className="relative aspect-[16/10] overflow-hidden bg-background">
        {p.cover_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={p.cover_url}
            alt=""
            className="absolute inset-0 size-full object-cover grayscale contrast-125 transition-transform duration-700 group-hover:scale-[1.04]"
          />
        ) : (
          <ProjectCover seed={p.title} intensity={0.85} />
        )}
        <span className="absolute left-2 top-2 bg-background px-1.5 py-[3px] text-[10px] uppercase leading-none tabular-nums text-highlighted">
          {p.year}
        </span>
      </div>
      <div className="flex items-end justify-between gap-3 px-3 pb-2.5 pt-4">
        <div className="flex min-w-0 flex-col gap-1.5">
          <h3 className="truncate text-[13px] font-medium text-highlighted">
            <Link
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
            >
              {codeName(p.title)}
            </Link>
          </h3>
          <p className="truncate text-[10px] uppercase tracking-wide text-muted-foreground">
            {[p.kind, p.stack[0]].filter(Boolean).join(" · ")}
          </p>
        </div>
        <ArrowUpRight
          aria-hidden
          className="size-5 shrink-0 text-highlighted transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
          strokeWidth={1.5}
        />
      </div>
    </article>
  )
}

export function ProjectsGrid({
  projects,
  limit = 4,
  index = 3,
}: {
  projects: FolioProject[]
  limit?: number
  index?: number
}) {
  const shown = projects.slice(0, limit)

  return (
    <section id="work" className="relative scroll-mt-20 border-b border-border px-5 py-10 sm:px-8 lg:px-14">
      {/* "+" rails on wide screens */}
      <div aria-hidden className="absolute inset-y-0 left-4 hidden flex-col justify-center gap-5 text-muted-foreground lg:flex">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="text-sm leading-none">+</span>
        ))}
      </div>
      <div aria-hidden className="absolute inset-y-0 right-4 hidden flex-col justify-center gap-5 text-muted-foreground lg:flex">
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className="text-sm leading-none">+</span>
        ))}
      </div>

      <div className="flex flex-col gap-7">
        <SectionTitle index={index} meta={`${projects.length} shipped`} action={<MoreLink href="/all">All projects</MoreLink>}>
          Selected work
        </SectionTitle>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {shown.map((p, i) => (
            <Reveal key={p.title + p.year} index={i} className="h-full">
              <WorkCard p={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
