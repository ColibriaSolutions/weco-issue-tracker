-- Promote user to Admin
-- Run this in Supabase SQL Editor
UPDATE profiles
SET role = 'admin'
WHERE id = 'cdd6f36e-35ac-44bd-ba8b-3323ddd96739';
