import { createServerClient as createClient } from '@supabase/ssr'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { Database } from '@/types/supabase'

const IMPERSONATE_COOKIE = 'impersonate_user_id'

export async function createServerClient() {
  const cookieStore = await cookies()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables. Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.')
  }

  const client = createClient<Database>(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )

  // Check for impersonation
  const impersonateUserId = cookieStore.get(IMPERSONATE_COOKIE)?.value

  if (impersonateUserId) {
    // Verify the current user is an admin
    const { data: { user: currentUser } } = await client.auth.getUser()

    if (currentUser) {
      const { data: currentProfile } = await client
        .from('profiles')
        .select('role')
        .eq('id', currentUser.id)
        .single()

      if (currentProfile?.role === 'admin') {
        // Get the impersonated user's auth data using service role
        const serviceClient = createServiceRoleClient()
        const { data: { user: impersonatedAuthUser }, error } = await serviceClient.auth.admin.getUserById(impersonateUserId)

        if (!error && impersonatedAuthUser) {
          // Override the getUser method to return the impersonated user
          const originalGetUser = client.auth.getUser.bind(client.auth)
          client.auth.getUser = async () => {
            return {
              data: { user: impersonatedAuthUser },
              error: null
            }
          }
        }
      }
    }
  }

  return client
}

// Service role client that bypasses RLS - use only for server-side operations
export function createServiceRoleClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error('Missing Supabase environment variables. Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.')
  }

  return createServiceClient<Database>(
    supabaseUrl,
    supabaseServiceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}
