'use server'

import { createServerClient, createServiceRoleClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export interface UserWithProfile {
    id: string
    email: string
    full_name: string | null
    role: 'user' | 'support' | 'admin'
    department: string | null
    region: string | null
    is_active: boolean
    created_at: string
}

/**
 * Get all users with their profiles and emails
 * Requires admin role
 */
export async function getAllUsers(): Promise<{ data?: UserWithProfile[]; currentUserId?: string; error?: string }> {
    const supabase = await createServerClient()

    // Check if current user is admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { error: 'Not authenticated' }
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'admin') {
        return { error: 'Unauthorized: Admin access required' }
    }

    // Use service role to get emails from auth.users
    const serviceSupabase = createServiceRoleClient()

    // Get all profiles
    const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

    if (profilesError) {
        return { error: profilesError.message }
    }

    // Get all auth users to get emails
    const { data: { users: authUsers }, error: authError } = await serviceSupabase.auth.admin.listUsers()

    if (authError) {
        return { error: authError.message }
    }

    // Merge profiles with emails
    const usersWithProfiles: UserWithProfile[] = profiles.map((profile: any) => {
        const authUser = authUsers.find((u: any) => u.id === profile.id)
        return {
            id: profile.id,
            email: authUser?.email || 'Unknown',
            full_name: profile.full_name,
            role: profile.role,
            department: profile.department,
            region: profile.region,
            is_active: profile.is_active,
            created_at: profile.created_at,
        }
    })

    return {
        data: usersWithProfiles,
        currentUserId: user.id
    }
}

/**
 * Activate multiple users
 * Requires admin role
 */
export async function bulkActivateUsers(userIds: string[]): Promise<{ error?: string }> {
    const supabase = await createServerClient()

    // Check if current user is admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { error: 'Not authenticated' }
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'admin') {
        return { error: 'Unauthorized: Admin access required' }
    }

    // Use service role to update
    const serviceSupabase = createServiceRoleClient()

    const { error } = await serviceSupabase
        .from('profiles')
        .update({ is_active: true })
        .in('id', userIds)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/admin/users')
    return {}
}

/**
 * Deactivate multiple users
 * Requires admin role
 * Prevents admin from deactivating themselves
 */
export async function bulkDeactivateUsers(userIds: string[]): Promise<{ error?: string }> {
    const supabase = await createServerClient()

    // Check if current user is admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { error: 'Not authenticated' }
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'admin') {
        return { error: 'Unauthorized: Admin access required' }
    }

    // SELF-PROTECTION: Prevent admin from deactivating themselves
    if (userIds.includes(user.id)) {
        return { error: 'You cannot deactivate your own account' }
    }

    // Use service role to update
    const serviceSupabase = createServiceRoleClient()

    const { error } = await serviceSupabase
        .from('profiles')
        .update({ is_active: false })
        .in('id', userIds)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/admin/users')
    return {}
}

/**
 * Promote multiple users to admin
 * Requires admin role
 */
export async function bulkPromoteToAdmin(userIds: string[]): Promise<{ error?: string }> {
    const supabase = await createServerClient()

    // Check if current user is admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { error: 'Not authenticated' }
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'admin') {
        return { error: 'Unauthorized: Admin access required' }
    }

    // Use service role to update
    const serviceSupabase = createServiceRoleClient()

    const { error } = await serviceSupabase
        .from('profiles')
        .update({ role: 'admin' })
        .in('id', userIds)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/admin/users')
    return {}
}

/**
 * Demote multiple users to regular user
 * Requires admin role
 * Prevents admin from demoting themselves
 */
export async function bulkDemoteToUser(userIds: string[]): Promise<{ error?: string }> {
    const supabase = await createServerClient()

    // Check if current user is admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { error: 'Not authenticated' }
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'admin') {
        return { error: 'Unauthorized: Admin access required' }
    }

    // SELF-PROTECTION: Prevent admin from demoting themselves
    if (userIds.includes(user.id)) {
        return { error: 'You cannot demote your own account' }
    }

    // Use service role to update
    const serviceSupabase = createServiceRoleClient()

    const { error } = await serviceSupabase
        .from('profiles')
        .update({ role: 'user' })
        .in('id', userIds)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/admin/users')
    return {}
}

/**
 * Permanently delete multiple users
 * Requires admin role
 * Prevents admin from deleting themselves
 */
export async function bulkDeleteUsers(userIds: string[]): Promise<{ error?: string }> {
    const supabase = await createServerClient()

    // Check if current user is admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { error: 'Not authenticated' }
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'admin') {
        return { error: 'Unauthorized: Admin access required' }
    }

    // SELF-PROTECTION: Prevent admin from deleting themselves
    if (userIds.includes(user.id)) {
        return { error: 'You cannot delete your own account' }
    }

    // Use service role to delete from auth.users
    // Deleting from auth.users will cascade to profiles due to FK constraint
    const serviceSupabase = createServiceRoleClient()

    // Delete users one by one since deleteUser doesn't support bulk
    // We use Promise.all to run them in parallel
    const deletePromises = userIds.map(id => serviceSupabase.auth.admin.deleteUser(id))
    const results = await Promise.all(deletePromises)

    // Check for errors
    const errors = results.filter((r: any) => r.error).map((r: any) => r.error?.message)
    if (errors.length > 0) {
        return { error: `Failed to delete some users: ${errors.join(', ')}` }
    }

    revalidatePath('/admin/users')
    return {}
}
