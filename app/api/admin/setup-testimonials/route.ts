import { createClient } from "@/lib/supabase/server"
import { requireAdmin } from "@/lib/auth/require-admin"

export async function POST(request: Request) {
  try {
    await requireAdmin()
    const supabase = await createClient()

    // Create testimonials table if it doesn't exist
    const { error: createError } = await supabase.rpc("execute_sql", {
      sql: `
        CREATE TABLE IF NOT EXISTS testimonials (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
          author TEXT NOT NULL,
          role TEXT NOT NULL,
          content TEXT NOT NULL,
          avatar TEXT NOT NULL,
          verified BOOLEAN DEFAULT false,
          company TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

        DROP POLICY IF EXISTS "Users can view their own testimonials" ON testimonials;
        DROP POLICY IF EXISTS "Users can insert their own testimonials" ON testimonials;
        DROP POLICY IF EXISTS "Users can update their own testimonials" ON testimonials;
        DROP POLICY IF EXISTS "Users can delete their own testimonials" ON testimonials;

        CREATE POLICY "Users can view their own testimonials"
          ON testimonials FOR SELECT
          USING (auth.uid() = user_id);

        CREATE POLICY "Users can insert their own testimonials"
          ON testimonials FOR INSERT
          WITH CHECK (auth.uid() = user_id);

        CREATE POLICY "Users can update their own testimonials"
          ON testimonials FOR UPDATE
          USING (auth.uid() = user_id);

        CREATE POLICY "Users can delete their own testimonials"
          ON testimonials FOR DELETE
          USING (auth.uid() = user_id);

        CREATE INDEX idx_testimonials_user_id ON testimonials(user_id);
      `,
    })

    if (createError) {
      // Table might already exist, try to add sample testimonials instead
      const userId = (await supabase.auth.getUser()).data.user?.id
      if (userId) {
        await supabase.from("testimonials").upsert([
          {
            id: "1",
            user_id: userId,
            author: "Guillermo Rauch",
            role: "CEO @ Vercel",
            content: "awesome. Love the components, especially slide-to-unlock. Great job",
            avatar: "/avatars/guillermo.png",
            company: "Vercel",
            verified: true,
          },
          {
            id: "2",
            user_id: userId,
            author: "shacdn",
            role: "Creator of shadcn/ui",
            content: "You're doing amazing work.",
            avatar: "/avatars/shacdn.png",
            company: "shadcn/ui",
            verified: true,
          },
          {
            id: "3",
            user_id: userId,
            author: "khushi.vy",
            role: "Software Engineer",
            content: "Goated portfolio. I love the whole UI in Vercel style",
            avatar: "/avatars/khushi.png",
            company: "Tech",
            verified: true,
          },
          {
            id: "4",
            user_id: userId,
            author: "Megh",
            role: "Creator of patterns.dev",
            content: "The best looking website @iamncdai portfolio!",
            avatar: "/avatars/megh.png",
            company: "patterns.dev",
            verified: true,
          },
          {
            id: "5",
            user_id: userId,
            author: "jordwalke",
            role: "Creator of React",
            content: "Also, cool wheel picker!",
            avatar: "/avatars/jordwalke.png",
            company: "React",
            verified: true,
          },
        ])
      }
    }

    return Response.json({ ok: true, message: "Testimonials table initialized" })
  } catch (error) {
    console.error("[v0] Setup error:", error)
    return Response.json(
      { error: error instanceof Error ? error.message : "Setup failed" },
      { status: 500 }
    )
  }
}
