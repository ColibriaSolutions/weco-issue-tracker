'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { UserCheck, UserX, Shield, ShieldOff, Trash2 } from 'lucide-react'
import { CreateUserDialog } from '@/components/admin/create-user-dialog'
import Link from 'next/link'
import {
    getAllUsers,
    bulkActivateUsers,
    bulkDeactivateUsers,
    bulkPromoteToAdmin,
    bulkDemoteToUser,
    bulkDeleteUsers,
    type UserWithProfile,
} from '@/app/actions/user-management-actions'

export default function UserManagementPage() {
    const [users, setUsers] = useState<UserWithProfile[]>([])
    const [currentUserId, setCurrentUserId] = useState<string | null>(null)
    const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set())
    const [loading, setLoading] = useState(true)
    const [actionLoading, setActionLoading] = useState(false)
    const [confirmDialog, setConfirmDialog] = useState<{
        open: boolean
        title: string
        description: string
        action: () => Promise<void>
    } | null>(null)
    const router = useRouter()
    const { toast } = useToast()

    useEffect(() => {
        loadUsers()
    }, [])

    async function loadUsers() {
        setLoading(true)
        const result = await getAllUsers()
        if (result.error) {
            toast({
                title: 'Error',
                description: result.error,
                variant: 'destructive',
            })
        } else if (result.data) {
            setUsers(result.data)
            if (result.currentUserId) {
                setCurrentUserId(result.currentUserId)
            }
        }
        setLoading(false)
    }

    function toggleUser(userId: string) {
        const newSelected = new Set(selectedUsers)
        if (newSelected.has(userId)) {
            newSelected.delete(userId)
        } else {
            newSelected.add(userId)
        }
        setSelectedUsers(newSelected)
    }

    function toggleAll() {
        const selectableUsers = users.filter(u => u.id !== currentUserId)
        if (selectedUsers.size === selectableUsers.length) {
            setSelectedUsers(new Set())
        } else {
            setSelectedUsers(new Set(selectableUsers.map(u => u.id)))
        }
    }

    async function handleBulkAction(
        action: (userIds: string[]) => Promise<{ error?: string }>,
        successMessage: string
    ) {
        setActionLoading(true)
        const result = await action(Array.from(selectedUsers))

        if (result.error) {
            toast({
                title: 'Error',
                description: result.error,
                variant: 'destructive',
            })
        } else {
            toast({
                title: 'Success',
                description: successMessage,
            })
            setSelectedUsers(new Set())
            await loadUsers()
        }

        setActionLoading(false)
        setConfirmDialog(null)
    }

    function confirmAction(title: string, description: string, action: () => Promise<void>) {
        setConfirmDialog({
            open: true,
            title,
            description,
            action,
        })
    }

    const selectedCount = selectedUsers.size
    const selectableUsers = users.filter(u => u.id !== currentUserId)
    const roleColors = {
        admin: 'bg-purple-500',
        support: 'bg-blue-500',
        user: 'bg-gray-500',
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">User Management</h1>
                    <p className="text-muted-foreground">
                        Manage user accounts, roles, and permissions
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" asChild>
                        <Link href="/admin/api-keys">API Keys</Link>
                    </Button>
                    <CreateUserDialog />
                </div>
            </div>

            {/* Bulk Action Toolbar */}
            {selectedCount > 0 && (
                <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
                    <span className="text-sm font-medium">
                        {selectedCount} user{selectedCount > 1 ? 's' : ''} selected
                    </span>
                    <div className="flex gap-2 ml-auto">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                                confirmAction(
                                    'Activate Users',
                                    `Are you sure you want to activate ${selectedCount} user(s)?`,
                                    () => handleBulkAction(bulkActivateUsers, 'Users activated successfully')
                                )
                            }
                            disabled={actionLoading}
                        >
                            <UserCheck className="h-4 w-4 mr-1" />
                            Activate
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                                confirmAction(
                                    'Deactivate Users',
                                    `Are you sure you want to deactivate ${selectedCount} user(s)? They will not be able to log in.`,
                                    () => handleBulkAction(bulkDeactivateUsers, 'Users deactivated successfully')
                                )
                            }
                            disabled={actionLoading}
                        >
                            <UserX className="h-4 w-4 mr-1" />
                            Deactivate
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                                confirmAction(
                                    'Promote to Admin',
                                    `Are you sure you want to promote ${selectedCount} user(s) to admin?`,
                                    () => handleBulkAction(bulkPromoteToAdmin, 'Users promoted to admin successfully')
                                )
                            }
                            disabled={actionLoading}
                        >
                            <Shield className="h-4 w-4 mr-1" />
                            Promote to Admin
                        </Button>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                                confirmAction(
                                    'Demote to User',
                                    `Are you sure you want to demote ${selectedCount} user(s) to regular user?`,
                                    () => handleBulkAction(bulkDemoteToUser, 'Users demoted to user successfully')
                                )
                            }
                            disabled={actionLoading}
                        >
                            <ShieldOff className="h-4 w-4 mr-1" />
                            Demote to User
                        </Button>
                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={() =>
                                confirmAction(
                                    'Delete Users',
                                    `Are you sure you want to PERMANENTLY delete ${selectedCount} user(s)? This action cannot be undone and will remove all their data.`,
                                    () => handleBulkAction(bulkDeleteUsers, 'Users deleted successfully')
                                )
                            }
                            disabled={actionLoading}
                        >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                        </Button>
                    </div>
                </div>
            )}

            {/* Users Table */}
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12">
                                <Checkbox
                                    checked={selectedUsers.size === selectableUsers.length && selectableUsers.length > 0}
                                    onCheckedChange={toggleAll}
                                />
                            </TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Region</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Joined</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-8">
                                    Loading users...
                                </TableCell>
                            </TableRow>
                        ) : users.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={8} className="text-center py-8">
                                    No users found
                                </TableCell>
                            </TableRow>
                        ) : (
                            users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedUsers.has(user.id)}
                                            onCheckedChange={() => toggleUser(user.id)}
                                            disabled={user.id === currentUserId}
                                        />
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {user.full_name || 'N/A'}
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Badge className={`${roleColors[user.role]} text-white`}>
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{user.department || 'N/A'}</TableCell>
                                    <TableCell>{user.region || 'N/A'}</TableCell>
                                    <TableCell>
                                        <Badge variant={user.is_active ? 'default' : 'secondary'}>
                                            {user.is_active ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {new Date(user.created_at).toLocaleDateString()}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Confirmation Dialog */}
            {confirmDialog && (
                <AlertDialog open={confirmDialog.open} onOpenChange={() => setConfirmDialog(null)}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>{confirmDialog.title}</AlertDialogTitle>
                            <AlertDialogDescription>
                                {confirmDialog.description}
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={confirmDialog.action}>
                                Confirm
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </div>
    )
}
