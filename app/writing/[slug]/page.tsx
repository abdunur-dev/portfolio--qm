import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { AuroraBackground } from "@/components/aurora-background"
import { FadeUp } from "@/components/fade-up"
import { posts } from "@/lib/posts-data"

type Params = { slug: string }

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) return { title: "Not found" }
  return {
    title: `${post.title} — Burhan`,
    description: post.excerpt,
  }
}

export default async function WritingPost({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const post = posts.find((p) => p.slug === slug)
  if (!post) notFound()

  return (
    <div className="relative min-h-screen">
      <AuroraBackground />
      <div className="relative z-10">
        <SiteNav />
        <main className="mx-auto w-full max-w-3xl px-5 pb-24 pt-6 sm:px-6 sm:pb-32 sm:pt-10">
          <FadeUp>
            <Link
              href="/writing"
              className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <span aria-hidden>←</span> back to writing
            </Link>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              {post.date} · {post.reading}
            </p>
            <h1 className="mt-3 font-serif text-3xl leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
              {post.title}
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-foreground/70">
              {post.excerpt}
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="prose prose-neutral mt-12 max-w-none border-t border-border/60 pt-10 dark:prose-invert prose-headings:font-serif prose-headings:tracking-tight prose-p:font-serif prose-p:text-base prose-p:leading-relaxed prose-p:text-foreground/85 sm:prose-p:text-lg prose-a:text-primary">
              {post.body ? (
                post.body.map((block, i) =>
                  block.type === "h2" ? (
                    <h2 key={i} className="mt-10 text-2xl sm:text-3xl">
                      {block.text}
                    </h2>
                  ) : (
                    <p key={i}>{block.text}</p>
                  ),
                )
              ) : (
                <p className="font-mono text-sm text-muted-foreground">
                  This post is still on the workbench. Come back soon — or
                  email me and I&apos;ll send you the rough draft.
                </p>
              )}
            </div>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="mt-16 border-t border-border/60 pt-6">
              <Link
                href="/writing"
                className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
              >
                <span aria-hidden>←</span> all writing
              </Link>
            </div>
          </FadeUp>
        </main>
        <SiteFooter />
      </div>
    </div>
  )
}
