import Link from "next/link"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { AuroraBackground } from "@/components/aurora-background"
import { AnimatedHeading } from "@/components/animated-heading"
import { FadeUp } from "@/components/fade-up"
import { posts as staticPosts } from "@/lib/posts-data"
import { createClient } from "@/lib/supabase/server"
import type { Post as DbPost } from "@/lib/types"

export const dynamic = "force-dynamic"

type ListPost = {
  title: string
  slug: string
  date: string
  year: number
  excerpt: string
  reading: string
  href?: string | null
  cover_url?: string | null
}

export default async function WritingPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("year", { ascending: false })
    .order("position", { ascending: true })
    .order("created_at", { ascending: false })

  const dbPosts = (data ?? []) as DbPost[]

  const posts: ListPost[] =
    dbPosts.length > 0
      ? dbPosts.map((p) => ({
          title: p.title,
          slug: p.slug,
          date: p.date_label,
          year: p.year,
          excerpt: p.excerpt,
          reading: p.reading,
          href: p.href,
          cover_url: p.cover_url,
        }))
      : staticPosts

  const grouped = posts.reduce<Record<number, ListPost[]>>((acc, p) => {
    ;(acc[p.year] ||= []).push(p)
    return acc
  }, {})
  const years = Object.keys(grouped).map(Number).sort((a, b) => b - a)

  return (
    <div className="relative min-h-screen">
      <AuroraBackground />
      <div className="relative z-10">
        <SiteNav />
        <main className="mx-auto w-full max-w-4xl px-5 pb-24 sm:px-6 sm:pb-32">
          <section className="pt-4 pb-12 sm:pb-14">
            <AnimatedHeading
              text="writing."
              className="text-5xl sm:text-6xl md:text-7xl"
              accentLast
            />
            <FadeUp delay={0.35}>
              <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-foreground/70">
                Field notes from the workbench — software, faith, and the
                strange middle where they meet. Plus a few notes on{" "}
                <span className="font-serif italic">events I&apos;ve helped
                organize or spoken at</span> around the local builder scene.
              </p>
            </FadeUp>
          </section>

          {posts.length === 0 && (
            <FadeUp>
              <p className="font-mono text-sm text-muted-foreground">
                Nothing published yet — come back soon.
              </p>
            </FadeUp>
          )}

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
                        className="group relative block py-8 transition-colors"
                      >
                        <span
                          aria-hidden
                          className="absolute left-0 top-1/2 h-0 w-[2px] -translate-y-1/2 bg-primary transition-all duration-300 group-hover:h-full"
                        />
                        <div className="flex items-start gap-6 pl-5">
                          {post.cover_url && (
                            <div className="hidden shrink-0 overflow-hidden rounded-lg border border-border/60 sm:block">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={post.cover_url || "/placeholder.svg"}
                                alt=""
                                className="h-24 w-36 object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-baseline justify-between gap-6">
                              <h3 className="font-serif text-xl leading-snug text-foreground transition-colors group-hover:text-primary sm:text-2xl">
                                {post.title}
                              </h3>
                              <span className="hidden shrink-0 font-mono text-xs text-muted-foreground sm:inline">
                                {post.date}
                              </span>
                            </div>
                            {post.excerpt && (
                              <p className="mt-3 max-w-2xl text-pretty text-sm leading-[1.7] text-foreground/65">
                                {post.excerpt}
                              </p>
                            )}
                            <div className="mt-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                              {post.reading && <span>{post.reading}</span>}
                              {post.reading && post.date && <span aria-hidden>·</span>}
                              {post.date && <span className="sm:hidden">{post.date}</span>}
                              <span className="ml-auto inline-flex items-center gap-1 text-foreground/60 transition-all group-hover:translate-x-1 group-hover:text-primary">
                                read <span aria-hidden>→</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </li>
                  </FadeUp>
                ))}
              </ul>
            </section>
          ))}
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}
