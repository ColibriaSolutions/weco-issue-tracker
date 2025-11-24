-- Implement Project-Based Row Level Security
-- This script restricts users to only access projects they're assigned to
-- Admins have full access to everything

BEGIN;

-- Drop existing overly permissive policies
DROP POLICY IF EXISTS "Allow all operations on projects" ON projects;
DROP POLICY IF EXISTS "Allow all operations on issues" ON issues;

-- ============================================================================
-- PROJECTS POLICIES
-- ============================================================================

-- Admins can do everything on projects
CREATE POLICY "Admins full access to projects"
ON projects FOR ALL
USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

-- Users can view projects they're members of
CREATE POLICY "Users can view assigned projects"
ON projects FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM project_members
    WHERE project_members.project_id = projects.id
    AND project_members.user_id = auth.uid()
  )
);

-- Users can create projects (they automatically become owner/member)
CREATE POLICY "Users can create projects"
ON projects FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

-- Users can update projects they own
CREATE POLICY "Users can update owned projects"
ON projects FOR UPDATE
USING (owner_id = auth.uid());

-- Users can delete projects they own
CREATE POLICY "Users can delete owned projects"
ON projects FOR DELETE
USING (owner_id = auth.uid());

-- ============================================================================
-- ISSUES POLICIES
-- ============================================================================

-- Admins can do everything on issues
CREATE POLICY "Admins full access to issues"
ON issues FOR ALL
USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

-- Users can view issues in their assigned projects
CREATE POLICY "Users can view issues in assigned projects"
ON issues FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM project_members
    WHERE project_members.project_id = issues.project_id
    AND project_members.user_id = auth.uid()
  )
);

-- Users can create issues in their assigned projects
CREATE POLICY "Users can create issues in assigned projects"
ON issues FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM project_members
    WHERE project_members.project_id = issues.project_id
    AND project_members.user_id = auth.uid()
  )
);

-- Users can update issues they created OR in projects they're members of
CREATE POLICY "Users can update issues in assigned projects"
ON issues FOR UPDATE
USING (
  created_by = auth.uid() OR
  EXISTS (
    SELECT 1 FROM project_members
    WHERE project_members.project_id = issues.project_id
    AND project_members.user_id = auth.uid()
  )
);

-- Users can delete issues they created
CREATE POLICY "Users can delete own issues"
ON issues FOR DELETE
USING (created_by = auth.uid());

-- ============================================================================
-- COMMENTS POLICIES
-- ============================================================================

-- Drop existing comment policies if any
DROP POLICY IF EXISTS "Allow all operations on comments" ON comments;
DROP POLICY IF EXISTS "Users can view all comments" ON comments;
DROP POLICY IF EXISTS "Users can create comments" ON comments;
DROP POLICY IF EXISTS "Users can delete own comments" ON comments;

-- Admins can do everything on comments
CREATE POLICY "Admins full access to comments"
ON comments FOR ALL
USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) = 'admin'
);

-- Users can view comments on issues in their assigned projects
CREATE POLICY "Users can view comments in assigned projects"
ON comments FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM issues
    JOIN project_members ON project_members.project_id = issues.project_id
    WHERE issues.id = comments.issue_id
    AND project_members.user_id = auth.uid()
  )
);

-- Users can create comments on issues in their assigned projects
CREATE POLICY "Users can create comments in assigned projects"
ON comments FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM issues
    JOIN project_members ON project_members.project_id = issues.project_id
    WHERE issues.id = comments.issue_id
    AND project_members.user_id = auth.uid()
  )
);

-- Users can delete their own comments
CREATE POLICY "Users can delete own comments"
ON comments FOR DELETE
USING (user_id = auth.uid());

-- ============================================================================
-- IMPORTANT NOTES
-- ============================================================================
-- 1. Admins bypass ALL restrictions and have full access
-- 2. Users can only access projects they're assigned to via project_members
-- 3. When a user creates a project, they must be added to project_members
-- 4. Ensure all existing users are properly assigned to their projects

COMMIT;
