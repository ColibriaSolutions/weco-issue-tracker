-- Enable Realtime for the comments table
-- This is required for the CommentList component to receive live updates.

begin;
  -- Check if the publication exists (it usually does by default in Supabase)
  -- and add the table to it.
  alter publication supabase_realtime add table comments;
commit;
