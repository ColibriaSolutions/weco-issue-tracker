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
    const supabase = await createServerClient()

    const { data: project, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !project) {
        return NextResponse.json(
            { error: 'Project not found' },
            { status: 404 }
        )
    }

    return NextResponse.json({ data: project })
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    // Authenticate request
    const authError = await requireApiKey(request)
    if (authError) return authError

    const { id } = await params
    const body = await request.json()
    const supabase = await createServerClient()

    // Validate input
    const { name, description } = body
    if (!name && !description) {
        return NextResponse.json(
            { error: 'At least one field (name or description) is required' },
            { status: 400 }
        )
    }

    // Build update object
    const updates: any = { updated_at: new Date().toISOString() }
    if (name) updates.name = name
    if (description !== undefined) updates.description = description

    const { data: project, error } = await supabase
        .from('projects')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

    if (error) {
        return NextResponse.json(
            { error: 'Failed to update project', message: error.message },
            { status: 400 }
        )
    }

    return NextResponse.json({ data: project })
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    // Authenticate request
    const authError = await requireApiKey(request)
    if (authError) return authError

    const { id } = await params
    const supabase = await createServerClient()

    // Check if project exists
    const { data: project } = await supabase
        .from('projects')
        .select('id')
        .eq('id', id)
        .single()

    if (!project) {
        return NextResponse.json(
            { error: 'Project not found' },
            { status: 404 }
        )
    }

    // Delete project (cascades to issues and comments via DB constraints)
    const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

    if (error) {
        return NextResponse.json(
            { error: 'Failed to delete project', message: error.message },
            { status: 400 }
        )
    }

    return NextResponse.json({
        message: 'Project deleted successfully',
        data: { id }
    })
}
