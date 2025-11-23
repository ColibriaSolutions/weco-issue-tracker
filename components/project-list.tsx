import { createServerClient } from '@/lib/supabase/server'
import { ProjectListClient } from './project-list-client'

interface Project {
  id: string
  name: string
  description: string | null
  created_at: string
}

export async function ProjectList() {
  const supabase = await createServerClient()

  // Get current user and role
  const { data: { user } } = await supabase.auth.getUser()
  let isAdmin = false
  let projects = []

  if (!user) {
    return <div className="text-muted-foreground">Please log in to view projects</div>
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  isAdmin = profile?.role === 'admin'

  // Admins see all projects, others see only assigned projects
  if (isAdmin) {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('[v0] Error fetching projects:', error)
      return <div className="text-destructive">Error loading projects</div>
    }
    projects = data || []
  } else {
    // Fetch projects where user is a member
    const { data, error } = await supabase
      .from('project_members')
      .select(`
        projects (
          id,
          name,
          description,
          created_at,
          owner_id
        )
      `)
      .eq('user_id', user.id)

    if (error) {
      console.error('[v0] Error fetching projects:', error)
      return <div className="text-destructive">Error loading projects</div>
    }

    // Extract projects from the nested structure
    projects = data?.map((item: any) => item.projects).filter(Boolean) || []
  }

  return <ProjectListClient projects={projects} isAdmin={isAdmin} currentUserId={user.id} />
}
