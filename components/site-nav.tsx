"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { NavWordmark } from "@/components/nav-wordmark"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

const links = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/#highlights", label: "Highlights" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/#contact", label: "Contact" },
  { href: "/cv", label: "CV", mobileOnly: true },
] as const

export function SiteNav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:border focus:border-primary/60 focus:bg-background focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.18em] focus:text-foreground focus:shadow-lg focus:outline-none"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 w-full bg-[#08090b]/95 px-3 text-[#f4f1eb] backdrop-blur-sm sm:px-4">
      <div className="screen-line-bottom mx-auto flex w-full max-w-[48rem] items-center justify-between gap-3 border-x border-white/10 bg-[#08090b]/90 px-3 py-3 backdrop-blur-sm sm:px-4 sm:py-4">
        <NavWordmark />

        {/* Desktop nav */}
        <div className="hidden items-center gap-3 md:flex">
          <nav aria-label="Primary">
            <ul className="flex items-center divide-x divide-border/70 text-sm text-muted-foreground">
              {links
                .filter((l) => !("mobileOnly" in l && l.mobileOnly))
                .map((l) => (
                  <li key={l.href} className="px-3 first:pl-0 last:pr-0">
                    <Link
                      href={l.href}
                      className="font-mono text-[0.68rem] uppercase tracking-[0.14em] transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
          <span aria-hidden className="h-4 w-px bg-border/70" />
          <ThemeToggle />
        </div>

        {/* Mobile nav */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className="h-9 w-9"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 sm:max-w-sm">
              <SheetHeader className="text-left">
                <SheetTitle className="font-serif text-2xl">
                  Abdurhaman_
                </SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile" className="mt-6 px-4">
                <ul className="flex flex-col gap-1">
                  {links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="block border-b border-border/60 px-3 py-3 font-mono text-xs uppercase tracking-[0.14em] text-foreground transition-colors hover:text-primary"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
    </>
  )
}
