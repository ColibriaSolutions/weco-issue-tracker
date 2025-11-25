-- Simplified RLS policies without recursion
-- Admin operations should use the service role client instead of RLS

-- Create Profiles Table (skip if already exists)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  role user_role default 'user'::user_role not null,
  full_name text,
  avatar_url text,
  department text,
  region text,
  is_active boolean default true not null,
  must_change_password boolean default false not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Support and Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can update any profile" ON profiles;
DROP POLICY IF EXISTS "Enable read access for all authenticated users" ON profiles;
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON profiles;

-- Simple policies without recursion
-- (Admin operations will use service role client which bypasses RLS)

-- All authenticated users can view all profiles
CREATE POLICY "Enable read access for all authenticated users"
ON profiles FOR SELECT
TO authenticated
USING (true);

-- Users can update their own profile only
CREATE POLICY "Enable update for users based on user_id"
ON profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Trigger function for new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', 'user');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop and recreate trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Index for performance
DROP INDEX IF EXISTS profiles_role_idx;
CREATE INDEX profiles_role_idx ON profiles(role);
