'use client'

import { useRef, useState } from 'react'
import { addComment } from '@/app/actions/comment-actions'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { Send } from 'lucide-react'

export function CommentForm({ issueId, onCommentAdded }: { issueId: string; onCommentAdded?: () => void }) {
    const [loading, setLoading] = useState(false)
    const formRef = useRef<HTMLFormElement>(null)
    const { toast } = useToast()

    async function handleSubmit(formData: FormData) {
        setLoading(true)
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
            toast({
                title: 'Success',
                description: 'Comment posted',
            })
            onCommentAdded?.()
        }
    }

    return (
        <form ref={formRef} action={handleSubmit} className="flex gap-2">
            <input type="hidden" name="issueId" value={issueId} />
            <Textarea
                name="content"
                placeholder="Write a comment..."
                className="min-h-[40px] max-h-[120px] resize-none"
                required
            />
            <Button type="submit" size="icon" disabled={loading}>
                <Send className="h-4 w-4" />
            </Button>
        </form>
    )
}
