"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Typewriter } from "@/components/folio/motion"

const nav = [
  { href: "/all", label: "Projects" },
  { href: "/writing", label: "Writing" },
  { href: "/cv", label: "CV" },
]

const FAVICON =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/photo_2026-08-20_05-28-58-EnRVYSJinKSizsaqJ58b77WHWjUHDY.jpg"

/** Site logo: the favicon in a square orange frame. */
function LogoMark() {
  return (
    <span aria-hidden className="flex size-8 shrink-0 items-center justify-center rounded-[7px] bg-primary p-[3px]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={FAVICON} alt="" width={26} height={26} className="size-full rounded-[4px] object-cover" />
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
      className="group inline-flex items-center gap-2 text-[11px] text-foreground transition-colors hover:text-primary"
    >
      <span aria-hidden className="grid grid-cols-2 gap-[2px]">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`size-[3px] transition-colors ${
              (isDark ? i % 3 === 0 : i % 3 !== 0) ? "bg-primary" : "bg-primary/35"
            }`}
          />
        ))}
      </span>
      <span className="hidden lg:inline">{isDark ? "Dark mode" : "Light mode"}</span>
    </button>
  )
}

export function LabHeader({ back }: { back?: { href: string; label: string } }) {
  const pathname = usePathname()

  return (
    <header className="grid grid-cols-[auto_1fr_auto] border-b border-border bg-background/80 backdrop-blur-sm md:grid-cols-[14rem_1fr_auto_auto] print:hidden">
      {/* Logo */}
      <Link
        href="/"
        aria-label="Abdurhaman Nur — home"
        className="flex items-center gap-2.5 border-r border-border px-3 py-3 sm:px-4"
      >
        <LogoMark />
        <span className="flex flex-col leading-none">
          <span className="text-[10px] text-foreground">Abdurhaman</span>
          <span className="font-display text-[17px] font-semibold tracking-[0.12em] text-highlighted">NUR</span>
        </span>
      </Link>

      {/* Back link / location */}
      <div className="flex min-w-0 items-center px-3 text-[11px] sm:px-5">
        {back ? (
          <Link
            href={back.href}
            className="inline-flex items-center gap-2 truncate text-foreground transition-colors hover:text-primary"
          >
            <span aria-hidden>←</span> <Typewriter text={`Back to ${back.label}`} caret={false} speed={35} />
          </Link>
        ) : (
          <span className="inline-flex items-center gap-2 truncate text-foreground">
            <span aria-hidden className="size-1.5 shrink-0 bg-primary" />
            <Typewriter text="Addis Ababa · UTC+3" speed={45} delay={300} />
          </span>
        )}
      </div>

      {/* Primary nav */}
      <nav aria-label="Primary" className="hidden items-center gap-6 px-5 md:flex">
        {nav.map((l) => {
          const active = pathname === l.href || pathname.startsWith(l.href + "/")
          return (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active ? "page" : undefined}
              className={`text-[11px] transition-colors hover:text-primary ${
                active ? "lab-bracket text-highlighted" : "text-foreground"
              }`}
            >
              {l.label}
            </Link>
          )
        })}
      </nav>

      {/* Theme + CTA */}
      <div className="flex items-center gap-4 border-l border-border px-3 sm:gap-5 sm:px-4">
        <ThemeSwitch />
        <a
          href="mailto:abdurhamannur894@gmail.com"
          className="lab-chamfer bg-primary px-3.5 py-2 text-[11px] font-medium uppercase tracking-wide text-primary-foreground transition-colors hover:bg-highlighted hover:text-background"
        >
          Say hi
        </a>
      </div>

      {/* Mobile nav row */}
      <nav
        aria-label="Primary mobile"
        className="col-span-3 flex items-center justify-between gap-2 overflow-x-auto border-t border-border px-3 py-2 md:hidden"
      >
        {nav.map((l) => {
          const active = pathname === l.href || pathname.startsWith(l.href + "/")
          return (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active ? "page" : undefined}
              className={`px-1.5 text-[11px] transition-colors hover:text-primary ${
                active ? "lab-bracket text-highlighted" : "text-foreground"
              }`}
            >
              {l.label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
