import Link from "next/link"
import { Coffee, Github, Linkedin, Mail, Twitter } from "lucide-react"
import { socialLinks } from "@/lib/social-links"

const iconFor = {
  GitHub: Github,
  Twitter,
  LinkedIn: Linkedin,
  Email: Mail,
} as const

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="mx-auto w-full max-w-[48rem] border-x border-white/10 bg-[#08090b] text-[#f4f1eb]">
      <div className="grid border-t border-white/10 text-xs sm:grid-cols-4">
        <div className="border-b border-white/10 p-4 sm:border-r sm:border-b-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">crafted by</p>
          <p className="mt-3 font-mono text-white/85">@abdurhaman</p>
        </div>
        <div className="border-b border-white/10 p-4 sm:border-r sm:border-b-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">based in</p>
          <p className="mt-3 font-mono text-white/85">Addis Ababa</p>
        </div>
        <div className="border-b border-white/10 p-4 sm:border-r sm:border-b-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">date</p>
          <p className="mt-3 font-mono text-white/85">{year}</p>
        </div>
        <div className="border-b border-white/10 p-4 sm:border-b-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">availability</p>
          <p className="mt-3 font-mono text-white/85">Open to ideas</p>
        </div>
      </div>
      <div className="grid border-t border-white/10 sm:grid-cols-3">
        <div className="border-b border-white/10 p-4 sm:col-span-2 sm:border-r sm:border-b-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">stack</p>
          <p className="mt-3 max-w-md font-mono leading-6 text-white/75">Next.js · TypeScript · Supabase · AI · Web3 · community</p>
        </div>
        <div className="p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">links</p>
          <div className="mt-3 flex flex-wrap gap-3 font-mono text-white/75">
            <Link href="/cv" className="underline-offset-4 hover:underline">CV</Link>
            <Link href="/writing" className="underline-offset-4 hover:underline">Writing</Link>
            <Link href="/all" className="underline-offset-4 hover:underline">Work</Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-start justify-between gap-4 border-t border-white/10 p-4 sm:flex-row sm:items-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">© {year} Abdurhaman Nur · built in Addis Ababa</p>
        <div className="flex items-center gap-3">
          {socialLinks.map((link) => {
            const Icon = iconFor[link.label as keyof typeof iconFor]
            return Icon ? <a key={link.label} href={link.href} target="_blank" rel="noreferrer" aria-label={link.label} className="text-white/45 transition-colors hover:text-white"><Icon className="h-4 w-4" /></a> : null
          })}
          <a href="https://buymeacoffee.com/abdurhamanw" target="_blank" rel="noreferrer" aria-label="Buy me a coffee" className="text-white/45 transition-colors hover:text-white"><Coffee className="h-4 w-4" /></a>
        </div>
      </div>
      <div className="overflow-hidden border-t border-white/10 px-0 pt-10">
        <div className="h-40 translate-y-20 select-none whitespace-nowrap text-[8rem] font-black leading-none tracking-[-0.12em] text-white/[0.08] sm:text-[11rem]">abdurhaman</div>
      </div>
    </footer>
  )
}
