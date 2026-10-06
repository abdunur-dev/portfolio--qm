import { ThemeToggle } from "@/components/theme-toggle"
import { SiteFooter } from "@/components/site-footer"
import { ProjectCard } from "@/components/project-card"
import { projectsByYear as staticByYear, type Project, type ProjectYear } from "@/lib/projects-data"
import { AnimatedHeading } from "@/components/animated-heading"
import { FadeUp } from "@/components/fade-up"
import { FloatingSparkle } from "@/components/floating-sparkle"
import { AuroraBackground } from "@/components/aurora-background"
import { createClient } from "@/lib/supabase/server"
import type { Project as DbProject } from "@/lib/types"

export const dynamic = "force-dynamic"

function dbToCard(p: DbProject): Project {
  const links: { label: string; href: string }[] = []
  if (p.live_url) links.push({ label: "Live", href: p.live_url })
  if (p.repo_url) links.push({ label: "Repo", href: p.repo_url })
  return {
    title: p.title,
    kind: p.kind,
    description: p.description || "",
    stack: p.stack ?? [],
    cover_url: p.cover_url,
    links: links.length ? links : undefined,
  }
}

export default async function AllProjectsPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("year", { ascending: false })
    .order("position", { ascending: true })
    .order("created_at", { ascending: false })

  const dbProjects = (data ?? []) as DbProject[]

  const groups: ProjectYear[] =
    dbProjects.length > 0
      ? Object.entries(
          dbProjects.reduce<Record<string, Project[]>>((acc, p) => {
            const key = String(p.year)
            ;(acc[key] ||= []).push(dbToCard(p))
            return acc
          }, {}),
        )
          .map(([year, projects]) => ({ year, projects }))
          .sort((a, b) => Number(b.year) - Number(a.year))
      : staticByYear

  return (
    <div className="ana-page relative min-h-screen">
      <AuroraBackground />
      <div className="relative z-10">
        <div className="fixed right-5 top-5 z-40"><ThemeToggle /></div>

        <main className="mx-auto w-full max-w-[560px] px-5 pb-20 pt-16 sm:px-0 sm:pt-20 sm:pb-24">
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
              Things I&apos;ve built across work, side quests, and the
              occasional whimsical detour{" "}
              <FloatingSparkle />
            </p>
          </FadeUp>
        </section>

        {/* Year sections */}
        <div className="flex flex-col gap-20">
          {groups.map((group) => (
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
                    key={`${group.year}-${project.title}`}
                    project={project}
                    index={i}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        </main>
        <SiteFooter />
      </div>
    </div>
  )
}
