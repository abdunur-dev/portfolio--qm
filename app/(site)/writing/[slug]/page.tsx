import Link from "next/link"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { FolioShell } from "@/components/folio/ui"
import { AsciiFigure } from "@/components/minimal/ascii-figure"
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
        <Link
          href="/writing"
          className="folio-in group mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">←</span> All writing
        </Link>

        {/* Title block */}
        <header className="flex flex-col gap-4">
          <h1 className="folio-in text-balance text-2xl font-semibold leading-tight tracking-tight sm:text-4xl" style={{ animationDelay: "40ms" }}>
            {post.title}
          </h1>
          {meta.length > 0 && (
            <p className="folio-in flex items-center gap-1.5 text-sm text-muted-foreground" style={{ animationDelay: "80ms" }}>
              {meta.map((m, i) => (
                <span key={m} className="flex items-center gap-1.5 tabular-nums">
                  {i > 0 && <span aria-hidden>·</span>}
                  {m}
                </span>
              ))}
            </p>
          )}
          {post.excerpt && (
            <p className="folio-in max-w-prose text-pretty text-base leading-relaxed text-muted-foreground" style={{ animationDelay: "120ms" }}>
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
                  <h2 key={i} className="mt-10 mb-3 text-2xl font-semibold leading-tight tracking-tight">
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

      {/* ASCII sign-off */}
      <div aria-hidden className="mt-16 flex flex-col items-center gap-3">
        <div className="w-24 sm:w-28">
          <AsciiFigure src="/ascii/mark.jpg" crop={[0.24, 0.25, 0.52, 0.52]} cols={30} label="" />
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Seek · Read on</p>
      </div>

      {/* Prev / next */}
      {(newer || older) && (
        <nav aria-label="More writing" className="mt-8 grid gap-3 sm:grid-cols-2">
          {older ? (
            <Link
              href={older.href ?? `/writing/${older.slug}`}
              className="group flex flex-col gap-1 rounded-xl border p-4 transition-colors hover:bg-muted/60"
            >
              <span className="text-xs text-muted-foreground">← Older</span>
              <span className="text-sm font-medium transition-transform duration-300 group-hover:-translate-x-0.5">{older.title}</span>
            </Link>
          ) : (
            <span className="hidden sm:block" />
          )}
          {newer && (
            <Link
              href={newer.href ?? `/writing/${newer.slug}`}
              className="group flex flex-col gap-1 rounded-xl border p-4 transition-colors hover:bg-muted/60 sm:items-end sm:text-right"
            >
              <span className="text-xs text-muted-foreground">Newer →</span>
              <span className="text-sm font-medium transition-transform duration-300 group-hover:translate-x-0.5">{newer.title}</span>
            </Link>
          )}
        </nav>
      )}
    </FolioShell>
  )
}
