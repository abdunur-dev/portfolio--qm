# Testimonials Setup Guide

## The Issue
You're seeing: "Could not find the table 'public.testimonials' in the schema cache"

This means the testimonials table doesn't exist yet in your Supabase database.

## Solution

### Step 1: Copy the SQL Migration
Go to your Supabase dashboard and navigate to the SQL Editor. Create a new query and paste this SQL:

```sql
DROP TABLE IF EXISTS testimonials CASCADE;

CREATE TABLE testimonials (
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

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own testimonials" ON testimonials
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own testimonials" ON testimonials
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own testimonials" ON testimonials
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own testimonials" ON testimonials
  FOR DELETE USING (auth.uid() = user_id);

CREATE INDEX idx_testimonials_user_id ON testimonials(user_id);
CREATE INDEX idx_testimonials_created_at ON testimonials(created_at DESC);
```

### Step 2: Execute the Query
Click the "Run" button to execute the SQL. You should see a success message.

### Step 3: Refresh Your Admin Page
Refresh your admin panel in your browser. The testimonials table should now exist.

### Step 4: Add Testimonials
1. Navigate to the Testimonials tab in admin
2. Click "+ Add Testimonial"
3. Fill in the form with:
   - **Author Name**: Person's name
   - **Role**: Their position/company
   - **Company/Organization**: (optional) Company name
   - **Testimonial**: The testimonial text
   - **Avatar Image**: Upload or paste URL of avatar
   - **Testimonial Image**: (optional) Upload a screenshot or related image
   - **Link**: (optional) Link to their profile/website

### Step 5: View on About Page
The testimonials will automatically appear on your About page in a beautiful carousel that slides 2 cards at a time.

## Features Included
- ✅ Testimonials carousel with smooth 2-column sliding animations
- ✅ Avatar images for each testimonial
- ✅ Optional testimonial content images
- ✅ Optional links to profiles (appears as clickable icon)
- ✅ Company/organization attribution
- ✅ Verified checkmark support
- ✅ Admin panel to manage all testimonials
- ✅ Add, edit, delete testimonials with image uploads

## Troubleshooting

**Still seeing "Could not find table" error?**
- Make sure you copied and ran the entire SQL migration
- Check that the query executed successfully (no error message)
- Try refreshing the page

**Images not uploading?**
- Ensure your Supabase storage bucket is configured
- Try uploading via URL instead of file upload
- Check browser console for error messages

**Testimonials not showing on About page?**
- Make sure at least one testimonial was added in admin
- Refresh the About page
- Check that avatar image URLs are valid and accessible
