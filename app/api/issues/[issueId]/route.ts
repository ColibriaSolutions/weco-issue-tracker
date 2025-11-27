import { NextRequest, NextResponse } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabase/server'
import { validateApiKeyRequest } from '@/lib/api/auth'
import { put } from '@vercel/blob'

const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ issueId: string }> }
) {
    // Authenticate request
    const authResult = await validateApiKeyRequest(request)
    if (!authResult.valid) {
        return NextResponse.json(
            { error: authResult.error || 'Unauthorized' },
            { status: 401 }
        )
    }

    const { issueId } = await params
    const supabase = createServiceRoleClient()

    const { data: issue, error } = await supabase
        .from('issues')
        .select('*')
        .eq('id', issueId)
        .single()

    if (error || !issue) {
        return NextResponse.json(
            { error: 'Issue not found' },
            { status: 404 }
        )
    }

    return NextResponse.json({ data: issue })
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ issueId: string }> }
) {
    // Authenticate request
    const authResult = await validateApiKeyRequest(request)
    if (!authResult.valid) {
        return NextResponse.json(
            { error: authResult.error || 'Unauthorized' },
            { status: 401 }
        )
    }

    const { issueId } = await params
    const contentType = request.headers.get('content-type') || ''
    const supabase = createServiceRoleClient()

    // Check permissions: Admin or issue creator
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authResult.userId)
        .single()

    const isAdmin = profile?.role === 'admin'

    // Get the issue to check ownership
    const { data: existingIssue } = await supabase
        .from('issues')
        .select('created_by')
        .eq('id', issueId)
        .single()

    if (!existingIssue) {
        return NextResponse.json(
            { error: 'Issue not found' },
            { status: 404 }
        )
    }

    const isCreator = existingIssue.created_by === authResult.userId

    if (!isAdmin && !isCreator) {
        return NextResponse.json(
            { error: 'Forbidden - Only admins or issue creators can edit issues' },
            { status: 403 }
        )
    }

    let title, description, status, priority, region, screenshotUrl = null
    let removeScreenshot = false

    // Handle both JSON and multipart/form-data
    if (contentType.includes('multipart/form-data')) {
        const formData = await request.formData()
        title = formData.get('title') as string | null
        description = formData.get('description') as string | null
        status = formData.get('status') as string | null
        priority = formData.get('priority') as string | null
        region = formData.get('region') as string | null
        removeScreenshot = formData.get('remove_screenshot') === 'true'

        // Handle screenshot file upload
        const screenshot = formData.get('screenshot') as File | null
        if (screenshot && screenshot.size > 0) {
            // Validate file size
            if (screenshot.size > MAX_FILE_SIZE) {
                return NextResponse.json(
                    { error: 'Screenshot file size must be less than 50MB' },
                    { status: 400 }
                )
            }

            // Validate file type
            if (!screenshot.type.startsWith('image/')) {
                return NextResponse.json(
                    { error: 'Screenshot must be an image file' },
                    { status: 400 }
                )
            }

            try {
                // Upload to Vercel Blob
                const blob = await put(`screenshots/${crypto.randomUUID()}-${screenshot.name}`, screenshot, {
                    access: 'public',
                })
                screenshotUrl = blob.url
            } catch (uploadError) {
                console.error('Screenshot upload error:', uploadError)
                return NextResponse.json(
                    { error: 'Failed to upload screenshot' },
                    { status: 500 }
                )
            }
        }
    } else {
        // Handle JSON body
        const body = await request.json()
        title = body.title
        description = body.description
        status = body.status
        priority = body.priority
        region = body.region
        screenshotUrl = body.screenshot_url
        removeScreenshot = body.remove_screenshot === true
    }

    // Validate at least one field is being updated
    if (!title && description === null && description === undefined && !status && !priority && !region && !screenshotUrl && !removeScreenshot) {
        return NextResponse.json(
            { error: 'At least one field must be provided for update' },
            { status: 400 }
        )
    }

    // Validate status and priority if provided
    const validStatuses = ['open', 'in_progress', 'closed']
    const validPriorities = ['low', 'medium', 'high', 'critical']

    if (status && !validStatuses.includes(status)) {
        return NextResponse.json(
            { error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
            { status: 400 }
        )
    }

    if (priority && !validPriorities.includes(priority)) {
        return NextResponse.json(
            { error: `Invalid priority. Must be one of: ${validPriorities.join(', ')}` },
            { status: 400 }
        )
    }

    // Build update object
    const updates: any = { updated_at: new Date().toISOString() }
    if (title) updates.title = title
    if (description !== undefined && description !== null) updates.description = description
    if (status) updates.status = status
    if (priority) updates.priority = priority
    if (region) updates.region = region
    if (screenshotUrl) updates.screenshot_url = screenshotUrl
    if (removeScreenshot) updates.screenshot_url = null

    const { data: issue, error } = await supabase
        .from('issues')
        .update(updates)
        .eq('id', issueId)
        .select()
        .single()

    if (error) {
        return NextResponse.json(
            { error: 'Failed to update issue', message: error.message },
            { status: 400 }
        )
    }

    return NextResponse.json({ data: issue })
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ issueId: string }> }
) {
    // Authenticate request
    const authResult = await validateApiKeyRequest(request)
    if (!authResult.valid) {
        return NextResponse.json(
            { error: authResult.error || 'Unauthorized' },
            { status: 401 }
        )
    }

    const { issueId } = await params
    const supabase = createServiceRoleClient()

    // Check permissions: Admin or issue creator
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authResult.userId)
        .single()

    const isAdmin = profile?.role === 'admin'

    // Get the issue to check ownership
    const { data: issue } = await supabase
        .from('issues')
        .select('created_by')
        .eq('id', issueId)
        .single()

    if (!issue) {
        return NextResponse.json(
            { error: 'Issue not found' },
            { status: 404 }
        )
    }

    const isCreator = issue.created_by === authResult.userId

    if (!isAdmin && !isCreator) {
        return NextResponse.json(
            { error: 'Forbidden - Only admins or issue creators can delete issues' },
            { status: 403 }
        )
    }

    // Delete issue (cascades to comments via DB constraints)
    const { error: deleteError } = await supabase
        .from('issues')
        .delete()
        .eq('id', issueId)

    if (deleteError) {
        return NextResponse.json(
            { error: 'Failed to delete issue', message: deleteError.message },
            { status: 400 }
        )
    }

    return NextResponse.json({
        message: 'Issue deleted successfully',
        data: { id: issueId }
    })
}
