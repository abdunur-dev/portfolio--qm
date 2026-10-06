import Link from "next/link"
import type { Metadata } from "next"
import { FolioShell, PageTitle, stagger } from "@/components/folio/ui"
import { getPosts, groupByYear } from "@/lib/content"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Writing · Abdurhaman Nur",
  description: "Field notes on software, faith, community and building from Addis Ababa.",
}

export default async function WritingPage() {
  const posts = await getPosts()
  const groups = groupByYear(posts, (p) => p.year)
  let n = 0

  return (
    <FolioShell back={{ href: "/", label: "Home" }}>
      <PageTitle
        title="Writing"
        intro="Field notes from the workbench — software, faith, and the strange middle where they meet. Plus a few notes on events I've helped organise or spoken at."
      />

      {posts.length === 0 && (
        <p className="mt-12 text-sm text-muted-foreground">Nothing published yet — come back soon.</p>
      )}

      <div className="mt-12 flex flex-col gap-12">
        {groups.map(({ year, items }) => (
          <section key={year} className="flex flex-col gap-2">
            <h2 className="folio-in font-serif text-lg italic text-muted-foreground/70" style={stagger(n++)}>
              {year}
            </h2>
            <ul className="flex flex-col">
              {items.map((post) => (
                <li key={post.slug} className="folio-in" style={stagger(n++)}>
                  <Link
                    href={post.href ?? `/writing/${post.slug}`}
                    className="group flex items-start justify-between gap-5 border-b border-border/60 py-5"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="font-medium text-highlighted decoration-primary underline-offset-4 group-hover:underline">
                          {post.title}
                        </h3>
                        <span className="shrink-0 text-sm text-muted-foreground/60">{post.date}</span>
                      </div>
                      {post.excerpt && (
                        <p className="mt-1.5 line-clamp-2 text-pretty text-sm/6 text-muted-foreground">
                          {post.excerpt}
                        </p>
                      )}
                      {post.reading && (
                        <p className="mt-2 text-xs text-muted-foreground/60">
                          {post.reading}
                          <span className="ml-2 inline-block text-primary transition-transform group-hover:translate-x-1">
                            →
                          </span>
                        </p>
                      )}
                    </div>
                    {post.cover_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.cover_url}
                        alt=""
                        className="hidden size-20 shrink-0 rounded-sm object-cover sm:block"
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </FolioShell>
  )
}
