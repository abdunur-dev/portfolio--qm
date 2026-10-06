"use client"

import { Printer } from "lucide-react"

export function PrintCvButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-md border border-border/70 bg-secondary/50 px-3 py-1.5 font-mono text-xs text-foreground transition-all hover:bg-secondary hover:text-highlighted active:scale-95 print:hidden"
    >
      <Printer className="size-3.5" />
      <span>Print / Save PDF</span>
    </button>
  )
}
