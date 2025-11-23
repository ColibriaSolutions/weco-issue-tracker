import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { requireApiKey } from '@/lib/api/auth'

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
    const body = await request.json()
    const supabase = await createServerClient()

    // Validate required fields
    const { title, description, status, priority, screenshot_url } = body
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

    // Create issue
    const { data: issue, error } = await supabase
        .from('issues')
        .insert({
            project_id: id,
            title,
            description: description || null,
            status: status || 'open',
            priority: priority || 'medium',
            screenshot_url: screenshot_url || null
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
