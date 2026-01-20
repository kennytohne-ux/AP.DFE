
-- APDFE COMPLETE DATABASE SCHEMA
-- RUN THIS IN YOUR SUPABASE SQL EDITOR

-- Cleanup (Optional: uncomment if you want to wipe existing tables)
-- DROP TABLE IF EXISTS projects;
-- DROP TABLE IF EXISTS news;
-- DROP TABLE IF EXISTS gallery;
-- DROP TABLE IF EXISTS helpers;
-- DROP TABLE IF EXISTS donations;
-- DROP TABLE IF EXISTS expenses;
-- DROP TABLE IF EXISTS volunteers;
-- DROP TABLE IF EXISTS events;

-- 1. Staff / Helpers Table
CREATE TABLE IF NOT EXISTS helpers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'helper',
  is_validated BOOLEAN DEFAULT TRUE,
  profile_picture TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. News Table
CREATE TABLE IF NOT EXISTS news (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  date TEXT,
  category TEXT,
  excerpt TEXT,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Gallery Table
CREATE TABLE IF NOT EXISTS gallery (
  id TEXT PRIMARY KEY,
  title TEXT,
  subtitle TEXT,
  img TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  status TEXT DEFAULT 'In Progress',
  region TEXT,
  timeline TEXT,
  duration TEXT,
  beneficiaries TEXT,
  description TEXT,
  purpose TEXT,
  field TEXT,
  progress INTEGER DEFAULT 0,
  goals JSONB DEFAULT '[]'::jsonb,
  target_funding NUMERIC DEFAULT 0,
  current_funding NUMERIC DEFAULT 0,
  completed_items JSONB DEFAULT '[]'::jsonb,
  missing_items JSONB DEFAULT '[]'::jsonb,
  last_updated TEXT,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Donations Table
CREATE TABLE IF NOT EXISTS donations (
  id TEXT PRIMARY KEY,
  name TEXT,
  amount NUMERIC,
  date TEXT,
  project_id TEXT,
  source TEXT,
  status TEXT DEFAULT 'Cleared',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Expenses Table
CREATE TABLE IF NOT EXISTS expenses (
  id TEXT PRIMARY KEY,
  category TEXT,
  amount NUMERIC,
  date TEXT,
  description TEXT,
  recipient TEXT,
  status TEXT DEFAULT 'Cleared',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Volunteers Table
CREATE TABLE IF NOT EXISTS volunteers (
  id TEXT PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  country TEXT,
  interests JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Events Table
CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  title TEXT,
  date TEXT,
  start_time TEXT,
  end_time TEXT,
  location TEXT,
  description TEXT,
  type TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for all
ALTER TABLE helpers ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteers ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Simple public access policies
CREATE POLICY "Public Read helpers" ON helpers FOR SELECT USING (true);
CREATE POLICY "Public Write helpers" ON helpers FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public Read news" ON news FOR SELECT USING (true);
CREATE POLICY "Public Write news" ON news FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public Read gallery" ON gallery FOR SELECT USING (true);
CREATE POLICY "Public Write gallery" ON gallery FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public Read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public Write projects" ON projects FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public Read donations" ON donations FOR SELECT USING (true);
CREATE POLICY "Public Write donations" ON donations FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public Read expenses" ON expenses FOR SELECT USING (true);
CREATE POLICY "Public Write expenses" ON expenses FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public Read volunteers" ON volunteers FOR SELECT USING (true);
CREATE POLICY "Public Write volunteers" ON volunteers FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public Read events" ON events FOR SELECT USING (true);
CREATE POLICY "Public Write events" ON events FOR ALL USING (true) WITH CHECK (true);

-- Seed Initial Admin
INSERT INTO helpers (id, name, email, role, is_validated)
VALUES ('admin-root', 'Kenny Tohne', 'kennytohne@gmail.com', 'admin', true)
ON CONFLICT (id) DO NOTHING;
