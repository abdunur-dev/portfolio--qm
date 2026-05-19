export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="mx-auto w-full max-w-3xl px-5 pb-10 sm:px-6">
      <div className="flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-6 sm:flex-row sm:items-center">
        <p className="font-mono text-xs text-muted-foreground">
          © {year} Burhan<span className="text-primary">.</span>
        </p>
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/80">
          built with care{" "}
          <span className="font-serif italic text-primary">✦</span> Addis Ababa
        </p>
      </div>
    </footer>
  )
}
