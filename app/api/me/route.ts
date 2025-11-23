import { validateApiKeyRequest } from '@/lib/api/auth'
import { createServiceRoleClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/me
 * Get current authenticated user
 */
export async function GET(request: NextRequest) {
    // Validate API key and get user ID
    const validation = await validateApiKeyRequest(request)
    if (!validation.valid) {
        return NextResponse.json(
            { error: validation.error || 'Unauthorized' },
            { status: 401 }
        )
    }

    try {
        const supabase = createServiceRoleClient()

        // Get user details using service role (since we have the ID from the key)
        // If userId is missing from key (shouldn't happen for valid keys), return error
        if (!validation.userId) {
            return NextResponse.json(
                { error: 'API key not associated with a user' },
                { status: 400 }
            )
        }

        const { data: { user }, error } = await supabase.auth.admin.getUserById(validation.userId)

        if (error || !user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            )
        }

        return NextResponse.json({ data: user })
    } catch (error) {
        console.error('[API] Error fetching current user:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
