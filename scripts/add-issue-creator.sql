-- Add created_by to issues table to track issue creator
BEGIN;

-- 1. Add created_by column
ALTER TABLE issues 
ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES profiles(id) ON DELETE SET NULL;

-- 2. Create index for performance
CREATE INDEX IF NOT EXISTS issues_created_by_idx ON issues(created_by);

-- 3. Add comment for documentation
COMMENT ON COLUMN issues.created_by IS 'User who created the issue (for displaying department/region info)';

COMMIT;
