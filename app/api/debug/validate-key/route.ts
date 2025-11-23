import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { extractApiKey, getKeyPrefix, validateApiKey } from '@/lib/api-keys'

// Diagnostic endpoint to test API key validation
export async function GET(request: NextRequest) {
    const authHeader = request.headers.get('Authorization')
    const apiKey = extractApiKey(authHeader)

    if (!apiKey) {
        return NextResponse.json({
            error: 'No API key provided',
            authHeader,
        }, { status: 400 })
    }

    const prefix = getKeyPrefix(apiKey)
    const supabase = await createServerClient()

    const { data: keyData, error: dbError } = await supabase
        .from('api_keys')
        .select('*')
        .eq('key_prefix', prefix)
        .eq('is_active', true)
        .single()

    if (dbError || !keyData) {
        return NextResponse.json({
            step: 'database_lookup',
            error: dbError?.message || 'Key not found',
            prefix,
            apiKeyLength: apiKey.length,
            apiKeyStart: apiKey.substring(0, 20),
        }, { status: 404 })
    }

    const isValid = validateApiKey(apiKey, keyData.key_hash)

    return NextResponse.json({
        step: 'validation',
        isValid,
        prefix,
        apiKeyLength: apiKey.length,
        hashLength: keyData.key_hash.length,
        hashStart: keyData.key_hash.substring(0, 7),
        keyData: {
            name: keyData.name,
            is_active: keyData.is_active,
            request_count: keyData.request_count,
        }
    })
}
