import Link from "next/link"
import type { ReactNode } from "react"
import { ScrambleText } from "@/components/minimal/scramble-text"
import { externalProps } from "@/components/minimal/entry"

/**
 * Document-style section heading: a roman numeral, the label (decodes when
 * scrolled into view), and a hairline rule running to the edge.
 */
export function SectionMark({ numeral, label, id }: { numeral: string; label: string; id?: string }) {
  return (
    <h2 id={id} className="mb-2 flex items-baseline gap-3 sm:mb-3">
      <span aria-hidden className="w-6 shrink-0 font-display text-sm italic text-muted-foreground/70">
        {numeral}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-foreground">
        <ScrambleText text={label} trigger="view" />
      </span>
      <span aria-hidden className="h-px flex-1 translate-y-[-3px] bg-border" />
    </h2>
  )
}

/** One line of a ledger: title, short note, a dotted leader, and right-hand meta. */
export function LedgerRow({
  href,
  title,
  sub,
  meta,
  index,
}: {
  href?: string
  title: ReactNode
  sub?: ReactNode
  meta?: ReactNode
  /** small gutter number, e.g. "01" */
  index?: string
}) {
  const body = (
    <>
      {/* On phones a long title may wrap (min-w-0); from sm up it stays on one line. */}
      <span className="flex min-w-0 items-baseline sm:shrink-0">
        {index && (
          <span aria-hidden className="w-6 shrink-0 font-mono text-[10px] tabular-nums text-muted-foreground/45 sm:-ml-9 sm:w-9">
            {index}
          </span>
        )}
        <span className="min-w-0 text-pretty font-medium leading-snug text-foreground decoration-foreground/40 underline-offset-4 group-hover:underline">
          {title}
        </span>
      </span>
      {sub && <span className="hidden min-w-0 truncate text-sm text-muted-foreground sm:inline">{sub}</span>}
      <span aria-hidden className="min-w-4 flex-1 translate-y-[-4px] border-b border-dotted border-muted-foreground/35" />
      {meta && (
        <span className="shrink-0 whitespace-nowrap font-mono text-xs tabular-nums text-muted-foreground/80">{meta}</span>
      )}
    </>
  )
  const cls = "group flex items-baseline gap-3 py-2.5 text-[15px] sm:py-2"
  return href ? (
    <Link href={href} {...externalProps(href)} className={`${cls} outline-none focus-visible:underline`}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  )
}

/** Small mono "All projects →" style link that closes a section. */
export function LedgerMore({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="mt-2 inline-block self-start font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground/60 transition-colors hover:text-foreground"
    >
      {children} →
    </Link>
  )
}
