'use server'

import { createServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { put } from '@vercel/blob'

const createCommentSchema = z.object({
    issueId: z.string().uuid(),
    content: z.string().min(1, 'Comment cannot be empty'),
})

const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB

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

    // Handle file attachment
    let attachmentUrl: string | null = null
    let attachmentType: 'image' | 'video' | null = null

    const file = formData.get('attachment') as File | null
    if (file && file.size > 0) {
        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            return { error: 'File size must be less than 50MB' }
        }

        // Validate file type
        const isImage = file.type.startsWith('image/')
        const isVideo = file.type.startsWith('video/')

        if (!isImage && !isVideo) {
            return { error: 'Only image and video files are allowed' }
        }

        try {
            // Upload to Vercel Blob
            const blob = await put(`comments/${crypto.randomUUID()}-${file.name}`, file, {
                access: 'public',
            })

            attachmentUrl = blob.url
            attachmentType = isImage ? 'image' : 'video'
        } catch (uploadError) {
            console.error('File upload error:', uploadError)
            return { error: 'Failed to upload attachment' }
        }
    }

    const { error } = await supabase
        .from('comments')
        .insert({
            issue_id: issueId,
            user_id: user.id,
            content: content,
            attachment_url: attachmentUrl,
            attachment_type: attachmentType,
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
