import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { requireApiKey } from '@/lib/api/auth'
import { generateApiKey } from '@/lib/api-keys'

export async function POST(request: NextRequest) {
    // Authenticate request
    const authError = await requireApiKey(request)
    if (authError) return authError

    const body = await request.json()
    const { userId, name, expiresIn } = body

    if (!userId || !name) {
        return NextResponse.json(
            { error: 'userId and name are required' },
            { status: 400 }
        )
    }

    const supabase = await createServerClient()

    // Get authenticated user (Admin)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return NextResponse.json(
            { error: 'Unauthorized' },
            { status: 401 }
        )
    }

    // Verify Admin role
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

    // Verify target user exists
    const { data: targetUser, error: userError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', userId)
        .single()

    if (userError || !targetUser) {
        return NextResponse.json(
            { error: 'Target user not found' },
            { status: 404 }
        )
    }

    // Generate new API key
    const { key, hash, prefix } = generateApiKey()

    // Insert into database
    const { data, error } = await supabase
        .from('api_keys')
        .insert({
            name,
            key_hash: hash,
            key_prefix: prefix,
            created_by: userId, // Key belongs to the target user
            rate_limit: 10000,
            is_active: true
        })
        .select()
        .single()

    if (error) {
        return NextResponse.json(
            { error: 'Failed to create API key', message: error.message },
            { status: 400 }
        )
    }

    // Return the full key (only time it's shown)
    return NextResponse.json({
        data: {
            ...data,
            key // Include the full key in the response
        }
    }, { status: 201 })
}
