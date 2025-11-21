-- IMPORTANT: This script assumes you have ALREADY signed up via the app or Supabase Dashboard.
-- It does NOT create a user; it only updates the role of an EXISTING user.
--
-- 1. Go to http://localhost:3000/login and Sign Up.
-- 2. OR create a user in Supabase Dashboard -> Authentication -> Users -> Add User.
-- 3. Then run this script to make that user an Admin.

-- Replace 'your-email@example.com' with your actual email address
update profiles
-- IMPORTANT: This script assumes you have ALREADY signed up via the app or Supabase Dashboard.
-- It does NOT create a user; it only updates the role of an EXISTING user.
--
-- 1. Go to http://localhost:3000/login and Sign Up.
-- 2. OR create a user in Supabase Dashboard -> Authentication -> Users -> Add User.
-- 3. Then run this script to make that user an Admin.

-- Replace 'your-email@example.com' with your actual email address
-- We use INSERT ... ON CONFLICT to ensure the profile exists even if it was created before the profiles table.
insert into public.profiles (id, role, full_name)
select id, 'admin', raw_user_meta_data->>'full_name'
from auth.users
where email = 'kader@colibriasolution.com'
on conflict (id) do update
set role = 'admin';

-- Verify the change
select auth.users.email, profiles.role from profiles
join auth.users on profiles.id = auth.users.id
where auth.users.email = 'kader@colibriasolution.com';
