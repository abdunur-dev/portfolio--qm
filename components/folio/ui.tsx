import Link from "next/link"
import type { CSSProperties, ReactNode } from "react"
import { ArrowUpRight } from "lucide-react"
import { LabHeader, LogoMark } from "@/components/folio/lab-header"
import { Reveal, Typewriter } from "@/components/folio/motion"
import { VisitorCounter } from "@/components/visitor-counter"
import { socialLinks } from "@/lib/social-links"

/* -------------------------------------------------------------------------- */
/*  Cyber-brutalist layout primitives                                         */
/*  Monochrome. Hairline panels, condensed display type, mono everything else. */
/* -------------------------------------------------------------------------- */

/**
 * Page shell: header, content and footer inside a ruled frame.
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
      <div className="relative mx-auto flex min-h-dvh w-full max-w-7xl flex-col border-x border-border">
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
        <SiteFooter />
      </div>
    </div>
  )
}

/** A small "+" registration mark. */
export function Plus({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`text-sm leading-none text-muted-foreground ${className}`}>
      +
    </span>
  )
}

/** Kept for compatibility: small boxed "×" mark. */
export function CrossMark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`flex size-6 items-center justify-center border border-border bg-background text-[10px] leading-none text-muted-foreground ${className}`}
    >
      ×
    </span>
  )
}

