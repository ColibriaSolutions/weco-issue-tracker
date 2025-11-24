-- Add department and region to profiles table (simplified - no regions table needed)
BEGIN;

-- 1. Add department and region columns
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS department TEXT,
ADD COLUMN IF NOT EXISTS region TEXT;

-- 2. Add comments for documentation
COMMENT ON COLUMN profiles.department IS 'User department/team (required for non-admin users)';
COMMENT ON COLUMN profiles.region IS 'User region code: CA, TN, CN-SZ, HK, MX, or BR (required for non-admin users)';

COMMIT;
