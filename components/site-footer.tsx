import Link from "next/link"
import { Coffee } from "lucide-react"

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative bg-grid-fine">
      <div className="mx-auto w-full max-w-4xl px-5 py-16 sm:px-6 sm:py-20">
        <div className="border-top-dots pt-10">
          {/* Name showcase */}
          <div className="mb-12">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              creator & builder
            </p>
            <h2 className="font-serif text-4xl leading-[1.1] text-foreground sm:text-5xl md:text-6xl">
              Abdurhaman<span className="text-primary">.</span>
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-foreground/70">
              Web3 & full-stack developer crafting decentralised experiences
              from Addis Ababa.
            </p>
          </div>

          {/* Links grid */}
          <div className="border-top-dots grid gap-8 py-10 sm:grid-cols-2 md:grid-cols-4">
            {/* Quick links */}
            <div>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Navigate
              </p>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="font-serif text-sm text-foreground/80 transition-colors hover:text-primary"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/writing"
                    className="font-serif text-sm text-foreground/80 transition-colors hover:text-primary"
                  >
                    Writing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/all"
                    className="font-serif text-sm text-foreground/80 transition-colors hover:text-primary"
                  >
                    Projects
                  </Link>
                </li>
                <li>
                  <Link
                    href="/now"
                    className="font-serif text-sm text-foreground/80 transition-colors hover:text-primary"
                  >
                    Now
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Connect
              </p>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://twitter.com/abdunur"
                    target="_blank"
                    rel="noreferrer"
                    className="font-serif text-sm text-foreground/80 transition-colors hover:text-primary"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/abdunur"
                    target="_blank"
                    rel="noreferrer"
                    className="font-serif text-sm text-foreground/80 transition-colors hover:text-primary"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/in/abdunur"
                    target="_blank"
                    rel="noreferrer"
                    className="font-serif text-sm text-foreground/80 transition-colors hover:text-primary"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hey@abdunur.dev"
                    className="font-serif text-sm text-foreground/80 transition-colors hover:text-primary"
                  >
                    Email
                  </a>
                </li>
              </ul>
            </div>

            {/* Info */}
            <div>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Info
              </p>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/cv"
                    className="font-serif text-sm text-foreground/80 transition-colors hover:text-primary"
                  >
                    Curriculum Vitae
                  </Link>
                </li>
                <li>
                  <a
                    href="https://buymeacoffee.com/abdurhamanw"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-serif text-sm text-foreground/80 transition-colors hover:text-primary"
                  >
                    <Coffee className="h-3.5 w-3.5" />
                    Buy me coffee
                  </a>
                </li>
              </ul>
            </div>

            {/* Location & Year */}
            <div>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                Details
              </p>
              <ul className="space-y-2 font-serif text-sm text-foreground/80">
                <li>Addis Ababa, 🇪🇹</li>
                <li>© {year}</li>
                <li>
                  <span className="font-serif italic text-primary">✦</span> Built
                  with care
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom line */}
          <div className="border-top-dots flex flex-col items-center justify-between gap-4 py-8 text-center sm:flex-row sm:text-left">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60">
              designed & developed by abdurhaman
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60">
              all rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
