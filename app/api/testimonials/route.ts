import { createClient } from "@supabase/supabase-js"

export async function GET() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } },
    )

    // Testimonials are intentionally public so they can appear on the portfolio homepage.
    const { data: testimonials, error } = await supabase
      .from("testimonials")
      .select("*")
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
