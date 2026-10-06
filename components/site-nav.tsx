"use client"

import { useState } from "react"
import Link from "next/link"
import { BookOpen, FileText, FolderKanban, Home, Info, Menu, Sparkles } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

const links = [
  { href: "/", label: "Home", icon: Home },
  { href: "/about", label: "About", icon: Info },
  { href: "/writing", label: "Writing", icon: BookOpen },
  { href: "/all", label: "Projects", icon: FolderKanban },
  { href: "/highlights", label: "Highlights", icon: Sparkles },
  { href: "/cv", label: "CV", icon: FileText },
] as const

export function SiteNav({ plain = false }: { plain?: boolean }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:border focus:border-primary/60 focus:bg-background focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-foreground focus:shadow-lg focus:outline-none">
        Skip to content
      </a>
      <header className="fixed inset-x-0 top-0 z-40 px-4 py-4 sm:px-8 sm:py-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <Link href="/" aria-label="Go to homepage" className="text-sm font-medium tracking-tight text-foreground">
            Abdurhaman<span className="text-primary">_</span>
          </Link>
          <div className={plain ? "flex items-center gap-2 p-1" : "flex items-center gap-2 rounded-full border border-border/70 bg-background/80 p-1 shadow-sm backdrop-blur-xl"}>
            <nav aria-label="Primary" className="hidden sm:block">
              <ul className="flex items-center divide-x divide-border/70 text-sm text-muted-foreground">
                {links.filter((link) => link.href !== "/cv").map((link) => (
                  <li key={link.href} className="px-3 first:pl-2 last:pr-2">
                    <Link href={link.href} className="font-mono text-[0.68rem] uppercase tracking-[0.12em] transition-colors hover:text-primary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <ThemeToggle />
            <div className="sm:hidden">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Open menu" className="size-9">
                    <Menu className="size-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[min(20rem,90vw)]">
                  <SheetHeader className="text-left">
                    <SheetTitle className="font-serif text-2xl">Abdurhaman_</SheetTitle>
                  </SheetHeader>
                  <nav aria-label="Mobile" className="mt-8">
                    <ul className="flex flex-col gap-1">
                      {links.map(({ href, label, icon: Icon }) => (
                        <li key={href}>
                          <Link href={href} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-3 text-base transition-colors hover:bg-muted hover:text-primary">
                            <Icon className="size-4" aria-hidden />
                            {label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
