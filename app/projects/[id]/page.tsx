import { Suspense } from 'react'
import { createServerClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { IssueList } from '@/components/issue-list'
import { IssueSearch } from '@/components/issue-search'
import { CreateIssueDialog } from '@/components/create-issue-dialog'
import { ManageMembersDialog } from '@/components/project/manage-members-dialog'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default async function ProjectPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>
  searchParams: Promise<{ search?: string }>
}) {
  const { id } = await params
  const { search } = await searchParams
  const searchQuery = search?.trim() || null
  const supabase = await createServerClient()

  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !project) {
    notFound()
  }

  // Check if current user can manage members (owner or admin)
  const { data: { user } } = await supabase.auth.getUser()
  let canManageMembers = false

  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    const isAdmin = profile?.role === 'admin'
    const isOwner = project.owner_id === user.id

    canManageMembers = isAdmin || isOwner
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">{project.name}</h1>
              <p className="text-sm text-muted-foreground mt-1">
                {project.description}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Projects
                </Button>
              </Link>
              {canManageMembers && (
                <ManageMembersDialog
                  projectId={project.id}
                  projectName={project.name}
                />
              )}
              <CreateIssueDialog projectId={id} />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <IssueSearch projectId={id} />
        </div>
        <Suspense fallback={<div>Loading issues...</div>}>
          <IssueList projectId={id} searchQuery={searchQuery} />
        </Suspense>
      </main>
    </div>
  )
}
