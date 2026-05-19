import Link from "next/link"

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="mx-auto w-full max-w-4xl px-5 pb-10 sm:px-6">
      <div className="flex flex-col items-start justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row sm:items-center">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-5">
          <p className="font-mono text-xs text-muted-foreground">
            © {year} Burhan<span className="text-primary">.</span>
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
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/80">
          built with care{" "}
          <span className="font-serif italic text-primary">✦</span> Addis Ababa
        </p>
      </div>
    </footer>
  )
}
