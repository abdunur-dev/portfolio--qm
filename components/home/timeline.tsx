import type { CvEntry } from "@/lib/cv-data"
import { Reveal } from "@/components/folio/motion"

export function Timeline({ items }: { items: CvEntry[] }) {
  return (
    <ol className="flex flex-col border-t border-border">
      {items.map((e, i) => {
        const current = /now/i.test(e.range)
        return (
          <li key={e.title + e.range} className="border-b border-border">
          <Reveal index={i} className="grid gap-1 py-4 sm:grid-cols-[7rem_1fr] sm:gap-4">
            <span className="flex items-start gap-2 pt-0.5 text-[11px] tabular-nums text-muted-foreground">
              <span aria-hidden className={`mt-[5px] size-1.5 shrink-0 ${current ? "bg-primary" : "bg-border"}`} />
              {e.range}
            </span>
            <div className="flex flex-col gap-1">
              <h3 className="text-[13px] font-medium text-highlighted">
                {e.href ? (
                  <a href={e.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">
                    {e.title}
                  </a>
                ) : (
                  e.title
                )}
              </h3>
              {e.org && <p className="text-[11px] text-foreground">{e.org}</p>}
              {e.desc && <p className="line-clamp-2 text-pretty text-[11px] leading-relaxed text-muted-foreground">{e.desc}</p>}
            </div>
          </Reveal>
          </li>
        )
      })}
    </ol>
  )
}
