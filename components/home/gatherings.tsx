import Link from "next/link"
import { gatherings } from "@/lib/gatherings-data"

export function Gatherings() {
  return (
    <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {gatherings.map((g, i) => (
        <li
          key={g.slug}
          className="folio-in group relative flex flex-col gap-3 rounded-lg border border-border/80 bg-card/70 p-4 backdrop-blur-sm transition-colors hover:border-primary/50"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <div className="flex flex-col gap-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/70">
            <span className="text-primary/80">{g.partner}</span>
            <span>{g.date}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-4xl leading-none tracking-tight text-highlighted">{g.stat}</span>
            <span className="mt-1 font-mono text-[11px] text-muted-foreground">{g.statLabel}</span>
          </div>
          <div className="mt-auto flex flex-col gap-1 border-t border-border/60 pt-3">
            <h3 className="text-sm font-medium text-highlighted transition-colors group-hover:text-primary">
              <Link
                href={`/writing/${g.slug}`}
                className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
              >
                {g.name}
              </Link>
            </h3>
            <p className="text-pretty text-xs leading-relaxed text-muted-foreground">{g.note}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
