import type { Metadata } from "next"
import Link from "next/link"
import { PrintCvButton } from "@/components/print-cv-button"
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
  description: "Curriculum vitae of Abdurhaman Nur — Full-Stack & Frontend Engineer, DevRel & Vercel Super Host.",
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

export default function CvPage() {
  return (
    <div id="cv-root" className="cv-print min-h-screen bg-background text-foreground selection:bg-primary/20 print:bg-white print:text-black">
      {/* Top back navigation */}
      <div className="mx-auto max-w-4xl px-6 pt-8 print:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground transition hover:text-foreground"
        >
          <span>←</span> Back to home
        </Link>
      </div>

      <main className="mx-auto max-w-4xl px-6 py-8 sm:py-12 print:max-w-none print:px-0 print:py-0">
        <div className="rounded-xl border border-border/60 bg-card/30 p-6 sm:p-12 print:border-none print:bg-transparent print:p-0">
          
          {/* Header Action: Print / Save PDF */}
          <div className="flex items-center justify-end pb-4 print:hidden">
            <PrintCvButton />
          </div>

          {/* CV Header: Name, Note, Bio, and Links */}
          <header className="grid gap-6 border-b border-border/80 pb-8 sm:grid-cols-[1fr_13rem]">
            <div className="flex flex-col gap-2.5">
              <h1 className="font-serif text-3xl tracking-tight text-highlighted sm:text-4xl">
                Abdurhaman Nur
              </h1>
              <p className="font-mono text-xs text-muted-foreground">
                Also known as Burhan online.
              </p>
              <p className="mt-1 max-w-xl text-pretty text-sm/relaxed text-muted-foreground">
                I build high-performance web products, agentic AI systems, and spaces for developers to learn, connect, and ship modern software.
              </p>
            </div>

            <div className="flex flex-col gap-2 sm:border-l sm:border-border/60 sm:pl-6">
              <p className="font-mono text-xs uppercase tracking-wider text-foreground">Links</p>
              <ul className="flex flex-col gap-1.5 font-mono text-xs">
                <li>
                  <a
                    href="https://burhan.ink"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition hover:text-highlighted underline decoration-border underline-offset-4"
                  >
                    burhan.ink
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/AbdurhamanNur"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition hover:text-highlighted underline decoration-border underline-offset-4"
                  >
                    x.com/AbdurhamanNur
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/abdunur-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition hover:text-highlighted underline decoration-border underline-offset-4"
                  >
                    github.com/abdunur-dev
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/abdurhaman-nur/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground transition hover:text-highlighted underline decoration-border underline-offset-4"
                  >
                    linkedin.com/in/abdurhaman-nur
                  </a>
                </li>
              </ul>
            </div>
          </header>

          {/* Two-Column CV Body (Pauline Bakhtiari style) */}
          <div className="mt-8 grid gap-10 sm:grid-cols-[1fr_17rem] print:grid-cols-[1fr_16rem] print:gap-8">
            
            {/* Left Column: EXPERIENCE & PROJECTS */}
            <div className="flex flex-col gap-10">
              
              {/* EXPERIENCE */}
              <section className="flex flex-col gap-4">
                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground font-semibold">
                  EXPERIENCE
                </h2>
                <div className="flex flex-col gap-5">
                  {experience.map((e) => (
                    <div key={e.title + e.range} className="print-avoid-break grid gap-1 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
                      <span className="font-mono text-xs text-muted-foreground/70 shrink-0 pt-0.5">
                        {e.range}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-highlighted">
                          {e.title}
                          {e.org && <span className="font-normal text-muted-foreground">, {e.org}</span>}
                        </p>
                        {e.desc && (
                          <p className="mt-1 text-pretty text-xs/relaxed text-muted-foreground">
                            {e.desc}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* PROJECTS */}
              <section className="flex flex-col gap-4">
                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground font-semibold">
                  PROJECTS
                </h2>
                <div className="flex flex-col gap-5">
                  {cvProjects.map((p) => (
                    <div key={p.title} className="print-avoid-break grid gap-1 sm:grid-cols-[6.5rem_1fr] sm:gap-4">
                      <span className="font-mono text-xs text-muted-foreground/70 shrink-0 pt-0.5">
                        {p.range}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-highlighted">
                          {p.title}
                        </p>
                        {p.desc && (
                          <p className="mt-1 text-pretty text-xs/relaxed text-muted-foreground">
                            {p.desc}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column: WORKFLOW, COMMUNITIES, EDUCATION, CERTIFICATIONS */}
            <aside className="flex flex-col gap-8 sm:border-l sm:border-border/60 sm:pl-6 print:border-l print:border-border/60 print:pl-6">
              
              {/* WORKFLOW */}
              <section className="flex flex-col gap-4">
                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground font-semibold">
                  WORKFLOW
                </h2>
                
                {/* Skills tags */}
                <div className="flex flex-col gap-2">
                  <p className="font-mono text-xs text-muted-foreground">Skills</p>
                  <ul className="flex flex-wrap gap-1.5">
                    {skills.map((s) => (
                      <li
                        key={s}
                        className="rounded-full border border-border/70 bg-secondary/50 px-2.5 py-0.5 font-mono text-[11px] text-foreground print:border print:border-black/20"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tools tags */}
                <div className="flex flex-col gap-2 pt-2">
                  <p className="font-mono text-xs text-muted-foreground">Tools</p>
                  <ul className="flex flex-wrap gap-1.5">
                    {tools.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-border/70 bg-secondary/50 px-2.5 py-0.5 font-mono text-[11px] text-foreground print:border print:border-black/20"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technology tags */}
                <div className="flex flex-col gap-2 pt-2">
                  <p className="font-mono text-xs text-muted-foreground">Technology</p>
                  <ul className="flex flex-wrap gap-1.5">
                    {technology.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-border/70 bg-secondary/50 px-2.5 py-0.5 font-mono text-[11px] text-foreground print:border print:border-black/20"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* COMMUNITIES */}
              <section className="flex flex-col gap-3">
                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground font-semibold">
                  COMMUNITIES
                </h2>
                <div className="flex flex-col gap-3">
                  {events.map((ev) => (
                    <div key={ev.title} className="print-avoid-break">
                      <span className="font-mono text-[11px] text-muted-foreground/70 block">
                        {ev.range}
                      </span>
                      <p className="text-xs font-medium text-highlighted mt-0.5">
                        {ev.org ? `${ev.org}, ` : ""}
                        <span className="font-normal text-muted-foreground">{ev.title}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* EDUCATION */}
              <section className="flex flex-col gap-3">
                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground font-semibold">
                  EDUCATION
                </h2>
                <div className="flex flex-col gap-3">
                  {education.map((ed) => (
                    <div key={ed.title} className="print-avoid-break">
                      <span className="font-mono text-[11px] text-muted-foreground/70 block">
                        {ed.range}
                      </span>
                      <p className="text-xs font-medium text-highlighted mt-0.5">
                        {ed.title}
                        {ed.org && <span className="font-normal text-muted-foreground">, {ed.org}</span>}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* CERTIFICATIONS */}
              <section className="flex flex-col gap-3">
                <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground font-semibold">
                  CERTIFICATIONS
                </h2>
                <div className="flex flex-col gap-3">
                  {certifications.map((c) => (
                    <div key={c.title} className="print-avoid-break">
                      <span className="font-mono text-[11px] text-muted-foreground/70 block">
                        {c.range}
                      </span>
                      <p className="text-xs font-medium text-highlighted mt-0.5">
                        {c.title}
                        {c.org && <span className="font-normal text-muted-foreground">, {c.org}</span>}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

            </aside>
          </div>

        </div>
      </main>
    </div>
  )
}
