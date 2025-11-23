import { createServerClient } from '@/lib/supabase/server'
import { extractApiKey, getKeyPrefix, validateApiKey } from '@/lib/api-keys'

/**
 * Validate API key from request headers
 * Returns key info if valid, null if invalid
 */
export async function validateApiKeyRequest(request: Request): Promise<{
    valid: boolean
    keyId?: string
    userId?: string
    error?: string
}> {
    try {
        // Extract API key from Authorization header
        const authHeader = request.headers.get('Authorization')
        const apiKey = extractApiKey(authHeader)

        if (!apiKey) {
            return {
                valid: false,
                error: 'Missing or invalid Authorization header. Expected: Bearer weco_live_...'
            }
        }

        // Get key prefix for database lookup
        const prefix = getKeyPrefix(apiKey)

        // Look up key in database
        const supabase = await createServerClient()
        const { data: keyData, error: dbError } = await supabase
            .from('api_keys')
            .select('*')
            .eq('key_prefix', prefix)
            .eq('is_active', true)
            .single()

        if (dbError || !keyData) {
            return {
                valid: false,
                error: 'Invalid API key'
            }
        }

        // Validate key hash
        const isValid = validateApiKey(apiKey, keyData.key_hash)
        if (!isValid) {
            return {
                valid: false,
                error: 'Invalid API key'
            }
        }

        // Check rate limit
        if (keyData.request_count >= keyData.rate_limit) {
            return {
                valid: false,
                error: `Rate limit exceeded. Limit: ${keyData.rate_limit} requests/month`
            }
        }

        // Update usage statistics (fire and forget)
        supabase
            .from('api_keys')
            .update({
                last_used_at: new Date().toISOString(),
                request_count: keyData.request_count + 1
            })
            .eq('id', keyData.id)
            .then(() => { })
            .catch(err => console.error('Error updating API key stats:', err))

        return {
            valid: true,
            keyId: keyData.id,
            userId: keyData.created_by
        }
    } catch (error) {
        console.error('Error validating API key:', error)
        return {
            valid: false,
            error: 'Internal server error'
        }
    }
}

/**
 * Middleware to require valid API key
 * Returns error Response if invalid, null if valid
 */
export async function requireApiKey(request: Request): Promise<Response | null> {
    const result = await validateApiKeyRequest(request)

    if (!result.valid) {
        return Response.json(
            {
                error: result.error || 'Unauthorized',
                message: 'Valid API key required. Get your API key from the admin dashboard.'
            },
            { status: 401 }
        )
    }

    return null
}

/**
 * Check if API key has remaining quota
 */
export async function checkRateLimit(keyId: string): Promise<{
    allowed: boolean
    remaining: number
    limit: number
}> {
    try {
        const supabase = await createServerClient()
        const { data } = await supabase
            .from('api_keys')
            .select('request_count, rate_limit')
            .eq('id', keyId)
            .single()

        if (!data) {
            return { allowed: false, remaining: 0, limit: 0 }
        }

        const remaining = Math.max(0, data.rate_limit - data.request_count)
        const allowed = remaining > 0

        return {
            allowed,
            remaining,
            limit: data.rate_limit
        }
    } catch (error) {
        console.error('Error checking rate limit:', error)
        return { allowed: false, remaining: 0, limit: 0 }
    }
}
