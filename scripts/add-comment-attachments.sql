-- Add attachment support to comments table
-- Run this in Supabase SQL Editor

begin;

-- Add attachment columns
alter table comments 
add column if not exists attachment_url text,
add column if not exists attachment_type text check (attachment_type in ('image', 'video'));

-- Create index for faster queries on comments with attachments
create index if not exists comments_attachment_type_idx 
on comments(attachment_type) 
where attachment_type is not null;

-- Add comment for documentation
comment on column comments.attachment_url is 'Vercel Blob URL for uploaded image or video';
comment on column comments.attachment_type is 'Type of attachment: image or video';

commit;
