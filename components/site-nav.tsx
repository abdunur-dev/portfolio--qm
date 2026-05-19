import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteNav() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/writing", label: "Writing" },
    { href: "/all", label: "Projects" },
    { href: "/now", label: "Now" },
  ]

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/70 backdrop-blur-md supports-[backdrop-filter]:bg-background/55">
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-serif text-3xl leading-none tracking-tight text-foreground">
            Burhan_
          </span>
          <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
            Bur · han
          </span>
        </Link>
        <div className="flex items-center gap-4">
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
          <span aria-hidden className="hidden h-4 w-px bg-border/70 sm:inline-block" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
