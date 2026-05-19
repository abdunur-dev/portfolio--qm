import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteNav() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/writing", label: "Writing" },
    { href: "/all", label: "Projects" },
    { href: "/now", label: "Now" },
  ]

  return (
    <header className="mx-auto w-full max-w-3xl px-6 pt-10">
      <div className="flex items-center justify-between pb-5">
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
      <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
    </header>
  )
}
