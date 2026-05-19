import Link from "next/link"

export function SiteNav() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/writing", label: "Writing" },
    { href: "/all", label: "Projects" },
    { href: "/now", label: "Now" },
  ]

  return (
    <header className="mx-auto flex w-full max-w-3xl items-center justify-between px-6 pt-10 pb-6">
      <Link href="/" className="group flex items-baseline gap-2">
        <span className="font-serif text-3xl leading-none tracking-tight text-foreground">
          burhan_
        </span>
        <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
          bur · han
        </span>
      </Link>
      <nav aria-label="Primary">
        <ul className="flex items-center gap-5 text-sm text-muted-foreground">
          {links.map((l) => (
            <li key={l.href}>
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
    </header>
  )
}
