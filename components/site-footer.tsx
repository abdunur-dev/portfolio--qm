import Link from "next/link"
import { Coffee } from "lucide-react"

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="mx-auto w-full max-w-4xl px-5 pb-10 sm:px-6">
      <div className="border-t border-border/60 pt-6">
        {/* Mobile: stacked layout */}
        <div className="flex flex-col gap-5 sm:hidden">
          <div className="flex items-center justify-between">
            <p className="font-mono text-xs text-muted-foreground">
              © {year} Abdurhaman Nur<span className="text-primary">.</span>
            </p>
            <Link
              href="/cv"
              className="group inline-flex items-center gap-1.5 rounded-full border border-border/60 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/70 transition-colors hover:border-primary hover:text-primary"
            >
              CV
              <span className="text-[10px] transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/80">
              built with care{" "}
              <span className="font-serif italic text-primary">✦</span> Addis
              Ababa
            </p>
            <a
              href="https://buymeacoffee.com/abdurhamanw"
              target="_blank"
              rel="noreferrer"
              aria-label="Buy me a coffee"
              title="Buy me a coffee"
              className="group inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/80 transition-colors hover:text-primary"
            >
              <Coffee
                className="h-4 w-4 transition-transform group-hover:-rotate-6 group-hover:scale-110"
                aria-hidden
              />
              coffee
            </a>
          </div>
        </div>

        {/* Desktop: single row */}
        <div className="hidden items-center justify-between sm:flex">
          <div className="flex items-center gap-5">
            <p className="font-mono text-xs text-muted-foreground">
              © {year} Abdurhaman Nur<span className="text-primary">.</span>
            </p>
            <Link
              href="/cv"
              className="group inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.18em] text-foreground/70 transition-colors hover:text-primary"
            >
              CV
              <span className="text-[10px] transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://buymeacoffee.com/abdurhamanw"
              target="_blank"
              rel="noreferrer"
              aria-label="Buy me a coffee"
              title="Buy me a coffee"
              className="group inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/80 transition-colors hover:text-primary"
            >
              <Coffee
                className="h-4 w-4 transition-transform group-hover:-rotate-6 group-hover:scale-110"
                aria-hidden
              />
              buy me a coffee
            </a>
            <span aria-hidden className="h-3 w-px bg-border/60" />
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/80">
              built with care{" "}
              <span className="font-serif italic text-primary">✦</span> Addis
              Ababa
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
