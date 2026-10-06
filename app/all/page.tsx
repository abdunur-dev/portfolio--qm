import type { Metadata } from "next"
import { FolioShell, PageTitle, stagger } from "@/components/folio/ui"
import { getProjects, groupByYear } from "@/lib/content"
import { ArrowUpRight } from "lucide-react"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Projects · Abdurhaman Nur",
  description: "Things I've built across work, side quests, hackathons and experiments.",
}

export default async function AllProjectsPage() {
  const projects = await getProjects()
  const groups = groupByYear(projects, (p) => p.year)
  let n = 0

  return (
    <FolioShell back={{ href: "/", label: "Home" }}>
      <PageTitle
        title="Projects"
        intro="Things I've built across work, side quests, hackathons and the occasional whimsical detour."
      />

      <div className="mt-12 flex flex-col gap-12">
        {groups.map(({ year, items }) => (
          <section key={year} className="flex flex-col gap-2">
            <h2 className="folio-in font-serif text-lg italic text-muted-foreground/70" style={stagger(n++)}>
              {year}
            </h2>

            <ul className="flex flex-col">
              {items.map((p) => {
                const TitleTag = p.href ? "a" : "span"
                return (
                  <li
                    key={p.title}
                    className="folio-in flex gap-5 border-b border-border/60 py-5"
                    style={stagger(n++)}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-4">
                        <TitleTag
                          {...(p.href ? { href: p.href, target: "_blank", rel: "noopener noreferrer" } : {})}
                          className="group inline-flex items-center gap-1 font-medium text-highlighted decoration-primary underline-offset-4 hover:underline"
                        >
                          {p.title}
                          {p.href && (
                            <ArrowUpRight className="size-3.5 text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          )}
                        </TitleTag>
                        <span className="shrink-0 text-sm text-muted-foreground/60">{p.kind}</span>
                      </div>

                      {p.description && (
                        <p className="mt-1.5 text-pretty text-sm/6 text-muted-foreground first-letter:uppercase">
                          {p.description}
                        </p>
                      )}

                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs">
                        {p.stack.length > 0 && (
                          <span className="text-muted-foreground/60">{p.stack.join(" · ")}</span>
                        )}

                        {/* Direct links badges */}
                        {p.links && p.links.length > 0 && (
                          <div className="flex flex-wrap items-center gap-2">
                            {p.links.map((l) => (
                              <a
                                key={l.href + l.label}
                                href={l.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 rounded bg-secondary/80 px-2 py-0.5 font-medium text-foreground transition-colors hover:bg-primary/20 hover:text-primary"
                              >
                                <span>{l.label.replace(/\s*↗$/, "")}</span>
                                <ArrowUpRight className="size-3" />
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {p.cover_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.cover_url}
                        alt=""
                        className="hidden size-20 shrink-0 rounded-sm border border-border/60 object-cover sm:block"
                      />
                    )}
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </div>
    </FolioShell>
  )
}
