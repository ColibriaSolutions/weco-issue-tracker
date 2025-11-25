'use client'

import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { updateIssueStatus, deleteIssue } from '@/app/actions/issue-actions'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import Image from 'next/image'
import { CommentList } from '@/components/comments/comment-list'
import { CommentForm } from '@/components/comments/comment-form'
import { EditIssueDialog } from '@/components/issue/edit-issue-dialog'
import { Edit, Trash2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface Issue {
  id: string
  title: string
  description: string
  status: 'open' | 'in_progress' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'critical'
  component: string
  region: string
  screenshot_url: string | null
  created_at: string
  created_by?: string
  project_id?: string
  creator?: {
    full_name: string
    department?: string
    region?: string
  }
}

const priorityColors = {
  low: 'bg-blue-500',
  medium: 'bg-yellow-500',
  high: 'bg-orange-500',
  critical: 'bg-red-500',
}

export function IssueDetailsDialog({
  issue,
  children,
}: {
  issue: Issue
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [status, setStatus] = useState(issue.status)
  const [updating, setUpdating] = useState(false)
  const [refreshComments, setRefreshComments] = useState(0)
  const [canEdit, setCanEdit] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    async function checkPermissions() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        setCanEdit(false)
        return
      }

      // Check if admin
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

      const isAdmin = profile?.role === 'admin'
      const isCreator = issue.created_by === user.id

      setCanEdit(isAdmin || isCreator)
    }

    if (open) {
      checkPermissions()
    }
  }, [open, issue.created_by])

  async function handleStatusChange(newStatus: string) {
    setUpdating(true)
    const result = await updateIssueStatus(issue.id, newStatus)

    if (result.error) {
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive',
      })
    } else {
      setStatus(newStatus as Issue['status'])
      toast({
        title: 'Success',
        description: 'Issue status updated',
      })
      router.refresh()
    }
    setUpdating(false)
  }

  function handleEditSuccess() {
    router.refresh()
    setRefreshComments(prev => prev + 1)
  }

  async function handleDelete() {
    setDeleting(true)
    const result = await deleteIssue(issue.id)

    if (result.error) {
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive',
      })
      setDeleting(false)
    } else {
      toast({
        title: 'Success',
        description: 'Issue deleted successfully',
      })
      // Use full page reload to ensure clean state
      if (issue.project_id) {
        window.location.href = `/projects/${issue.project_id}`
      } else {
        window.location.reload()
      }
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-2xl pr-8">{issue.title}</DialogTitle>
            <DialogDescription className="mt-2">
              Created {new Date(issue.created_at).toLocaleString()}
              {issue.creator && (
                <>
                  {' • By: '}{issue.creator.full_name}
                  {issue.creator.department && ` • ${issue.creator.department}`}
                  {issue.creator.region && ` • ${issue.creator.region}`}
                </>
              )}
            </DialogDescription>
            <div className="flex items-center gap-2 mt-4 flex-wrap">
              <Badge className={`${priorityColors[issue.priority]} text-white`}>
                {issue.priority}
              </Badge>
              <Badge variant="outline">
                {issue.component}
              </Badge>
              <Badge variant="outline">
                {issue.region}
              </Badge>
              {canEdit && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditOpen(true)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setShowDeleteConfirm(true)}
                    disabled={deleting}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </>
              )}
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto pr-2">
            <div className="space-y-6">
              <div>
                <Label className="text-base font-semibold">Description</Label>
                <p className="mt-2 text-muted-foreground whitespace-pre-wrap">
                  {issue.description}
                </p>
              </div>

              {issue.screenshot_url && (
                <div>
                  <Label className="text-base font-semibold">Screenshot</Label>
                  <div className="mt-2 border rounded-lg overflow-hidden">
                    <Image
                      src={issue.screenshot_url || "/placeholder.svg"}
                      alt="Issue screenshot"
                      width={800}
                      height={600}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="status" className="text-base font-semibold">
                  Status
                </Label>
                <Select
                  value={status}
                  onValueChange={handleStatusChange}
                  disabled={updating}
                >
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <Label className="text-base font-semibold">Comments</Label>
                <CommentList issueId={issue.id} refreshTrigger={refreshComments} />
                <CommentForm
                  issueId={issue.id}
                  onCommentAdded={() => setRefreshComments(prev => prev + 1)}
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Issue</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this issue? This action cannot be undone.
              All comments associated with this issue will also be deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col-reverse sm:flex-row gap-2">
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-destructive text-white hover:bg-destructive/90"
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <EditIssueDialog
        issue={issue}
        open={editOpen}
        onOpenChange={setEditOpen}
        onSuccess={handleEditSuccess}
      />
    </>
  )
}
