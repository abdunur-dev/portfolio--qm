"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { LogOut } from "lucide-react"

export function LogoutButton() {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={pending}
      onClick={() => {
        startTransition(async () => {
          const supabase = createClient()
          await supabase.auth.signOut()
          router.push("/auth/login")
          router.refresh()
        })
      }}
    >
      <LogOut className="mr-1 h-3.5 w-3.5" />
      {pending ? "Signing out…" : "Sign out"}
    </Button>
  )
}
