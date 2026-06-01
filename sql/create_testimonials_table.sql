-- Create testimonials table if it doesn't exist
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  author TEXT NOT NULL,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  avatar TEXT,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Enable RLS
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view testimonials" ON testimonials
  FOR SELECT USING (true);

CREATE POLICY "Users can insert own testimonials" ON testimonials
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own testimonials" ON testimonials
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own testimonials" ON testimonials
  FOR DELETE USING (auth.uid() = user_id);
