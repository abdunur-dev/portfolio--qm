import Link from "next/link"
import { gatherings } from "@/lib/gatherings-data"
import { Reveal } from "@/components/folio/motion"

export function Gatherings() {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-5">
      {gatherings.map((g, i) => (
        <li key={g.slug}>
        <Reveal index={i} className="h-full">
        <div className="group relative flex h-full flex-col border border-border bg-card transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-highlighted">
          <div className="flex">
            <span className="border-r border-b border-border px-1.5 py-[3px] text-[10px] leading-none text-foreground">
              {g.partner}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center gap-1 px-4 py-8 text-center">
            <span className="font-display text-4xl font-extrabold leading-none tracking-tight text-highlighted">{g.stat}</span>
            <span className="text-[10px] text-muted-foreground">{g.statLabel}</span>
          </div>
          <div className="mt-auto grid grid-cols-[1fr_auto] border-t border-border">
            <div className="flex min-w-0 flex-col gap-1 px-3 py-3">
              <h3 className="text-[13px] text-highlighted">
                <Link
                  href={`/writing/${g.slug}`}
                  className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
                >
                  {g.name}
                </Link>
              </h3>
              <p className="text-[10px] text-muted-foreground">{g.date}</p>
            </div>
            <span
              aria-hidden
              className="flex w-12 items-center justify-center border-l border-border text-highlighted transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
            >
              →
            </span>
          </div>
        </div>
        </Reveal>
        </li>
      ))}
    </ul>
  )
}
