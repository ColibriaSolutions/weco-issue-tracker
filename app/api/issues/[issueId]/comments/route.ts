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
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100)
    const offset = (page - 1) * limit

    const supabase = await createServerClient()

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
        email,
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
    const authError = await requireApiKey(request)
    if (authError) return authError

    const { issueId } = await params
    const body = await request.json()
    const supabase = await createServerClient()

    // Validate required fields
    const { content, attachment_url, attachment_type, user_id } = body
    if (!content) {
        return NextResponse.json(
            { error: 'Content is required' },
            { status: 400 }
        )
    }

    if (!user_id) {
        return NextResponse.json(
            { error: 'user_id is required' },
            { status: 400 }
        )
    }

    // Create comment
    const { data: comment, error } = await supabase
        .from('comments')
        .insert({
            issue_id: issueId,
            user_id,
            content,
            attachment_url: attachment_url || null,
            attachment_type: attachment_type || null
        })
        .select(`
      *,
      profiles:user_id (
        id,
        full_name,
        email,
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
