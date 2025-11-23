import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { requireApiKey } from '@/lib/api/auth'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ issueId: string }> }
) {
    // Authenticate request
    const authError = await requireApiKey(request)
    if (authError) return authError

    const { issueId } = await params
    const supabase = await createServerClient()

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
    const authError = await requireApiKey(request)
    if (authError) return authError

    const { issueId } = await params
    const body = await request.json()
    const supabase = await createServerClient()

    // Validate input
    const { title, description, status, priority, screenshot_url } = body

    if (!title && !description && !status && !priority && screenshot_url === undefined) {
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
    if (description !== undefined) updates.description = description
    if (status) updates.status = status
    if (priority) updates.priority = priority
    if (screenshot_url !== undefined) updates.screenshot_url = screenshot_url

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
    const authError = await requireApiKey(request)
    if (authError) return authError

    const { issueId } = await params
    const supabase = await createServerClient()

    // Check if issue exists
    const { data: issue } = await supabase
        .from('issues')
        .select('id')
        .eq('id', issueId)
        .single()

    if (!issue) {
        return NextResponse.json(
            { error: 'Issue not found' },
            { status: 404 }
        )
    }

    // Delete issue (cascades to comments via DB constraints)
    const { error } = await supabase
        .from('issues')
        .delete()
        .eq('id', issueId)

    if (error) {
        return NextResponse.json(
            { error: 'Failed to delete issue', message: error.message },
            { status: 400 }
        )
    }

    return NextResponse.json({
        message: 'Issue deleted successfully',
        data: { id: issueId }
    })
}
