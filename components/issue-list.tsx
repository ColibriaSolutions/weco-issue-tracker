import { createServerClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { IssueDetailsDialog } from '@/components/issue-details-dialog'

interface Issue {
  id: string
  title: string
  description: string
  status: 'open' | 'in_progress' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'critical'
  component: string
  region: string
  project_id: string
  screenshot_url: string | null
  created_at: string
  creator?: {
    full_name: string
    department?: string
    region?: string
  }
}

const statusLabels = {
  open: 'Open',
  in_progress: 'In Progress',
  closed: 'Closed',
}

const priorityColors = {
  low: 'bg-blue-500',
  medium: 'bg-yellow-500',
  high: 'bg-orange-500',
  critical: 'bg-red-500',
}

export async function IssueList({ 
  projectId, 
  searchQuery 
}: { 
  projectId: string
  searchQuery?: string | null
}) {
  const supabase = await createServerClient()

  let query = supabase
    .from('issues')
    .select(`
      *,
      creator:created_by (
        full_name,
        department,
        region
      )
    `)
    .eq('project_id', projectId)

  // Apply search filter if provided (minimum 2 characters)
  if (searchQuery && searchQuery.trim().length >= 2) {
    const searchPattern = `%${searchQuery.trim()}%`
    
    // First, find user IDs that match the creator name
    const { data: matchingProfiles } = await supabase
      .from('profiles')
      .select('id')
      .ilike('full_name', searchPattern)
    
    const matchingUserIds = matchingProfiles?.map(p => p.id) || []
    
    // Build OR condition: title matches OR created_by is in matching user IDs
    if (matchingUserIds.length > 0) {
      // Use .or() with proper PostgREST syntax
      // Format: "field.operator.value,field2.operator.value2"
      // For .in(), use parentheses: field.in.(value1,value2)
      const orCondition = `title.ilike.${searchPattern},created_by.in.(${matchingUserIds.join(',')})`
      query = query.or(orCondition)
    } else {
      // Only search by title if no matching creators found
      query = query.ilike('title', searchPattern)
    }
  }

  const { data: issues, error } = await query.order('created_at', { ascending: false })

  if (error) {
    console.error('[v0] Error fetching issues:', error)
    return <div className="text-destructive">Error loading issues</div>
  }

  const totalCount = issues?.length || 0
  const groupedIssues = {
    open: issues?.filter((i: Issue) => i.status === 'open') || [],
    in_progress: issues?.filter((i: Issue) => i.status === 'in_progress') || [],
    closed: issues?.filter((i: Issue) => i.status === 'closed') || [],
  }

  if (!issues || issues.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          {searchQuery && searchQuery.trim().length >= 2 ? (
            <>
              <p className="text-muted-foreground mb-4">No issues found</p>
              <p className="text-sm text-muted-foreground">
                No issues match your search query &quot;{searchQuery}&quot;
              </p>
            </>
          ) : (
            <>
              <p className="text-muted-foreground mb-4">No issues reported yet</p>
              <p className="text-sm text-muted-foreground">
                Report your first issue to get started
              </p>
            </>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {searchQuery && searchQuery.trim().length >= 2 && totalCount > 0 && (
        <p className="text-sm text-muted-foreground">
          Found {totalCount} {totalCount === 1 ? 'issue' : 'issues'} matching &quot;{searchQuery}&quot;
        </p>
      )}
      <div className="grid gap-6 md:grid-cols-3">
        {Object.entries(groupedIssues).map(([status, statusIssues]) => (
          <div key={status} className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              {statusLabels[status as keyof typeof statusLabels]}
              <Badge variant="secondary">{statusIssues.length}</Badge>
            </h2>
          <div className="space-y-3">
            {statusIssues.map((issue: Issue) => (
              <IssueDetailsDialog key={issue.id} issue={issue}>
                <Card className="hover:border-primary transition-colors cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-base">{issue.title}</CardTitle>
                      <Badge
                        className={`${priorityColors[issue.priority]
                          } text-white`}
                      >
                        {issue.priority}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {issue.description}
                    </p>
                  </CardContent>
                </Card>
              </IssueDetailsDialog>
            ))}
          </div>
        </div>
      ))}
      </div>
    </div>
  )
}
