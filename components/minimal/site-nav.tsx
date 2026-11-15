"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "motion/react"

const links = [
  { href: "/", label: "Home" },
  { href: "/writing", label: "Writing" },
  { href: "/all", label: "Projects" },
  { href: "/highlights", label: "Highlights" },
  { href: "/cv", label: "CV" },
]

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`)
}

/** Match the page column below so the nav lines up with the content. */
function widthFor(pathname: string) {
  if (pathname === "/cv") return "max-w-4xl"
  if (pathname.startsWith("/writing/")) return "max-w-3xl"
  return "max-w-2xl"
}

/**
 * Top navigation. Rendered once by the (site) layout, so it never remounts:
 * the active pill slides between links instead of jumping.
 */
export function SiteNav() {
  const pathname = usePathname() ?? "/"

  return (
    <header
      className={`blur-fade relative z-20 mx-auto flex w-full items-center justify-between gap-4 px-5 pt-6 transition-[max-width] duration-300 sm:px-6 sm:pt-14 print:hidden ${widthFor(pathname)}`}
    >
      <Link
        href="/"
        className="group flex shrink-0 items-center gap-2 rounded-full text-sm font-semibold outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/ascii/mark.jpg"
          alt=""
          className="size-6 rounded-full transition-transform duration-500 group-hover:rotate-[20deg]"
        />
        <span className="hidden sm:inline">Burhan</span>
      </Link>
      <nav aria-label="Main" className="-mr-2 flex items-center text-[13px] min-[400px]:text-sm">
        {links.map((l) => {
          const active = isActive(pathname, l.href)
          return (
            <Link
              key={l.href}
              href={l.href}
              aria-current={active ? "page" : undefined}
              className={`relative rounded-full px-2 py-1 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring sm:px-2.5 ${
                active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="nav-active"
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-muted"
                  transition={{ type: "spring", stiffness: 420, damping: 36 }}
                />
              )}
              <span className="relative">{l.label}</span>
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
