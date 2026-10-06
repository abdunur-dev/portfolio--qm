import Image from "next/image"
import Link from "next/link"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { socialLinks } from "@/lib/social-links"

const experience = [
  ["Quaric", "Founder & Design Engineer", "2024 — ∞"],
  ["shadcncraft", "Design Engineer", "2023 — ∞"],
  ["Freelance", "Product Design & Development", "2020 — 2024"],
]

const writing = [
  ["Building products that feel inevitable", "Latest"],
  ["Notes from the intersection of design and code", "2025"],
  ["What I learned shipping in public", "2024"],
]

export default function HomePage() {
  return (
    <div className="hugorcd-page min-h-screen bg-[#080808] text-white">
      <SiteNav plain />
      <main id="main" className="mx-auto w-full max-w-[560px] px-5 pb-20 pt-16 sm:px-0 sm:pt-20">
        <section className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14 overflow-hidden rounded-md bg-white/[0.04]">
              <Image src="/images/burhan-portrait.jpg" alt="Abdurhaman Nur" fill className="object-cover grayscale" priority sizes="56px" />
            </div>
            <div>
              <h1 className="font-serif text-[1.35rem] leading-none text-white">Abdurhaman Nur</h1>
              <p className="mt-2 font-serif text-[1.15rem] leading-none text-[#7894ff]">Full-stack Developer &amp; Designer</p>
            </div>
          </div>
          <p className="text-[0.9rem] leading-relaxed text-white/55">Building with curiosity ▲ Open source by default, Web3 and AI at heart.</p>
        </section>

        <section className="mt-20">
          <h2 className="font-serif text-xl italic text-white">Contact.</h2>
          <nav aria-label="Contact and socials" className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm text-white/55">
            {socialLinks.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-[#7894ff]">{link.label}</a>)}
          </nav>
        </section>

        <section className="mt-20">
          <h2 className="font-serif text-xl italic text-white">Experience.</h2>
          <div className="mt-7 space-y-5">
            {experience.map(([company, role, date]) => <div key={company} className="grid grid-cols-[auto_1fr_auto] items-baseline gap-3 text-sm"><strong className="font-medium text-white">{company}</strong><span className="truncate text-white/45">{role}</span><span className="text-xs text-white/35">{date}</span></div>)}
          </div>
        </section>

        <section className="mt-20">
          <div className="flex items-baseline justify-between"><h2 className="font-serif text-xl italic text-white">Projects.</h2><div className="flex gap-4 text-xs text-white/35"><span className="text-white/60">All</span><Link href="/all" className="hover:text-white">Projects</Link><Link href="/highlights" className="hover:text-white">At Work</Link></div></div>
          <div className="mt-7 divide-y divide-white/[0.07]">
            {[['Quaric', 'Open source tools for builders'], ['Burhan Portfolio', 'Personal website and digital garden'], ['Community', 'Design, development, and events']].map(([name, description]) => <Link key={name} href="/all" className="flex items-baseline justify-between gap-4 py-3 text-sm group"><strong className="font-medium text-white group-hover:text-[#7894ff]">{name}</strong><span className="truncate text-right text-white/45">{description}</span></Link>)}
          </div>
          <Link href="/all" className="mt-5 inline-block text-sm text-white/35 transition-colors hover:text-[#7894ff]">View all →</Link>
        </section>

        <section className="mt-20">
          <h2 className="font-serif text-xl italic text-white">Writing.</h2>
          <div className="mt-7 divide-y divide-white/[0.07]">
            {writing.map(([title, date]) => <Link key={title} href="/writing" className="flex items-baseline justify-between gap-4 py-3 text-sm group"><span className="truncate text-white group-hover:text-[#7894ff]">{title}</span><span className="shrink-0 text-white/35">{date}</span></Link>)}
          </div>
          <Link href="/writing" className="mt-5 inline-block text-sm text-white/35 transition-colors hover:text-[#7894ff]">All writing →</Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
