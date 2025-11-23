'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { formatDistanceToNow } from 'date-fns'
import { deleteComment } from '@/app/actions/comment-actions'
import { Button } from '@/components/ui/button'
import { Trash2, Download, X } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'

interface Comment {
    id: string
    content: string
    created_at: string
    user_id: string
    attachment_url: string | null
    attachment_type: 'image' | 'video' | null
    profiles: {
        full_name: string | null
        avatar_url: string | null
    } | null
}

export function CommentList({ issueId, refreshTrigger = 0 }: { issueId: string; refreshTrigger?: number }) {
    const [comments, setComments] = useState<Comment[]>([])
    const [loading, setLoading] = useState(true)
    const [currentUserId, setCurrentUserId] = useState<string | null>(null)
    const [lightboxImage, setLightboxImage] = useState<string | null>(null)
    const supabase = createClient()
    const { toast } = useToast()

    useEffect(() => {
        async function fetchComments() {
            const { data: { user } } = await supabase.auth.getUser()
            setCurrentUserId(user?.id || null)

            const { data, error } = await supabase
                .from('comments')
                .select(`
          *,
          profiles (
            full_name,
            avatar_url
          )
        `)
                .eq('issue_id', issueId)
                .order('created_at', { ascending: true })

            if (error) {
                console.error('Error fetching comments:', error)
            } else {
                setComments(data as any)
            }
            setLoading(false)
        }

        fetchComments()

        // Realtime subscription
        const channel = supabase
            .channel('comments')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'comments',
                    filter: `issue_id=eq.${issueId}`,
                },
                () => {
                    fetchComments()
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [issueId, supabase, refreshTrigger])

    async function handleDelete(commentId: string) {
        const result = await deleteComment(commentId)
        if (result?.error) {
            toast({
                title: 'Error',
                description: result.error,
                variant: 'destructive',
            })
        } else {
            // Manually refresh the comments list
            setComments(prev => prev.filter(c => c.id !== commentId))
            toast({
                title: 'Success',
                description: 'Comment deleted',
            })
        }
    }

    if (loading) {
        return <div className="text-sm text-muted-foreground">Loading comments...</div>
    }

    if (comments.length === 0) {
        return (
            <div className="text-sm text-muted-foreground py-4 text-center">
                No comments yet. Be the first to share your thoughts!
            </div>
        )
    }

    return (
        <>
            <ScrollArea className="h-[400px] pr-4">
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />

                    <div className="space-y-6">
                        {comments.map((comment, index) => (
                            <div key={comment.id} className="relative flex gap-4 group">
                                {/* Timeline dot */}
                                <div className="relative z-10">
                                    <Avatar className="h-8 w-8 border-2 border-background">
                                        <AvatarImage src={comment.profiles?.avatar_url || ''} />
                                        <AvatarFallback className="text-xs">
                                            {comment.profiles?.full_name?.[0]?.toUpperCase() || '?'}
                                        </AvatarFallback>
                                    </Avatar>
                                </div>

                                {/* Comment content */}
                                <div className="flex-1 space-y-2 pb-2">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <span className="text-sm font-semibold">
                                                {comment.profiles?.full_name || 'Unknown User'}
                                            </span>
                                            <span className="text-xs text-muted-foreground ml-2">
                                                {formatDistanceToNow(new Date(comment.created_at), {
                                                    addSuffix: true,
                                                })}
                                            </span>
                                        </div>
                                        {currentUserId === comment.user_id && (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={() => handleDelete(comment.id)}
                                            >
                                                <Trash2 className="h-3 w-3 text-muted-foreground hover:text-destructive" />
                                            </Button>
                                        )}
                                    </div>

                                    {comment.content && (
                                        <p className="text-sm text-foreground/90 whitespace-pre-wrap">
                                            {comment.content}
                                        </p>
                                    )}

                                    {/* Attachment rendering */}
                                    {comment.attachment_url && comment.attachment_type === 'image' && (
                                        <div className="mt-2">
                                            <img
                                                src={comment.attachment_url}
                                                alt="Attachment"
                                                className="max-w-sm rounded-lg border cursor-pointer hover:opacity-90 transition-opacity"
                                                onClick={() => setLightboxImage(comment.attachment_url)}
                                            />
                                            <a
                                                href={comment.attachment_url}
                                                download
                                                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground mt-1"
                                            >
                                                <Download className="h-3 w-3" />
                                                Download
                                            </a>
                                        </div>
                                    )}

                                    {comment.attachment_url && comment.attachment_type === 'video' && (
                                        <div className="mt-2 space-y-1">
                                            <video
                                                src={comment.attachment_url}
                                                controls
                                                className="max-w-sm rounded-lg border"
                                            />
                                            <a
                                                href={comment.attachment_url}
                                                download
                                                className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                                            >
                                                <Download className="h-3 w-3" />
                                                Download
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </ScrollArea>

            {/* Image Lightbox */}
            <Dialog open={!!lightboxImage} onOpenChange={() => setLightboxImage(null)}>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>Image Attachment</DialogTitle>
                    </DialogHeader>
                    {lightboxImage && (
                        <img
                            src={lightboxImage}
                            alt="Full size"
                            className="w-full h-auto rounded-lg"
                        />
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}
