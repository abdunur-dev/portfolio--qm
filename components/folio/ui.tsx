import Link from "next/link"
import type { CSSProperties, ReactNode } from "react"
import { LabHeader } from "@/components/folio/lab-header"
import { Reveal, Typewriter } from "@/components/folio/motion"

/* -------------------------------------------------------------------------- */
/*  "Lab grid" layout primitives                                              */
/*  Hairline-ruled panels on concrete grey, squared display type,             */
/*  monospace UI copy, signal-orange accents.                                 */
/* -------------------------------------------------------------------------- */

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/all", label: "Projects" },
  { href: "/writing", label: "Writing" },
  { href: "/cv", label: "CV" },
]

/** Faint vertical column rules that run behind the transparent panels. */
function GridGuides() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 hidden md:grid md:grid-cols-4">
      <span className="border-r border-grid-line" />
      <span className="border-r border-grid-line" />
      <span className="border-r border-grid-line" />
      <span />
    </div>
  )
}

/**
 * Page shell: a ruled frame with header, content and CTA footer.
 * - `bleed`: children span the full frame width (home page panels).
 * - otherwise children sit in a centred reading column (`wide` = a bit wider).
 */
export function FolioShell({
  children,
  back,
  wide = false,
  bleed = false,
  className = "",
}: {
  children: ReactNode
  back?: { href: string; label: string }
  wide?: boolean
  bleed?: boolean
  className?: string
}) {
  return (
    <div className="relative min-h-dvh w-full overflow-x-clip bg-background">
      <div className="relative mx-auto flex min-h-dvh w-full max-w-6xl flex-col border-x border-border">
        <GridGuides />
        <div className="relative z-10 flex min-h-dvh flex-col">
          <LabHeader back={back} />
          <main id="main" className={`flex-1 ${className}`}>
            {bleed ? (
              children
            ) : (
              <div className={`mx-auto w-full px-5 py-12 sm:px-8 sm:py-16 ${wide ? "max-w-3xl" : "max-w-2xl"}`}>
                {children}
              </div>
            )}
          </main>
          <CtaFooter />
        </div>
      </div>
    </div>
  )
}

/** Small square with an "x" — decorative registration mark on panel edges. */
export function CrossMark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`flex size-6 items-center justify-center border border-border bg-background text-[10px] leading-none text-muted-foreground/70 ${className}`}
    >
      ×
    </span>
  )
}

/** Bordered micro-label, e.g. "Incubation". `tone="accent"` for the orange "New" chip. */
export function Tag({
  children,
  tone = "default",
  className = "",
}: {
  children: ReactNode
  tone?: "default" | "accent" | "ink"
  className?: string
}) {
  const tones = {
    default: "border-border bg-card text-foreground",
    accent: "border-primary bg-primary text-primary-foreground",
    ink: "border-highlighted bg-highlighted text-background",
  }
  return (
    <span className={`inline-flex items-center border px-1.5 py-[3px] text-[10px] leading-none ${tones[tone]} ${className}`}>
      {children}
    </span>
  )
}

/** Chamfered orange button (solid) or outlined variant. */
export function LabButton({
  href,
  children,
  variant = "solid",
  className = "",
}: {
  href: string
  children: ReactNode
  variant?: "solid" | "outline"
  className?: string
}) {
  const external = !href.startsWith("/")
  const cls =
    variant === "solid"
      ? "lab-chamfer bg-primary text-primary-foreground hover:bg-highlighted hover:text-background"
      : "border border-primary text-foreground hover:bg-primary hover:text-primary-foreground"
  const all = `inline-flex items-center justify-center px-6 py-3 text-[11px] font-medium uppercase tracking-wider transition-colors ${cls} ${className}`
  return external ? (
    <a href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel="noopener noreferrer" className={all}>
      {children}
    </a>
  ) : (
    <Link href={href} className={all}>
      {children}
    </Link>
  )
}

function CtaFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="print:hidden">
      {/* Call to action band */}
      <div className="relative grid border-t border-border md:grid-cols-[1fr_1fr]">
        <CrossMark className="absolute -top-px left-0" />
        <div className="flex flex-col justify-center gap-1.5 px-6 py-10 sm:px-10">
          <p className="flex items-center gap-2 text-xs uppercase tracking-wide text-highlighted">
            <span aria-hidden className="text-[9px]">▶</span> <Typewriter text="Ready to discuss" caret={false} speed={45} />
          </p>
          <p>
            <span className="bg-highlighted px-1.5 py-0.5 text-xs uppercase tracking-wide text-background">
              <Typewriter text="your project?" delay={800} speed={60} />
            </span>
          </p>
        </div>
        <div className="flex flex-col items-stretch justify-center gap-3 border-t border-border px-6 py-8 sm:px-10 md:items-end md:border-t-0 md:border-l">
          <LabButton href="mailto:abdurhamannur894@gmail.com" className="md:w-64">
            Start a conversation
          </LabButton>
          <LabButton href="/cv" variant="outline" className="md:w-64">
            Read my CV
          </LabButton>
        </div>
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border px-6 py-4 text-[11px] text-muted-foreground sm:px-10">
        <span>© {year} Abdurhaman Nur · Built in Addis Ababa</span>
        <nav aria-label="Footer" className="flex gap-5">
          {footerLinks.map((l) => (
            <Link key={l.href} href={l.href} className="transition-colors hover:text-primary">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}

/**
 * Section heading row. Pass `index` for a numbered heading ("01") and
 * `meta` for a quiet note on the right.
 */
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
    <div className="flex items-end justify-between gap-4 border-b border-border pb-3">
      <Tag id={id} className="flex items-baseline gap-3 font-display text-xl font-semibold uppercase tracking-wide text-highlighted sm:text-2xl">
        {index !== undefined && (
          <span className="font-mono text-[11px] font-normal tabular-nums tracking-normal text-primary" aria-hidden>
            {String(index).padStart(2, "0")}
          </span>
        )}
        {typeof children === "string" ? <Typewriter text={children} speed={65} /> : children}
      </Tag>
      <div className="flex items-baseline gap-4">
        {meta && <span className="hidden text-[11px] text-muted-foreground sm:inline">{meta}</span>}
        {action}
      </div>
    </div>
  )
}

/** Big page title used at the top of sub-pages: chunky display type with a cursor underscore. */
export function PageTitle({ title, intro }: { title: string; intro?: ReactNode }) {
  return (
    <header className="folio-in mb-10 flex flex-col gap-5 border-b border-border pb-8">
      <h1 className="font-display text-5xl font-extrabold uppercase leading-[0.9] tracking-tight text-highlighted sm:text-7xl">
        <Typewriter text={title} speed={80} caret={false} />
        <span className="tw-blink text-primary">_</span>
      </h1>
      {intro && (
        <Reveal index={3}>
        <p className="flex max-w-prose gap-3 text-pretty text-sm leading-relaxed text-foreground">
          <span aria-hidden className="mt-[7px] size-1.5 shrink-0 bg-highlighted" />
          <span>{intro}</span>
        </p>
        </Reveal>
      )}
    </header>
  )
}

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`flex flex-col gap-5 ${className}`}>{children}</section>
}

/** Stagger helper — returns the inline style for the nth animated row. */
export function stagger(i: number, step = 40): CSSProperties {
  return { animationDelay: `${i * step}ms` }
}

/**
 * A single list row: title on the left, muted meta on the right.
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
        <span className={`truncate font-medium text-highlighted ${href ? "group-hover:text-primary" : ""}`}>{title}</span>
        {isExternal && <span className="text-xs text-primary">↗</span>}
        {sub && <span className="hidden truncate text-sm text-muted-foreground sm:inline">{sub}</span>}
      </span>
      {meta && <span className="shrink-0 text-right text-xs text-muted-foreground">{meta}</span>}
    </>
  )

  const cls = "folio-in group flex items-baseline justify-between gap-4 border-b border-border py-3"

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

/** Small "view all" link with an arrow. */
export function MoreLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex w-fit items-center gap-1.5 border border-border bg-card px-2 py-1 text-[11px] text-foreground transition-colors hover:border-primary hover:text-primary"
    >
      {children}
      <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
    </Link>
  )
}

/** Inline link inside prose: orange underline. */
export function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  const external = !href.startsWith("/")
  const cls = "border-b border-primary font-medium text-highlighted transition-colors hover:text-primary"
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
