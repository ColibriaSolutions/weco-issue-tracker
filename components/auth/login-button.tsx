'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function LoginButton() {
    const pathname = usePathname()

    if (pathname === '/login') {
        return null
    }

    return (
        <Link href="/login">
            <Button size="sm">Login</Button>
        </Link>
    )
}
