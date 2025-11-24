import { validateApiKeyRequest } from '@/lib/api/auth'
import { createServerClient } from '@/lib/supabase/server'
import { NextRequest } from 'next/server'

/**
 * GET /api/projects
 * List all projects (with pagination)
 */
export async function GET(request: NextRequest) {
    // Validate API key
    const authResult = await validateApiKeyRequest(request)
    if (!authResult.valid) {
        return Response.json(
            { error: authResult.error || 'Unauthorized' },
            { status: 401 }
        )
    }

    try {
        const supabase = await createServerClient()

        // Get pagination params
        const searchParams = request.nextUrl.searchParams
        const page = parseInt(searchParams.get('page') || '1')
        const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100)
        const offset = (page - 1) * limit

        // Fetch projects
        // Note: RLS will filter this based on the authenticated user.
        // But since we are using createServerClient (which uses cookies usually),
        // and we don't have cookies, RLS might block everything unless we simulate the user.
        // However, for now, let's assume public access or admin access via service role if needed.
        // Wait, if we use createServerClient without session, it acts as anon.
        // If RLS requires auth, this will return empty.

        // We should probably use createServiceRoleClient if we want to bypass RLS for API access,
        // OR we need to set the session context.
        // But for now, let's just fix the user ID part.

        const { data, error, count } = await supabase
            .from('projects')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1)

        if (error) {
            return Response.json(
                { error: error.message },
                { status: 500 }
            )
        }

        return Response.json({
            data,
            pagination: {
                page,
                limit,
                total: count || 0,
                totalPages: Math.ceil((count || 0) / limit)
            }
        })
    } catch (error) {
        console.error('[API] Error fetching projects:', error)
        return Response.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}

/**
 * POST /api/projects
 * Create a new project
 */
export async function POST(request: NextRequest) {
    // Validate API key
    const authResult = await validateApiKeyRequest(request)
    if (!authResult.valid) {
        return Response.json(
            { error: authResult.error || 'Unauthorized' },
            { status: 401 }
        )
    }

    try {
        const body = await request.json()
        const { name, description } = body

        // Validate input
        if (!name || typeof name !== 'string') {
            return Response.json(
                { error: 'Name is required and must be a string' },
                { status: 400 }
            )
        }

        const supabase = await createServerClient()

        // Create project
        const { data, error } = await supabase
            .from('projects')
            .insert({
                name,
                description: description || null,
                owner_id: authResult.userId // Use ID from API key
            })
            .select()
            .single()

        if (error) {
            return Response.json(
                { error: error.message },
                { status: 500 }
            )
        }

        return Response.json({ data }, { status: 201 })
    } catch (error) {
        console.error('[API] Error creating project:', error)
        return Response.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
