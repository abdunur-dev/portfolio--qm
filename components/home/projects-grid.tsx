import Link from "next/link"
import { ProjectCover } from "@/components/folio/project-cover"
import type { FolioProject } from "@/lib/content"

function sentence(text: string) {
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : text
}

function ProjectCard({ p, featured = false, i }: { p: FolioProject; featured?: boolean; i: number }) {
  const href = p.href ?? "/all"
  const external = !href.startsWith("/")
  return (
    <article
      className={`folio-in group relative flex flex-col overflow-hidden rounded-lg border border-border/80 bg-card/70 backdrop-blur-sm transition-colors hover:border-primary/50 ${
        featured ? "sm:col-span-2" : ""
      }`}
      style={{ animationDelay: `${i * 60}ms` }}
    >
      <div className={`relative overflow-hidden border-b border-border/60 ${featured ? "h-40 sm:h-48" : "h-28"}`}>
        <ProjectCover seed={p.title} intensity={featured ? 0.8 : 0.65} />
        <span className="absolute left-3 top-3 rounded-sm border border-border/60 bg-background/80 px-1.5 py-0.5 font-mono text-[10px] tabular-nums text-muted-foreground backdrop-blur-sm">
          {p.year}
        </span>
      </div>

      <div className={`flex flex-1 flex-col gap-2 ${featured ? "p-5" : "p-4"}`}>
        <h3
          className={
            featured
              ? "font-serif text-2xl tracking-tight text-highlighted"
              : "font-medium text-highlighted"
          }
        >
          <Link
            href={href}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {p.title}
          </Link>
        </h3>
        {p.description && (
          <p
            className={`text-pretty text-sm leading-relaxed text-muted-foreground ${
              featured ? "line-clamp-3" : "line-clamp-2"
            }`}
          >
            {sentence(p.description)}
          </p>
        )}
        <div className="mt-auto flex items-end justify-between gap-3 pt-2">
          <p className="min-w-0 truncate font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
            {p.stack.slice(0, featured ? 4 : 3).join(" / ")}
          </p>
          {p.links.length > 0 && (
            <div className="relative z-10 flex shrink-0 gap-3 text-xs">
              {p.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-highlighted transition-colors hover:text-primary"
                >
                  {l.label} <span aria-hidden className="text-primary">↗</span>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export function ProjectsGrid({ projects }: { projects: FolioProject[] }) {
  const [first, ...rest] = projects
  if (!first) return null
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <ProjectCard p={first} featured i={0} />
      {rest.map((p, i) => (
        <ProjectCard key={p.title + p.year} p={p} i={i + 1} />
      ))}
    </div>
  )
}
