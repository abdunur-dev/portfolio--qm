"use client"

export function PrintCvButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="group inline-flex w-fit items-baseline gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-foreground/70 underline decoration-foreground/30 decoration-1 underline-offset-4 transition-colors hover:text-primary hover:decoration-primary print:hidden"
    >
      Print PDF
      <span className="text-[10px] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
        ↗
      </span>
    </button>
  )
}
