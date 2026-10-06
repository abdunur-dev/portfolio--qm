# Testimonials System - Setup & Usage Guide

## Overview
The testimonials system allows you to manage and display testimonials on your about page through a clean admin interface. Testimonials are stored in your Supabase database and fetched dynamically on the frontend.

## Features
✓ Database-driven testimonials (not hardcoded)
✓ Image support for both avatars and testimonial content
✓ Admin panel with add/edit/delete functionality
✓ Smooth 2-column carousel with sliding animations
✓ Company/role attribution for each testimonial
✓ Verification checkmarks for testimonials

## Components

### Testimonials Carousel (`components/testimonials-carousel.tsx`)
- Displays 1 testimonial on mobile, 2 on tablet/desktop
- Auto-advances every 6 seconds
- Includes manual left/right navigation
- Fetches from `/api/testimonials` endpoint
- Shows loading state while fetching
- Returns null if no testimonials exist

### Admin Testimonial List (`components/admin-testimonial-list.tsx`)
- Add new testimonials form
- Edit existing testimonials
- Delete testimonials with confirmation
- Image upload for avatars and testimonial content
- Company/organization field

## Database Schema

```sql
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  author TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT,
  content TEXT NOT NULL,
  avatar TEXT NOT NULL,
  image TEXT,
  verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## API Endpoints

### GET `/api/testimonials`
Fetches all testimonials for the authenticated user.
- Returns: Array of testimonials
- No authentication required (returns empty array if not authenticated)

## How to Add Testimonials

1. **Login to Admin Panel**
   - Navigate to `/admin`
   - Log in with your account

2. **Go to Testimonials Tab**
   - Click on "Testimonials" tab in the admin panel
   - If showing "0 testimonials", click "Setup Testimonials" to initialize

3. **Add New Testimonial**
   - Click "+ Add Testimonial" button
   - Fill in the form:
     - **Author Name**: The person's name
     - **Role**: Their position (e.g., "CEO @ Vercel")
     - **Company/Organization**: The company name
     - **Testimonial**: The quote/message
     - **Avatar Image**: Upload or paste image URL (person's profile picture)
     - **Testimonial Image** (Optional): Image to display in the testimonial card
   - Click "Save"

4. **Edit Testimonial**
   - Click the edit icon (pencil) on any testimonial card
   - Update the fields
   - Click "Save"

5. **Delete Testimonial**
   - Click the delete icon (trash) on any testimonial card
   - Confirm deletion

## Customizing the Carousel

Edit `components/testimonials-carousel.tsx` to change:
- Auto-advance delay: Change `delay: 6000` to milliseconds
- Items per view: Modify `basis-full sm:basis-1/2` (currently 1 mobile, 2 tablet+)
- Animation duration: Adjust `duration: 60` in carousel opts

## Removing Hardcoded Testimonials

✓ Already done! The carousel now fetches from the database instead of using hardcoded examples.

## Troubleshooting

**"0 testimonials" showing in admin**
- Make sure Supabase is connected
- Click "Setup Testimonials" button to initialize the table
- Check that you're logged in as the correct user

**Testimonials not showing on about page**
- Make sure you have at least one testimonial added via admin
- Check browser console for errors
- Verify Supabase environment variables are set

**Images not uploading**
- Check file size (should be < 5MB)
- Ensure file is a valid image format (jpg, png, etc.)
- Verify `/public/avatars/` directory exists
