import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Code2, Globe2, Mail, MapPin, Moon, Phone, Sparkles } from "lucide-react"
import { SiteNav } from "@/components/site-nav"
import { SiteFooter } from "@/components/site-footer"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { socialLinks } from "@/lib/social-links"

const achievements = [
  "Built and led developer communities from zero to millions, creating lifelong advocates and feedback channels for product improvements.",
  "Brought 350+ developers together in person globally in under 12 months, building local ecosystems around developer tools.",
  "Led the transformation of AI-powered community infrastructure and live session programmes that became part of company launch strategy.",
]

const profileDetails = [
  { icon: Code2, label: "Developer", value: "Full-stack builder" },
  { icon: Sparkles, label: "Focus", value: "AI, Web3, communities" },
  { icon: MapPin, label: "Based in", value: "Addis Ababa, Ethiopia" },
  { icon: Phone, label: "Building since", value: "2020" },
  { icon: Globe2, label: "Website", value: "burhan.ink" },
  { icon: Moon, label: "Pronouns", value: "he / him" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#08090b] text-[#f4f1eb] dark:bg-[#08090b]">
      <SiteNav />
      <main id="main" className="mx-auto w-full max-w-[48rem] overflow-hidden px-0 pb-20 sm:px-0">
        <section id="about" className="relative min-h-[31rem] border-x border-white/[0.12] px-5 pb-8 pt-8 sm:px-8">
          <div className="pointer-events-none absolute inset-0 opacity-80 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:100%_100%,100%_100%]" />
          <div className="pointer-events-none absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rotate-45 border border-white/15 [box-shadow:0_0_0_1px_rgba(255,255,255,.04),inset_0_0_0_1px_rgba(255,255,255,.04)]" />
          <div className="pointer-events-none absolute left-1/2 top-24 h-56 w-56 -translate-x-1/2 rotate-45 border border-dashed border-white/10" />
          <div className="pointer-events-none absolute inset-x-0 top-1/2 border-t border-white/[0.08]" />
          <div className="relative z-10 flex min-h-[27rem] flex-col justify-end">
            <div className="flex items-end gap-4 border-b border-white/10 pb-6">
              <Image src="/images/burhan-portrait.jpg" alt="Abdurhaman" width={112} height={112} priority className="h-28 w-28 rounded-full border border-white/20 object-cover grayscale-[15%]" />
              <div className="min-w-0 pb-1">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/40">Fig. 01 / portfolio</p>
                <h1 className="mt-2 text-3xl font-medium tracking-[-0.06em] sm:text-4xl">Abdurhaman<span className="text-white/45">_</span></h1>
                <p className="mt-1 text-sm text-white/45">Creating with code. Small details matter.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="h-8 border-x border-y border-white/10 [background:repeating-linear-gradient(135deg,rgba(255,255,255,.09)_0_1px,transparent_1px_7px)]" />

        <section className="border-x border-b border-white/10 px-5 py-7 sm:px-8">
          <div className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {profileDetails.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-3 font-mono text-xs">
                <span className="flex h-7 w-7 items-center justify-center rounded-md border border-white/15 bg-white/[0.04] text-white/55"><Icon className="h-3.5 w-3.5" /></span>
                <span><span className="mr-3 text-white/35">{label}</span><span className="text-white/85">{value}</span></span>
              </div>
            ))}
          </div>
        </section>

        <section className="border-x border-b border-white/10 px-5 py-5 sm:px-8">
          <div className="flex flex-wrap gap-2">
            {socialLinks.map((link) => <a key={link.label} href={link.href} target="_blank" rel="noreferrer" aria-label={link.label} className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-xs text-white/55 transition-colors hover:border-white/50 hover:text-white"><ArrowUpRight className="h-4 w-4" /></a>)}
            <a href="mailto:hello@burhan.ink" aria-label="Email" className="flex h-9 w-9 items-center justify-center rounded-md border border-white/15 text-white/55 transition-colors hover:border-white/50 hover:text-white"><Mail className="h-4 w-4" /></a>
          </div>
        </section>

        <section id="work" className="border-x border-b border-white/10 px-5 py-12 sm:px-8">
          <div className="flex items-end justify-between"><div><p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/35">Selected work</p><h2 className="mt-3 text-2xl tracking-tight">Things I&apos;ve built</h2></div><Link href="/all" className="font-mono text-xs text-white/45 hover:text-white">View all ↗</Link></div>
          <div className="mt-7 divide-y divide-white/10 border-y border-white/10"><Link href="/all" className="flex items-center justify-between py-5 text-sm text-white/75 hover:text-white"><span>Products, experiments, and open source</span><ArrowUpRight className="h-4 w-4" /></Link><Link href="/writing" className="flex items-center justify-between py-5 text-sm text-white/75 hover:text-white"><span>Writing and notes</span><ArrowUpRight className="h-4 w-4" /></Link></div>
        </section>

        <section id="highlights" className="border-x border-b border-white/10 px-5 py-12 sm:px-8"><p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/35">Highlights</p><h2 className="mt-3 text-2xl tracking-tight">Building with people is the work.</h2><div className="mt-7 space-y-5 text-sm leading-7 text-white/55">{achievements.map((achievement) => <p key={achievement}>{achievement}</p>)}</div></section>

        <section id="testimonials" className="border-x border-b border-white/10 px-5 py-12 sm:px-8"><TestimonialsCarousel /></section>

        <section id="contact" className="border-x border-b border-white/10 px-5 py-12 sm:px-8"><p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-white/35">Contact</p><div className="mt-3 flex items-end justify-between gap-4"><h2 className="text-2xl tracking-tight">Let&apos;s make something useful.</h2><a href="mailto:hello@burhan.ink" className="font-mono text-xs text-white/55 hover:text-white">Say hello ↗</a></div></section>
      </main>
      <SiteFooter />
    </div>
  )
}
