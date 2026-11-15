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

  const meta = [post.date, post.reading].filter(Boolean)

  return (
    <FolioShell>
      <article>
        {/* Title block ("← Writing" lives in the letterhead) */}
        <header className="flex flex-col gap-4">
          {meta.length > 0 && (
            <p className="folio-in flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground/70">
              {meta.map((m, i) => (
                <span key={m} className="flex items-center gap-1.5 tabular-nums">
                  {i > 0 && <span aria-hidden>·</span>}
                  {m}
                </span>
              ))}
            </p>
          )}
          <h1 className="folio-in text-balance font-display text-[2rem] leading-10 text-foreground sm:text-4xl" style={{ animationDelay: "40ms" }}>
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="folio-in max-w-prose text-pretty text-[15px] leading-7 text-muted-foreground" style={{ animationDelay: "120ms" }}>
              {post.excerpt}
            </p>
          )}
        </header>

        {/* Picture / Carousel */}
        {post.image_urls && post.image_urls.length > 1 ? (
          <div className="folio-in mt-8" style={{ animationDelay: "160ms" }}>
            <BlogImageCarousel images={post.image_urls} title={post.title} />
          </div>
        ) : post.cover_url || (post.image_urls && post.image_urls.length > 0) ? (
          <figure className="folio-in mt-10" style={{ animationDelay: "160ms" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.cover_url ?? post.image_urls![0]}
              alt={`${post.title} cover image`}
              className="aspect-[16/9] w-full rounded-xl object-cover shadow-sm outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10"
            />
          </figure>
        ) : null}

        {/* Article */}
        <div className="folio-in mt-10" style={{ animationDelay: "200ms" }}>
          {post.body ? (
            <MarkdownBody content={post.body} />
          ) : post.blocks.length > 0 ? (
            <div>
              {post.blocks.map((block, i) =>
                block.type === "h2" ? (
                  <h2 key={i} className="mt-10 mb-3 font-display text-2xl leading-tight">
                    {block.text}
                  </h2>
                ) : (
                  <p key={i} className="my-5 text-pretty text-[0.95rem] leading-[1.85] text-foreground/90 sm:text-base">
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

      {/* Signed off by hand */}
      <div className="mt-16 flex items-center gap-4">
        <span aria-hidden className="h-px flex-1 bg-border" />
        <p className="font-[family-name:var(--font-signature)] text-3xl leading-none text-foreground">Burhan</p>
      </div>

      {/* Prev / next */}
      {(newer || older) && (
        <nav aria-label="More writing" className="mt-10 grid gap-6 sm:grid-cols-2">
          {older ? (
            <Link href={older.href ?? `/writing/${older.slug}`} className="group flex flex-col gap-1.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground/60">← Older</span>
              <span className="text-[15px] font-medium text-foreground underline-offset-4 group-hover:underline">
                {older.title}
              </span>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
          {newer && (
            <Link
              href={newer.href ?? `/writing/${newer.slug}`}
              className="group flex flex-col gap-1.5 sm:items-end sm:text-right"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground/60">Newer →</span>
              <span className="text-[15px] font-medium text-foreground underline-offset-4 group-hover:underline">
                {newer.title}
              </span>
            </Link>
          )}
        </nav>
      )}
    </FolioShell>
  )
}
