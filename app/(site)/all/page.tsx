import type { Metadata } from "next"
import { FolioShell, PageTitle, stagger } from "@/components/folio/ui"
import { ProjectEntry } from "@/components/minimal/entry"
import { getProjects, groupByYear } from "@/lib/content"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Projects · Abdurhaman Nur",
  description: "Things I've built across work, side quests, hackathons and experiments.",
}

export default async function AllProjectsPage() {
  const projects = await getProjects()
  const groups = groupByYear(projects, (p) => p.year)
  let n = 2

  return (
    <FolioShell>
      <PageTitle
        title="Projects"
        kicker="Seek · Build"
        glyph="{ }"
        intro="Things I've built across work, side quests, hackathons and the occasional whimsical detour."
      />

      {projects.length === 0 && <p className="text-sm text-muted-foreground">Nothing here yet.</p>}

      <div className="flex flex-col gap-12">
        {groups.map(({ year, items }) => (
          <section key={year} className="flex flex-col gap-6">
            <h2
              className="folio-in flex items-center gap-3 text-sm font-medium tabular-nums text-muted-foreground after:h-px after:flex-1 after:bg-border"
              style={stagger(n++)}
            >
              {year}
            </h2>
            <div className="flex flex-col divide-y divide-dashed">
              {items.map((p) => (
                <div key={p.title} className="folio-in py-6 first:pt-0 last:pb-0" style={stagger(n++)}>
                  <ProjectEntry p={p} full />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </FolioShell>
  )
}
