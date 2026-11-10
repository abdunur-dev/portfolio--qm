import { skills, technology, tools } from "@/lib/cv-data"

export const stackGroups = [
  { label: "Build with", items: technology },
  { label: "Work in", items: tools },
  { label: "Practice", items: skills.filter((s) => !technology.some((t) => s.includes(t) || t.includes(s))) },
]

export function Stack() {
  return (
    <dl className="flex flex-col gap-5">
      {stackGroups.map((g) => (
        <div key={g.label} className="grid grid-cols-1 gap-2 sm:grid-cols-[7rem_1fr] sm:gap-4">
          <dt className="pt-1 font-mono text-[11px] uppercase tracking-wider text-muted-foreground/70">{g.label}</dt>
          <dd>
            <ul className="flex flex-wrap gap-1.5">
              {g.items.map((t) => (
                <li
                  key={t}
                  className="rounded-sm border border-border/80 bg-card/60 px-2 py-1 font-mono text-[11px] text-foreground/85 transition-colors hover:border-primary/50 hover:text-highlighted"
                >
                  {t}
                </li>
              ))}
            </ul>
          </dd>
        </div>
      ))}
    </dl>
  )
}
