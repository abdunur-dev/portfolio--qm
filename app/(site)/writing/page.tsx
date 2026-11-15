import type { Metadata } from "next"
import { FolioShell, PageTitle, stagger } from "@/components/folio/ui"
import { LedgerRow, SectionMark } from "@/components/minimal/ledger"
import { getPosts, groupByYear } from "@/lib/content"
import { toRoman } from "@/lib/roman"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Writing · Abdurhaman Nur",
  description: "Field notes on software, faith, community and building from Addis Ababa.",
}

export default async function WritingPage() {
  const posts = await getPosts()
  const groups = groupByYear(posts, (p) => p.year)

  return (
    <FolioShell>
      <PageTitle
        title="Writing"
        kicker="Field notes"
        intro="Field notes from the workbench — software, faith, and the strange middle where they meet. Plus a few notes on events I've helped organise or spoken at."
      />

      {posts.length === 0 && <p className="text-sm text-muted-foreground">Nothing published yet — come back soon.</p>}

      <div className="flex flex-col gap-12 sm:gap-16">
        {groups.map(({ year, items }, g) => (
          <section key={year} className="folio-in flex flex-col" style={stagger(g + 2)}>
            <SectionMark numeral={toRoman(g + 1)} label={year} />
            <ol className="flex flex-col">
              {items.map((post) => (
                <li key={post.slug}>
                  <LedgerRow
                    href={post.href ?? `/writing/${post.slug}`}
                    title={post.title}
                    meta={[post.date, post.reading].filter(Boolean).join(" · ")}
                  />
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </FolioShell>
  )
}
