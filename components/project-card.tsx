"use client"

import { ArrowUpRight } from "lucide-react"
import { motion } from "motion/react"
import type { Project } from "@/lib/projects-data"

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative"
    >
      {/* Animated left rail */}
      <span
        aria-hidden
        className="absolute left-0 top-0 h-full w-px bg-border/60"
      />
      <span
        aria-hidden
        className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-primary transition-transform duration-500 ease-out group-hover:scale-y-100"
      />

      <div className="flex flex-col gap-2 pl-5 py-1">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="font-serif text-xl leading-tight tracking-tight text-foreground text-balance transition-colors duration-300 group-hover:text-primary sm:text-2xl">
            {project.title}
          </h3>
          <span className="rounded-md border border-border/70 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition-colors duration-300 group-hover:border-primary/40 group-hover:text-primary/80">
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
                className="group/link inline-flex items-center gap-1 text-sm text-foreground"
              >
                <span className="relative">
                  {link.label}
                  <span
                    aria-hidden
                    className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover/link:scale-x-100"
                  />
                  <span
                    aria-hidden
                    className="absolute -bottom-0.5 left-0 h-px w-full bg-foreground/30"
                  />
                </span>
                <ArrowUpRight
                  className="size-3.5 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-primary"
                  aria-hidden
                />
              </a>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  )
}
