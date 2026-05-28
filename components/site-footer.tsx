import Image from "next/image"

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto w-full max-w-4xl px-5 py-12 sm:px-6 sm:py-16">
        <div className="flex items-end justify-between gap-8">
          {/* Name image */}
          <div className="shrink-0">
            <Image
              src="/abdurhaman-name.png"
              alt="Abdurhaman"
              width={200}
              height={60}
              className="h-12 w-auto sm:h-16"
              priority
            />
          </div>

          {/* Footer info */}
          <div className="text-right">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/70">
              © {year} · built with care{" "}
              <span className="font-serif italic text-primary">✦</span> Addis
              Ababa
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
