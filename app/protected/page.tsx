import { redirect } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { SiteNav } from "@/components/site-nav"
import { AuroraBackground } from "@/components/aurora-background"
import { AnimatedHeading } from "@/components/animated-heading"
import { FadeUp } from "@/components/fade-up"
import { LogoutButton } from "@/components/logout-button"

export default async function ProtectedPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AuroraBackground />
      <div className="relative z-10">
        <SiteNav />
        <main className="mx-auto w-full max-w-3xl px-6 py-12">
          <AnimatedHeading
            text="hello, friend."
            accentLast
            className="text-5xl sm:text-6xl"
          />

          <FadeUp delay={0.35}>
            <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-foreground/75">
              You&apos;re signed in as{" "}
              <span className="font-mono text-foreground">{user.email}</span>.
              This is a private space — only visible when you&apos;re
              authenticated.
            </p>
          </FadeUp>

          <FadeUp delay={0.5}>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              <Link
                href="/admin"
                className="group flex items-center justify-between rounded-xl border border-border/60 bg-card/40 px-5 py-4 backdrop-blur-sm transition-colors hover:border-primary/60 hover:bg-card/70"
              >
                <span>
                  <span className="block font-serif text-xl text-foreground">
                    admin
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    manage projects
                  </span>
                </span>
                <span className="font-mono text-sm text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary">
                  →
                </span>
              </Link>
              <div className="flex items-center justify-between rounded-xl border border-border/60 bg-card/40 px-5 py-4 backdrop-blur-sm">
                <span>
                  <span className="block font-serif text-xl text-foreground">
                    sign out
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    end this session
                  </span>
                </span>
                <LogoutButton />
              </div>
            </div>
          </FadeUp>
        </main>
      </div>
    </div>
  )
}
