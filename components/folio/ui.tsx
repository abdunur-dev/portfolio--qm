import Link from "next/link"
import type { CSSProperties, ReactNode } from "react"
import { ThemeDot } from "@/components/folio/theme-dot"
import { AmbientDitherBg } from "@/components/folio/ambient-dither-bg"

/* -------------------------------------------------------------------------- */
/*  Layout primitives for the hugorcd.com-inspired design                     */
/* -------------------------------------------------------------------------- */

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/all", label: "Projects" },
  { href: "/writing", label: "Writing" },
  { href: "/cv", label: "CV" },
]

/**
 * Page shell: single narrow column, tiny theme dot top-right,
 * optional back link, quiet footer.
 */
export function FolioShell({
  children,
  back,
  wide = false,
  className = "",
}: {
  children: ReactNode
  back?: { href: string; label: string }
  wide?: boolean
  className?: string
}) {
  return (
    <div className="relative min-h-dvh w-full overflow-x-clip isolate bg-background">
      <AmbientDitherBg />
      <ThemeDot />
      <main
        id="main"
        className={`relative z-10 mx-auto flex min-h-dvh w-full flex-col px-5 pt-44 pb-10 sm:px-6 sm:pt-52 sm:pb-20 ${
          wide ? "max-w-2xl" : "max-w-xl"
        } ${className}`}
      >
        {back && (
          <Link
            href={back.href}
            className="folio-in mb-10 inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground/70 transition-colors hover:text-highlighted print:hidden"
          >
            <span aria-hidden>←</span> {back.label}
          </Link>
        )}
        <div className="flex-1">{children}</div>
        <FolioFooter />
      </main>
    </div>
  )
}

function FolioFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="mt-20 flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground/50 print:hidden">
      <span>© {year} Abdurhaman Nur</span>
      <nav aria-label="Footer" className="flex gap-4">
        {footerLinks.map((l) => (
          <Link key={l.href} href={l.href} className="transition-colors hover:text-highlighted">
            {l.label}
          </Link>
        ))}
      </nav>
    </footer>
  )
}

/** Section heading with quiet baseline border and confident serif tone.
 *  Pass `index` for a numbered heading ("01") and `meta` for a quiet mono note on the right. */
export function SectionTitle({
  children,
  as: Tag = "h2",
  action,
  index,
  meta,
  id,
}: {
  children: ReactNode
  as?: "h1" | "h2" | "h3"
  action?: ReactNode
  index?: number
  meta?: ReactNode
  id?: string
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-border/80 pb-2">
      <Tag id={id} className="flex items-baseline gap-2.5 font-serif text-xl tracking-tight text-highlighted">
        {index !== undefined && (
          <span className="font-mono text-[11px] tabular-nums tracking-normal text-primary" aria-hidden>
            {String(index).padStart(2, "0")}
          </span>
        )}
        {children}
      </Tag>
      <div className="flex items-baseline gap-3">
        {meta && (
          <span className="hidden font-mono text-[11px] uppercase tracking-wider text-muted-foreground/60 sm:inline">
            {meta}
          </span>
        )}
        {action}
      </div>
    </div>
  )
}

/** Big page title used at the top of sub-pages. */
export function PageTitle({ title, intro }: { title: string; intro?: ReactNode }) {
  return (
    <header className="folio-in flex flex-col gap-3 border-b border-border/80 pb-6 mb-8">
      <h1 className="font-serif text-3xl sm:text-4xl tracking-tight text-highlighted">
        {title}
      </h1>
      {intro && <p className="max-w-prose text-pretty text-base text-muted-foreground">{intro}</p>}
    </header>
  )
}

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`flex flex-col gap-4 ${className}`}>{children}</section>
}

/** Stagger helper — returns the inline style for the nth animated row. */
export function stagger(i: number, step = 40): CSSProperties {
  return { animationDelay: `${i * step}ms` }
}

/**
 * A single list row: bold title on the left, muted meta on the right.
 * Renders a Next <Link> for internal hrefs, <a> for external, or a <div>.
 */
export function Row({
  href,
  title,
  sub,
  meta,
  index = 0,
}: {
  href?: string | null
  title: ReactNode
  sub?: ReactNode
  meta?: ReactNode
  index?: number
}) {
  const isExternal = Boolean(href && !href.startsWith("/"))
  const inner = (
    <>
      <span className="flex min-w-0 items-baseline gap-2">
        <span
          className={`truncate font-medium text-highlighted decoration-primary underline-offset-4 ${
            href ? "group-hover:underline" : ""
          }`}
        >
          {title}
        </span>
        {isExternal && (
          <span className="text-xs text-primary/80 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            ↗
          </span>
        )}
        {sub && <span className="hidden truncate text-sm text-muted-foreground sm:inline">{sub}</span>}
      </span>
      {meta && <span className="shrink-0 text-right text-sm text-muted-foreground/60">{meta}</span>}
    </>
  )

  const cls = "folio-in group flex items-baseline justify-between gap-4 py-2"

  if (!href) {
    return (
      <div className={cls} style={stagger(index)}>
        {inner}
      </div>
    )
  }
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={cls} style={stagger(index)}>
        {inner}
      </Link>
    )
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls} style={stagger(index)}>
      {inner}
    </a>
  )
}

/** Subtle view link without trailing arrow gimmick. */
export function MoreLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="w-fit text-xs font-mono text-muted-foreground/80 transition-colors hover:text-primary hover:underline underline-offset-4"
    >
      {children}
    </Link>
  )
}

/** Inline highlighted link with a green underline (used inside prose). */
export function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  const external = !href.startsWith("/")
  const cls =
    "border-b border-primary font-medium text-highlighted transition-colors hover:border-highlighted"
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  )
}
