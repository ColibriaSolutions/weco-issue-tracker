-- Fix: Allow all authenticated users to view profiles
-- This is required for features like Comments, where users need to see the author's name/avatar.

-- 1. Drop the restrictive policy (if it exists)
drop policy if exists "Support and Admins can view all profiles" on profiles;

-- 2. Create a permissive policy for reading profiles
-- We allow any authenticated user to read basic profile info (name, avatar, role).
create policy "Authenticated users can view all profiles"
on profiles for select
to authenticated
using (true);
