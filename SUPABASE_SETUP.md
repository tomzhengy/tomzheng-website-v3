# Supabase Visitor Tracking Setup (Static Export Version)

## Overview
This feature tracks the location of visitors to your website and displays the last visitor's city and country in the bottom right corner of the page. This implementation works with Next.js static export (`output: "export"`).

## Setup Instructions

### 1. Create a Supabase Project
1. Go to [https://supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be provisioned

### 2. Create the Visitors Table
1. Go to the SQL Editor in your Supabase dashboard
2. Run the SQL migration from `supabase_migration.sql`:

```sql
-- Create visitors table
CREATE TABLE IF NOT EXISTS public.visitors (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    city TEXT,
    country TEXT,
    ip TEXT,
    visited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on visited_at for faster queries
CREATE INDEX IF NOT EXISTS idx_visitors_visited_at ON public.visitors(visited_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.visitors ENABLE ROW LEVEL SECURITY;

-- Create policy for anonymous users to insert
CREATE POLICY "Allow anonymous inserts" ON public.visitors
    FOR INSERT
    WITH CHECK (true);

-- Create policy for anonymous users to select
CREATE POLICY "Allow anonymous selects" ON public.visitors
    FOR SELECT
    USING (true);
```

### 3. Enable Realtime (Optional but Recommended)
1. Go to Database > Replication in your Supabase dashboard
2. Enable replication for the `visitors` table
3. This allows real-time updates when new visitors arrive

### 4. Get Your Supabase Credentials
1. Go to Settings > API in your Supabase dashboard
2. Copy your project URL and anon key

### 5. Add Environment Variables
Create a `.env.local` file in your project root and add:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Note:** We use `NEXT_PUBLIC_` prefix because this is a static export that runs entirely in the browser.

### 6. Build and Deploy
```bash
npm run build
```

## How It Works

1. **Client-Side Tracking**: When someone visits your website, their browser makes a request to ipapi.co to get their location based on their IP address.

2. **Direct Database Access**: The visitor information is stored directly in Supabase from the browser using the Supabase JavaScript client.

3. **Real-time Updates**: Uses Supabase's real-time subscriptions to instantly show new visitors without polling.

4. **Display**: The LastVisitor component shows the most recent visitor's location in the bottom right corner.

## Architecture Notes

Since this runs with `output: "export"` (static site generation):
- No API routes are used
- All operations happen client-side
- Supabase credentials are exposed to the browser (this is safe with Row Level Security)
- Works perfectly with Cloudflare Pages, GitHub Pages, or any static hosting

## Privacy Considerations

- Only city and country are displayed (no specific addresses)
- IP addresses are stored but not displayed
- Consider adding a privacy policy to inform users about this tracking
- The tracking happens client-side, so users can see it in their network tab

## Limitations

- The free ipapi.co service allows 1000 requests per day per IP
- Location accuracy depends on IP geolocation, which may not always be precise
- Users with ad blockers might block the ipapi.co request 