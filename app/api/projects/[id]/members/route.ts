import { NextRequest, NextResponse } from 'next/server'
import { createServiceRoleClient } from '@/lib/supabase/server'
import { validateApiKeyRequest } from '@/lib/api/auth'

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

    const { id: projectId } = await params
    const body = await request.json()
    const { userId, role = 'member' } = body

    if (!userId) {
        return NextResponse.json(
            { error: 'userId is required' },
            { status: 400 }
        )
    }

    if (!['member', 'owner'].includes(role)) {
        return NextResponse.json(
            { error: 'Invalid role. Must be "member" or "owner"' },
            { status: 400 }
        )
    }

    const supabase = createServiceRoleClient()

    // Check permissions: Admin or Project Owner
    // 1. Check if admin
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authResult.userId)
        .single()

    const isAdmin = profile?.role === 'admin'

    // 2. Check if project owner
    let isOwner = false
    if (!isAdmin) {
        const { data: project } = await supabase
            .from('projects')
            .select('owner_id')
            .eq('id', projectId)
            .single()

        isOwner = project?.owner_id === authResult.userId
    }

    if (!isAdmin && !isOwner) {
        return NextResponse.json(
            { error: 'Forbidden - Only Admins or Project Owners can add members' },
            { status: 403 }
        )
    }

    // Add member
    const { data, error } = await supabase
        .from('project_members')
        .insert({
            project_id: projectId,
            user_id: userId,
            role
        })
        .select()
        .single()

    if (error) {
        if (error.code === '23505') { // Unique violation
            return NextResponse.json(
                { error: 'User is already a member of this project' },
                { status: 409 }
            )
        }
        return NextResponse.json(
            { error: 'Failed to add member', message: error.message },
            { status: 400 }
        )
    }

    return NextResponse.json({ data }, { status: 201 })
}
