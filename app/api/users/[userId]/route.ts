import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { requireApiKey } from '@/lib/api/auth'

async function checkAdminAccess(supabase: any) {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { isAdmin: false, error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) }
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'admin') {
        return { isAdmin: false, error: NextResponse.json({ error: 'Forbidden - Admin access required' }, { status: 403 }) }
    }

    return { isAdmin: true, error: null }
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ userId: string }> }
) {
    // Authenticate request
    const authError = await requireApiKey(request)
    if (authError) return authError

    const { userId } = await params
    const supabase = await createServerClient()

    // Check admin access
    const { isAdmin, error } = await checkAdminAccess(supabase)
    if (!isAdmin) return error

    // Get user profile
    const { data: userProfile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

    if (profileError || !userProfile) {
        return NextResponse.json(
            { error: 'User not found' },
            { status: 404 }
        )
    }

    // Get email from auth
    const { data: authUser } = await supabase.auth.admin.getUserById(userId)

    return NextResponse.json({
        data: {
            ...userProfile,
            email: authUser?.user?.email || null
        }
    })
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ userId: string }> }
) {
    // Authenticate request
    const authError = await requireApiKey(request)
    if (authError) return authError

    const { userId } = await params
    const body = await request.json()
    const supabase = await createServerClient()

    // Check admin access
    const { isAdmin, error } = await checkAdminAccess(supabase)
    if (!isAdmin) return error

    // Validate input
    const { full_name, role, is_active, avatar_url } = body

    if (!full_name && !role && is_active === undefined && avatar_url === undefined) {
        return NextResponse.json(
            { error: 'At least one field must be provided for update' },
            { status: 400 }
        )
    }

    // Validate role if provided
    const validRoles = ['user', 'support', 'admin']
    if (role && !validRoles.includes(role)) {
        return NextResponse.json(
            { error: `Invalid role. Must be one of: ${validRoles.join(', ')}` },
            { status: 400 }
        )
    }

    // Build update object
    const updates: any = {}
    if (full_name) updates.full_name = full_name
    if (role) updates.role = role
    if (is_active !== undefined) updates.is_active = is_active
    if (avatar_url !== undefined) updates.avatar_url = avatar_url

    const { data: userProfile, error: updateError } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId)
        .select()
        .single()

    if (updateError) {
        return NextResponse.json(
            { error: 'Failed to update user', message: updateError.message },
            { status: 400 }
        )
    }

    // Get email from auth
    const { data: authUser } = await supabase.auth.admin.getUserById(userId)

    return NextResponse.json({
        data: {
            ...userProfile,
            email: authUser?.user?.email || null
        }
    })
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ userId: string }> }
) {
    // Authenticate request
    const authError = await requireApiKey(request)
    if (authError) return authError

    const { userId } = await params
    const supabase = await createServerClient()

    // Check admin access
    const { isAdmin, error } = await checkAdminAccess(supabase)
    if (!isAdmin) return error

    // Check if user exists
    const { data: userProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', userId)
        .single()

    if (!userProfile) {
        return NextResponse.json(
            { error: 'User not found' },
            { status: 404 }
        )
    }

    // Delete user from auth (cascades to profile)
    const { error: deleteError } = await supabase.auth.admin.deleteUser(userId)

    if (deleteError) {
        return NextResponse.json(
            { error: 'Failed to delete user', message: deleteError.message },
            { status: 400 }
        )
    }

    return NextResponse.json({
        message: 'User deleted successfully',
        data: { id: userId }
    })
}
