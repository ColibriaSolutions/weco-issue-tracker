-- Add region column to issues table
ALTER TABLE issues 
ADD COLUMN IF NOT EXISTS region TEXT;

-- Comment on column
COMMENT ON COLUMN issues.region IS 'The region this issue relates to (e.g., CA, TN, CN-SZ, HK, MX, BR)';
