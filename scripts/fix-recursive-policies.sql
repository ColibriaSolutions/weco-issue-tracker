-- Fix Infinite Recursion in RLS Policies

-- 1. Create a secure function to get the current user's role
-- This function runs as the database owner (SECURITY DEFINER), bypassing RLS.
create or replace function public.get_my_role()
returns user_role
language sql
security definer
set search_path = public
stable
as $$
  select role from profiles where id = auth.uid();
$$;

-- 2. Drop the problematic recursive policies
drop policy if exists "Support and Admins can view all profiles" on profiles;
drop policy if exists "Admins can update any profile" on profiles;

-- 3. Re-create policies using the secure function

-- Support and Admins can view all profiles
create policy "Support and Admins can view all profiles"
on profiles for select
using (
  get_my_role() in ('admin', 'support')
);

-- Admins can update any profile
create policy "Admins can update any profile"
on profiles for update
using (
  get_my_role() = 'admin'
);
