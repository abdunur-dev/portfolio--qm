"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { ArrowUpRight } from "lucide-react"
import { Typewriter } from "@/components/folio/motion"
import { SysClock } from "@/components/folio/sys-clock"

const nav = [
  { href: "/#work", label: "Work" },
  { href: "/writing", label: "Writing" },
  { href: "/highlights", label: "Highlights" },
  { href: "/cv", label: "CV" },
]

const FAVICON =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-08-20_05-28-58-EnRVYSJinKSizsaqJ58b77WHWjUHDY.jpg"

/** Site logo: the favicon, monochrome, in a hard black frame. */
export function LogoMark({ className = "size-7" }: { className?: string }) {
  return (
    <span aria-hidden className={`flex shrink-0 bg-highlighted p-[2px] ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={FAVICON} alt="" width={28} height={28} className="size-full object-cover grayscale contrast-125" />
    </span>
  )
}

function ThemeSwitch() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const isDark = mounted && resolvedTheme === "dark"

  const toggle = () => {
    const next = isDark ? "light" : "dark"
    const doc = document as Document & { startViewTransition?: (cb: () => void) => void }
    if (doc.startViewTransition) doc.startViewTransition(() => setTheme(next))
    else setTheme(next)
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className="flex size-8 items-center justify-center border border-border text-highlighted transition-colors hover:border-highlighted"
    >
      <svg viewBox="0 0 16 16" aria-hidden className="size-3.5">
        <rect x="1.5" y="1.5" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <rect x={isDark ? 8 : 1.5} y="1.5" width="6.5" height="13" fill="currentColor" className="transition-all duration-300" />
      </svg>
    </button>
  )
}

function isActive(pathname: string, href: string) {
  if (href.startsWith("/#")) return false
  return pathname === href || pathname.startsWith(href + "/")
}

export function LabHeader({ back }: { back?: { href: string; label: string } }) {
  const pathname = usePathname()

  return (
    <header className="border-b border-border bg-background/90 backdrop-blur-sm print:hidden">
      <div className="flex items-stretch">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Abdurhaman Nur — home"
          className="flex items-center gap-2.5 px-4 py-4 sm:px-6 lg:px-8"
        >
          <LogoMark />
          <span className="text-[15px] font-bold uppercase tracking-tight text-highlighted">
            Burhan<span className="tw-blink">_</span>
          </span>
        </Link>

        {/* Divider tick */}
        <span aria-hidden className="my-auto hidden h-6 border-l border-highlighted md:block" />

        {/* Nav or back link */}
        <div className="flex min-w-0 flex-1 items-center px-4 sm:px-6">
          {back ? (
            <Link
              href={back.href}
              className="inline-flex items-center gap-2 truncate text-[11px] uppercase tracking-wide text-highlighted hover:underline"
            >
              <span aria-hidden>←</span> <Typewriter text={`Back to ${back.label}`} caret={false} speed={35} />
            </Link>
          ) : null}
          <nav aria-label="Primary" className={`${back ? "ml-auto" : ""} hidden items-center gap-4 lg:flex`}>
            {nav.map((l, i) => (
              <Fragment key={l.href}>
                {i > 0 && (
                  <span aria-hidden className="text-[11px] text-muted-foreground">
                    /
                  </span>
                )}
                <Link
                  href={l.href}
                  aria-current={isActive(pathname, l.href) ? "page" : undefined}
                  className={`text-[11px] uppercase tracking-wide underline-offset-4 transition-colors hover:underline ${
                    isActive(pathname, l.href) ? "text-highlighted underline" : "text-foreground"
                  }`}
                >
                  {l.label}
                </Link>
              </Fragment>
            ))}
          </nav>
        </div>

        {/* SYS.TIME */}
        <div className="hidden flex-col justify-center gap-0.5 border-x border-border px-5 text-[10px] uppercase leading-tight text-muted-foreground md:flex">
          <span>Sys.time</span>
          <SysClock className="text-highlighted" />
          <span>UTC+3 · ADD</span>
        </div>

        {/* Theme + CTA */}
        <div className="flex items-center gap-3 px-4 sm:px-6">
          <ThemeSwitch />
          <a
            href="mailto:abdurhamannur894@gmail.com"
            className="group inline-flex items-center gap-3 bg-primary px-3.5 py-2.5 text-[11px] font-medium uppercase tracking-wide text-primary-foreground transition-opacity hover:opacity-85 sm:px-5"
          >
            <span className="hidden sm:inline">Start a project</span>
            <span className="sm:hidden">Hire</span>
            <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>

      {/* Mobile nav row */}
      <nav
        aria-label="Primary mobile"
        className="flex items-center justify-between gap-2 overflow-x-auto border-t border-border px-4 py-2.5 lg:hidden"
      >
        {nav.map((l, i) => (
          <Fragment key={l.href}>
            {i > 0 && (
              <span aria-hidden className="text-[11px] text-muted-foreground">
                /
              </span>
            )}
            <Link
              href={l.href}
              aria-current={isActive(pathname, l.href) ? "page" : undefined}
              className={`text-[11px] uppercase tracking-wide ${
                isActive(pathname, l.href) ? "text-highlighted underline underline-offset-4" : "text-foreground"
              }`}
            >
              {l.label}
            </Link>
          </Fragment>
        ))}
      </nav>
    </header>
  )
}
