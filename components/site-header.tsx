import Link from 'next/link'
import Image from 'next/image'
import { createServerClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { logout } from '@/app/actions/auth-actions'
import { ImpersonationSelector } from '@/components/admin/impersonation-selector'

export async function SiteHeader() {
    const supabase = await createServerClient()
    const {
        data: { user },
    } = await supabase.auth.getUser()

    // Get user profile to check role
    let profile = null
    if (user) {
        const { data } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()
        profile = data
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/70 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="/ColibriaFinalizedLogo.jpg"
                            alt="Colibria Logo"
                            width={32}
                            height={32}
                            className="rounded"
                        />
                        <span className="text-xl font-bold">Colibria</span>
                        <span className="text-xl font-light">Bug Tracker</span>
                    </Link>
                    <nav className="flex items-center gap-4">
                        <Link href="/" className="text-sm font-medium hover:underline">
                            Projects
                        </Link>
                        {user && (
                            <Link href="/profile" className="text-sm font-medium hover:underline">
                                Profile
                            </Link>
                        )}
                        {profile?.role === 'admin' && (
                            <Link href="/admin" className="text-sm font-medium hover:underline">
                                Admin Panel
                            </Link>
                        )}
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4">
                            {profile?.role === 'admin' && <ImpersonationSelector />}
                            <span className="text-sm text-muted-foreground">
                                {user.email}
                            </span>
                            <form action={logout}>
                                <Button variant="ghost" size="sm">
                                    Logout
                                </Button>
                            </form>
                        </div>
                    ) : (
                        <Link href="/login">
                            <Button size="sm">Login</Button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    )
}
