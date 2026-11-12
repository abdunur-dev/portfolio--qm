import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { FolioShell } from "@/components/folio/ui"
import { MarkdownBody } from "@/components/markdown-body"
import { BlogImageCarousel } from "@/components/blog-image-carousel"
import { getPost, getPosts } from "@/lib/content"

export const dynamic = "force-dynamic"

type Params = { slug: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: "Not found" }
  return {
    title: `${post.title} · Abdurhaman Nur`,
    description: post.excerpt,
    openGraph: post.cover_url ? { images: [post.cover_url] } : undefined,
  }
}

export default async function WritingPost({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const [post, all] = await Promise.all([getPost(slug), getPosts()])
  if (!post) notFound()

  // Previous / next navigation within the writing list.
  const idx = all.findIndex((p) => p.slug === post.slug)
  const newer = idx > 0 ? all[idx - 1] : null
  const older = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null

  return (
    <FolioShell back={{ href: "/writing", label: "All writing" }} wide>
      <article>
        {/* Title block */}
        <header className="folio-in flex flex-col gap-3">
          <p className="flex flex-wrap gap-1.5">
            {[post.date, post.reading].filter(Boolean).map((m) => (
              <span key={m} className="border border-border bg-card px-1.5 py-[3px] text-[10px] leading-none text-foreground">
                {m}
              </span>
            ))}
          </p>
          <h1 className="text-balance font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-highlighted sm:text-5xl">
            {post.title}
            <span className="text-primary">_</span>
          </h1>
          {post.excerpt && (
            <p className="max-w-prose text-pretty font-prose text-base/7 text-muted-foreground">{post.excerpt}</p>
          )}
        </header>

        {/* Picture / Carousel */}
        {post.image_urls && post.image_urls.length > 1 ? (
          <div className="folio-in mt-8" style={{ animationDelay: "80ms" }}>
            <BlogImageCarousel images={post.image_urls} title={post.title} />
          </div>
        ) : post.cover_url ? (
          <figure className="folio-in mt-10" style={{ animationDelay: "80ms" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.cover_url}
              alt={`${post.title} cover image`}
              className="aspect-[16/9] w-full border border-border object-cover"
            />
          </figure>
        ) : post.image_urls && post.image_urls.length > 0 ? (
          <figure className="folio-in mt-10" style={{ animationDelay: "80ms" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.image_urls[0]}
              alt={`${post.title} cover image`}
              className="aspect-[16/9] w-full border border-border object-cover"
            />
          </figure>
        ) : null}

        {/* Article */}
        <div className="folio-in mt-10 font-prose" style={{ animationDelay: "160ms" }}>
          {post.body ? (
            <MarkdownBody content={post.body} />
          ) : post.blocks.length > 0 ? (
            <div>
              {post.blocks.map((block, i) =>
                block.type === "h2" ? (
                  <h2 key={i} className="mt-10 mb-3 font-display text-2xl font-bold leading-tight text-highlighted">
                    {block.text}
                  </h2>
                ) : (
                  <p key={i} className="my-5 text-pretty text-[0.95rem] leading-[1.85] text-foreground sm:text-base">
                    {block.text}
                  </p>
                ),
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              This post is still on the workbench. Come back soon — or email me and I&apos;ll send you the rough
              draft.
            </p>
          )}
        </div>
      </article>

      {/* Prev / next */}
      {(newer || older) && (
        <nav aria-label="More writing" className="mt-16 grid border border-border sm:grid-cols-2">
          {older ? (
            <Link href={older.href ?? `/writing/${older.slug}`} className="group flex flex-col gap-1 bg-card p-4 transition-colors hover:bg-background">
              <span className="text-[10px] uppercase tracking-wide text-muted-foreground">← Older</span>
              <span className="text-sm font-medium text-highlighted transition-colors group-hover:text-primary">
                {older.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {newer && (
            <Link
              href={newer.href ?? `/writing/${newer.slug}`}
              className="group flex flex-col gap-1 border-t border-border bg-card p-4 transition-colors hover:bg-background sm:items-end sm:border-t-0 sm:border-l sm:text-right"
            >
              <span className="text-[10px] uppercase tracking-wide text-muted-foreground">Newer →</span>
              <span className="text-sm font-medium text-highlighted transition-colors group-hover:text-primary">
                {newer.title}
              </span>
            </Link>
          )}
        </nav>
      )}
    </FolioShell>
  )
}
