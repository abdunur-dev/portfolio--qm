import type { Metadata } from "next"
import Image from "next/image"
import type { ReactNode } from "react"
import { FolioShell, SectionTitle, stagger } from "@/components/folio/ui"
import { PrintCvButton } from "@/components/print-cv-button"
import { socialLinks } from "@/lib/social-links"
import {
  certifications,
  education,
  events,
  experience,
  skills,
  technology,
  tools,
  type CvEntry,
} from "@/lib/cv-data"

export const metadata: Metadata = {
  title: "CV · Abdurhaman Nur",
  description: "Curriculum vitae of Abdurhaman Nur — Web3 & full-stack developer based in Addis Ababa.",
}

const cvProjects: CvEntry[] = [
  {
    range: "2026",
    title: "Eve Preflight",
    desc: "A developer pre-flight verification tool and workflow audit engine that automates environmental checks, configuration validations, and deployment readiness for modern web and AI applications.",
  },
  {
    range: "2026",
    title: "TinyAgent",
    desc: "Lightweight, composable AI agent runtime enabling autonomous multi-step reasoning, natural language command execution, and tool orchestration with minimal latency.",
  },
  {
    range: "2025",
    title: "MCP Craft",
    desc: "Interactive development platform and toolkit for the Model Context Protocol (MCP), enabling seamless connection between LLMs and external data sources, dev tools, and custom APIs.",
  },
  {
    range: "2024",
    title: "PayCrew",
    desc: "Automated team payroll and disbursement platform engineered with Next.js, TypeScript, and Tailwind CSS, featuring automated recurring payouts and unified financial dashboards.",
  },
]

/** One CV entry: years on the left, title / role / description on the right. */
function Entry({ e, i }: { e: CvEntry; i: number }) {
  return (
    <div
      className="folio-in print-avoid-break grid gap-1 py-3 sm:grid-cols-[7.5rem_1fr] sm:gap-6"
      style={stagger(i)}
    >
      <p className="pt-px text-sm tabular-nums text-muted-foreground/60">{e.range}</p>
      <div className="min-w-0">
        <p className="font-medium text-highlighted">
          {e.title}
          {e.org && <span className="font-normal text-muted-foreground"> — {e.org}</span>}
        </p>
        {e.desc && <p className="mt-1 text-pretty text-sm/6 text-muted-foreground">{e.desc}</p>}
      </div>
    </div>
  )
}

function CvSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <SectionTitle as="h2">{title}</SectionTitle>
      <div className="flex flex-col">{children}</div>
    </section>
  )
}

function Tags({ label, items, i }: { label: string; items: string[]; i: number }) {
  return (
    <div className="folio-in print-avoid-break grid gap-2 py-3 sm:grid-cols-[7.5rem_1fr] sm:gap-6" style={stagger(i)}>
      <p className="text-sm text-muted-foreground/60">{label}</p>
      <ul className="flex flex-wrap gap-1.5">
        {items.map((s) => (
          <li key={s} className="rounded-sm bg-muted px-2 py-0.5 text-xs text-foreground">
            {s}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function CvPage() {
  return (
    <div className="cv-print">
      <FolioShell back={{ href: "/", label: "Home" }} wide>
        <div className="flex flex-col gap-12">
          {/* Header */}
          <header className="folio-in flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <Image
                src="/images/burhan-portrait.jpg"
                alt="Abdurhaman Nur"
                width={64}
                height={64}
                priority
                className="size-16 shrink-0 rounded-sm object-cover print:hidden"
              />
              <div className="flex flex-col gap-0.5">
                <p className="text-sm text-muted-foreground/70">Curriculum vitae</p>
                <h1 className="font-serif text-3xl text-highlighted">
                  Abdurhaman Nur<span className="text-primary">.</span>
                </h1>
                <p className="font-serif text-lg text-primary">Full-Stack &amp; Frontend Engineer · DevRel · Addis Ababa</p>
              </div>
            </div>
            <p className="max-w-prose text-pretty text-sm/6 text-muted-foreground">
              Full-Stack &amp; Frontend Engineer specializing in high-performance web systems, agentic AI workflows, and modern UI architectures. Freelance engineer at Zero Hunger AI (Germany), Vercel Super Host, and Raycast Ambassador with proven DevRel experience uniting 350+ developers across technical conferences and hands-on workshops.
            </p>
            <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm">
              {socialLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("mailto:") ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition-colors hover:text-highlighted"
                  >
                    <span className="text-muted-foreground/60">{l.label}</span>{" "}
                    <span className="border-b border-primary/60 text-foreground">{l.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
          </header>

          <CvSection title="Experience">
            {experience.map((e, i) => (
              <Entry key={e.title + e.range} e={e} i={i} />
            ))}
          </CvSection>

          <CvSection title="Selected projects">
            {cvProjects.map((e, i) => (
              <Entry key={e.title} e={e} i={i} />
            ))}
          </CvSection>

          <CvSection title="Events">
            {events.map((e, i) => (
              <Entry key={e.title} e={e} i={i} />
            ))}
          </CvSection>

          <CvSection title="Education">
            {education.map((e, i) => (
              <Entry key={e.title} e={e} i={i} />
            ))}
          </CvSection>

          <CvSection title="Certifications">
            {certifications.map((e, i) => (
              <Entry key={e.title} e={e} i={i} />
            ))}
          </CvSection>

          <CvSection title="Workflow">
            <Tags label="Skills" items={skills} i={0} />
            <Tags label="Tools" items={tools} i={1} />
            <Tags label="Technology" items={technology} i={2} />
          </CvSection>

          <PrintCvButton />
        </div>
      </FolioShell>
    </div>
  )
}
