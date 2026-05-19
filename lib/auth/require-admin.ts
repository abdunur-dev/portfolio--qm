import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import type { User } from "@supabase/supabase-js"

/**
 * Server-only guard: ensures the current session belongs to the single
 * configured admin email. Use at the top of every admin page and every
 * mutating server action.
 *
 * - If not logged in → redirects to /auth/login
 * - If logged in but not the admin email → redirects to /
 * - If ADMIN_EMAIL is not set → fails closed (treats every non-empty user
 *   as unauthorized) so we never accidentally expose the admin.
 */
export async function requireAdmin(): Promise<User> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/auth/login")

  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase()
  const userEmail = user.email?.trim().toLowerCase()

  if (!adminEmail || !userEmail || adminEmail !== userEmail) {
    redirect("/")
  }

  return user
}
