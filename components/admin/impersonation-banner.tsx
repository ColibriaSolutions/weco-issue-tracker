'use client'

import { useEffect, useState } from 'react'
import { getImpersonatedUser, stopImpersonation } from '@/app/actions/impersonation-actions'
import { Button } from '@/components/ui/button'
import { AlertCircle, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface ImpersonatedUser {
    id: string
    full_name: string | null
    avatar_url: string | null
    role: string
}

export function ImpersonationBanner() {
    const [impersonatedUser, setImpersonatedUser] = useState<ImpersonatedUser | null>(null)
    const router = useRouter()

    useEffect(() => {
        async function checkImpersonation() {
            const user = await getImpersonatedUser()
            setImpersonatedUser(user)
        }
        checkImpersonation()
    }, [])

    if (!impersonatedUser) return null

    async function handleStopImpersonation() {
        await stopImpersonation()
        setImpersonatedUser(null)
        window.location.href = '/'
    }

    return (
        <div className="bg-yellow-500/10 border-b border-yellow-500/20">
            <div className="container mx-auto px-4 py-2">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm">
                        <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-500" />
                        <span className="font-medium text-yellow-900 dark:text-yellow-100">
                            Impersonating:
                        </span>
                        <span className="text-yellow-800 dark:text-yellow-200">
                            {impersonatedUser.full_name || 'Unknown User'} ({impersonatedUser.role})
                        </span>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleStopImpersonation}
                        className="h-7 gap-1 border-yellow-600/20 bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-950 dark:hover:bg-yellow-900"
                    >
                        <X className="h-3 w-3" />
                        Stop Impersonation
                    </Button>
                </div>
            </div>
        </div>
    )
}
