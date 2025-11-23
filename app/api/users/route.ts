import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { requireApiKey } from '@/lib/api/auth'

export async function GET(request: NextRequest) {
    // Authenticate request
    const authError = await requireApiKey(request)
    if (authError) return authError

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100)
    const offset = (page - 1) * limit

    const supabase = await createServerClient()

    // Check if requester is admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
        )
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'admin') {
        return NextResponse.json(
            { error: 'Forbidden - Admin access required' },
            { status: 403 }
        )
    }

    // Get total count
    const { count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })

    // Get paginated users
    const { data: users, error } = await supabase
        .from('profiles')
        .select('id, full_name, role, is_active, avatar_url, created_at')
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

    if (error) {
        return NextResponse.json(
            { error: 'Failed to fetch users', message: error.message },
            { status: 400 }
        )
    }

    // Get emails from auth.users
    const userIds = users.map(u => u.id)
    const { data: authUsers } = await supabase.auth.admin.listUsers()

    const usersWithEmail = users.map(user => {
        const authUser = authUsers?.users.find(au => au.id === user.id)
        return {
            ...user,
            email: authUser?.email || null
        }
    })

    return NextResponse.json({
        data: usersWithEmail,
        pagination: {
            page,
            limit,
            total: count || 0,
            totalPages: Math.ceil((count || 0) / limit)
        }
    })
}

export async function POST(request: NextRequest) {
    // Authenticate request
    const authError = await requireApiKey(request)
    if (authError) return authError

    const body = await request.json()
    const supabase = await createServerClient()

    // Check if requester is admin
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
        )
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'admin') {
        return NextResponse.json(
            { error: 'Forbidden - Admin access required' },
            { status: 403 }
        )
    }

    // Validate required fields
    const { email, password, full_name, role } = body
    if (!email || !password) {
        return NextResponse.json(
            { error: 'Email and password are required' },
            { status: 400 }
        )
    }

    // Validate role
    const validRoles = ['user', 'support', 'admin']
    if (role && !validRoles.includes(role)) {
        return NextResponse.json(
            { error: `Invalid role. Must be one of: ${validRoles.join(', ')}` },
            { status: 400 }
        )
    }

    // Create user
    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
            full_name: full_name || null
        }
    })

    if (createError || !newUser.user) {
        return NextResponse.json(
            { error: 'Failed to create user', message: createError?.message },
            { status: 400 }
        )
    }

    // Update profile with role
    if (role) {
        await supabase
            .from('profiles')
            .update({ role })
            .eq('id', newUser.user.id)
    }

    // Fetch complete user data
    const { data: userProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', newUser.user.id)
        .single()

    return NextResponse.json({
        data: {
            ...userProfile,
            email: newUser.user.email
        }
    }, { status: 201 })
}
