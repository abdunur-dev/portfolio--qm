import type { Metadata } from "next"
import { FolioShell, PageTitle, stagger } from "@/components/folio/ui"
import { LedgerRow, SectionMark } from "@/components/minimal/ledger"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { gatherings } from "@/lib/gatherings-data"

export const metadata: Metadata = {
  title: "Highlights · Abdurhaman Nur",
  description: "Communities, products and people I've had the privilege to build with.",
}

const achievements = [
  "Built and led developer communities from zero to millions, creating lifelong advocates and feedback channels for product improvements.",
  "Brought 350+ developers together in person globally in under 12 months, building local ecosystems around developer tools.",
  "Led the transformation of AI-powered community infrastructure and live session programmes that became part of company launch strategy.",
]

export default function HighlightsPage() {
  return (
    <FolioShell>
      <PageTitle
        title="Highlights"
        kicker="Record"
        intro="A record of the communities, products, and people I've had the privilege to build with — and the kind words that keep the work moving forward."
      />

      <div className="flex flex-col gap-12 sm:gap-16">
        <section className="folio-in flex flex-col" style={stagger(2)}>
          <SectionMark numeral="I" label="Selected work" />
          <ol className="flex flex-col gap-3 pt-1">
            {achievements.map((a, i) => (
              <li key={a} className="flex gap-3 text-pretty text-[15px] leading-7 text-muted-foreground">
                <span aria-hidden className="w-6 shrink-0 pt-[3px] font-mono text-[10px] tabular-nums text-muted-foreground/45 sm:-ml-9 sm:w-9">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {a}
              </li>
            ))}
          </ol>
        </section>

        <section className="folio-in flex flex-col" style={stagger(3)}>
          <SectionMark numeral="II" label="Gatherings" />
          <ol className="flex flex-col">
            {gatherings.map((g) => (
              <li key={g.slug}>
                <LedgerRow
                  href={`/writing/${g.slug}`}
                  title={g.name}
                  sub={`${g.partner} · ${g.stat} ${g.statLabel}`}
                  meta={g.date}
                />
              </li>
            ))}
          </ol>
        </section>

        <div className="folio-in" style={stagger(4)}>
          <TestimonialsCarousel />
        </div>
      </div>
    </FolioShell>
  )
}
