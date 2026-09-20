import Image from "next/image"
import Link from "next/link"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { socialLinks } from "@/lib/social-links"

const achievements = [
  "Built and led developer communities from zero to millions, creating lifelong advocates and feedback channels for product improvements.",
  "Brought 350+ developers together in person globally in under 12 months, building local ecosystems around developer tools.",
  "Led the transformation of AI-powered community infrastructure and live session programmes that became part of company launch strategy.",
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <SiteNav />
      <main id="main" className="mx-auto w-full max-w-3xl px-5 pb-20 pt-16 sm:px-8 sm:pt-24">
        <section id="about" className="scroll-mt-24">
          <div className="flex items-start justify-between gap-8">
            <div>
              <p className="font-mono text-xs tracking-wide text-muted-foreground">Abdurhaman · burhan_</p>
              <h1 className="mt-8 max-w-2xl text-4xl font-semibold tracking-[-0.06em] text-foreground sm:text-6xl">
                Developer, builder, and community organizer.
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground sm:text-xl">
                I turn rough ideas into useful things for people — across full-stack web, Web3, AI, and the communities around them.
              </p>
            </div>
            <Image
              src="/images/burhan-portrait.jpg"
              alt="Abdurhaman in Addis Ababa"
              width={88}
              height={88}
              priority
              className="hidden rounded-full object-cover grayscale sm:block"
            />
          </div>
          <div className="mt-10 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-muted-foreground">
            <span>Addis Ababa, Ethiopia</span>
            <span>Building since 2020</span>
            <span>Open to collaborations</span>
          </div>
        </section>

        <div className="my-20 border-t border-border" />

        <section id="work" className="scroll-mt-24">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight">Selected work</h2>
            <Link href="/all" className="font-mono text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground">View all ↗</Link>
          </div>
          <div className="mt-8 divide-y divide-border border-y border-border">
            <Link href="/all" className="group flex items-center justify-between gap-5 py-5">
              <div><h3 className="font-medium group-hover:underline">Products, experiments, and open source</h3><p className="mt-1 text-sm text-muted-foreground">A collection of things I&apos;ve shipped and learned from.</p></div>
              <span className="text-muted-foreground">↗</span>
            </Link>
            <Link href="/writing" className="group flex items-center justify-between gap-5 py-5">
              <div><h3 className="font-medium group-hover:underline">Writing and notes</h3><p className="mt-1 text-sm text-muted-foreground">Thoughts on design, code, community, and building in public.</p></div>
              <span className="text-muted-foreground">↗</span>
            </Link>
          </div>
        </section>

        <div className="my-20 border-t border-border" />

        <section id="highlights" className="scroll-mt-24">
          <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Highlights</p>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight">Building with people is the work.</h2>
          <div className="mt-8 space-y-5 text-[0.98rem] leading-7 text-muted-foreground">
            {achievements.map((achievement) => <p key={achievement}>{achievement}</p>)}
          </div>
        </section>

        <div className="my-20 border-t border-border" />

        <section id="testimonials" className="scroll-mt-24">
          <TestimonialsCarousel />
        </section>

        <div className="my-20 border-t border-border" />

        <section id="contact" className="scroll-mt-24">
          <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
            <div><p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">Elsewhere</p><h2 className="mt-5 text-3xl font-semibold tracking-tight">Let&apos;s make something useful.</h2></div>
            <a href="mailto:hello@burhan.ink" className="font-mono text-sm underline underline-offset-4 hover:text-muted-foreground">Say hello ↗</a>
          </div>
          <ul className="mt-8 grid gap-x-6 gap-y-3 border-y border-border py-5 sm:grid-cols-2">
            {socialLinks.map((link) => <li key={link.label}><a href={link.href} target="_blank" rel="noreferrer" className="flex justify-between text-sm text-muted-foreground hover:text-foreground"><span>{link.label}</span><span>↗</span></a></li>)}
          </ul>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
