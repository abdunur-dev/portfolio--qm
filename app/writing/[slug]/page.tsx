import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { AuroraBackground } from "@/components/aurora-background"
import { FadeUp } from "@/components/fade-up"
import { posts as staticPosts } from "@/lib/posts-data"
import { createClient } from "@/lib/supabase/server"
import type { Post as DbPost } from "@/lib/types"

export const dynamic = "force-dynamic"

type Params = { slug: string }

type ResolvedPost = {
  title: string
  slug: string
  excerpt: string
  date: string
  reading: string
  href?: string | null
  cover_url?: string | null
  blocks: { type: "h2" | "p"; text: string }[]
}

function bodyToBlocks(body: string): { type: "h2" | "p"; text: string }[] {
  if (!body.trim()) return []
  return body
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) =>
      chunk.startsWith("## ")
        ? { type: "h2" as const, text: chunk.slice(3).trim() }
        : { type: "p" as const, text: chunk.replace(/\n/g, " ") },
    )
}

async function getPost(slug: string): Promise<ResolvedPost | null> {
  const supabase = await createClient()
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle()

  if (data) {
    const p = data as DbPost
    return {
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      date: p.date_label,
      reading: p.reading,
      href: p.href,
      cover_url: p.cover_url,
      blocks: bodyToBlocks(p.body || ""),
    }
  }

  const fallback = staticPosts.find((p) => p.slug === slug)
  if (!fallback) return null
  return {
    title: fallback.title,
    slug: fallback.slug,
    excerpt: fallback.excerpt,
    date: fallback.date,
    reading: fallback.reading,
    href: fallback.href ?? null,
    blocks: fallback.body ?? [],
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: "Not found" }
  return { title: `${post.title} — Abdurhaman`, description: post.excerpt }
}

export default async function WritingPost({
  params,
}: {
  params: Promise<Params>
}) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  return (
    <div className="relative min-h-screen">
      <AuroraBackground />
      <div className="relative z-10">
        <SiteNav />
        <main className="mx-auto w-full max-w-4xl px-5 pb-24 pt-6 sm:px-6 sm:pb-32 sm:pt-10">
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
              {[post.date, post.reading].filter(Boolean).join(" · ")}
            </p>
            <h1 className="mt-3 font-serif text-3xl leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-foreground/70">
                {post.excerpt}
              </p>
            )}
          </FadeUp>

          {post.cover_url && (
            <FadeUp delay={0.15}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.cover_url || "/placeholder.svg"}
                alt={`${post.title} cover image`}
                className="mt-10 aspect-[16/9] w-full rounded-2xl border border-border/60 object-cover"
              />
            </FadeUp>
          )}

          <FadeUp delay={0.2}>
            <div className="mt-12 max-w-none border-t border-border/60 pt-10">
              {post.blocks.length > 0 ? (
                <div className="space-y-6">
                  {post.blocks.map((block, i) =>
                    block.type === "h2" ? (
                      <h2
                        key={i}
                        className="mt-12 mb-2 font-serif text-2xl leading-tight tracking-tight text-foreground sm:text-3xl"
                      >
                        {block.text}
                      </h2>
                    ) : (
                      <p
                        key={i}
                        className="text-[0.95rem] leading-[1.8] text-foreground/85 sm:text-base sm:leading-[1.85]"
                      >
                        {block.text}
                      </p>
                    ),
                  )}
                </div>
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
