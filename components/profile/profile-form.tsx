'use client'

import { useState } from 'react'
import { updateProfile } from '@/app/actions/profile-actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function ProfileForm({ user }: { user: any }) {
    const [loading, setLoading] = useState(false)
    const [avatarPreview, setAvatarPreview] = useState(user.avatar_url)
    const { toast } = useToast()
    const router = useRouter()

    async function handleSubmit(formData: FormData) {
        setLoading(true)

        const fullName = formData.get('fullName') as string
        const avatarFile = formData.get('avatar') as File

        const result = await updateProfile({
            fullName: fullName || undefined,
            avatarFile: avatarFile?.size > 0 ? avatarFile : undefined,
        })

        setLoading(false)

        if (result.error) {
            toast({
                title: 'Error',
                description: result.error,
                variant: 'destructive',
            })
        } else {
            toast({
                title: 'Success',
                description: 'Profile updated successfully',
            })
            if (result.avatarUrl) {
                setAvatarPreview(result.avatarUrl)
            }
            router.refresh()
        }
    }

    function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <form action={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                    <AvatarImage src={avatarPreview} alt={user.full_name || 'User'} />
                    <AvatarFallback>{user.full_name?.[0] || user.email?.[0] || '?'}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                    <Label htmlFor="avatar">Profile Picture</Label>
                    <Input
                        id="avatar"
                        name="avatar"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Max 5MB. JPG, PNG, or GIF.</p>
                </div>
            </div>

            <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                    id="fullName"
                    name="fullName"
                    defaultValue={user.full_name || ''}
                    placeholder="Enter your full name"
                />
            </div>

            <Button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
            </Button>
        </form>
    )
}
