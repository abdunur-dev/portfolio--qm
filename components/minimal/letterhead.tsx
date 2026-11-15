"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { SysClock } from "@/components/folio/sys-clock"

/** Match the page column below so the letterhead lines up with the content. */
function widthFor(pathname: string) {
  if (pathname === "/cv") return "max-w-4xl"
  if (pathname.startsWith("/writing/")) return "max-w-3xl"
  return "max-w-2xl"
}

/** Where "back" goes from a page, and what it's called. */
function backFor(pathname: string) {
  if (pathname === "/") return null
  if (pathname.startsWith("/writing/")) return { href: "/writing", label: "Writing" }
  return { href: "/", label: "Index" }
}

/**
 * Letterhead in place of a nav bar: a handwritten signature that links home,
 * a quiet "← back" on inner pages, and a small dateline note on the right.
 * Navigation otherwise lives in the content ("View all →" links).
 */
export function Letterhead() {
  const pathname = usePathname() ?? "/"
  const back = backFor(pathname)

  return (
    <header
      className={`relative z-20 mx-auto w-full px-5 pt-6 transition-[max-width] duration-300 sm:px-6 sm:pt-12 print:hidden ${widthFor(pathname)}`}
    >
      <div className="flex min-h-11 items-start gap-5">
        <Link
          href="/"
          aria-label="Abdurhaman Nur (Burhan), home"
          aria-current={pathname === "/" ? "page" : undefined}
          className="signature -ml-0.5 -mt-1 shrink-0 rounded-sm text-[2.6rem] leading-none text-foreground outline-none transition-opacity hover:opacity-70 focus-visible:ring-2 focus-visible:ring-ring sm:text-5xl"
        >
          Burhan
        </Link>

        {back && (
          <Link
            href={back.href}
            className="mt-3 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground/60 transition-colors hover:text-foreground sm:mt-4"
          >
            ← {back.label}
          </Link>
        )}

        <p className="ml-auto mt-3 text-right font-mono text-[10px] uppercase leading-relaxed tracking-[0.1em] text-muted-foreground/60 sm:mt-4">
          Addis Ababa
          <span className="hidden sm:inline"> · ET</span>
          <br />
          <SysClock />
        </p>
      </div>
    </header>
  )
}
