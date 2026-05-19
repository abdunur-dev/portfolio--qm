import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { AuroraBackground } from "@/components/aurora-background"
import { AnimatedHeading } from "@/components/animated-heading"
import { FadeUp } from "@/components/fade-up"
import { FloatingSparkle } from "@/components/floating-sparkle"
import { createClient } from "@/lib/supabase/server"
import type { NowSection as DbNowSection } from "@/lib/types"

export const dynamic = "force-dynamic"

const STATIC_SECTIONS: { label: string; items: string[] }[] = [
  {
    label: "building",
    items: [
      "Polishing TibebChain — small UX details on the reader and onboarding flow.",
      "Shipping a redesign of this site (the one you're on) with a Mayven-flavoured aesthetic.",
      "Sketching a tiny invoicing tool for freelancers who hate invoicing.",
    ],
  },
  {
    label: "learning",
    items: [
      "Going deeper on Next.js 16 cache components and server actions.",
      "Re-reading 'A Philosophy of Software Design' — slowly, with a pen.",
      "Brushing up on rust, mostly to feel humble again.",
    ],
  },
  {
    label: "reading",
    items: [
      "Mere Christianity — C.S. Lewis",
      "Shape Up — Ryan Singer",
      "The Pragmatic Programmer (revisited)",
    ],
  },
  {
    label: "listening to",
    items: [
      "lo-fi at 7am, post-rock at 11pm",
      "the Dwarkesh podcast on the bus",
      "Shai Linne on rotation",
    ],
  },
  {
    label: "elsewhere",
    items: [
      "Long walks. Trying to learn how to rest properly without checking my phone.",
      "Cooking more. Mostly East African food I grew up on.",
    ],
  },
]

export default async function NowPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from("now_sections")
    .select("*")
    .order("position", { ascending: true })
    .order("created_at", { ascending: true })

  const dbSections = (data ?? []) as DbNowSection[]

  const sections =
    dbSections.length > 0
      ? dbSections.map((s) => ({
          label: s.label,
          items: s.items,
          cover_url: s.cover_url,
          updated: s.updated_at,
        }))
      : STATIC_SECTIONS.map((s) => ({ ...s, cover_url: null, updated: undefined }))

  const latestUpdate = dbSections.length
    ? dbSections.reduce<string | undefined>(
        (acc, s) => (!acc || s.updated_at > acc ? s.updated_at : acc),
        undefined,
      )
    : undefined

  const updatedLabel = latestUpdate
    ? new Date(latestUpdate).toLocaleString("en-US", { month: "short", year: "numeric" })
    : "May 2026"

  return (
    <div className="relative min-h-screen">
      <AuroraBackground />
      <div className="relative z-10">
        <SiteNav />
        <main className="mx-auto w-full max-w-4xl px-5 pb-24 sm:px-6 sm:pb-32">
          <section className="pt-4 pb-10 sm:pb-12">
            <AnimatedHeading text="now." className="text-5xl sm:text-6xl md:text-7xl" accentLast />
            <FadeUp delay={0.35}>
              <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-foreground/70">
                A snapshot of what has my attention this season — inspired by
                Derek Sivers&apos; <span className="font-serif italic">/now</span>{" "}
                page idea
                <FloatingSparkle className="ml-2 inline-block" />
              </p>
            </FadeUp>
            <FadeUp delay={0.5}>
              <p className="mt-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                last updated · {updatedLabel}
              </p>
            </FadeUp>
          </section>

          <div className="space-y-12">
            {sections.map((s, i) => (
              <FadeUp key={`${s.label}-${i}`} delay={0.1 + i * 0.06}>
                <section className="relative border-t border-border/60 pt-6">
                  <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground sm:absolute sm:-left-24 sm:top-6 sm:mb-0">
                    {s.label}
                  </h2>
                  {s.cover_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={s.cover_url}
                      alt={`${s.label} image`}
                      className="mb-5 aspect-[3/2] w-full rounded-xl border border-border/60 object-cover"
                    />
                  )}
                  <ul className="space-y-3">
                    {s.items.map((item, j) => (
                      <li
                        key={j}
                        className="flex gap-3 text-base leading-relaxed text-foreground/85"
                      >
                        <span
                          aria-hidden
                          className="mt-2.5 inline-block h-[6px] w-[6px] shrink-0 rounded-full bg-primary"
                        />
                        <span className="text-pretty">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={0.4}>
            <p className="mt-16 max-w-xl text-pretty text-sm leading-relaxed text-foreground/60">
              If something here resonates, say hi. I keep an open inbox and
              answer most thoughtful notes within a week.
            </p>
          </FadeUp>
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}
