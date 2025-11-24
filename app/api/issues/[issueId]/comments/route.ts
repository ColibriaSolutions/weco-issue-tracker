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
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100)
    const offset = (page - 1) * limit

    const supabase = createServiceRoleClient()

    // Get total count
    const { count } = await supabase
        .from('comments')
        .select('*', { count: 'exact', head: true })
        .eq('issue_id', issueId)

    // Get paginated comments with user info
    const { data: comments, error } = await supabase
        .from('comments')
        .select(`
      *,
      profiles:user_id (
        id,
        full_name,
        avatar_url
      )
    `)
        .eq('issue_id', issueId)
        .order('created_at', { ascending: true })
        .range(offset, offset + limit - 1)

    if (error) {
        return NextResponse.json(
            { error: 'Failed to fetch comments', message: error.message },
            { status: 400 }
        )
    }

    return NextResponse.json({
        data: comments,
        pagination: {
            page,
            limit,
            total: count || 0,
            totalPages: Math.ceil((count || 0) / limit)
        }
    })
}

export async function POST(
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

    let content, userId, attachmentUrl = null, attachmentType = null

    // Handle both JSON and multipart/form-data
    if (contentType.includes('multipart/form-data')) {
        const formData = await request.formData()
        content = formData.get('content') as string
        userId = formData.get('user_id') as string

        // Handle attachment file upload
        const attachment = formData.get('attachment') as File | null
        if (attachment && attachment.size > 0) {
            // Validate file size
            if (attachment.size > MAX_FILE_SIZE) {
                return NextResponse.json(
                    { error: 'Attachment file size must be less than 50MB' },
                    { status: 400 }
                )
            }

            // Validate file type
            const isImage = attachment.type.startsWith('image/')
            const isVideo = attachment.type.startsWith('video/')

            if (!isImage && !isVideo) {
                return NextResponse.json(
                    { error: 'Attachment must be an image or video file' },
                    { status: 400 }
                )
            }

            try {
                // Upload to Vercel Blob
                const blob = await put(`comments/${crypto.randomUUID()}-${attachment.name}`, attachment, {
                    access: 'public',
                })
                attachmentUrl = blob.url
                attachmentType = isImage ? 'image' : 'video'
            } catch (uploadError) {
                console.error('Attachment upload error:', uploadError)
                return NextResponse.json(
                    { error: 'Failed to upload attachment' },
                    { status: 500 }
                )
            }
        }
    } else {
        // Handle JSON body (backward compatibility)
        const body = await request.json()
        content = body.content
        userId = body.user_id
        attachmentUrl = body.attachment_url || null
        attachmentType = body.attachment_type || null
    }

    // Validate required fields
    if (!content) {
        return NextResponse.json(
            { error: 'Content is required' },
            { status: 400 }
        )
    }

    if (!userId) {
        return NextResponse.json(
            { error: 'user_id is required' },
            { status: 400 }
        )
    }

    const supabase = createServiceRoleClient()

    // Validate permissions
    // 1. Check if admin
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authResult.userId)
        .single()

    const isAdmin = profile?.role === 'admin'

    // 2. If not admin, check if user is member of the project
    if (!isAdmin) {
        // Get project_id from issue
        const { data: issue } = await supabase
            .from('issues')
            .select('project_id')
            .eq('id', issueId)
            .single()

        if (!issue) {
            return NextResponse.json(
                { error: 'Issue not found' },
                { status: 404 }
            )
        }

        const { data: member } = await supabase
            .from('project_members')
            .select('role')
            .eq('project_id', issue.project_id)
            .eq('user_id', authResult.userId)
            .single()

        if (!member) {
            return NextResponse.json(
                { error: 'Forbidden - You are not a member of this project' },
                { status: 403 }
            )
        }
    }

    // 3. If not admin, ensure user_id matches authenticated user
    if (!isAdmin && userId !== authResult.userId) {
        return NextResponse.json(
            { error: 'Forbidden - You can only create comments for yourself' },
            { status: 403 }
        )
    }

    // Create comment
    const { data: comment, error } = await supabase
        .from('comments')
        .insert({
            issue_id: issueId,
            user_id: userId,
            content,
            attachment_url: attachmentUrl,
            attachment_type: attachmentType
        })
        .select(`
      *,
      profiles:user_id (
        id,
        full_name,
        avatar_url
      )
    `)
        .single()

    if (error) {
        return NextResponse.json(
            { error: 'Failed to create comment', message: error.message },
            { status: 400 }
        )
    }

    return NextResponse.json({ data: comment }, { status: 201 })
}
