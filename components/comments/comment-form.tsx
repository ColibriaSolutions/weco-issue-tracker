'use client'

import { useRef, useState, useEffect } from 'react'
import { addComment } from '@/app/actions/comment-actions'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { Send, Paperclip, X, Image, Video } from 'lucide-react'

const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB

export function CommentForm({ issueId, onCommentAdded }: { issueId: string; onCommentAdded?: () => void }) {
    const [loading, setLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const formRef = useRef<HTMLFormElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { toast } = useToast()

    // Handle paste events for clipboard images
    useEffect(() => {
        const handlePaste = (e: ClipboardEvent) => {
            const items = e.clipboardData?.items
            if (!items) return

            for (const item of Array.from(items)) {
                if (item.type.startsWith('image/') || item.type.startsWith('video/')) {
                    const file = item.getAsFile()
                    if (file) {
                        // Validate file size
                        if (file.size > MAX_FILE_SIZE) {
                            toast({
                                title: 'File too large',
                                description: 'File size must be less than 50MB',
                                variant: 'destructive',
                            })
                            return
                        }

                        setSelectedFile(file)

                        // Create preview for images
                        if (item.type.startsWith('image/')) {
                            const reader = new FileReader()
                            reader.onloadend = () => {
                                setPreviewUrl(reader.result as string)
                            }
                            reader.readAsDataURL(file)
                        } else {
                            setPreviewUrl(null)
                        }

                        toast({
                            title: 'File pasted',
                            description: 'Attachment added from clipboard',
                        })
                    }
                    break
                }
            }
        }

        document.addEventListener('paste', handlePaste)
        return () => document.removeEventListener('paste', handlePaste)
    }, [toast])

    function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return

        // Validate file size
        if (file.size > MAX_FILE_SIZE) {
            toast({
                title: 'File too large',
                description: 'File size must be less than 50MB',
                variant: 'destructive',
            })
            return
        }

        // Validate file type
        const isImage = file.type.startsWith('image/')
        const isVideo = file.type.startsWith('video/')

        if (!isImage && !isVideo) {
            toast({
                title: 'Invalid file type',
                description: 'Only image and video files are allowed',
                variant: 'destructive',
            })
            return
        }

        setSelectedFile(file)

        // Create preview for images
        if (isImage) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string)
            }
            reader.readAsDataURL(file)
        } else {
            setPreviewUrl(null)
        }
    }

    function removeFile() {
        setSelectedFile(null)
        setPreviewUrl(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    async function handleSubmit(formData: FormData) {
        setLoading(true)

        // Append the selected file from state if it exists (handles pasted images)
        if (selectedFile) {
            formData.set('attachment', selectedFile)
        }

        const result = await addComment(formData)
        setLoading(false)

        if (result?.error) {
            toast({
                title: 'Error',
                description: typeof result.error === 'string' ? result.error : 'Failed to post comment',
                variant: 'destructive',
            })
        } else {
            formRef.current?.reset()
            removeFile()
            toast({
                title: 'Success',
                description: 'Comment posted',
            })
            onCommentAdded?.()
        }
    }

    const formatFileSize = (bytes: number) => {
        if (bytes < 1024) return bytes + ' B'
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
    }

    return (
        <form ref={formRef} action={handleSubmit} className="space-y-3">
            <input type="hidden" name="issueId" value={issueId} />

            <div className="flex gap-2">
                <Textarea
                    name="content"
                    placeholder="Write a comment... (paste image to attach)"
                    className="min-h-[80px] max-h-[200px] resize-none"
                    required={!selectedFile}
                />
                <div className="flex flex-col gap-2">
                    <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        title="Attach file"
                    >
                        <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button type="submit" size="icon" disabled={loading}>
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                name="attachment"
                accept="image/*,video/*"
                onChange={handleFileSelect}
                className="hidden"
            />

            {selectedFile && (
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg border">
                    {previewUrl ? (
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-12 h-12 object-cover rounded"
                        />
                    ) : (
                        <div className="w-12 h-12 bg-secondary rounded flex items-center justify-center">
                            <Video className="h-6 w-6 text-muted-foreground" />
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{selectedFile.name}</p>
                        <p className="text-xs text-muted-foreground">
                            {formatFileSize(selectedFile.size)} • {selectedFile.type.startsWith('image/') ? 'Image' : 'Video'}
                        </p>
                    </div>
                    <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={removeFile}
                        className="shrink-0"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </form>
    )
}
