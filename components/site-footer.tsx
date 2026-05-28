import Image from "next/image"
import Link from "next/link"

export function SiteFooter() {
  const year = new Date().getFullYear()

  const socialLinks = [
    { icon: "𝕏", label: "Twitter", href: "https://twitter.com/abdunur" },
    { icon: "in", label: "LinkedIn", href: "https://linkedin.com/in/abdunur" },
    { icon: "gh", label: "GitHub", href: "https://github.com/abdunur" },
    { icon: "✉", label: "Email", href: "mailto:hey@abdunur.dev" },
  ]

  return (
    <footer className="border-t border-border/60 bg-grid-fine">
      <div className="mx-auto w-full max-w-4xl px-5 py-20 sm:px-6 sm:py-24">
        {/* Main footer content */}
        <div className="grid gap-16 md:grid-cols-[auto_1fr]">
          {/* Left: Avatar and name */}
          <div className="flex flex-col items-start gap-6">
            {/* Avatar placeholder */}
            <div className="h-24 w-24 rounded-full border border-border/60 bg-secondary/40 flex items-center justify-center text-4xl font-serif text-foreground/60">
              A
            </div>

            {/* Name */}
            <div>
              <h3 className="font-serif text-3xl font-bold text-foreground">
                Abdurhaman
              </h3>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Design Engineer
              </p>
            </div>
          </div>

          {/* Right: Bio and social */}
          <div className="flex flex-col justify-between">
            {/* Bio */}
            <div className="mb-8">
              <p className="max-w-xl text-sm leading-relaxed text-foreground/80">
                Web3 & full-stack developer crafting modern digital experiences.
                Based in Addis Ababa, building products that matter.
              </p>
              <p className="mt-4 text-xs text-muted-foreground/70">
                Currently exploring the intersection of design, code, and
                decentralized systems.
              </p>
            </div>

            {/* Social links grid */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto") ? undefined : "noreferrer"}
                  className="group rounded-lg border border-border/60 bg-card/40 px-4 py-3 text-center transition-all hover:-translate-y-1 hover:border-primary/60 hover:bg-card/70 hover:shadow-md"
                >
                  <p className="font-mono text-xs font-semibold text-foreground transition-colors group-hover:text-primary">
                    {link.label}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-top-dots my-12" />

        {/* Bottom section */}
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          {/* Left: copyright */}
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60">
            © {year} Abdurhaman Nur
          </p>

          {/* Right: links */}
          <div className="flex items-center gap-6">
            <Link
              href="/cv"
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/70 transition-colors hover:text-primary"
            >
              CV
            </Link>
            <span className="h-3 w-px bg-border/60" />
            <a
              href="https://buymeacoffee.com/abdurhamanw"
              target="_blank"
              rel="noreferrer"
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/70 transition-colors hover:text-primary"
            >
              Coffee
            </a>
            <span className="h-3 w-px bg-border/60" />
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground/60">
              Made with{" "}
              <span className="font-serif italic text-primary">✦</span> in
              Addis Ababa
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
