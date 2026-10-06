import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { FolioShell, PageTitle, Row, Section, SectionTitle } from "@/components/folio/ui"
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
    <FolioShell back={{ href: "/", label: "Home" }}>
      <div className="flex flex-col gap-12">
        <PageTitle
          title="Hello, friend"
          intro={
            <>
              You&apos;re signed in as <span className="font-medium text-highlighted">{user.email}</span>. This is a
              private space — only visible when you&apos;re authenticated.
            </>
          }
        />
        <Section>
          <SectionTitle>Manage</SectionTitle>
          <div className="flex flex-col">
            <Row href="/admin" title="Admin" sub="projects, writing, testimonials" meta="→" />
            <div className="flex items-baseline justify-between gap-4 py-2">
              <span className="font-medium text-highlighted">Sign out</span>
              <LogoutButton />
            </div>
          </div>
        </Section>
      </div>
    </FolioShell>
  )
}
