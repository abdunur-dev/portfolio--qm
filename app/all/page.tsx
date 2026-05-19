import { SiteNav } from "@/components/site-nav"
import { ProjectCard } from "@/components/project-card"
import { projectsByYear } from "@/lib/projects-data"

export default function AllProjectsPage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />

      <main className="mx-auto w-full max-w-3xl px-6 pb-24">
        {/* Heading */}
        <section className="mt-6 mb-16">
          <h1 className="font-serif text-6xl leading-none tracking-tight text-foreground sm:text-7xl">
            projects
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-foreground/70">
            Things I&apos;ve built across work, side quests, and experiments —
            mostly Web3, full-stack, and the occasional whimsical detour
            <span className="font-serif italic"> ✦</span>
          </p>
        </section>

        {/* Year sections */}
        <div className="flex flex-col gap-20">
          {projectsByYear.map((group) => (
            <section
              key={group.year}
              className="grid grid-cols-1 gap-8 sm:grid-cols-[6rem_1fr] sm:gap-10"
            >
              <div className="sm:sticky sm:top-8 sm:self-start">
                <h2 className="font-mono text-sm tracking-wider text-muted-foreground">
                  {group.year}
                </h2>
              </div>

              <div className="flex flex-col gap-10">
                {group.projects.map((project) => (
                  <ProjectCard key={project.title} project={project} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Footer */}
        <footer className="mt-24 border-t border-border/60 pt-6">
          <p className="font-mono text-xs text-muted-foreground">
            © 2026 burhan_ — let&apos;s build something{" "}
            <span className="font-serif italic text-foreground/80">amazing</span>
          </p>
        </footer>
      </main>
    </div>
  )
}
