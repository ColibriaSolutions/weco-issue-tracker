import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { requireApiKey } from '@/lib/api/auth'
import { put } from '@vercel/blob'

const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    // Authenticate request
    const authError = await requireApiKey(request)
    if (authError) return authError

    const { id } = await params
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100)
    const offset = (page - 1) * limit

    const supabase = await createServerClient()

    // Get total count
    const { count } = await supabase
        .from('issues')
        .select('*', { count: 'exact', head: true })
        .eq('project_id', id)

    // Get paginated issues
    const { data: issues, error } = await supabase
        .from('issues')
        .select('*')
        .eq('project_id', id)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

    if (error) {
        return NextResponse.json(
            { error: 'Failed to fetch issues', message: error.message },
            { status: 400 }
        )
    }

    return NextResponse.json({
        data: issues,
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
    { params }: { params: Promise<{ id: string }> }
) {
    // Authenticate request
    const authError = await requireApiKey(request)
    if (authError) return authError

    const { id } = await params
    const contentType = request.headers.get('content-type') || ''

    let title, description, status, priority, screenshotUrl = null

    // Handle both JSON and multipart/form-data
    if (contentType.includes('multipart/form-data')) {
        const formData = await request.formData()
        title = formData.get('title') as string
        description = formData.get('description') as string | null
        status = formData.get('status') as string | null
        priority = formData.get('priority') as string | null

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
        // Handle JSON body (backward compatibility)
        const body = await request.json()
        title = body.title
        description = body.description
        status = body.status
        priority = body.priority
        screenshotUrl = body.screenshot_url || null
    }

    // Validate required fields
    if (!title) {
        return NextResponse.json(
            { error: 'Title is required' },
            { status: 400 }
        )
    }

    // Validate status and priority
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

    const supabase = await createServerClient()

    // Create issue
    const { data: issue, error } = await supabase
        .from('issues')
        .insert({
            project_id: id,
            title,
            description: description || null,
            status: status || 'open',
            priority: priority || 'medium',
            screenshot_url: screenshotUrl
        })
        .select()
        .single()

    if (error) {
        return NextResponse.json(
            { error: 'Failed to create issue', message: error.message },
            { status: 400 }
        )
    }

    return NextResponse.json({ data: issue }, { status: 201 })
}
