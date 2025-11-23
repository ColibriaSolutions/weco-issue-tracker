import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { requireApiKey } from '@/lib/api/auth'

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ commentId: string }> }
) {
    // Authenticate request
    const authError = await requireApiKey(request)
    if (authError) return authError

    const { commentId } = await params
    const supabase = await createServerClient()

    const { data: comment, error } = await supabase
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
        .eq('id', commentId)
        .single()

    if (error || !comment) {
        return NextResponse.json(
            { error: 'Comment not found' },
            { status: 404 }
        )
    }

    return NextResponse.json({ data: comment })
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ commentId: string }> }
) {
    // Authenticate request
    const authError = await requireApiKey(request)
    if (authError) return authError

    const { commentId } = await params
    const supabase = await createServerClient()

    // Check if comment exists
    const { data: comment } = await supabase
        .from('comments')
        .select('id')
        .eq('id', commentId)
        .single()

    if (!comment) {
        return NextResponse.json(
            { error: 'Comment not found' },
            { status: 404 }
        )
    }

    // Delete comment
    const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', commentId)

    if (error) {
        return NextResponse.json(
            { error: 'Failed to delete comment', message: error.message },
            { status: 400 }
        )
    }

    return NextResponse.json({
        message: 'Comment deleted successfully',
        data: { id: commentId }
    })
}
