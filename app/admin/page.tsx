import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { AuroraBackground } from "@/components/aurora-background"
import { AdminProjectList } from "@/components/admin-project-list"
import { AdminPostList } from "@/components/admin-post-list"
import { AdminNowList } from "@/components/admin-now-list"
import { AdminSettings } from "@/components/admin-settings"
import { AdminTabs } from "@/components/admin-tabs"
import { ThemeToggle } from "@/components/theme-toggle"
import type { Project, Post, NowSection } from "@/lib/types"
import { LogoutButton } from "@/components/logout-button"
import { requireAdmin } from "@/lib/auth/require-admin"

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  const user = await requireAdmin()
  const supabase = await createClient()

  const [projectsRes, postsRes, nowRes] = await Promise.all([
    supabase
      .from("projects")
      .select("*")
      .eq("user_id", user.id)
      .order("year", { ascending: false })
      .order("position", { ascending: true })
      .order("created_at", { ascending: false }),
    supabase
      .from("posts")
      .select("*")
      .eq("user_id", user.id)
      .order("year", { ascending: false })
      .order("position", { ascending: true })
      .order("created_at", { ascending: false }),
    supabase
      .from("now_sections")
      .select("*")
      .eq("user_id", user.id)
      .order("position", { ascending: true })
      .order("created_at", { ascending: true }),
  ])

  const projects = (projectsRes.data ?? []) as Project[]
  const posts = (postsRes.data ?? []) as Post[]
  const nowSections = (nowRes.data ?? []) as NowSection[]

  return (
    <main className="relative min-h-svh">
      <AuroraBackground />

      <div className="mx-auto max-w-5xl px-5 py-6 sm:px-8 sm:py-10">
        {/* Top bar */}
        <header className="mb-8 flex items-center justify-between gap-4 rounded-full border border-border/60 bg-card/50 px-4 py-2 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              ← site
            </Link>
            <span aria-hidden className="h-4 w-px bg-border" />
            <span className="font-serif text-base text-foreground">Studio</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:inline">
              {user.email}
            </span>
            <ThemeToggle />
            <LogoutButton />
          </div>
        </header>

        {/* Hero */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/60">
              admin · content
            </p>
            <h1 className="mt-2 font-serif text-4xl leading-none tracking-tight sm:text-5xl">
              Manage everything<span className="text-foreground/40">.</span>
            </h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/all"
              className="rounded-full border border-border/60 bg-card/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
            >
              /all ↗
            </Link>
            <Link
              href="/writing"
              className="rounded-full border border-border/60 bg-card/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
            >
              /writing ↗
            </Link>
            <Link
              href="/now"
              className="rounded-full border border-border/60 bg-card/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
            >
              /now ↗
            </Link>
          </div>
        </div>

        {/* Stat row */}
        <div className="mb-6 grid grid-cols-3 gap-3">
          <Stat label="Projects" value={projects.length} />
          <Stat label="Posts" value={posts.length} />
          <Stat label="Now sections" value={nowSections.length} />
        </div>

        {/* Settings Tab */}
        <AdminSettings
          heroSettings={{
            title: "Ey up! I'm Abdurhaman, known as burhan_",
            subtitle: "full-stack developer working across Web2, Web3 & AI.",
          }}
          aboutSettings={{
            text: "Just another curious human being, living in Addis Ababa, Ethiopia. Welcome to my space on the internet where I convert my thoughts into pixels™",
            description: "I tinker with decentralised apps, ship modern web experiences, and occasionally write about the quiet places where design, code, and faith overlap.",
          }}
        />

        <hr className="my-8 border-border/60" />
          counts={{ projects: projects.length, writing: posts.length, now: nowSections.length }}
          projects={<AdminProjectList projects={projects} />}
          writing={<AdminPostList posts={posts} />}
          now={<AdminNowList sections={nowSections} />}
        />
      </div>
    </main>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card/40 px-4 py-3 backdrop-blur-sm">
      <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 font-serif text-2xl leading-none text-foreground">{value}</p>
    </div>
  )
}
