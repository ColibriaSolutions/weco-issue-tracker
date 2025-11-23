-- API Keys Table Migration
-- Enables API key authentication for REST API access

BEGIN;

-- Create api_keys table
CREATE TABLE IF NOT EXISTS api_keys (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  key_hash TEXT NOT NULL,
  key_prefix TEXT NOT NULL,
  created_by UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  last_used_at TIMESTAMPTZ,
  request_count INT DEFAULT 0 NOT NULL,
  rate_limit INT DEFAULT 10000 NOT NULL,
  is_active BOOLEAN DEFAULT true NOT NULL,
  UNIQUE(key_hash),
  UNIQUE(key_prefix)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS api_keys_created_by_idx ON api_keys(created_by);
CREATE INDEX IF NOT EXISTS api_keys_key_prefix_idx ON api_keys(key_prefix);
CREATE INDEX IF NOT EXISTS api_keys_is_active_idx ON api_keys(is_active) WHERE is_active = true;

-- Enable RLS
ALTER TABLE api_keys ENABLE ROW LEVEL SECURITY;

-- Only admins can manage API keys
CREATE POLICY "api_keys_admin_all" ON api_keys
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Add comments for documentation
COMMENT ON TABLE api_keys IS 'API keys for REST API authentication';
COMMENT ON COLUMN api_keys.name IS 'Human-readable name for the API key';
COMMENT ON COLUMN api_keys.key_hash IS 'bcrypt hash of the full API key';
COMMENT ON COLUMN api_keys.key_prefix IS 'First 8 chars of key for display (e.g., weco_abc12345)';
COMMENT ON COLUMN api_keys.request_count IS 'Total number of API requests made with this key';
COMMENT ON COLUMN api_keys.rate_limit IS 'Maximum requests allowed per month';

COMMIT;
