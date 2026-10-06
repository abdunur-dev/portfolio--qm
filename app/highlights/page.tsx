import type { Metadata } from "next"
import { FolioShell, PageTitle, Section, SectionTitle, stagger } from "@/components/folio/ui"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"

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
    <FolioShell back={{ href: "/", label: "Home" }}>
      <div className="flex flex-col gap-12 sm:gap-16">
        <PageTitle
          title="Highlights"
          intro="A record of the communities, products, and people I've had the privilege to build with — and the kind words that keep the work moving forward."
        />

        <Section>
          <SectionTitle>Selected work</SectionTitle>
          <ul className="flex flex-col gap-4">
            {achievements.map((a, i) => (
              <li key={a} className="folio-in flex gap-3 text-pretty text-sm/6 text-foreground" style={stagger(i)}>
                <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {a}
              </li>
            ))}
          </ul>
        </Section>

        <TestimonialsCarousel />
      </div>
    </FolioShell>
  )
}
