import type { Metadata } from "next"
import { Clock } from "lucide-react"
import { FolioShell, PageTitle, stagger } from "@/components/folio/ui"
import { ListRow } from "@/components/minimal/entry"
import { getPosts, groupByYear } from "@/lib/content"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Writing · Abdurhaman Nur",
  description: "Field notes on software, faith, community and building from Addis Ababa.",
}

export default async function WritingPage() {
  const posts = await getPosts()
  const groups = groupByYear(posts, (p) => p.year)
  let n = 2

  return (
    <FolioShell>
      <PageTitle
        title="Writing"
        kicker="Seek · Read"
        glyph="Aa"
        intro="Field notes from the workbench — software, faith, and the strange middle where they meet. Plus a few notes on events I've helped organise or spoken at."
      />

      {posts.length === 0 && <p className="text-sm text-muted-foreground">Nothing published yet — come back soon.</p>}

      <div className="flex flex-col gap-12">
        {groups.map(({ year, items }) => (
          <section key={year} className="flex flex-col gap-4">
            <h2
              className="folio-in flex items-center gap-3 text-sm font-medium tabular-nums text-muted-foreground after:h-px after:flex-1 after:bg-border"
              style={stagger(n++)}
            >
              {year}
            </h2>
            <ul className="flex flex-col divide-y divide-dashed">
              {items.map((post) => (
                <li key={post.slug} className="folio-in py-2 first:pt-0 last:pb-0" style={stagger(n++)}>
                  <div className="-mx-3">
                    <ListRow
                      href={post.href ?? `/writing/${post.slug}`}
                      title={post.title}
                      excerpt={post.excerpt}
                      thumb={post.cover_url}
                      meta={
                        <>
                          <time className="tabular-nums">{post.date}</time>
                          {post.reading && (
                            <>
                              <span aria-hidden>·</span>
                              <span className="inline-flex items-center gap-1">
                                <Clock aria-hidden className="size-3" />
                                {post.reading}
                              </span>
                            </>
                          )}
                        </>
                      }
                    />
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </FolioShell>
  )
}
