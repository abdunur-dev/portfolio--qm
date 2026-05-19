import Link from "next/link"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { AuroraBackground } from "@/components/aurora-background"
import { AnimatedHeading } from "@/components/animated-heading"
import { FadeUp } from "@/components/fade-up"
import { posts } from "@/lib/posts-data"

const grouped = posts.reduce<Record<number, typeof posts>>((acc, p) => {
  ;(acc[p.year] ||= []).push(p)
  return acc
}, {})

export default function WritingPage() {
  const years = Object.keys(grouped).map(Number).sort((a, b) => b - a)

  return (
    <div className="relative min-h-screen">
      <AuroraBackground />
      <div className="relative z-10">
        <SiteNav />
        <main className="mx-auto w-full max-w-3xl px-5 pb-24 sm:px-6 sm:pb-32">
          <section className="pt-4 pb-12 sm:pb-14">
            <AnimatedHeading
              text="writing."
              className="text-5xl sm:text-6xl md:text-7xl"
              accentLast
            />
            <FadeUp delay={0.35}>
              <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-foreground/70">
                Field notes from the workbench — software, faith, and the
                strange middle where they meet.
              </p>
            </FadeUp>
          </section>

          {years.map((year, yi) => (
            <section key={year} className="relative mb-16">
              <FadeUp delay={0.05 * yi}>
                <h2 className="mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground sm:absolute sm:-left-24 sm:top-1 sm:mb-0">
                  {year}
                </h2>
              </FadeUp>
              <ul className="divide-y divide-border/60 border-y border-border/60">
                {grouped[year].map((post, i) => (
                  <FadeUp key={post.slug} delay={0.08 + i * 0.05}>
                    <li>
                      <Link
                        href={post.href ?? `/writing/${post.slug}`}
                        className="group relative block py-6 transition-colors"
                      >
                        <span
                          aria-hidden
                          className="absolute left-0 top-1/2 h-0 w-[2px] -translate-y-1/2 bg-primary transition-all duration-300 group-hover:h-full"
                        />
                        <div className="flex items-baseline justify-between gap-6 pl-4">
                          <h3 className="font-serif text-lg leading-snug text-foreground transition-colors group-hover:text-primary sm:text-2xl">
                            {post.title}
                          </h3>
                          <span className="hidden shrink-0 font-mono text-xs text-muted-foreground sm:inline">
                            {post.date}
                          </span>
                        </div>
                        <p className="mt-2 max-w-2xl pl-4 text-pretty text-sm leading-relaxed text-foreground/70">
                          {post.excerpt}
                        </p>
                        <div className="mt-3 flex items-center gap-3 pl-4 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                          <span>{post.reading}</span>
                          <span aria-hidden>·</span>
                          <span className="sm:hidden">{post.date}</span>
                          <span className="ml-auto inline-flex items-center gap-1 text-foreground/60 transition-all group-hover:translate-x-1 group-hover:text-primary">
                            read <span aria-hidden>→</span>
                          </span>
                        </div>
                      </Link>
                    </li>
                  </FadeUp>
                ))}
              </ul>
            </section>
          ))}

          <FadeUp delay={0.2}>
            <p className="mt-12 font-mono text-xs text-muted-foreground">
              more soon. an RSS feed lives at{" "}
              <span className="text-foreground/70">/feed.xml</span> when these
              are real.
            </p>
          </FadeUp>
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}
