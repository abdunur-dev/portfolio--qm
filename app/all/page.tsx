import { SiteNav } from "@/components/site-nav"
import { ProjectCard } from "@/components/project-card"
import { projectsByYear } from "@/lib/projects-data"
import { AnimatedHeading } from "@/components/animated-heading"
import { FadeUp } from "@/components/fade-up"
import { FloatingSparkle } from "@/components/floating-sparkle"
import { AuroraBackground } from "@/components/aurora-background"

export default function AllProjectsPage() {
  return (
    <div className="relative min-h-screen">
      <AuroraBackground />
      <div className="relative z-10">
        <SiteNav />

        <main className="mx-auto w-full max-w-3xl px-5 pb-20 sm:px-6 sm:pb-24">
        {/* Heading */}
        <section className="mt-6 mb-16">
          <AnimatedHeading
            segments={[
              { text: "pro", tone: "solid" },
              { text: "j", tone: "muted" },
              { text: "ec", tone: "solid" },
              { text: "ts", tone: "muted" },
              { text: ".", tone: "accent" },
            ]}
          />

          <FadeUp delay={0.35}>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-foreground/70">
              Things I&apos;ve built across work, side quests, and experiments —
              mostly Web3, full-stack, and the occasional whimsical detour{" "}
              <FloatingSparkle />
            </p>
          </FadeUp>
        </section>

        {/* Year sections */}
        <div className="flex flex-col gap-20">
          {projectsByYear.map((group) => (
            <section
              key={group.year}
              className="grid grid-cols-1 gap-8 sm:grid-cols-[6rem_1fr] sm:gap-10"
            >
              <FadeUp className="sm:sticky sm:top-8 sm:self-start">
                <h2 className="font-mono text-sm tracking-[0.2em] text-muted-foreground">
                  {group.year}
                </h2>
                <span
                  aria-hidden
                  className="mt-3 hidden h-px w-10 bg-primary/60 sm:block"
                />
              </FadeUp>

              <div className="flex flex-col gap-10">
                {group.projects.map((project, i) => (
                  <ProjectCard
                    key={project.title}
                    project={project}
                    index={i}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Footer */}
        <FadeUp as="section" className="mt-24 border-t border-border/60 pt-6">
          <p className="font-mono text-xs text-muted-foreground">
            © 2026 burhan_ — let&apos;s build something{" "}
            <span className="font-serif italic text-foreground/80">amazing</span>{" "}
            <FloatingSparkle delay={1.2} />
          </p>
        </FadeUp>
        </main>
      </div>
    </div>
  )
}
