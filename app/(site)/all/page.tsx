import type { Metadata } from "next"
import { FolioShell, PageTitle, stagger } from "@/components/folio/ui"
import { LedgerRow, SectionMark } from "@/components/minimal/ledger"
import { getProjects, groupByYear } from "@/lib/content"
import { toRoman } from "@/lib/roman"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Projects · Abdurhaman Nur",
  description: "Things I've built across work, side quests, hackathons and experiments.",
}

export default async function AllProjectsPage() {
  const projects = await getProjects()
  const groups = groupByYear(projects, (p) => p.year)
  let count = 0

  return (
    <FolioShell>
      <PageTitle
        title="Projects"
        kicker="Works"
        intro="Things I've built across work, side quests, hackathons and the occasional whimsical detour."
      />

      {projects.length === 0 && <p className="text-sm text-muted-foreground">Nothing here yet.</p>}

      <div className="flex flex-col gap-12 sm:gap-16">
        {groups.map(({ year, items }, g) => (
          <section key={year} className="folio-in flex flex-col" style={stagger(g + 2)}>
            <SectionMark numeral={toRoman(g + 1)} label={year} />
            <ol className="flex flex-col">
              {items.map((p) => {
                count++
                return (
                  <li key={p.title}>
                    <LedgerRow
                      index={String(count).padStart(2, "0")}
                      href={p.href ?? p.links[0]?.href}
                      title={p.title}
                      sub={p.description}
                      meta={p.kind}
                    />
                  </li>
                )
              })}
            </ol>
          </section>
        ))}
      </div>
    </FolioShell>
  )
}
