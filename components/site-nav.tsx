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
  { href: "/about", label: "About" },
  { href: "/writing", label: "Writing" },
  { href: "/all", label: "Projects" },
  { href: "/highlights", label: "Highlights" },
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
      <header className="fixed right-5 top-5 z-40 sm:right-8 sm:top-7">
      <div className="flex items-center gap-4">
        <div className="hidden">
          <NavWordmark />
        </div>

        {/* Reference layout keeps navigation intentionally quiet. */}
        <div className="flex items-center gap-3">
          <nav aria-label="Primary" className="hidden">
            <ul className="flex items-center divide-x divide-border/70 text-sm text-muted-foreground">
              {links
                .filter((l) => !("mobileOnly" in l && l.mobileOnly))
                .map((l) => (
                  <li key={l.href} className="px-3 first:pl-0 last:pr-0">
                    <Link
                      href={l.href}
                      className="font-mono text-[0.68rem] uppercase tracking-[0.12em] text-[#858096] transition-colors hover:text-[#7370d8]"
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
        <div className="hidden">
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
                        className="block rounded-md border border-transparent px-3 py-2 font-serif text-lg text-foreground transition-colors hover:border-border/60 hover:bg-card/60 hover:text-primary"
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
