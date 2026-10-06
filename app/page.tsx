import { FolioShell, InlineLink, MoreLink, Row, Section, SectionTitle } from "@/components/folio/ui"
import { SocialIcons } from "@/components/folio/social-icons"
import { AvatarLightbox } from "@/components/avatar-lightbox"
import { experience } from "@/lib/cv-data"
import { getPosts, getProjects } from "@/lib/content"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const [posts, projects] = await Promise.all([getPosts(), getProjects()])

  return (
    <FolioShell>
      <div className="mb-4 flex flex-col gap-12 sm:gap-16">
        {/* Intro */}
        <header className="folio-in flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <AvatarLightbox
              src="/images/burhan-portrait.jpg"
              alt="Abdurhaman Nur"
              size={56}
              className="size-14 rounded-sm object-cover object-top"
            />
            <div className="flex flex-col gap-0.5">
              <h1 className="text-lg font-medium text-highlighted">Abdurhaman Nur</h1>
              <h2 className="font-serif text-xl text-primary">Web3 &amp; Full-Stack Developer</h2>
            </div>
          </div>
          <p className="max-w-prose text-pretty text-sm/6 text-muted-foreground">
            Building with care from Addis Ababa ✦ dApps, design systems and AI-assisted products. I also help run{" "}
            <InlineLink href="/highlights">meetups for local builders</InlineLink> and write about the quiet places where
            design, code and faith overlap. Read my <InlineLink href="/cv">CV</InlineLink>.
          </p>
        </header>

        {/* Contact */}
        <Section>
          <SectionTitle>Contact</SectionTitle>
          <SocialIcons />
        </Section>

        {/* Experience */}
        <Section>
          <SectionTitle action={<MoreLink href="/cv">Full CV</MoreLink>}>Experience</SectionTitle>
          <div className="flex flex-col">
            {experience.map((e, i) => (
              <Row key={e.title + e.range} index={i} href={e.href} title={e.title} sub={e.org} meta={e.range} />
            ))}
          </div>
        </Section>

        {/* Projects */}
        <Section>
          <SectionTitle>Projects</SectionTitle>
          <div className="flex flex-col">
            {(() => {
              const selectedTitles = ["VibeVerse", "Team Chat", "Base Link"]
              const featuredProjects = selectedTitles
                .map((title) => projects.find((p) => p.title.toLowerCase() === title.toLowerCase()))
                .filter(Boolean) as typeof projects

              const displayList = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 3)

              return displayList.map((p, i) => (
                <Row
                  key={p.title + p.year}
                  index={i}
                  href={p.href ?? "/all"}
                  title={p.title}
                  meta={<span className="block max-w-[14rem] truncate sm:max-w-xs">{p.kind}</span>}
                />
              ))
            })()}
          </div>
          <MoreLink href="/all">View all</MoreLink>
        </Section>

        {/* Writing */}
        <Section>
          <SectionTitle>Writing</SectionTitle>
          {posts.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nothing published yet — come back soon.</p>
          ) : (
            <div className="flex flex-col">
              {posts.slice(0, 5).map((post, i) => (
                <Row
                  key={post.slug}
                  index={i}
                  href={post.href ?? `/writing/${post.slug}`}
                  title={post.title}
                  meta={post.date}
                />
              ))}
            </div>
          )}
          <MoreLink href="/writing">All writing</MoreLink>
        </Section>
      </div>
    </FolioShell>
  )
}
