'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createServerClient } from '@/lib/supabase/server'
import { z } from 'zod'

const authSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
})

export async function login(formData: FormData) {
    const supabase = await createServerClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const validated = authSchema.safeParse(data)

    if (!validated.success) {
        return { error: 'Invalid email or password format' }
    }

    const { error } = await supabase.auth.signInWithPassword(validated.data)

    if (error) {
        return { error: error.message }
    }

    // Check if user profile exists and is active
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('is_active')
            .eq('id', user.id)
            .single()

        if (profileError || !profile) {
            await supabase.auth.signOut()
            return { error: 'Account not found. Please contact your administrator.' }
        }

        if (!profile.is_active) {
            await supabase.auth.signOut()
            return { error: 'Your account has been deactivated. Please contact your administrator.' }
        }
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(formData: FormData) {
    const supabase = await createServerClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        fullName: formData.get('fullName') as string,
        department: formData.get('department') as string,
        region: formData.get('region') as string,
    }

    // Extend schema for signup
    const signupSchema = authSchema.extend({
        fullName: z.string().min(2, 'Name must be at least 2 characters'),
        department: z.string().min(2, 'Department is required'),
        region: z.string().min(2, 'Region is required'),
    })

    const validated = signupSchema.safeParse(data)

    if (!validated.success) {
        return { error: validated.error.errors[0].message }
    }

    const { data: authData, error } = await supabase.auth.signUp({
        email: validated.data.email,
        password: validated.data.password,
        options: {
            data: {
                full_name: validated.data.fullName,
            },
        },
    })

    if (error) {
        return { error: error.message }
    }

    // Update profile with department and region
    if (authData.user) {
        const { error: profileError } = await supabase
            .from('profiles')
            .update({
                department: validated.data.department,
                region: validated.data.region,
            } as any)
            .eq('id', authData.user.id)

        if (profileError) {
            console.error('Failed to update profile with department/region:', profileError)
        }
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function logout() {
    const supabase = await createServerClient()
    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    redirect('/login')
}
