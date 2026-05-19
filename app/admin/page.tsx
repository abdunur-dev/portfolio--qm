import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { AuroraBackground } from "@/components/aurora-background"
import { AdminProjectList } from "@/components/admin-project-list"
import { AdminPostList } from "@/components/admin-post-list"
import { AdminNowList } from "@/components/admin-now-list"
import { AdminTabs } from "@/components/admin-tabs"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
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

      <div className="mx-auto max-w-4xl px-6 py-10 sm:py-16">
        <header className="mb-12 flex items-center justify-between">
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground"
          >
            ← back to site
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LogoutButton />
          </div>
        </header>

        <div className="mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/60">admin</p>
          <h1 className="mt-2 font-serif text-5xl leading-none tracking-tight sm:text-6xl">
            studio<span className="text-foreground/50">.</span>
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-foreground/70">
            Manage projects, writing posts, and your /now page in one place. Changes
            appear instantly on the public site.
          </p>
        </div>

        <AdminTabs
          projects={<AdminProjectList projects={projects} />}
          writing={<AdminPostList posts={posts} />}
          now={<AdminNowList sections={nowSections} />}
        />

        <p className="mt-10 text-center font-mono text-xs text-muted-foreground">
          signed in as <span className="text-foreground">{user.email}</span>
        </p>
        <div className="mt-2 flex items-center justify-center gap-3">
          <Button asChild variant="link" size="sm" className="text-muted-foreground">
            <Link href="/all">view /all</Link>
          </Button>
          <Button asChild variant="link" size="sm" className="text-muted-foreground">
            <Link href="/writing">view /writing</Link>
          </Button>
          <Button asChild variant="link" size="sm" className="text-muted-foreground">
            <Link href="/now">view /now</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
