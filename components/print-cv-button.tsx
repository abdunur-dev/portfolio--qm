"use client"

export function PrintCvButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="group inline-flex w-fit items-center gap-2 rounded-full border border-border/70 bg-card/40 px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-foreground/80 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary print:hidden"
    >
      Print / Save PDF
      <span className="text-[10px] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
        ↗
      </span>
    </button>
  )
}
