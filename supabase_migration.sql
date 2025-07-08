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

-- IMPORTANT: After running this migration, go to Database > Replication 
-- in your Supabase dashboard and enable replication for the visitors table
-- to enable real-time updates 