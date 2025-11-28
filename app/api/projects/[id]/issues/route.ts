import { NextRequest, NextResponse } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabase/server'
import { validateApiKeyRequest } from '@/lib/api/auth'
import { put } from '@vercel/blob'

const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    // Authenticate request
    const authResult = await validateApiKeyRequest(request)
    if (!authResult.valid) {
        return NextResponse.json(
            { error: authResult.error || 'Unauthorized' },
            { status: 401 }
        )
    }

    const { id } = await params
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100)
    const offset = (page - 1) * limit
    const searchQuery = searchParams.get('search')?.trim() || null

    const supabase = createServiceRoleClient()

    // Build base query
    let countQuery = supabase
        .from('issues')
        .select('*', { count: 'exact', head: true })
        .eq('project_id', id)

    let issuesQuery = supabase
        .from('issues')
        .select(`
            *,
            creator:created_by (
                full_name,
                department,
                region
            )
        `)
        .eq('project_id', id)

    // Apply search filter if provided (minimum 2 characters)
    if (searchQuery && searchQuery.length >= 2) {
        const searchPattern = `%${searchQuery}%`
        
        // First, find user IDs that match the creator name
        const { data: matchingProfiles } = await supabase
            .from('profiles')
            .select('id')
            .ilike('full_name', searchPattern)
        
        const matchingUserIds = matchingProfiles?.map(p => p.id) || []
        
        // Build OR condition: title matches OR created_by is in matching user IDs
        if (matchingUserIds.length > 0) {
            // Use .or() with proper PostgREST syntax
            // Format: "field.operator.value,field2.operator.value2"
            // For .in(), use parentheses: field.in.(value1,value2)
            const orCondition = `title.ilike.${searchPattern},created_by.in.(${matchingUserIds.join(',')})`
            countQuery = countQuery.or(orCondition)
            issuesQuery = issuesQuery.or(orCondition)
        } else {
            // Only search by title if no matching creators found
            countQuery = countQuery.ilike('title', searchPattern)
            issuesQuery = issuesQuery.ilike('title', searchPattern)
        }
    }

    // Get total count
    const { count } = await countQuery

    // Get paginated issues
    const { data: issues, error } = await issuesQuery
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
    const authResult = await validateApiKeyRequest(request)
    if (!authResult.valid) {
        return NextResponse.json(
            { error: authResult.error || 'Unauthorized' },
            { status: 401 }
        )
    }

    const { id } = await params
    const contentType = request.headers.get('content-type') || ''

    let title, description, status, priority, screenshotUrl = null
    let component = null
    let region = null
    let requestedUserId = null

    // Handle both JSON and multipart/form-data
    if (contentType.includes('multipart/form-data')) {
        const formData = await request.formData()
        title = formData.get('title') as string
        description = formData.get('description') as string | null
        status = formData.get('status') as string | null
        priority = formData.get('priority') as string | null
        component = formData.get('component') as string | null
        region = formData.get('region') as string | null
        requestedUserId = formData.get('created_by') as string | null

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
        component = body.component || null
        region = body.region || null
        screenshotUrl = body.screenshot_url || null
        requestedUserId = body.created_by || null
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

    const supabase = createServiceRoleClient()

    // Check permissions
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authResult.userId)
        .single()

    const isAdmin = profile?.role === 'admin'

    // If not admin, check project membership
    if (!isAdmin) {
        const { data: member } = await supabase
            .from('project_members')
            .select('role')
            .eq('project_id', id)
            .eq('user_id', authResult.userId)
            .single()

        if (!member) {
            return NextResponse.json(
                { error: 'Forbidden - You are not a member of this project' },
                { status: 403 }
            )
        }
    }

    // Determine created_by user
    let createdBy = authResult.userId

    // If admin, allow impersonation
    if (isAdmin && requestedUserId) {
        createdBy = requestedUserId
    }

    // Create issue
    const { data: issue, error } = await supabase
        .from('issues')
        .insert({
            project_id: id,
            title,
            description: description || null,
            status: status || 'open',
            priority: priority || 'medium',
            component: component || null,
            region: region || null,
            screenshot_url: screenshotUrl,
            created_by: createdBy // Explicitly set created_by
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
