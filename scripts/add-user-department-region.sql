-- Add department and region to profiles table
BEGIN;

-- 1. Add department and region columns
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS department TEXT,
ADD COLUMN IF NOT EXISTS region TEXT;

-- 2. Create regions lookup table
CREATE TABLE IF NOT EXISTS regions (
  code TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3. Insert common countries/regions
INSERT INTO regions (code, name) VALUES
  ('US', 'United States'),
  ('CA', 'Canada'),
  ('MX', 'Mexico'),
  ('GB', 'United Kingdom'),
  ('DE', 'Germany'),
  ('FR', 'France'),
  ('IT', 'Italy'),
  ('ES', 'Spain'),
  ('NL', 'Netherlands'),
  ('BE', 'Belgium'),
  ('CH', 'Switzerland'),
  ('AT', 'Austria'),
  ('SE', 'Sweden'),
  ('NO', 'Norway'),
  ('DK', 'Denmark'),
  ('FI', 'Finland'),
  ('PL', 'Poland'),
  ('CZ', 'Czech Republic'),
  ('IE', 'Ireland'),
  ('PT', 'Portugal'),
  ('GR', 'Greece'),
  ('AU', 'Australia'),
  ('NZ', 'New Zealand'),
  ('JP', 'Japan'),
  ('CN', 'China'),
  ('IN', 'India'),
  ('SG', 'Singapore'),
  ('KR', 'South Korea'),
  ('BR', 'Brazil'),
  ('AR', 'Argentina'),
  ('CL', 'Chile'),
  ('ZA', 'South Africa'),
  ('AE', 'United Arab Emirates'),
  ('SA', 'Saudi Arabia'),
  ('IL', 'Israel'),
  ('OTHER', 'Other')
ON CONFLICT (code) DO NOTHING;

-- 4. Enable RLS on regions
ALTER TABLE regions ENABLE ROW LEVEL SECURITY;

-- 5. Allow all authenticated users to read regions
CREATE POLICY "regions_select" ON regions
  FOR SELECT 
  USING (auth.uid() IS NOT NULL);

-- 6. Add comment for documentation
COMMENT ON COLUMN profiles.department IS 'User department/team (required for non-admin users)';
COMMENT ON COLUMN profiles.region IS 'User region/country code (required for non-admin users)';
COMMENT ON TABLE regions IS 'Lookup table for available regions/countries';

COMMIT;
