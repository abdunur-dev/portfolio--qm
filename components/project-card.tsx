import { ArrowUpRight } from "lucide-react"
import type { Project } from "@/lib/projects-data"

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group relative">
      <div className="flex flex-col gap-2 border-l border-border/60 pl-5 py-1 transition-colors hover:border-foreground/40">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="font-serif text-2xl leading-tight tracking-tight text-foreground text-balance">
            {project.title}
          </h3>
          <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
            {project.kind}
          </span>
        </div>

        <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-foreground/75">
          {project.description}
        </p>

        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-muted-foreground">
          {project.stack.map((tech, i) => (
            <span key={tech} className="flex items-center gap-2">
              <span>{tech}</span>
              {i < project.stack.length - 1 && (
                <span aria-hidden className="text-muted-foreground/50">
                  ·
                </span>
              )}
            </span>
          ))}
        </div>

        {project.links && project.links.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors hover:decoration-foreground"
              >
                {link.label}
                <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
