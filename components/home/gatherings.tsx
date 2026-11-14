import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { gatherings } from "@/lib/gatherings-data"
import { Reveal } from "@/components/folio/motion"

export function Gatherings() {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {gatherings.map((g, i) => (
        <li key={g.slug}>
          <Reveal index={i} className="h-full">
            <div className="group relative flex h-full flex-col border border-border bg-card transition-colors hover:border-highlighted">
              <div className="flex items-center justify-between border-b border-border px-4 py-2.5 text-[10px] uppercase tracking-wide text-muted-foreground">
                <span>{g.partner}</span>
                <span className="tabular-nums">{g.date}</span>
              </div>
              <div className="flex flex-col gap-2 px-4 py-7">
                <span className="font-display text-6xl uppercase leading-none text-highlighted">{g.stat}</span>
                <span className="text-[10px] uppercase tracking-wide text-muted-foreground">{g.statLabel}</span>
              </div>
              <div className="mt-auto flex items-end justify-between gap-3 border-t border-border px-4 py-3">
                <h3 className="text-[12px] font-medium uppercase text-highlighted">
                  <Link
                    href={`/writing/${g.slug}`}
                    className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                  >
                    {g.name}
                  </Link>
                </h3>
                <ArrowUpRight
                  aria-hidden
                  className="size-5 shrink-0 text-highlighted transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </div>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  )
}
