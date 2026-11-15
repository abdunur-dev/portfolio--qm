import Link from "next/link"
import type { ReactNode } from "react"
import {
  ArrowUpRight,
  Blocks,
  Bot,
  Box,
  Code2,
  FolderGit2,
  MessagesSquare,
  Palette,
  Plug,
  Sprout,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react"
import type { FolioProject } from "@/lib/content"

export const isExternal = (href: string) => !href.startsWith("/")
export const externalProps = (href: string) =>
  isExternal(href) && !href.startsWith("mailto:") ? { target: "_blank", rel: "noopener noreferrer" } : {}

/** "Zero Hunger AI" -> "ZH" */
function initials(name: string) {
  return name
    .replace(/\(.*?\)/g, "")
    .split(/[\s·/&-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("")
}

/** Pick an icon for a project from its title, description and stack. */
export function projectIcon(p: FolioProject): LucideIcon {
  const t = `${p.title} ${p.description} ${p.stack.join(" ")}`.toLowerCase()
  if (/\bagents?\b|\bai\b|\bllm/.test(t)) return Bot
  if (/\bchat|messag/.test(t)) return MessagesSquare
  if (/\b3d\b|three\.js/.test(t)) return Box
  if (/\bcreators?\b|\bart\b|gallery/.test(t)) return Palette
  if (/wallet|payroll|\bpay/.test(t)) return Wallet
  if (/\bmcp\b|protocol/.test(t)) return Plug
  if (/chain|solidity|web3|solana|\bnft/.test(t)) return Blocks
  return FolderGit2
}

/** Pick an icon for a role. */
export function roleIcon(org: string, title: string): LucideIcon {
  const t = `${org} ${title}`.toLowerCase()
  if (/hunger|food/.test(t)) return Sprout
  if (/community|devrel|relations|host|ambassador/.test(t)) return Users
  if (/web3|chain/.test(t)) return Blocks
  return Code2
}

/** Round badge: an image if there is one, else an icon, else initials. */
export function Badge({ name, src, icon: Icon }: { name: string; src?: string | null; icon?: LucideIcon }) {
  return (
    <div className="flex size-8 flex-none items-center justify-center overflow-hidden rounded-full bg-background shadow outline-1 -outline-offset-1 outline-black/10 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105 md:size-10 dark:outline-white/10">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt="" loading="lazy" className="size-full object-cover" />
      ) : Icon ? (
        <Icon aria-hidden className="size-4 text-foreground md:size-[18px]" strokeWidth={1.75} />
      ) : (
        <span className="font-mono text-[10px] font-medium text-muted-foreground md:text-xs">{initials(name)}</span>
      )}
    </div>
  )
}

/** Shared row shape for experience and projects: badge, title, subtitle, right-hand meta, body. */
export function Entry({
  badge,
  title,
  subtitle,
  aside,
  children,
}: {
  badge: ReactNode
  title: ReactNode
  subtitle: ReactNode
  aside?: ReactNode
  children?: ReactNode
}) {
  return (
    <article className="group relative grid gap-3">
      <div className="flex items-center justify-between gap-x-3">
        <div className="flex min-w-0 flex-1 items-center gap-x-3">
          {badge}
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <h3 className="text-[15px] font-semibold leading-tight sm:text-base">{title}</h3>
            <div className="text-[13px] text-muted-foreground sm:text-sm">{subtitle}</div>
          </div>
        </div>
        {aside}
      </div>
      {children && (
        <div className="max-w-full text-pretty text-[13px] leading-relaxed text-muted-foreground sm:ml-12 sm:text-sm md:ml-13">
          {children}
        </div>
      )}
    </article>
  )
}

/** A project as an Entry. `full` shows every link and the whole stack. */
export function ProjectEntry({ p, full = false }: { p: FolioProject; full?: boolean }) {
  const href = p.href ?? p.links[0]?.href ?? "/all"
  const links = full ? p.links : p.links.filter((l) => l.href !== href).slice(0, 2)
  return (
    <Entry
      badge={<Badge name={p.title} src={p.cover_url} icon={projectIcon(p)} />}
      title={
        <Link
          href={href}
          {...externalProps(href)}
          className="underline-offset-4 after:absolute after:inset-0 group-hover:underline focus-visible:outline-none focus-visible:after:rounded-lg focus-visible:after:ring-2 focus-visible:after:ring-ring"
        >
          {p.title}
        </Link>
      }
      subtitle={[p.year, p.kind].filter(Boolean).join(" · ")}
      aside={
        <ArrowUpRight
          aria-hidden
          className="size-4 flex-none text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
        />
      }
    >
      <p className="first-letter:uppercase">{p.description}</p>
      {(links.length > 0 || p.stack.length > 0) && (
        <div className="relative z-10 mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs">
          {links.map((l) => (
            <a
              key={l.href + l.label}
              href={l.href}
              {...externalProps(l.href)}
              className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
            >
              {l.label.replace(/\s*↗$/, "")}
            </a>
          ))}
          {links.length > 0 && p.stack.length > 0 && <span aria-hidden>·</span>}
          {p.stack.length > 0 && (
            <span className="font-mono text-[11px]">{(full ? p.stack : p.stack.slice(0, 4)).join(" · ")}</span>
          )}
        </div>
      )}
    </Entry>
  )
}

/** A soft, rounded hover row (writing, events). */
export function ListRow({
  href,
  title,
  meta,
  excerpt,
  thumb,
}: {
  href: string
  title: ReactNode
  meta: ReactNode
  excerpt?: ReactNode
  thumb?: string | null
}) {
  const external = isExternal(href)
  return (
    <Link
      href={href}
      {...externalProps(href)}
      className="group flex items-center gap-4 rounded-xl px-3 py-2.5 transition-colors duration-200 hover:bg-muted/60 focus-visible:bg-muted/60 focus-visible:outline-none"
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h3 className="text-pretty text-sm font-medium leading-snug transition-transform duration-300 group-hover:translate-x-0.5">
          {title}
        </h3>
        {excerpt && <p className="line-clamp-2 text-pretty text-xs leading-relaxed text-muted-foreground">{excerpt}</p>}
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">{meta}</div>
      </div>
      {thumb && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={thumb}
          alt=""
          loading="lazy"
          className="hidden size-14 flex-none rounded-lg object-cover outline-1 -outline-offset-1 outline-black/10 sm:block dark:outline-white/10"
        />
      )}
      {external && <ArrowUpRight aria-hidden className="size-4 flex-none text-muted-foreground" />}
    </Link>
  )
}
