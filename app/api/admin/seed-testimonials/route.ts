import { createClient } from "@/lib/supabase/server"
import { requireAdmin } from "@/lib/auth/require-admin"

export async function POST(request: Request) {
  try {
    const user = await requireAdmin()
    const supabase = await createClient()

    // First, try to insert seed testimonials
    const seedTestimonials = [
      {
        user_id: user.id,
        author: "Guillermo Rauch",
        role: "CEO @ Vercel",
        content: "awesome. Love the components, especially slide-to-unlock. Great job",
        avatar: "/avatars/guillermo.png",
        verified: true,
        company: "Vercel",
      },
      {
        user_id: user.id,
        author: "shacdn",
        role: "Creator of shadcn/ui",
        content: "You're doing amazing work.",
        avatar: "/avatars/shacdn.png",
        verified: true,
        company: "shadcn/ui",
      },
      {
        user_id: user.id,
        author: "khushi.vy",
        role: "Software Engineer",
        content: "Goated portfolio. I love the whole UI in Vercel style",
        avatar: "/avatars/khushi.png",
        verified: true,
        company: "Tech",
      },
      {
        user_id: user.id,
        author: "Megh",
        role: "Creator of patterns.dev",
        content: "The best looking website @iamncdai portfolio!",
        avatar: "/avatars/megh.png",
        verified: true,
        company: "patterns.dev",
      },
      {
        user_id: user.id,
        author: "jordwalke",
        role: "Creator of React",
        content: "Also, cool wheel picker!",
        avatar: "/avatars/jordwalke.png",
        verified: true,
        company: "React",
      },
    ]

    // Insert testimonials
    const { data, error } = await supabase
      .from("testimonials")
      .insert(seedTestimonials)
      .select()

    if (error) {
      console.error("Insert error:", error)
      return Response.json({ error: error.message }, { status: 400 })
    }

    return Response.json({ success: true, data, count: data?.length || 0 })
  } catch (error) {
    console.error("Error:", error)
    return Response.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
}
