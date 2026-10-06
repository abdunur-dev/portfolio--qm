import Link from "next/link"
import { Coffee } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="mx-auto w-full max-w-[640px] px-5 pb-10 sm:px-0">
      <div className="flex items-center justify-between border-t border-border/60 py-6 text-sm">
        <Link href="/cv" className="text-muted-foreground transition-colors hover:text-foreground">
          CV <span aria-hidden>↗</span>
        </Link>
        <a href="https://buymeacoffee.com/abdurhamanw" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
          <Coffee className="size-4" aria-hidden />
          Buy me a coffee
        </a>
      </div>
    </footer>
  )
}
