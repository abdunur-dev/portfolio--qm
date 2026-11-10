import type { CvEntry } from "@/lib/cv-data"

export function Timeline({ items }: { items: CvEntry[] }) {
  return (
    <ol className="relative ml-1.5 border-l border-border/80">
      {items.map((e, i) => {
        const current = /now/i.test(e.range)
        return (
          <li key={e.title + e.range} className="folio-in relative pb-7 pl-6 last:pb-0" style={{ animationDelay: `${i * 60}ms` }}>
            <span
              aria-hidden
              className={`absolute -left-[5px] top-1.5 size-[9px] rounded-full border-2 ${
                current ? "border-primary bg-primary shadow-[0_0_0_4px_color-mix(in_oklch,var(--primary)_18%,transparent)]" : "border-border bg-background"
              }`}
            />
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[11px] tabular-nums text-muted-foreground/70">
                {e.range}
                {current && <span className="ml-2 text-primary">● current</span>}
              </span>
              <h3 className="font-medium text-highlighted">
                {e.href ? (
                  <a href={e.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-primary">
                    {e.title}
                  </a>
                ) : (
                  e.title
                )}
              </h3>
              {e.org && <p className="text-sm text-foreground/80">{e.org}</p>}
              {e.desc && (
                <p className="line-clamp-2 text-pretty text-sm leading-relaxed text-muted-foreground">{e.desc}</p>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
