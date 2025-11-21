-- Create comments table
create table if not exists comments (
  id uuid default gen_random_uuid() primary key,
  issue_id uuid references issues(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table comments enable row level security;

-- Create policies
create policy "Enable read access for all users"
on comments for select
using (true);

create policy "Enable insert for authenticated users only"
on comments for insert
with check (auth.uid() = user_id);

create policy "Enable update for users based on user_id"
on comments for update
using (auth.uid() = user_id);

create policy "Enable delete for users based on user_id"
on comments for delete
using (auth.uid() = user_id);

-- Create indexes
create index comments_issue_id_idx on comments(issue_id);
create index comments_user_id_idx on comments(user_id);
