-- Project Ownership and Member Assignment Migration
-- This enables project-level access control

BEGIN;

-- 1. Add owner_id to projects table
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS owner_id UUID REFERENCES profiles(id) ON DELETE SET NULL;

-- 2. Create project_members junction table
CREATE TABLE IF NOT EXISTS project_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  role TEXT CHECK (role IN ('owner', 'member')) DEFAULT 'member' NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(project_id, user_id)
);

-- 3. Create indexes for performance
CREATE INDEX IF NOT EXISTS project_members_project_id_idx ON project_members(project_id);
CREATE INDEX IF NOT EXISTS project_members_user_id_idx ON project_members(user_id);
CREATE INDEX IF NOT EXISTS projects_owner_id_idx ON projects(owner_id);

-- 4. Enable RLS on project_members
ALTER TABLE project_members ENABLE ROW LEVEL SECURITY;

-- 5. RLS Policies for project_members

-- Anyone authenticated can read memberships (needed for UI)
CREATE POLICY "project_members_select" ON project_members
  FOR SELECT 
  USING (auth.uid() IS NOT NULL);

-- Project owners and admins can add members
CREATE POLICY "project_members_insert" ON project_members
  FOR INSERT 
  WITH CHECK (
    -- User is admin
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
    OR
    -- User is project owner
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_members.project_id
      AND projects.owner_id = auth.uid()
    )
  );

-- Project owners and admins can remove members
CREATE POLICY "project_members_delete" ON project_members
  FOR DELETE 
  USING (
    -- User is admin
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
    OR
    -- User is project owner
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = project_members.project_id
      AND projects.owner_id = auth.uid()
    )
  );

-- 6. Update existing projects to set owner_id
-- (Optional: Set to first user or leave NULL for admin to assign)
-- UPDATE projects SET owner_id = (SELECT id FROM profiles WHERE role = 'admin' LIMIT 1) WHERE owner_id IS NULL;

-- 7. Add comment for documentation
COMMENT ON TABLE project_members IS 'Junction table for user-project assignments. Owners can manage members.';
COMMENT ON COLUMN projects.owner_id IS 'User who created the project and has full management rights';
COMMENT ON COLUMN project_members.role IS 'owner: full control, member: can view and contribute';

COMMIT;
