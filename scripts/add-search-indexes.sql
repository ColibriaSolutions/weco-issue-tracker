-- Add indexes for efficient issue search by title and creator name
-- These indexes use PostgreSQL's trigram (pg_trgm) extension for fast ILIKE pattern matching

BEGIN;

-- Enable pg_trgm extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- Add trigram index for issue title search
-- This significantly speeds up ILIKE queries on the title column
CREATE INDEX IF NOT EXISTS idx_issues_title_trgm 
ON issues USING gin (title gin_trgm_ops);

-- Add trigram index for creator full_name search
-- This speeds up searching issues by reporter name
CREATE INDEX IF NOT EXISTS idx_profiles_full_name_trgm 
ON profiles USING gin (full_name gin_trgm_ops);

-- Add comment for documentation
COMMENT ON INDEX idx_issues_title_trgm IS 'GIN trigram index for fast case-insensitive title search (ILIKE)';
COMMENT ON INDEX idx_profiles_full_name_trgm IS 'GIN trigram index for fast case-insensitive creator name search (ILIKE)';

COMMIT;

