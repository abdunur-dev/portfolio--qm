import { createClient } from "@/lib/supabase/server"

export async function POST() {
  try {
    const supabase = await createClient()

    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return Response.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Create testimonials table
    const { error: createError } = await supabase.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS public.testimonials (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
          author TEXT NOT NULL,
          role TEXT NOT NULL,
          content TEXT NOT NULL,
          avatar TEXT NOT NULL,
          company TEXT,
          image TEXT,
          link TEXT,
          verified BOOLEAN DEFAULT false,
          created_at TIMESTAMP DEFAULT now(),
          updated_at TIMESTAMP DEFAULT now()
        );

        ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

        DROP POLICY IF EXISTS "Users can view own testimonials" ON public.testimonials;
        DROP POLICY IF EXISTS "Users can insert own testimonials" ON public.testimonials;
        DROP POLICY IF EXISTS "Users can update own testimonials" ON public.testimonials;
        DROP POLICY IF EXISTS "Users can delete own testimonials" ON public.testimonials;

        CREATE POLICY "Users can view own testimonials" ON public.testimonials
          FOR SELECT USING (auth.uid() = user_id);

        CREATE POLICY "Users can insert own testimonials" ON public.testimonials
          FOR INSERT WITH CHECK (auth.uid() = user_id);

        CREATE POLICY "Users can update own testimonials" ON public.testimonials
          FOR UPDATE USING (auth.uid() = user_id);

        CREATE POLICY "Users can delete own testimonials" ON public.testimonials
          FOR DELETE USING (auth.uid() = user_id);

        CREATE INDEX IF NOT EXISTS idx_testimonials_user_id ON public.testimonials(user_id);
        CREATE INDEX IF NOT EXISTS idx_testimonials_created_at ON public.testimonials(created_at DESC);
      `
    })

    if (createError) {
      console.error("Table creation error:", createError)
      // If exec doesn't exist, try direct SQL
      const { error: directError } = await supabase.sql`
        CREATE TABLE IF NOT EXISTS public.testimonials (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
          author TEXT NOT NULL,
          role TEXT NOT NULL,
          content TEXT NOT NULL,
          avatar TEXT NOT NULL,
          company TEXT,
          image TEXT,
          link TEXT,
          verified BOOLEAN DEFAULT false,
          created_at TIMESTAMP DEFAULT now(),
          updated_at TIMESTAMP DEFAULT now()
        )
      `
      
      if (directError) {
        return Response.json({ error: directError.message }, { status: 400 })
      }
    }

    return Response.json({ success: true, message: "Testimonials table created successfully" })
  } catch (error: any) {
    console.error("Error creating testimonials table:", error)
    return Response.json({ error: error.message }, { status: 500 })
  }
}
