'use server'

import { createServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { put } from '@vercel/blob'
import { createIssueSchema, updateStatusSchema } from '@/lib/validations'

export async function uploadScreenshot(formData: FormData) {
  try {
    const file = formData.get('file') as File

    if (!file) {
      return { error: 'No file provided' }
    }

    const blob = await put(file.name, file, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })

    return { url: blob.url }
  } catch (error) {
    console.error('[v0] Error uploading screenshot:', error)
    return { error: 'Failed to upload screenshot' }
  }
}

export async function createIssue(input: {
  projectId: string
  title: string
  description: string
  priority: string
  screenshotUrl: string | null
}) {
  try {
    const validatedFields = createIssueSchema.safeParse(input)

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors,
      }
    }

    const { projectId, title, description, priority, screenshotUrl } = validatedFields.data

    const supabase = await createServerClient()

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()

    const { data, error } = await supabase
      .from('issues')
      .insert([
        {
          project_id: projectId,
          title,
          description,
          status: 'open',
          priority,
          screenshot_url: screenshotUrl,
          created_by: user?.id || null,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('[v0] Error creating issue:', error)
      return { error: error.message }
    }

    revalidatePath(`/projects/${projectId}`)
    return { data }
  } catch (error) {
    console.error('[v0] Error creating issue:', error)
    return { error: 'Failed to create issue' }
  }
}

export async function updateIssueStatus(issueId: string, status: string) {
  try {
    const validation = updateStatusSchema.safeParse({ issueId, status })

    if (!validation.success) {
      return { error: 'Invalid status or issue ID' }
    }

    const supabase = await createServerClient()

    const { data, error } = await supabase
      .from('issues')
      .update({ status: validation.data.status })
      .eq('id', issueId)
      .select()
      .single()

    if (error) {
      console.error('[v0] Error updating issue:', error)
      return { error: error.message }
    }

    revalidatePath('/projects')
    return { data }
  } catch (error) {
    console.error('[v0] Error updating issue:', error)
    return { error: 'Failed to update issue' }
  }
}
