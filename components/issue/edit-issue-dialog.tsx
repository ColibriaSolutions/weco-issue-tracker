'use client'

import { useState, useRef, useEffect } from 'react'
import { updateIssue, deleteScreenshot } from '@/app/actions/issue-actions'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { X, Upload, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { REGIONS } from '@/lib/constants/regions'

interface Issue {
    id: string
    title: string
    description: string | null
    status: string
    priority: string
    component: string
    region: string
    screenshot_url: string | null
}

interface EditIssueDialogProps {
    issue: Issue
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess?: () => void
}

export function EditIssueDialog({ issue, open, onOpenChange, onSuccess }: EditIssueDialogProps) {
    const [loading, setLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [removingScreenshot, setRemovingScreenshot] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const formRef = useRef<HTMLFormElement>(null)
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
                        // Validate file size
                        if (file.size > 50 * 1024 * 1024) {
                            toast({
                                title: 'File too large',
                                description: 'File size must be less than 50MB',
                                variant: 'destructive',
                            })
                            return
                        }

                        setSelectedFile(file)
                        const url = URL.createObjectURL(file)
                        setPreviewUrl(url)
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

    function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        // Validate file size
        if (file.size > 50 * 1024 * 1024) {
            toast({
                title: 'File too large',
                description: 'File size must be less than 50MB',
                variant: 'destructive',
            })
            return
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast({
                title: 'Invalid file type',
                description: 'Only image files are allowed',
                variant: 'destructive',
            })
            return
        }

        setSelectedFile(file)

        // Create preview
        const reader = new FileReader()
        reader.onloadend = () => {
            setPreviewUrl(reader.result as string)
        }
        reader.readAsDataURL(file)
    }

    function removeFile() {
        setSelectedFile(null)
        setPreviewUrl(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    async function handleRemoveScreenshot() {
        setRemovingScreenshot(true)
        const result = await deleteScreenshot(issue.id)
        setRemovingScreenshot(false)

        if (result?.error) {
            toast({
                title: 'Error',
                description: result.error,
                variant: 'destructive',
            })
        } else {
            toast({
                title: 'Success',
                description: 'Screenshot removed',
            })
            onSuccess?.()
        }
    }

    async function handleSubmit(formData: FormData) {
        setLoading(true)

        // Append the selected file from state if it exists (handles pasted images)
        if (selectedFile) {
            formData.set('screenshot', selectedFile)
        }

        const result = await updateIssue(issue.id, formData)
        setLoading(false)

        if (result?.error) {
            toast({
                title: 'Error',
                description: result.error,
                variant: 'destructive',
            })
        } else {
            toast({
                title: 'Success',
                description: 'Issue updated successfully',
            })
            onOpenChange(false)
            onSuccess?.()
            formRef.current?.reset()
            removeFile()
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Edit Issue</DialogTitle>
                    <DialogDescription>
                        Update the issue details and screenshot
                    </DialogDescription>
                </DialogHeader>

                <form ref={formRef} action={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            name="title"
                            defaultValue={issue.title}
                            placeholder="Issue title"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            defaultValue={issue.description || ''}
                            placeholder="Describe the issue..."
                            className="min-h-[100px]"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="component">Component</Label>
                        <Input
                            id="component"
                            name="component"
                            defaultValue={issue.component}
                            placeholder="e.g. Sales Order, Purchase, Inventory..."
                            required
                            minLength={2}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="region">Region</Label>
                            <Select name="region" defaultValue={issue.region}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {REGIONS.map((r) => (
                                        <SelectItem key={r.code} value={r.code}>
                                            {r.name} ({r.code})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select name="status" defaultValue={issue.status}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="open">Open</SelectItem>
                                    <SelectItem value="in_progress">In Progress</SelectItem>
                                    <SelectItem value="closed">Closed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="priority">Priority</Label>
                            <Select name="priority" defaultValue={issue.priority}>
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
                    </div>

                    <div className="space-y-2">
                        <Label>Screenshot</Label>

                        {/* Current screenshot */}
                        {issue.screenshot_url && !previewUrl && (
                            <div className="relative border rounded-lg p-2">
                                <Image
                                    src={issue.screenshot_url}
                                    alt="Current screenshot"
                                    width={400}
                                    height={300}
                                    className="rounded"
                                />
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    className="absolute top-4 right-4"
                                    onClick={handleRemoveScreenshot}
                                    disabled={removingScreenshot}
                                >
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Remove
                                </Button>
                            </div>
                        )}

                        {/* New screenshot preview */}
                        {previewUrl && (
                            <div className="relative border rounded-lg p-2">
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="max-w-full rounded"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-2 right-2"
                                    onClick={removeFile}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        )}

                        {/* Upload button */}
                        <div>
                            <input
                                ref={fileInputRef}
                                type="file"
                                name="screenshot"
                                accept="image/*"
                                onChange={handleFileSelect}
                                className="hidden"
                            />
                            <div className="flex items-center gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <Upload className="h-4 w-4 mr-2" />
                                    {issue.screenshot_url || previewUrl ? 'Replace Screenshot' : 'Upload Screenshot'}
                                </Button>
                                <span className="text-xs text-muted-foreground">
                                    or press Ctrl+V to paste
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
