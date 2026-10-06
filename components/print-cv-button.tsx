"use client"

export function PrintCvButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="w-fit text-sm text-muted-foreground/60 transition-colors hover:text-highlighted print:hidden"
    >
      Download PDF <span aria-hidden>↓</span>
    </button>
  )
}
