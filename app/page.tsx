import Link from "next/link"
import { FolioShell, InlineLink, MoreLink, Section, SectionTitle, stagger } from "@/components/folio/ui"
import { SocialIcons } from "@/components/folio/social-icons"
import { AvatarLightbox } from "@/components/avatar-lightbox"
import { VisitorCounter } from "@/components/visitor-counter"
import { experience } from "@/lib/cv-data"
import { ProjectsGrid } from "@/components/home/projects-grid"
import { Gatherings } from "@/components/home/gatherings"
import { Timeline } from "@/components/home/timeline"
import { Stack, stackGroups } from "@/components/home/stack"
import { gatherings } from "@/lib/gatherings-data"
import { getPosts, getProjects } from "@/lib/content"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const [posts, projects] = await Promise.all([getPosts(), getProjects()])

  return (
    <FolioShell wide>
      <div className="flex flex-col gap-14 sm:gap-16">
        {/* Masthead Header */}
        <header className="flex flex-col gap-6 pt-2">
          {/* Location & Telemetry Context */}
          <div className="flex items-center justify-between gap-4 border-b border-border/70 pb-3 font-mono text-xs text-muted-foreground/80">
            <div className="flex min-w-0 items-center gap-2 whitespace-nowrap">
              <span className="size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
              <span className="truncate">Addis Ababa, Ethiopia</span>
            </div>
            <div className="flex shrink-0 items-center gap-3 whitespace-nowrap">
              <span className="hidden sm:inline">UTC+3</span>
              <VisitorCounter />
            </div>
          </div>

          {/* Persona & Bio */}
          <div className="flex items-center gap-4 sm:gap-5">
            <AvatarLightbox
              src="/images/burhan-portrait.jpg"
              alt="Abdurhaman Nur"
              size={72}
              className="size-16 sm:size-18 rounded-md object-cover object-top border border-border/80 shadow-xs shrink-0"
            />
            <div className="flex min-w-0 flex-col gap-1">
              <h1 className="font-serif text-3xl leading-none sm:text-4xl tracking-tight text-highlighted font-normal">
                Abdurhaman Nur
              </h1>
              <p className="text-sm font-medium text-primary">
                Systems &amp; Web3 Engineer
              </p>
            </div>
          </div>

          <p className="max-w-prose text-pretty text-base leading-relaxed text-foreground/90 font-sans">
            Building protocol primitives, decentralized applications, and quiet systems from Addis Ababa.
            I organize gatherings for local builders, tinker with distributed runtimes, and write about the intersection of craft, systems, and life. Read my <InlineLink href="/cv">curriculum vitae</InlineLink>.
          </p>

          <div className="pt-1">
            <SocialIcons />
          </div>
        </header>

        <Section>
          <SectionTitle index={1} meta={`${projects.length} shipped`} action={<MoreLink href="/all">All projects</MoreLink>}>
            Projects
          </SectionTitle>
          <ProjectsGrid projects={projects.slice(0, 5)} />
        </Section>

        <Section>
          <SectionTitle index={2} meta={`${gatherings.length} events`} action={<MoreLink href="/highlights">Highlights</MoreLink>}>
            Gatherings
          </SectionTitle>
          <p className="max-w-prose text-pretty text-sm leading-relaxed text-muted-foreground">
            I host builder events in Addis Ababa with the tools I use every day, so local developers get a seat at global
            tables.
          </p>
          <Gatherings />
        </Section>

        <Section>
          <SectionTitle index={3} meta={`${experience.length} roles`} action={<MoreLink href="/cv">Full CV</MoreLink>}>
            Experience
          </SectionTitle>
          <Timeline items={experience} />
        </Section>

        <Section>
          <SectionTitle index={4} meta={`${stackGroups.reduce((n, g) => n + g.items.length, 0)} entries`}>Stack</SectionTitle>
          <Stack />
        </Section>

        <Section>
          <SectionTitle index={5} action={<MoreLink href="/writing">All articles</MoreLink>}>
            Writing
          </SectionTitle>
          {posts.length === 0 ? (
            <p className="py-4 text-sm text-muted-foreground">Nothing published yet — return soon.</p>
          ) : (
            <div className="flex flex-col">
              {posts.slice(0, 3).map((post, i) => (
                <Link
                  key={post.slug}
                  href={post.href ?? `/writing/${post.slug}`}
                  style={stagger(i)}
                  className="folio-in group -mx-3 flex flex-col gap-1.5 rounded-md px-3 py-3.5 transition-colors hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:outline-none"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-pretty font-medium text-highlighted transition-colors group-hover:text-primary">
                      {post.title}
                    </h3>
                    <span className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground/70">{post.date}</span>
                  </div>
                  {post.excerpt && (
                    <p className="line-clamp-2 text-pretty text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                  )}
                  {post.reading && (
                    <span className="font-mono text-[11px] text-muted-foreground/60">{post.reading}</span>
                  )}
                </Link>
              ))}
            </div>
          )}
        </Section>
      </div>
    </FolioShell>
  )
}
