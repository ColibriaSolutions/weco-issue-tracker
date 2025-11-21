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

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(formData: FormData) {
    const supabase = await createServerClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        fullName: formData.get('fullName') as string,
    }

    // Extend schema for signup
    const signupSchema = authSchema.extend({
        fullName: z.string().min(2, 'Name must be at least 2 characters'),
    })

    const validated = signupSchema.safeParse(data)

    if (!validated.success) {
        return { error: validated.error.errors[0].message }
    }

    const { error } = await supabase.auth.signUp({
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

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function logout() {
    const supabase = await createServerClient()
    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    redirect('/login')
}
