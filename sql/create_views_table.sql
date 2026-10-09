-- SQL script to set up site visitor counter in Supabase / Postgres

CREATE TABLE IF NOT EXISTS site_views (
  id TEXT PRIMARY KEY DEFAULT 'global',
  count BIGINT NOT NULL DEFAULT 1084,
  today BIGINT NOT NULL DEFAULT 37,
  last_date DATE NOT NULL DEFAULT CURRENT_DATE,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE site_views ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read site_views"
  ON site_views FOR SELECT
  USING (true);

-- Allow server actions / anonymous update (controlled by API route)
CREATE POLICY "Allow update site_views"
  ON site_views FOR ALL
  USING (true)
  WITH CHECK (true);

-- Insert initial record if not present
INSERT INTO site_views (id, count, today, last_date)
VALUES ('global', 1084, 37, CURRENT_DATE)
ON CONFLICT (id) DO NOTHING;
