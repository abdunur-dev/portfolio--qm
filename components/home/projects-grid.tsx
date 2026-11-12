"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { Search } from "lucide-react"
import type { FolioProject } from "@/lib/content"
import { MoreLink, SectionTitle } from "@/components/folio/ui"
import { Reveal } from "@/components/folio/motion"

function sentence(text: string) {
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : text
}

function Cell({ value, label, className = "" }: { value: string; label: string; className?: string }) {
  return (
    <div className={`flex min-w-0 flex-col gap-1 px-3 py-3 ${className}`}>
      <span className="truncate text-[13px] text-highlighted">{value || "—"}</span>
      <span className="text-[10px] text-muted-foreground">{label}</span>
    </div>
  )
}

function ProjectCard({ p, i }: { p: FolioProject; i: number }) {
  const href = p.href ?? p.links[0]?.href ?? "/all"
  const external = !href.startsWith("/")

  return (
    <article
      className="group relative flex h-full flex-col border border-border bg-card transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-highlighted"
    >
      <span className="absolute left-1.5 top-1.5 z-10 border border-border bg-card px-1.5 py-[3px] text-[10px] leading-none text-foreground">
        {p.kind || "Project"}
      </span>

      {/* Title plate */}
      <div className="relative flex h-40 flex-col items-center justify-center gap-2 overflow-hidden px-6 text-center">
        {p.cover_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={p.cover_url}
            alt=""
            className="absolute inset-0 size-full object-cover opacity-0 grayscale transition-opacity duration-500 group-hover:opacity-15"
          />
        )}
        <h3 className="relative font-display text-2xl font-bold leading-tight tracking-tight text-highlighted">
          {p.title}
        </h3>
        {p.description && (
          <p className="relative line-clamp-2 max-w-[24ch] text-[10px] leading-relaxed text-muted-foreground">
            {sentence(p.description)}
          </p>
        )}
      </div>

      {/* Stats + arrow */}
      <div className="grid grid-cols-[1fr_auto] border-t border-border">
        <div className="grid grid-cols-2">
          <Cell value={p.year} label="Year" className="border-r border-b border-border" />
          <Cell value={p.stack[0] ?? ""} label="Stack" className="border-b border-border" />
          <Cell value={p.stack[1] ?? ""} label="With" className="border-r border-border" />
          <Cell value={String(p.links.length || (p.href ? 1 : 0))} label="Links" />
        </div>
        <Link
          href={href}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          aria-label={`Open ${p.title}`}
          className="flex w-12 items-center justify-center border-l border-border text-highlighted transition-colors after:absolute after:inset-0 after:content-[''] hover:bg-primary hover:text-primary-foreground group-hover:bg-primary group-hover:text-primary-foreground"
        >
          →
        </Link>
      </div>
    </article>
  )
}

export function ProjectsGrid({
  projects,
  limit,
  index = 1,
}: {
  projects: FolioProject[]
  limit?: number
  index?: number
}) {
  const kinds = useMemo(() => {
    const seen = new Set<string>()
    for (const p of projects) if (p.kind) seen.add(p.kind)
    return ["All", ...Array.from(seen).slice(0, 4)]
  }, [projects])

  const [kind, setKind] = useState("All")
  const [q, setQ] = useState("")

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase()
    return projects.filter((p) => {
      if (kind !== "All" && p.kind !== kind) return false
      if (!needle) return true
      return [p.title, p.description, p.kind, ...p.stack].join(" ").toLowerCase().includes(needle)
    })
  }, [projects, kind, q])

  const shown = limit ? filtered.slice(0, limit) : filtered

  return (
    <section className="border-b border-border">
      <div className="px-5 pt-10 sm:px-8 sm:pt-12">
        <SectionTitle index={index} meta={`${projects.length} shipped`} action={<MoreLink href="/all">All projects</MoreLink>}>
          Projects
        </SectionTitle>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col gap-3 border-b border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div role="tablist" aria-label="Filter projects" className="flex flex-wrap gap-1.5">
          {kinds.map((k) => (
            <button
              key={k}
              type="button"
              role="tab"
              aria-selected={kind === k}
              onClick={() => setKind(k)}
              className={`border px-2.5 py-1.5 text-[11px] leading-none transition-colors ${
                kind === k
                  ? "border-highlighted bg-highlighted text-background"
                  : "border-border bg-card text-foreground hover:border-highlighted"
              }`}
            >
              {k}
            </button>
          ))}
        </div>
        <label className="flex w-full items-center gap-2 border border-border bg-card px-2.5 py-1.5 text-[11px] focus-within:border-highlighted sm:w-72">
          <Search aria-hidden className="size-3.5 text-muted-foreground" />
          <span className="sr-only">Search projects</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search"
            className="w-full bg-transparent text-highlighted outline-none placeholder:text-muted-foreground"
          />
        </label>
      </div>

      {/* Cards */}
      <div className="px-5 py-8 sm:px-8 sm:py-10">
        {shown.length === 0 ? (
          <p className="py-10 text-center text-xs text-muted-foreground">Nothing matches that filter.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {shown.map((p, i) => (
              <Reveal key={`${kind}-${q}-${p.title}${p.year}`} index={i % 3}>
                <ProjectCard p={p} i={i} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