/** Bordered micro-label. `tone="ink"` for a solid black chip. */
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
    accent: "border-highlighted bg-highlighted text-background",
    ink: "border-highlighted bg-highlighted text-background",
  }
  return (
    <span
      className={`inline-flex items-center border px-1.5 py-[3px] text-[10px] uppercase leading-none tracking-wide ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}

/** Solid black button with an ↗ arrow, or a bare text button with a bracket icon. */
export function LabButton({
  href,
  children,
  variant = "solid",
  className = "",
}: {
  href: string
  children: ReactNode
  variant?: "solid" | "outline" | "ghost"
  className?: string
}) {
  const external = /^(https?:|mailto:)/.test(href)
  const styles = {
    solid: "bg-primary text-primary-foreground hover:opacity-85",
    outline: "border border-highlighted text-highlighted hover:bg-primary hover:text-primary-foreground",
    ghost: "text-highlighted hover:underline underline-offset-4",
  }
  const icon =
    variant === "ghost" ? (
      <svg viewBox="0 0 16 16" aria-hidden className="size-4" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M1 5V1h4M11 1h4v4M15 11v4h-4M5 15H1v-4" />
      </svg>
    ) : (
      <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    )
  const all = `group inline-flex items-center justify-between gap-6 px-5 py-3.5 text-[11px] font-medium uppercase tracking-wide transition-all ${styles[variant]} ${className}`
  const inner = (
    <>
      <span>{children}</span>
      {icon}
    </>
  )
  return external ? (
    <a href={href} target={href.startsWith("mailto:") ? undefined : "_blank"} rel="noopener noreferrer" className={all}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={all}>
      {inner}
    </Link>
  )
}

const footerCols = [
  {
    title: "Navigation",
    links: [
      { href: "/", label: "Home" },
      { href: "/all", label: "Projects" },
      { href: "/writing", label: "Writing" },
      { href: "/highlights", label: "Highlights" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/cv", label: "Curriculum vitae" },
      { href: "https://github.com/abdunur-dev", label: "Open source" },
      { href: "https://buymeacoffee.com/abdurhamanw", label: "Buy me a coffee" },
    ],
  },
]

function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border print:hidden">
      <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1.4fr]">
        {/* Brand */}
        <div className="flex flex-col justify-between gap-8 bg-background px-6 py-8 sm:px-8">
          <span className="flex items-center gap-2.5">
            <LogoMark className="size-8" />
            <span className="text-lg font-bold uppercase tracking-tight text-highlighted">
              Burhan<span className="tw-blink">_</span>
            </span>
          </span>
          <p className="text-[10px] uppercase leading-relaxed tracking-wide text-muted-foreground">
            © {year} Abdurhaman Nur
            <br />
            All rights reserved.
          </p>
        </div>

        {footerCols.map((col) => (
          <div key={col.title} className="flex flex-col gap-4 bg-background px-6 py-8 sm:px-8">
            <p className="text-[11px] uppercase tracking-wide text-highlighted">{col.title}</p>
            <ul className="flex flex-col gap-2 text-[11px] text-foreground">
              {col.links.map((l) => (
                <li key={l.href}>
                  {l.href.startsWith("/") ? (
                    <Link href={l.href} className="hover:text-highlighted hover:underline underline-offset-4">
                      {l.label}
                    </Link>
                  ) : (
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="hover:text-highlighted hover:underline underline-offset-4">
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="flex flex-col gap-4 bg-background px-6 py-8 sm:px-8">
          <p className="text-[11px] uppercase tracking-wide text-highlighted">Socials</p>
          <ul className="flex flex-col gap-2 text-[11px] text-foreground">
            {socialLinks.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  {...(l.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                  className="hover:text-highlighted hover:underline underline-offset-4"
                >
                  {l.label === "Twitter" ? "X (Twitter)" : l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Global node */}
        <div className="flex flex-col gap-4 bg-background px-6 py-8 sm:col-span-2 sm:px-8 lg:col-span-1">
          <p className="text-[11px] uppercase tracking-wide text-highlighted">Global node</p>
          <div className="flex items-center justify-between text-[11px] uppercase text-foreground">
            <span>LON</span>
            <span aria-hidden className="text-muted-foreground">+</span>
            <span className="flex items-center gap-1.5 text-highlighted">
              <span aria-hidden className="size-1.5 animate-pulse bg-highlighted" /> ADD
            </span>
            <span aria-hidden className="text-muted-foreground">+</span>
            <span>DXB</span>
            <span aria-hidden className="text-muted-foreground">+</span>
            <span>BER</span>
          </div>
          <div aria-hidden className="lab-dots relative h-20 border border-border">
            <span className="absolute left-[56%] top-[58%] size-2 bg-highlighted" />
            <span className="absolute left-[56%] top-[58%] size-2 animate-ping bg-highlighted/60" />
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="grid border-t border-border text-[11px] uppercase tracking-wide sm:grid-cols-[1fr_1.4fr_1fr]">
        <div className="flex items-center gap-2 px-6 py-3 text-foreground sm:px-8">
          <span aria-hidden className="size-1.5 rounded-full bg-highlighted" /> Connection secure
        </div>
        <div className="flex items-center justify-center bg-primary px-6 py-3 text-primary-foreground">
          <Typewriter text="> Access granted" speed={60} />
        </div>
        <div className="flex items-center justify-between gap-4 px-6 py-3 text-foreground sm:justify-end sm:px-8">
          <span className="flex items-center gap-1.5">
            Visits: <VisitorCounter numberOnly />
          </span>
          <span>Node: ADD_01</span>
        </div>
      </div>
    </footer>
  )
}

/**
 * Section label: "/02  CORE PRINCIPLES". Typed out when scrolled into view.
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
    <div className="flex items-center justify-between gap-4">
      <Tag id={id} className="flex items-baseline gap-5 text-[13px] font-medium uppercase tracking-wide text-highlighted">
        {index !== undefined && (
          <span className="text-[12px] font-normal tabular-nums text-muted-foreground" aria-hidden>
            /{String(index).padStart(2, "0")}
          </span>
        )}
        {typeof children === "string" ? <Typewriter text={children} speed={55} /> : children}
      </Tag>
      <div className="flex items-center gap-4">
        {meta && <span className="hidden text-[11px] uppercase text-muted-foreground sm:inline">{meta}</span>}
        {action}
      </div>
    </div>
  )
}

/** Big page title for sub-pages: condensed display type, typed out. */
export function PageTitle({ title, intro }: { title: string; intro?: ReactNode }) {
  return (
    <header className="mb-12 flex flex-col gap-6 border-b border-border pb-10">
      <span className="text-[12px] tabular-nums text-muted-foreground">/01</span>
      <h1 className="font-display text-6xl uppercase leading-[0.9] tracking-tight text-highlighted sm:text-8xl">
        <Typewriter text={title} speed={70} caret={false} />
        <span className="tw-blink">_</span>
      </h1>
      {intro && (
        <Reveal index={3}>
          <p className="max-w-prose text-pretty text-[13px] leading-relaxed text-foreground">{intro}</p>
        </Reveal>
      )}
    </header>
  )
}

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`flex flex-col gap-6 ${className}`}>{children}</section>
}

/** Stagger helper — returns the inline style for the nth animated row. */
export function stagger(i: number, step = 40): CSSProperties {
  return { animationDelay: `${i * step}ms` }
}

/** A list row: title left, meta right. */
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
        <span className={`truncate font-medium text-highlighted ${href ? "group-hover:underline underline-offset-4" : ""}`}>{title}</span>
        {isExternal && <span className="text-xs text-highlighted">↗</span>}
        {sub && <span className="hidden truncate text-sm text-muted-foreground sm:inline">{sub}</span>}
      </span>
      {meta && <span className="shrink-0 text-right text-xs text-muted-foreground">{meta}</span>}
    </>
  )
  const cls = "folio-in group flex items-baseline justify-between gap-4 border-b border-border py-3"
  if (!href) return <div className={cls} style={stagger(index)}>{inner}</div>
  if (href.startsWith("/"))
    return (
      <Link href={href} className={cls} style={stagger(index)}>
        {inner}
      </Link>
    )
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls} style={stagger(index)}>
      {inner}
    </a>
  )
}

/** Small "view all ↗" link. */
export function MoreLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex w-fit items-center gap-2 text-[11px] uppercase tracking-wide text-highlighted underline-offset-4 hover:underline"
    >
      {children}
      <ArrowUpRight aria-hidden className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  )
}

/** Inline link inside prose: solid underline. */
export function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  const external = !href.startsWith("/")
  const cls = "font-medium text-highlighted underline decoration-1 underline-offset-4 hover:decoration-2"
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
