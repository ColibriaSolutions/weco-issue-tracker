'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { updateIssueStatus } from '@/app/actions/issue-actions'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import Image from 'next/image'

interface Issue {
  id: string
  title: string
  description: string
  status: 'open' | 'in_progress' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'critical'
  screenshot_url: string | null
  created_at: string
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
  const [status, setStatus] = useState(issue.status)
  const [updating, setUpdating] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-2xl">{issue.title}</DialogTitle>
              <DialogDescription className="mt-2">
                Created {new Date(issue.created_at).toLocaleString()}
              </DialogDescription>
            </div>
            <Badge className={`${priorityColors[issue.priority]} text-white`}>
              {issue.priority}
            </Badge>
          </div>
        </DialogHeader>

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
        </div>
      </DialogContent>
    </Dialog>
  )
}
