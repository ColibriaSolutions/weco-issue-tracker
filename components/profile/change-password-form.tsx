'use client'

import { useState } from 'react'
import { changePassword } from '@/app/actions/profile-actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'

export function ChangePasswordForm() {
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()

    async function handleSubmit(formData: FormData) {
        setLoading(true)

        const currentPassword = formData.get('currentPassword') as string
        const newPassword = formData.get('newPassword') as string
        const confirmPassword = formData.get('confirmPassword') as string

        if (newPassword !== confirmPassword) {
            toast({
                title: 'Error',
                description: 'New passwords do not match',
                variant: 'destructive',
            })
            setLoading(false)
            return
        }

        const result = await changePassword({
            currentPassword,
            newPassword,
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
                description: 'Password changed successfully',
            })
            // Reset form
            const form = document.querySelector('form') as HTMLFormElement
            form?.reset()
        }
    }

    return (
        <form action={handleSubmit} className="space-y-4">
            <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    required
                    autoComplete="current-password"
                />
            </div>

            <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    required
                    minLength={6}
                    autoComplete="new-password"
                />
                <p className="text-xs text-muted-foreground mt-1">Minimum 6 characters</p>
            </div>

            <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    minLength={6}
                    autoComplete="new-password"
                />
            </div>

            <Button type="submit" disabled={loading}>
                {loading ? 'Changing...' : 'Change Password'}
            </Button>
        </form>
    )
}
