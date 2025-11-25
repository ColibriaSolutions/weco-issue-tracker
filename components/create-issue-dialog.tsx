'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, Upload, X } from 'lucide-react'
import { createIssue, uploadScreenshot } from '@/app/actions/issue-actions'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

export function CreateIssueDialog({ projectId }: { projectId: string }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const [priority, setPriority] = useState<string>('medium')
  const router = useRouter()
  const { toast } = useToast()

  // Handle paste events for clipboard images
  useEffect(() => {
    if (!open) return

    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items
      if (!items) return

      for (const item of Array.from(items)) {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile()
          if (file) {
            setScreenshot(file)
            toast({
              title: 'Image pasted',
              description: 'Screenshot added from clipboard',
            })
          }
          break
        }
      }
    }

    document.addEventListener('paste', handlePaste)
    return () => document.removeEventListener('paste', handlePaste)
  }, [open, toast])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const title = formData.get('title') as string
    const description = formData.get('description') as string

    try {
      let screenshotUrl = null

      // Upload screenshot if provided
      if (screenshot) {
        const uploadFormData = new FormData()
        uploadFormData.append('file', screenshot)
        const uploadResult = await uploadScreenshot(uploadFormData)

        if (uploadResult.error) {
          throw new Error(uploadResult.error)
        }

        screenshotUrl = uploadResult.url
      }

      const result = await createIssue({
        projectId,
        title,
        description,
        priority,
        screenshotUrl,
      })

      if (result.error) {
        // Handle validation errors (object) or general errors (string)
        const errorMessage = typeof result.error === 'string'
          ? result.error
          : Object.entries(result.error)
            .map(([field, errors]) => `${field}: ${Array.isArray(errors) ? errors.join(', ') : errors}`)
            .join('\n')

        toast({
          title: 'Validation Error',
          description: errorMessage,
          variant: 'destructive',
        })
      } else {
        toast({
          title: 'Success',
          description: 'Issue created successfully',
        })
        setOpen(false)
        setScreenshot(null)
        setPriority('medium')
        router.refresh()
      }
    } catch (error) {
      console.error('[v0] Error creating issue:', error)
      toast({
        title: 'Error',
        description: 'Failed to create issue',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Report Issue
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Report New Issue</DialogTitle>
            <DialogDescription>
              Describe the bug or issue you encountered
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Brief description of the issue"
                required
                minLength={3}
                maxLength={100}
              />
              <p className="text-xs text-muted-foreground">
                3-100 characters
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Detailed description of what happened... (minimum 10 characters)"
                rows={4}
                required
                minLength={10}
              />
              <p className="text-xs text-muted-foreground">
                Minimum 10 characters required
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="screenshot">Screenshot (Optional)</Label>
              {screenshot ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-3 border rounded-md">
                    <span className="text-sm flex-1 truncate">
                      {screenshot.name}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setScreenshot(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  {screenshot.type.startsWith('image/') && (
                    <div className="border rounded-lg overflow-hidden bg-muted/50 p-2">
                      <img
                        src={URL.createObjectURL(screenshot)}
                        alt="Screenshot preview"
                        className="w-full h-auto max-h-64 object-contain rounded-md"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition-colors">
                  <input
                    type="file"
                    id="screenshot"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) setScreenshot(file)
                    }}
                  />
                  <label
                    htmlFor="screenshot"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <div className="text-sm">
                      <span className="text-primary font-medium">Click to upload</span>
                      <span className="text-muted-foreground"> or press Ctrl+V to paste</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG up to 50MB
                    </p>
                  </label>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create Issue'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
