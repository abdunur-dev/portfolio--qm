import type { Metadata } from "next"
import { FolioShell, PageTitle, Section, SectionTitle, stagger } from "@/components/folio/ui"
import { ListRow } from "@/components/minimal/entry"
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
  let n = 2
  return (
    <FolioShell>
      <PageTitle
        title="Highlights"
        kicker="Seek · Gather"
        glyph="#1"
        intro="A record of the communities, products, and people I've had the privilege to build with — and the kind words that keep the work moving forward."
      />

      <div className="flex flex-col gap-14">
        <Section>
          <div className="folio-in" style={stagger(n++)}>
            <SectionTitle>Selected work</SectionTitle>
          </div>
          <ul className="flex flex-col gap-4">
            {achievements.map((a) => (
              <li
                key={a}
                className="folio-in flex gap-3 text-pretty text-sm leading-relaxed text-muted-foreground"
                style={stagger(n++)}
              >
                <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-foreground/60" />
                {a}
              </li>
            ))}
          </ul>
        </Section>

        <Section>
          <div className="folio-in" style={stagger(n++)}>
            <SectionTitle>Gatherings</SectionTitle>
          </div>
          <div className="flex flex-col divide-y divide-dashed">
            {gatherings.map((g) => (
              <div key={g.slug} className="folio-in py-2 first:pt-0 last:pb-0" style={stagger(n++)}>
                <div className="-mx-3">
                  <ListRow
                    href={`/writing/${g.slug}`}
                    title={g.name}
                    excerpt={g.note}
                    meta={
                      <>
                        <time className="tabular-nums">{g.date}</time>
                        <span aria-hidden>·</span>
                        <span>{g.partner}</span>
                        <span aria-hidden>·</span>
                        <span className="tabular-nums text-foreground">{g.stat}</span>
                        <span>{g.statLabel}</span>
                      </>
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </Section>

        <TestimonialsCarousel />
      </div>
    </FolioShell>
  )
}
