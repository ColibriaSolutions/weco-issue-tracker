import { requireApiKey } from '@/lib/api/auth'
import { createServerClient } from '@/lib/supabase/server'
import { NextRequest } from 'next/server'

/**
 * GET /api/projects
 * List all projects (with pagination)
 */
export async function GET(request: NextRequest) {
    // Validate API key
    const authError = await requireApiKey(request)
    if (authError) return authError

    try {
        const supabase = await createServerClient()

        // Get pagination params
        const searchParams = request.nextUrl.searchParams
        const page = parseInt(searchParams.get('page') || '1')
        const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100)
        const offset = (page - 1) * limit

        // Fetch projects
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
    const authError = await requireApiKey(request)
    if (authError) return authError

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

        // Get authenticated user from API key
        const { data: { user } } = await supabase.auth.getUser()

        // Create project
        const { data, error } = await supabase
            .from('projects')
            .insert({
                name,
                description: description || null,
                owner_id: user?.id
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
