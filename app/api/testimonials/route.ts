import { createClient } from "@/lib/supabase/server"

export async function GET() {
  try {
    const supabase = await createClient()

    // Try to get user, but don't fail if we can't
    const { data: { user } } = await supabase.auth.getUser().catch(() => ({ data: { user: null } }))
    
    if (!user) {
      return Response.json([])
    }

    const { data: testimonials, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .catch(() => ({ data: [], error: null }))

    if (error) {
      console.error("Error fetching testimonials:", error)
      return Response.json([])
    }

    return Response.json(testimonials || [])
  } catch (error) {
    console.error("Error in testimonials API:", error)
    return Response.json([])
  }
}
