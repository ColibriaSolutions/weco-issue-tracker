'use server'

import { createServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const createCommentSchema = z.object({
    issueId: z.string().uuid(),
    content: z.string().min(1, 'Comment cannot be empty'),
})

export async function addComment(formData: FormData) {
    const supabase = await createServerClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
        return { error: 'You must be logged in to comment' }
    }

    const rawData = {
        issueId: formData.get('issueId'),
        content: formData.get('content'),
    }

    const validated = createCommentSchema.safeParse(rawData)

    if (!validated.success) {
        return { error: validated.error.flatten().fieldErrors }
    }

    const { issueId, content } = validated.data

    const { error } = await supabase
        .from('comments')
        .insert({
            issue_id: issueId,
            user_id: user.id,
            content: content,
        })

    if (error) {
        return { error: error.message }
    }

    revalidatePath(`/projects`) // Revalidate broadly to ensure updates show
    return { success: true }
}

export async function deleteComment(commentId: string) {
    const supabase = await createServerClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
        return { error: 'You must be logged in to delete comments' }
    }

    // RLS policies will handle the permission check (users can only delete their own)
    // But we can also check role here if we want admins/support to delete.
    // For now, relying on RLS + simple check.

    const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId)

    if (error) {
        return { error: error.message }
    }

    revalidatePath(`/projects`)
    return { success: true }
}
