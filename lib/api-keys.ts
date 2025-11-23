import crypto from 'crypto'
import bcrypt from 'bcryptjs'

/**
 * Generate a new API key with hash and prefix
 * Format: weco_live_<48_random_hex_chars>
 */
export function generateApiKey(): {
    key: string
    hash: string
    prefix: string
} {
    // Generate 24 random bytes = 48 hex characters
    const randomBytes = crypto.randomBytes(24).toString('hex')

    // Full key format: weco_live_abc123...
    const key = `weco_live_${randomBytes}`

    // Hash the key for storage (bcrypt with 10 rounds)
    const hash = bcrypt.hashSync(key, 10)

    // Prefix for display: weco_abc12345 (first 8 chars after weco_)
    const prefix = `weco_${randomBytes.substring(0, 8)}`

    return { key, hash, prefix }
}

/**
 * Validate an API key against its stored hash
 */
export function validateApiKey(key: string, hash: string): boolean {
    try {
        return bcrypt.compareSync(key, hash)
    } catch (error) {
        console.error('Error validating API key:', error)
        return false
    }
}

/**
 * Extract API key from Authorization header
 * Expected format: "Bearer weco_live_..."
 */
export function extractApiKey(authHeader: string | null): string | null {
    if (!authHeader) return null

    const parts = authHeader.split(' ')
    if (parts.length !== 2 || parts[0] !== 'Bearer') return null

    const key = parts[1]
    if (!key.startsWith('weco_live_')) return null

    return key
}

/**
 * Get key prefix from full key for database lookup
 * Example: weco_live_abc123def456... → weco_abc12345
 */
export function getKeyPrefix(key: string): string {
    // Remove "weco_live_" prefix and take first 8 chars
    const withoutPrefix = key.replace('weco_live_', '')
    return `weco_${withoutPrefix.substring(0, 8)}`
}
