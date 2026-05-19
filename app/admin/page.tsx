import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { AuroraBackground } from "@/components/aurora-background"
import { AdminProjectList } from "@/components/admin-project-list"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import type { Project } from "@/lib/types"
import { LogoutButton } from "@/components/logout-button"
import { requireAdmin } from "@/lib/auth/require-admin"

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  const user = await requireAdmin()
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", user.id)
    .order("year", { ascending: false })
    .order("position", { ascending: true })
    .order("created_at", { ascending: false })

  const projects = (data ?? []) as Project[]

  return (
    <main className="relative min-h-svh">
      <AuroraBackground />

      <div className="mx-auto max-w-4xl px-6 py-10 sm:py-16">
        <header className="mb-12 flex items-center justify-between">
          <Link href="/all" className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground">
            ← back to /all
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LogoutButton />
          </div>
        </header>

        <div className="mb-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">admin</p>
          <h1 className="mt-2 font-serif text-5xl leading-none tracking-tight sm:text-6xl">
            projects<span className="text-primary">.</span>
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-sm leading-relaxed text-foreground/70">
            Add, edit, and remove projects. Changes appear instantly on{" "}
            <Link href="/all" className="text-foreground underline-offset-4 hover:underline">
              /all
            </Link>
            .
          </p>
          {error && (
            <p className="mt-3 text-sm text-destructive">Error loading projects: {error.message}</p>
          )}
        </div>

        <AdminProjectList projects={projects} />

        <p className="mt-10 text-center font-mono text-xs text-muted-foreground">
          signed in as <span className="text-foreground">{user.email}</span>
        </p>

        <div className="mt-2 text-center">
          <Button asChild variant="link" size="sm" className="text-muted-foreground">
            <Link href="/all">view public page</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
