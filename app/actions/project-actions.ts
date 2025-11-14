'use server'

import { createServerClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createProject({
  name,
  description,
}: {
  name: string
  description: string
}) {
  try {
    const supabase = await createServerClient()

    const { data, error } = await supabase
      .from('projects')
      .insert([
        {
          name,
          description,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('[v0] Error creating project:', error)
      return { error: error.message }
    }

    revalidatePath('/')
    return { data }
  } catch (error) {
    console.error('[v0] Error creating project:', error)
    return { error: 'Failed to create project' }
  }
}
