import { skills, technology, tools } from "@/lib/cv-data"
import { Reveal } from "@/components/folio/motion"

export const stackGroups = [
  { label: "Build with", items: technology },
  { label: "Work in", items: tools },
  { label: "Practice", items: skills.filter((s) => !technology.some((t) => s.includes(t) || t.includes(s))) },
]

export function Stack() {
  return (
    <dl className="flex flex-col border-t border-border">
      {stackGroups.map((g, gi) => (
        <Reveal key={g.label} index={gi} className="flex flex-col gap-3 border-b border-border py-4">
          <dt className="flex items-center gap-2 text-[11px] text-muted-foreground">
            <span aria-hidden className="size-1.5 bg-highlighted" />
            {g.label}
          </dt>
          <dd>
            <ul className="flex flex-wrap gap-1.5">
              {g.items.map((t) => (
                <li
                  key={t}
                  className="border border-border bg-card px-2 py-1 text-[11px] leading-none text-foreground transition-colors hover:border-primary hover:text-highlighted"
                >
                  {t}
                </li>
              ))}
            </ul>
          </dd>
        </Reveal>
      ))}
    </dl>
  )
}
