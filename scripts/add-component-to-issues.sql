-- Add component column to issues table
ALTER TABLE issues 
ADD COLUMN IF NOT EXISTS component TEXT;

-- Comment on column
COMMENT ON COLUMN issues.component IS 'The system component this issue relates to (Sales Order, Purchase, CRM)';
