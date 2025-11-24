'use server'

import { createServerClient, createServiceRoleClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const IMPERSONATE_COOKIE = 'impersonate_user_id'

export async function startImpersonation(userId: string) {
    const supabase = await createServerClient()

    // Verify current user is admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { error: 'Unauthorized' }
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'admin') {
        return { error: 'Only admins can impersonate users' }
    }

    // Verify target user exists
    const serviceClient = createServiceRoleClient()
    const { data: targetUser } = await serviceClient
        .from('profiles')
        .select('id, full_name')
        .eq('id', userId)
        .single()

    if (!targetUser) {
        return { error: 'User not found' }
    }

    // Set impersonation cookie
    const cookieStore = await cookies()
    cookieStore.set(IMPERSONATE_COOKIE, userId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 hours
    })

    return { success: true }
}

export async function stopImpersonation() {
    const cookieStore = await cookies()
    cookieStore.delete(IMPERSONATE_COOKIE)
    return { success: true }
}

export async function getImpersonatedUser() {
    const cookieStore = await cookies()
    const impersonateUserId = cookieStore.get(IMPERSONATE_COOKIE)?.value

    if (!impersonateUserId) {
        return null
    }

    const serviceClient = createServiceRoleClient()
    const { data: user } = await serviceClient
        .from('profiles')
        .select('id, full_name, avatar_url, role')
        .eq('id', impersonateUserId)
        .single()

    return user
}

export async function getAllUsers() {
    const supabase = await createServerClient()

    // Verify current user is admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { error: 'Unauthorized' }
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'admin') {
        return { error: 'Only admins can view user list' }
    }

    // Get all users
    const serviceClient = createServiceRoleClient()
    const { data: users, error } = await serviceClient
        .from('profiles')
        .select('id, full_name, avatar_url, role, is_active')
        .eq('is_active', true)
        .order('full_name')

    if (error) {
        return { error: error.message }
    }

    return { data: users }
}
