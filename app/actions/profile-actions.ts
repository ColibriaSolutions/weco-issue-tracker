'use server'

import { createServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { put } from '@vercel/blob'

export async function updateProfile({
    fullName,
    avatarFile,
}: {
    fullName?: string
    avatarFile?: File
}) {
    try {
        const supabase = await createServerClient()

        // Get current user
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        if (authError || !user) {
            return { error: 'You must be logged in' }
        }

        let avatarUrl: string | undefined

        // Upload avatar if provided
        if (avatarFile && avatarFile.size > 0) {
            // Validate file size (max 5MB)
            if (avatarFile.size > 5 * 1024 * 1024) {
                return { error: 'Avatar file must be less than 5MB' }
            }

            // Validate file type
            if (!avatarFile.type.startsWith('image/')) {
                return { error: 'Avatar must be an image file' }
            }

            try {
                const blob = await put(`avatars/${user.id}-${Date.now()}.${avatarFile.name.split('.').pop()}`, avatarFile, {
                    access: 'public',
                })
                avatarUrl = blob.url
            } catch (uploadError) {
                console.error('Avatar upload error:', uploadError)
                return { error: 'Failed to upload avatar' }
            }
        }

        // Build update object
        const updates: any = {}
        if (fullName) updates.full_name = fullName
        if (avatarUrl) updates.avatar_url = avatarUrl

        if (Object.keys(updates).length === 0) {
            return { error: 'No changes to update' }
        }

        // Update profile
        const { error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', user.id)

        if (error) {
            console.error('Profile update error:', error)
            return { error: error.message }
        }

        revalidatePath('/profile')
        return { success: true, avatarUrl }
    } catch (error) {
        console.error('Update profile error:', error)
        return { error: 'Failed to update profile' }
    }
}

export async function changePassword({
    currentPassword,
    newPassword,
}: {
    currentPassword: string
    newPassword: string
}) {
    try {
        const supabase = await createServerClient()

        // Get current user
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        if (authError || !user) {
            return { error: 'You must be logged in' }
        }

        // Validate new password
        if (newPassword.length < 6) {
            return { error: 'New password must be at least 6 characters' }
        }

        // Verify current password by attempting to sign in
        const { error: signInError } = await supabase.auth.signInWithPassword({
            email: user.email!,
            password: currentPassword,
        })

        if (signInError) {
            return { error: 'Current password is incorrect' }
        }

        // Update password
        const { error: updateError } = await supabase.auth.updateUser({
            password: newPassword,
        })

        if (updateError) {
            console.error('Password update error:', updateError)
            return { error: updateError.message }
        }

        return { success: true }
    } catch (error) {
        console.error('Change password error:', error)
        return { error: 'Failed to change password' }
    }
}

export async function getCurrentUser() {
    try {
        const supabase = await createServerClient()

        const { data: { user }, error: authError } = await supabase.auth.getUser()
        if (authError || !user) {
            return { error: 'Not authenticated' }
        }

        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()

        if (profileError) {
            return { error: profileError.message }
        }

        return {
            data: {
                ...profile,
                email: user.email,
            }
        }
    } catch (error) {
        console.error('Get current user error:', error)
        return { error: 'Failed to get user data' }
    }
}
