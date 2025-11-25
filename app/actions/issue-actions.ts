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
  component: string
  region: string
  screenshotUrl: string | null
}) {
  try {
    const validatedFields = createIssueSchema.safeParse(input)

    if (!validatedFields.success) {
      return {
        error: validatedFields.error.flatten().fieldErrors,
      }
    }

    const { projectId, title, description, priority, component, region, screenshotUrl } = validatedFields.data

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
          component,
          region,
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

export async function updateIssue(issueId: string, formData: FormData) {
  const supabase = await createServerClient()

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'You must be logged in to update issues' }
  }

  // Check permissions: Admin or issue creator
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  const isAdmin = profile?.role === 'admin'

  // Get the issue to check ownership
  const { data: existingIssue } = await supabase
    .from('issues')
    .select('created_by, project_id')
    .eq('id', issueId)
    .single()

  if (!existingIssue) {
    return { error: 'Issue not found' }
  }

  const isCreator = existingIssue.created_by === user.id

  if (!isAdmin && !isCreator) {
    return { error: 'Only admins or issue creators can edit issues' }
  }

  // Extract form data
  const title = formData.get('title') as string | null
  const description = formData.get('description') as string | null
  const status = formData.get('status') as string | null
  const priority = formData.get('priority') as string | null
  const component = formData.get('component') as string | null
  const region = formData.get('region') as string | null
  const removeScreenshot = formData.get('remove_screenshot') === 'true'

  // Validate at least one field
  const screenshot = formData.get('screenshot') as File | null
  if (!title && !description && !status && !priority && !component && !region && !screenshot && !removeScreenshot) {
    return { error: 'At least one field must be provided for update' }
  }

  // Validate status and priority
  const validStatuses = ['open', 'in_progress', 'closed']
  const validPriorities = ['low', 'medium', 'high', 'critical']

  if (status && !validStatuses.includes(status)) {
    return { error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` }
  }

  if (priority && !validPriorities.includes(priority)) {
    return { error: `Invalid priority. Must be one of: ${validPriorities.join(', ')}` }
  }

  // Handle screenshot upload
  let screenshotUrl: string | null = null
  if (screenshot && screenshot.size > 0) {
    // Validate file size (50MB)
    if (screenshot.size > 50 * 1024 * 1024) {
      return { error: 'Screenshot file size must be less than 50MB' }
    }

    // Validate file type
    if (!screenshot.type.startsWith('image/')) {
      return { error: 'Screenshot must be an image file' }
    }

    try {
      // Upload to Vercel Blob
      const blob = await put(`screenshots/${crypto.randomUUID()}-${screenshot.name}`, screenshot, {
        access: 'public',
      })
      screenshotUrl = blob.url
    } catch (uploadError) {
      console.error('Screenshot upload error:', uploadError)
      return { error: 'Failed to upload screenshot' }
    }
  }

  // Build update object
  const updates: any = { updated_at: new Date().toISOString() }
  if (title) updates.title = title
  if (description !== null) updates.description = description
  if (status) updates.status = status
  if (priority) updates.priority = priority
  if (component) updates.component = component
  if (region) updates.region = region
  if (screenshotUrl) updates.screenshot_url = screenshotUrl
  if (removeScreenshot) updates.screenshot_url = null

  const { error } = await supabase
    .from('issues')
    .update(updates)
    .eq('id', issueId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/projects/${existingIssue.project_id}`)
  return { success: true }
}

export async function deleteScreenshot(issueId: string) {
  const supabase = await createServerClient()

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'You must be logged in to delete screenshots' }
  }

  // Check permissions: Admin or issue creator
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  const isAdmin = profile?.role === 'admin'

  // Get the issue to check ownership
  const { data: existingIssue } = await supabase
    .from('issues')
    .select('created_by, project_id')
    .eq('id', issueId)
    .single()

  if (!existingIssue) {
    return { error: 'Issue not found' }
  }

  const isCreator = existingIssue.created_by === user.id

  if (!isAdmin && !isCreator) {
    return { error: 'Only admins or issue creators can delete screenshots' }
  }

  const { error } = await supabase
    .from('issues')
    .update({ screenshot_url: null, updated_at: new Date().toISOString() })
    .eq('id', issueId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/projects/${existingIssue.project_id}`)
  return { success: true }
}

export async function deleteIssue(issueId: string) {
  const supabase = await createServerClient()

  // Get current user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { error: 'Unauthorized' }
  }

  // Check if user is admin or issue creator
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  const isAdmin = profile?.role === 'admin'

  // Get issue to check ownership and project_id
  const { data: issue } = await supabase
    .from('issues')
    .select('created_by, project_id')
    .eq('id', issueId)
    .single()

  if (!issue) {
    return { error: 'Issue not found' }
  }

  const isCreator = issue.created_by === user.id

  if (!isAdmin && !isCreator) {
    return { error: 'Only admins or issue creators can delete issues' }
  }

  // Delete issue (cascades to comments)
  const { error } = await supabase
    .from('issues')
    .delete()
    .eq('id', issueId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath(`/projects/${issue.project_id}`)
  return { success: true }
}
