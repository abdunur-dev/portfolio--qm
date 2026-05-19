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
  { href: "/now", label: "Now" },
]

export function SiteNav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-3 z-40 w-full px-3 sm:top-4 sm:px-4">
      <div className="mx-auto flex w-full max-w-2xl items-center justify-between gap-3 rounded-full border border-border/50 bg-background/55 px-4 py-2 shadow-[0_1px_0_0_color-mix(in_oklch,var(--foreground)_6%,transparent)_inset,0_8px_24px_-12px_color-mix(in_oklch,var(--foreground)_18%,transparent)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/40 sm:px-5 sm:py-2.5">
        <NavWordmark />

        {/* Desktop nav */}
        <div className="hidden items-center gap-3 md:flex">
          <nav aria-label="Primary">
            <ul className="flex items-center divide-x divide-border/70 text-sm text-muted-foreground">
              {links.map((l) => (
                <li key={l.href} className="px-3 first:pl-0 last:pr-0">
                  <Link
                    href={l.href}
                    className="transition-colors hover:text-foreground"
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
                  Burhan_
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
  )
}
