// Member management server actions
// Add these to app/actions/project-actions.ts

'use server'

import { createServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addProjectMember(projectId: string, userId: string) {
    try {
        const supabase = await createServerClient()

        // Check if user is authenticated
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        if (authError || !user) {
            return { error: 'You must be logged in' }
        }

        // Check if user is admin or project owner
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()

        const isAdmin = profile?.role === 'admin'

        if (!isAdmin) {
            const { data: project } = await supabase
                .from('projects')
                .select('owner_id')
                .eq('id', projectId)
                .single()

            if (!project || project.owner_id !== user.id) {
                return { error: 'Only project owners and administrators can add members' }
            }
        }

        // Add member
        const { error } = await supabase
            .from('project_members')
            .insert({
                project_id: projectId,
                user_id: userId,
                role: 'member',
            })

        if (error) {
            if (error.code === '23505') { // Unique constraint violation
                return { error: 'User is already a member of this project' }
            }
            console.error('[v0] Error adding project member:', error)
            return { error: error.message }
        }

        revalidatePath(`/projects/${projectId}`)
        return { success: true }
    } catch (error) {
        console.error('[v0] Error adding project member:', error)
        return { error: 'Failed to add member' }
    }
}

export async function removeProjectMember(projectId: string, userId: string) {
    try {
        const supabase = await createServerClient()

        // Check if user is authenticated
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        if (authError || !user) {
            return { error: 'You must be logged in' }
        }

        // Check if user is admin or project owner
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()

        const isAdmin = profile?.role === 'admin'

        if (!isAdmin) {
            const { data: project } = await supabase
                .from('projects')
                .select('owner_id')
                .eq('id', projectId)
                .single()

            if (!project || project.owner_id !== user.id) {
                return { error: 'Only project owners and administrators can remove members' }
            }
        }

        // Prevent removing the owner
        const { data: member } = await supabase
            .from('project_members')
            .select('role')
            .eq('project_id', projectId)
            .eq('user_id', userId)
            .single()

        if (member?.role === 'owner') {
            return { error: 'Cannot remove the project owner' }
        }

        // Remove member
        const { error } = await supabase
            .from('project_members')
            .delete()
            .eq('project_id', projectId)
            .eq('user_id', userId)

        if (error) {
            console.error('[v0] Error removing project member:', error)
            return { error: error.message }
        }

        revalidatePath(`/projects/${projectId}`)
        return { success: true }
    } catch (error) {
        console.error('[v0] Error removing project member:', error)
        return { error: 'Failed to remove member' }
    }
}

export async function getProjectMembers(projectId: string) {
    try {
        const supabase = await createServerClient()

        const { data, error } = await supabase
            .from('project_members')
            .select(`
        id,
        role,
        created_at,
        profiles (
          id,
          full_name,
          avatar_url
        )
      `)
            .eq('project_id', projectId)
            .order('created_at', { ascending: true })

        if (error) {
            console.error('[v0] Error fetching project members:', error)
            return { error: error.message }
        }

        return { data }
    } catch (error) {
        console.error('[v0] Error fetching project members:', error)
        return { error: 'Failed to fetch members' }
    }
}

export async function getAvailableUsers(projectId: string) {
    try {
        const supabase = await createServerClient()

        // Get all users
        const { data: allUsers, error: usersError } = await supabase
            .from('profiles')
            .select('id, full_name, avatar_url')
            .eq('is_active', true)
            .order('full_name')

        if (usersError) {
            console.error('[v0] Error fetching users:', usersError)
            return { error: usersError.message }
        }

        // Get current members
        const { data: members, error: membersError } = await supabase
            .from('project_members')
            .select('user_id')
            .eq('project_id', projectId)

        if (membersError) {
            console.error('[v0] Error fetching members:', membersError)
            return { error: membersError.message }
        }

        // Filter out existing members
        const memberIds = new Set(members?.map(m => m.user_id) || [])
        const availableUsers = allUsers?.filter(user => !memberIds.has(user.id)) || []

        return { data: availableUsers }
    } catch (error) {
        console.error('[v0] Error fetching available users:', error)
        return { error: 'Failed to fetch available users' }
    }
}
