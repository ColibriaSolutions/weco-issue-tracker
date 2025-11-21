'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { createServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const createUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    fullName: z.string().min(2),
    role: z.enum(['user', 'support', 'admin']),
})

export async function listUsers() {
    const supabase = createAdminClient()

    // Get all profiles first
    const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

    if (profilesError) {
        console.error('Error fetching profiles:', profilesError)
        return { error: profilesError.message }
    }

    // Get auth users to match emails (since profiles might not have email if we didn't sync it perfectly, 
    // but usually we rely on auth.users for email. 
    // However, we can't join auth.users easily with client SDK.
    // So we fetch all users from auth.admin and map them.)

    const { data: { users }, error: authError } = await supabase.auth.admin.listUsers()

    if (authError) {
        console.error('Error fetching auth users:', authError)
        return { error: authError.message }
    }

    // Merge data
    const combinedUsers = profiles.map(profile => {
        const authUser = users.find(u => u.id === profile.id)
        return {
            ...profile,
            email: authUser?.email,
            last_sign_in_at: authUser?.last_sign_in_at,
        }
    })

    return { data: combinedUsers }
}

export async function createUser(formData: FormData) {
    const supabase = createAdminClient()

    const rawData = {
        email: formData.get('email'),
        password: formData.get('password'),
        fullName: formData.get('fullName'),
        role: formData.get('role'),
    }

    const validated = createUserSchema.safeParse(rawData)

    if (!validated.success) {
        return { error: validated.error.flatten().fieldErrors }
    }

    const { email, password, fullName, role } = validated.data

    // 1. Create Auth User
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true, // Auto-confirm since admin is creating it
        user_metadata: { full_name: fullName },
    })

    if (authError) {
        return { error: authError.message }
    }

    if (!authUser.user) {
        return { error: 'Failed to create user' }
    }

    // 2. Update Profile with Role and Force Password Reset
    // The trigger creates the profile with default 'user' role. We need to update it.
    const { error: profileError } = await supabase
        .from('profiles')
        .update({
            role: role as any,
            must_change_password: true,
        })
        .eq('id', authUser.user.id)

    if (profileError) {
        // Cleanup if profile update fails? Or just report error.
        return { error: 'User created but failed to update profile role: ' + profileError.message }
    }

    revalidatePath('/admin')
    return { success: true }
}

export async function toggleUserStatus(userId: string, isActive: boolean) {
    const supabase = createAdminClient()

    // 1. Update Profile
    const { error: profileError } = await supabase
        .from('profiles')
        .update({ is_active: isActive })
        .eq('id', userId)

    if (profileError) {
        return { error: profileError.message }
    }

    // 2. Ban/Unban in Auth (Optional but good for security)
    if (!isActive) {
        const { error: banError } = await supabase.auth.admin.updateUserById(userId, {
            ban_duration: '876000h', // 100 years
        })
        if (banError) console.error('Error banning user:', banError)
    } else {
        const { error: unbanError } = await supabase.auth.admin.updateUserById(userId, {
            ban_duration: '0', // Remove ban
        })
        if (unbanError) console.error('Error unbanning user:', unbanError)
    }

    revalidatePath('/admin')
    return { success: true }
}

export async function resetUserPassword(userId: string, newPassword: string) {
    const supabase = createAdminClient()

    const { error } = await supabase.auth.admin.updateUserById(userId, {
        password: newPassword,
    })

    if (error) {
        return { error: error.message }
    }

    // Set flag to force change on next login
    await supabase
        .from('profiles')
        .update({ must_change_password: true })
        .eq('id', userId)

    revalidatePath('/admin')
    return { success: true }
}
