'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { formatDistanceToNow } from 'date-fns'
import { deleteComment } from '@/app/actions/comment-actions'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface Comment {
    id: string
    content: string
    created_at: string
    user_id: string
    profiles: {
        full_name: string | null
        avatar_url: string | null
    } | null
}

export function CommentList({ issueId, refreshTrigger = 0 }: { issueId: string; refreshTrigger?: number }) {
    const [comments, setComments] = useState<Comment[]>([])
    const [loading, setLoading] = useState(true)
    const [currentUserId, setCurrentUserId] = useState<string | null>(null)
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
        <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
                {comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3 group">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={comment.profiles?.avatar_url || ''} />
                            <AvatarFallback>
                                {comment.profiles?.full_name?.[0]?.toUpperCase() || '?'}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium">
                                        {comment.profiles?.full_name || 'Unknown User'}
                                    </span>
                                    <span className="text-xs text-muted-foreground">
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
                            <p className="text-sm text-foreground/90">{comment.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </ScrollArea>
    )
}
