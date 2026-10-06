import { Coffee, Github, Linkedin, Mail, Twitter } from "lucide-react"
import { socialLinks } from "@/lib/social-links"
import { stagger } from "@/components/folio/ui"

const iconFor = {
  Email: Mail,
  GitHub: Github,
  Twitter,
  LinkedIn: Linkedin,
} as const

const order = ["Email", "GitHub", "Twitter", "LinkedIn"] as const

/** Row of social icons, hugorcd.com style (muted → highlighted on hover). */
export function SocialIcons() {
  const links = [...socialLinks].sort(
    (a, b) => order.indexOf(a.label as (typeof order)[number]) - order.indexOf(b.label as (typeof order)[number]),
  )
  return (
    <nav aria-label="Contact and socials" className="flex flex-wrap items-center gap-3">
      {links.map((l, i) => {
        const Icon = iconFor[l.label as keyof typeof iconFor]
        const external = !l.href.startsWith("mailto:")
        return (
          <a
            key={l.label}
            href={l.href}
            aria-label={l.label}
            title={l.handle}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="folio-in inline-flex text-muted-foreground transition-colors hover:text-highlighted"
            style={stagger(i)}
          >
            <Icon className="size-5" strokeWidth={1.75} />
          </a>
        )
      })}
      <a
        href="https://buymeacoffee.com/abdurhamanw"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Buy me a coffee"
        title="Buy me a coffee"
        className="folio-in inline-flex text-muted-foreground transition-colors hover:text-highlighted"
        style={stagger(links.length)}
      >
        <Coffee className="size-5" strokeWidth={1.75} />
      </a>
    </nav>
  )
}
