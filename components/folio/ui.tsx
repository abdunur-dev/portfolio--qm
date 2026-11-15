import Link from "next/link"
import type { CSSProperties, ReactNode } from "react"
import { ArrowUpRight, Github, Linkedin, Mail, Twitter } from "lucide-react"
import { HeaderField } from "@/components/minimal/header-field"
import { ScrambleText } from "@/components/minimal/scramble-text"
import { socialLinks } from "@/lib/social-links"

/* -------------------------------------------------------------------------- */
/*  Minimal layout primitives                                                 */
/*  One calm reading column, Geist, soft greys, rounded hover rows.           */
/* -------------------------------------------------------------------------- */

/**
 * Page column: content and footer. The nav and dotted header come from the
 * (site) layout so they persist across navigations.
 * `wide` gives a slightly wider column; `back` and `bleed` are accepted for compatibility.
 */
export function FolioShell({
  children,
  wide = false,
  className = "",
}: {
  children: ReactNode
  back?: { href: string; label: string }
  wide?: boolean
  bleed?: boolean
  className?: string
}) {
  return (
    <div
      className={`relative z-10 mx-auto flex w-full flex-col px-5 pb-8 sm:px-6 sm:pb-14 ${wide ? "max-w-3xl" : "max-w-2xl"}`}
    >
      <main id="main" className={`mt-8 flex-1 sm:mt-16 ${className}`}>
        {children}
      </main>
      <SiteFooter />
    </div>
  )
}

const footerIcon = { GitHub: Github, Twitter, LinkedIn: Linkedin, Email: Mail } as const

/**
 * Footer. On phones it stacks and centres, with extra bottom room so the
 * floating theme pill never sits on top of it.
 */
export function SiteFooter() {
  return (
    <footer className="relative mt-14 border-t pt-6 pb-20 sm:mt-20 sm:pt-8 text-xs text-muted-foreground lg:pb-0 print:hidden">
      {/* Same flickering pixel field as behind the nav, mirrored: full-bleed, fading upward. */}
      <HeaderField
        side="bottom"
        height={140}
        className="-bottom-8 left-1/2 w-screen -translate-x-1/2 sm:-bottom-14"
      />
      <div className="relative flex flex-col items-center gap-5 text-center sm:flex-row sm:justify-between sm:text-left">
        <Link href="/" className="group flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/ascii/mark.jpg"
            alt=""
            className="size-6 rounded-full transition-transform duration-500 group-hover:rotate-[20deg]"
          />
          <span>
            © {new Date().getFullYear()} <span className="text-foreground">Abdurhaman Nur</span>
          </span>
        </Link>
        <ul className="flex items-center gap-1">
          {socialLinks.map((l) => {
            const Icon = footerIcon[l.label as keyof typeof footerIcon]
            return (
              <li key={l.label}>
                <a
                  href={l.href}
                  aria-label={l.label}
                  title={l.handle}
                  {...(l.href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                  className="flex size-9 items-center justify-center rounded-full transition-all hover:-translate-y-0.5 hover:bg-muted hover:text-foreground"
                >
                  <Icon aria-hidden className="size-4" strokeWidth={1.75} />
                </a>
              </li>
            )
          })}
        </ul>
      </div>
      <p className="relative mt-6 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/70 sm:text-left">
        Seek · Build · Share — Addis Ababa
      </p>
    </footer>
  )
}

/** Hairline section divider with a small ASCII ornament in the middle. */
export function Divider({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`flex items-center gap-3 text-muted-foreground/60 ${className}`}>
      <span className="h-px flex-1 bg-border" />
      <span className="font-mono text-[10px] tracking-[0.3em]">·:·</span>
      <span className="h-px flex-1 bg-border" />
    </div>
  )
}

/** Kept for compatibility: a small "+" mark. */
export function Plus({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`text-sm leading-none text-muted-foreground ${className}`}>
      +
    </span>
  )
}

/** Kept for compatibility: small round "×" mark. */
export function CrossMark({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`flex size-6 items-center justify-center rounded-full border bg-background text-[10px] leading-none text-muted-foreground ${className}`}
    >
      ×
    </span>
  )
}

/** Small pill label. */
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
    default: "border-border bg-muted/50 text-foreground",
    accent: "border-transparent bg-foreground text-background",
    ink: "border-transparent bg-foreground text-background",
  }
  return (
    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] leading-none ${tones[tone]} ${className}`}>
      {children}
    </span>
  )
}

/** Rounded button. */
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
    outline: "border hover:bg-muted",
    ghost: "hover:bg-muted",
  }
  const all = `group inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all active:scale-[0.98] ${styles[variant]} ${className}`
  const inner = (
    <>
      <span>{children}</span>
      <ArrowUpRight aria-hidden className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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

/** Section heading with optional right-hand meta and action. */
export function SectionTitle({
  children,
  as: Tag = "h2",
  action,
  meta,
  id,
}: {
  children: ReactNode
  as?: "h1" | "h2" | "h3"
  action?: ReactNode
  /** accepted for compatibility */
  index?: number
  meta?: ReactNode
  id?: string
}) {
  return (
    <div className="flex items-baseline gap-3">
      <Tag id={id} className="font-mono text-[11px] font-normal uppercase tracking-[0.14em] text-foreground">
        {typeof children === "string" ? <ScrambleText text={children} trigger="view" /> : children}
      </Tag>
      <span aria-hidden className="h-px flex-1 translate-y-[-3px] bg-border" />
      {(meta || action) && (
        <div className="flex items-baseline gap-4 font-mono text-[10px] uppercase tracking-[0.1em]">
          {meta && <span className="hidden text-muted-foreground sm:inline">{meta}</span>}
          {action}
        </div>
      )}
    </div>
  )
}

/**
 * Page heading for sub-pages, poster style: a small "Seek" kicker, the title
 * and intro on the left, and an ASCII figure traced from `glyph` on the right.
 */
export function PageTitle({
  title,
  intro,
  kicker,
  glyph,
}: {
  title: string
  intro?: ReactNode
  kicker?: string
  glyph?: string
}) {
  // `glyph` is accepted for compatibility; the document-style header has no figure.
  void glyph
  return (
    <header className="mb-12 flex flex-col gap-3 sm:mb-16">
      {kicker && (
        <p className="folio-in font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground/70">{kicker}</p>
      )}
      <h1 className="folio-in font-display text-[2rem] leading-10 text-foreground sm:text-4xl" style={stagger(1)}>
        <ScrambleText text={title} delay={0.05} />
      </h1>
      {intro && (
        <p className="folio-in max-w-prose text-pretty text-[15px] leading-7 text-muted-foreground" style={stagger(2)}>
          {intro}
        </p>
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

/** A list row: title left, meta right, soft hover background. */
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
        <span className="truncate text-sm font-medium">{title}</span>
        {isExternal && <ArrowUpRight aria-hidden className="size-3 self-center text-muted-foreground" />}
        {sub && <span className="hidden truncate text-sm text-muted-foreground sm:inline">{sub}</span>}
      </span>
      {meta && <span className="shrink-0 text-right text-xs text-muted-foreground">{meta}</span>}
    </>
  )
  const cls = `folio-in group -mx-3 flex items-baseline justify-between gap-4 rounded-xl px-3 py-2.5 ${href ? "transition-colors hover:bg-muted/60" : ""}`
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

/** Small "view all" link. */
export function MoreLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex w-fit items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
    >
      {children}
      <ArrowUpRight aria-hidden className="size-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  )
}

/** Inline link inside prose. */
export function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  const external = !href.startsWith("/")
  const cls = "font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
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
