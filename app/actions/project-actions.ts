'use server'

import { createServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createProject({
  name,
  description,
}: {
  name: string
  description: string
}) {
  try {
    const supabase = await createServerClient()

    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return { error: 'You must be logged in to create a project' }
    }

    // Create project with owner
    const { data, error } = await supabase
      .from('projects')
      .insert([
        {
          name,
          description,
          owner_id: user.id,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('[v0] Error creating project:', error)
      return { error: error.message }
    }

    // Add owner to project_members
    const { error: memberError } = await supabase
      .from('project_members')
      .insert({
        project_id: data.id,
        user_id: user.id,
        role: 'owner',
      })

    if (memberError) {
      console.error('[v0] Error adding owner to project_members:', memberError)
      // Don't fail the whole operation, just log it
    }

    revalidatePath('/')
    return { data }
  } catch (error) {
    console.error('[v0] Error creating project:', error)
    return { error: 'Failed to create project' }
  }
}

export async function deleteProject(projectId: string) {
  try {
    const supabase = await createServerClient()

    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return { error: 'You must be logged in' }
    }

    // Get user's role and check if they're the project owner
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      return { error: 'Failed to verify permissions' }
    }

    // Check if user is admin or project owner
    const isAdmin = profile.role === 'admin'

    if (!isAdmin) {
      // Check if user is project owner
      const { data: project } = await supabase
        .from('projects')
        .select('owner_id')
        .eq('id', projectId)
        .single()

      if (!project || project.owner_id !== user.id) {
        return { error: 'Only project owners and administrators can delete projects' }
      }
    }

    // Delete the project (cascade will handle issues, comments, and members)
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId)

    if (error) {
      console.error('[v0] Error deleting project:', error)
      return { error: error.message }
    }

    revalidatePath('/')
    return { success: true }
  } catch (error) {
    console.error('[v0] Error deleting project:', error)
    return { error: 'Failed to delete project' }
  }
}

export async function deleteMultipleProjects(projectIds: string[]) {
  try {
    const supabase = await createServerClient()

    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return { error: 'You must be logged in' }
    }

    // Get user's role
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (profileError || !profile) {
      return { error: 'Failed to verify permissions' }
    }

    const isAdmin = profile.role === 'admin'

    // If not admin, verify ownership of all projects
    if (!isAdmin) {
      const { data: projects } = await supabase
        .from('projects')
        .select('id, owner_id')
        .in('id', projectIds)

      const allOwned = projects?.every(p => p.owner_id === user.id)
      if (!allOwned) {
        return { error: 'You can only delete projects you own' }
      }
    }

    // Delete all projects
    const { error } = await supabase
      .from('projects')
      .delete()
      .in('id', projectIds)

    if (error) {
      console.error('[v0] Error deleting projects:', error)
      return { error: error.message }
    }

    revalidatePath('/')
    return { success: true, count: projectIds.length }
  } catch (error) {
    console.error('[v0] Error deleting projects:', error)
    return { error: 'Failed to delete projects' }
  }
}
