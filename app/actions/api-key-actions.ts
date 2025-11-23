'use server'

import { createServerClient } from '@/lib/supabase/server'
import { generateApiKey } from '@/lib/api-keys'
import { revalidatePath } from 'next/cache'

/**
 * Create a new API key (admin only)
 */
export async function createApiKey(name: string, rateLimit?: number) {
    try {
        const supabase = await createServerClient()

        // Check if user is admin
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        if (authError || !user) {
            return { error: 'You must be logged in' }
        }

        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()

        if (profile?.role !== 'admin') {
            return { error: 'Only administrators can create API keys' }
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
                created_by: user.id,
                rate_limit: rateLimit || 10000,
            })
            .select()
            .single()

        if (error) {
            console.error('[API] Error creating API key:', error)
            return { error: error.message }
        }

        revalidatePath('/admin/api-keys')

        // Return the full key (only time it's shown)
        return { data: { ...data, key } }
    } catch (error) {
        console.error('[API] Error creating API key:', error)
        return { error: 'Failed to create API key' }
    }
}

/**
 * Get all API keys (admin only)
 */
export async function getApiKeys() {
    try {
        const supabase = await createServerClient()

        // Check if user is admin
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        if (authError || !user) {
            return { error: 'You must be logged in' }
        }

        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()

        if (profile?.role !== 'admin') {
            return { error: 'Only administrators can view API keys' }
        }

        // Fetch all API keys with creator info
        const { data, error } = await supabase
            .from('api_keys')
            .select(`
        *,
        profiles (
          id,
          full_name
        )
      `)
            .order('created_at', { ascending: false })

        if (error) {
            console.error('[API] Error fetching API keys:', error)
            return { error: error.message }
        }

        return { data }
    } catch (error) {
        console.error('[API] Error fetching API keys:', error)
        return { error: 'Failed to fetch API keys' }
    }
}

/**
 * Revoke an API key (admin only)
 */
export async function revokeApiKey(id: string) {
    try {
        const supabase = await createServerClient()

        // Check if user is admin
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        if (authError || !user) {
            return { error: 'You must be logged in' }
        }

        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()

        if (profile?.role !== 'admin') {
            return { error: 'Only administrators can revoke API keys' }
        }

        // Set is_active to false
        const { error } = await supabase
            .from('api_keys')
            .update({ is_active: false })
            .eq('id', id)

        if (error) {
            console.error('[API] Error revoking API key:', error)
            return { error: error.message }
        }

        revalidatePath('/admin/api-keys')
        return { success: true }
    } catch (error) {
        console.error('[API] Error revoking API key:', error)
        return { error: 'Failed to revoke API key' }
    }
}

/**
 * Delete an API key permanently (admin only)
 */
export async function deleteApiKey(id: string) {
    try {
        const supabase = await createServerClient()

        // Check if user is admin
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        if (authError || !user) {
            return { error: 'You must be logged in' }
        }

        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()

        if (profile?.role !== 'admin') {
            return { error: 'Only administrators can delete API keys' }
        }

        // Delete the key
        const { error } = await supabase
            .from('api_keys')
            .delete()
            .eq('id', id)

        if (error) {
            console.error('[API] Error deleting API key:', error)
            return { error: error.message }
        }

        revalidatePath('/admin/api-keys')
        return { success: true }
    } catch (error) {
        console.error('[API] Error deleting API key:', error)
        return { error: 'Failed to delete API key' }
    }
}

/**
 * Get API key statistics
 */
export async function getApiKeyStats(id: string) {
    try {
        const supabase = await createServerClient()

        const { data, error } = await supabase
            .from('api_keys')
            .select('request_count, rate_limit, last_used_at')
            .eq('id', id)
            .single()

        if (error) {
            console.error('[API] Error fetching API key stats:', error)
            return { error: error.message }
        }

        return { data }
    } catch (error) {
        console.error('[API] Error fetching API key stats:', error)
        return { error: 'Failed to fetch API key stats' }
    }
}
