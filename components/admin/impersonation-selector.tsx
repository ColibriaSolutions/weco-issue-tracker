'use client'

import { useEffect, useState } from 'react'
import { getAllUsers, startImpersonation } from '@/app/actions/impersonation-actions'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { UserCog } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

interface User {
    id: string
    full_name: string | null
    avatar_url: string | null
    role: string
    is_active: boolean
}

export function ImpersonationSelector() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const { toast } = useToast()

    useEffect(() => {
        async function fetchUsers() {
            const result = await getAllUsers()
            if (result.error) {
                console.error('Failed to fetch users:', result.error)
            } else if (result.data) {
                setUsers(result.data)
            }
            setLoading(false)
        }
        fetchUsers()
    }, [])

    async function handleImpersonate(userId: string) {
        if (!userId) return

        const result = await startImpersonation(userId)
        if (result.error) {
            toast({
                title: 'Error',
                description: result.error,
                variant: 'destructive',
            })
        } else {
            toast({
                title: 'Impersonation Started',
                description: 'You are now viewing the app as the selected user',
            })
            router.refresh()
        }
    }

    if (loading || users.length === 0) return null

    return (
        <div className="flex items-center gap-2">
            <UserCog className="h-4 w-4 text-muted-foreground" />
            <Select onValueChange={handleImpersonate}>
                <SelectTrigger className="w-[200px] h-9">
                    <SelectValue placeholder="Support mode..." />
                </SelectTrigger>
                <SelectContent>
                    {users.map((user) => (
                        <SelectItem key={user.id} value={user.id}>
                            <div className="flex items-center gap-2">
                                <span>{user.full_name || 'Unknown'}</span>
                                <span className="text-xs text-muted-foreground">
                                    ({user.role})
                                </span>
                            </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
