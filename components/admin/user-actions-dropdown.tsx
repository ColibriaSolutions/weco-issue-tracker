'use client'

import { useState } from 'react'
import { toggleUserStatus, resetUserPassword } from '@/app/actions/admin-actions'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { MoreHorizontal } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export function UserActionsDropdown({ user }: { user: any }) {
    const [resetOpen, setResetOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()

    async function handleToggleStatus() {
        const result = await toggleUserStatus(user.id, !user.is_active)
        if (result?.error) {
            toast({
                title: 'Error',
                description: result.error,
                variant: 'destructive',
            })
        } else {
            toast({
                title: 'Success',
                description: `User ${user.is_active ? 'deactivated' : 'activated'} successfully`,
            })
        }
    }

    async function handleResetPassword(formData: FormData) {
        setLoading(true)
        const newPassword = formData.get('newPassword') as string
        const result = await resetUserPassword(user.id, newPassword)
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
                description: 'Password reset successfully',
            })
            setResetOpen(false)
        }
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => navigator.clipboard.writeText(user.id)}>
                        Copy User ID
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setResetOpen(true)}>
                        Reset Password
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={handleToggleStatus}
                        className={user.is_active ? 'text-destructive' : 'text-green-600'}
                    >
                        {user.is_active ? 'Deactivate User' : 'Activate User'}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={resetOpen} onOpenChange={setResetOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Reset Password</DialogTitle>
                        <DialogDescription>
                            Enter a new password for {user.full_name || user.email}. They will be forced to change it on next login.
                        </DialogDescription>
                    </DialogHeader>
                    <form action={handleResetPassword}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="newPassword" className="text-right">
                                    New Password
                                </Label>
                                <Input
                                    id="newPassword"
                                    name="newPassword"
                                    type="password"
                                    className="col-span-3"
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={loading}>
                                {loading ? 'Resetting...' : 'Reset Password'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}
