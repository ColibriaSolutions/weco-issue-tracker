-- Fix: Update comments foreign key to reference profiles
-- This is required for PostgREST to detect the relationship and allow joining comments with profiles.

begin;

-- 1. Drop the old foreign key (referencing auth.users)
-- Note: The constraint name might vary, so we try to drop it by the likely name or just alter the column.
-- However, standard practice is to drop the constraint.
-- We'll try to drop the constraint if we can guess the name, otherwise we rely on the new FK.
-- Supabase usually names it "comments_user_id_fkey".

alter table comments drop constraint if exists comments_user_id_fkey;

-- 2. Add the new foreign key referencing public.profiles
alter table comments
add constraint comments_user_id_fkey
foreign key (user_id)
references public.profiles(id)
on delete cascade;

commit;
