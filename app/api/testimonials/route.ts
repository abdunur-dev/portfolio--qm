import { createClient } from "@supabase/supabase-js"
import { staticTestimonials } from "@/lib/testimonials-data"

export async function GET() {
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
        { auth: { autoRefreshToken: false, persistSession: false } },
      )

      const { data: testimonials, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false })

      if (!error && Array.isArray(testimonials) && testimonials.length > 0) {
        // Map images to avatar if avatar is blank
        const mapped = testimonials.map((t) => ({
          ...t,
          avatar: t.avatar || t.image || null,
        }))
        return Response.json(mapped)
      }
    }

    return Response.json(staticTestimonials)
  } catch (error) {
    console.error("Error in testimonials API, falling back to static:", error)
    return Response.json(staticTestimonials)
  }
}
