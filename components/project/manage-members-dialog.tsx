'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Users, X, UserPlus } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import {
    addProjectMember,
    removeProjectMember,
    getProjectMembers,
    getAvailableUsers,
} from '@/app/actions/project-member-actions'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

interface Member {
    id: string
    role: string
    profiles: {
        id: string
        full_name: string | null
        avatar_url: string | null
    } | null
}

interface AvailableUser {
    id: string
    full_name: string | null
    avatar_url: string | null
}

export function ManageMembersDialog({
    projectId,
    projectName
}: {
    projectId: string
    projectName: string
}) {
    const [open, setOpen] = useState(false)
    const [members, setMembers] = useState<Member[]>([])
    const [availableUsers, setAvailableUsers] = useState<AvailableUser[]>([])
    const [selectedUserId, setSelectedUserId] = useState<string>('')
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()

    async function loadData() {
        setLoading(true)

        // Load members
        const membersResult = await getProjectMembers(projectId)
        if (membersResult.data) {
            setMembers(membersResult.data as Member[])
        }

        // Load available users
        const usersResult = await getAvailableUsers(projectId)
        if (usersResult.data) {
            setAvailableUsers(usersResult.data as AvailableUser[])
        }

        setLoading(false)
    }

    useEffect(() => {
        if (open) {
            loadData()
        }
    }, [open, projectId])

    async function handleAddMember() {
        if (!selectedUserId) return

        const result = await addProjectMember(projectId, selectedUserId)

        if (result?.error) {
            toast({
                title: 'Error',
                description: result.error,
                variant: 'destructive',
            })
        } else {
            toast({
                title: 'Success',
                description: 'Member added to project',
            })
            setSelectedUserId('')
            loadData() // Refresh lists
        }
    }

    async function handleRemoveMember(userId: string) {
        const result = await removeProjectMember(projectId, userId)

        if (result?.error) {
            toast({
                title: 'Error',
                description: result.error,
                variant: 'destructive',
            })
        } else {
            toast({
                title: 'Success',
                description: 'Member removed from project',
            })
            loadData() // Refresh lists
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Members
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Manage Project Members</DialogTitle>
                    <DialogDescription>
                        Add or remove members from {projectName}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Current Members */}
                    <div>
                        <h4 className="text-sm font-medium mb-3">
                            Current Members ({members.length})
                        </h4>
                        <div className="space-y-2 max-h-[200px] overflow-y-auto">
                            {loading ? (
                                <p className="text-sm text-muted-foreground">Loading...</p>
                            ) : members.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No members yet</p>
                            ) : (
                                members.map((member) => (
                                    <div
                                        key={member.id}
                                        className="flex items-center justify-between p-2 rounded-lg border bg-card"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={member.profiles?.avatar_url || ''} />
                                                <AvatarFallback>
                                                    {member.profiles?.full_name?.[0]?.toUpperCase() || '?'}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm font-medium">
                                                    {member.profiles?.full_name || 'Unknown'}
                                                </p>
                                                <p className="text-xs text-muted-foreground capitalize">
                                                    {member.role}
                                                </p>
                                            </div>
                                        </div>
                                        {member.role !== 'owner' && (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8"
                                                onClick={() => handleRemoveMember(member.profiles?.id || '')}
                                            >
                                                <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                                            </Button>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Add Member */}
                    <div>
                        <h4 className="text-sm font-medium mb-3">Add Member</h4>
                        <div className="flex gap-2">
                            <Select value={selectedUserId} onValueChange={setSelectedUserId}>
                                <SelectTrigger className="flex-1">
                                    <SelectValue placeholder="Select a user..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {availableUsers.length === 0 ? (
                                        <div className="p-2 text-sm text-muted-foreground">
                                            No available users
                                        </div>
                                    ) : (
                                        availableUsers.map((user) => (
                                            <SelectItem key={user.id} value={user.id}>
                                                <div className="flex items-center gap-2">
                                                    <Avatar className="h-6 w-6">
                                                        <AvatarImage src={user.avatar_url || ''} />
                                                        <AvatarFallback className="text-xs">
                                                            {user.full_name?.[0]?.toUpperCase() || '?'}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <span>{user.full_name || 'Unknown'}</span>
                                                </div>
                                            </SelectItem>
                                        ))
                                    )}
                                </SelectContent>
                            </Select>
                            <Button
                                onClick={handleAddMember}
                                disabled={!selectedUserId}
                                size="icon"
                            >
                                <UserPlus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
