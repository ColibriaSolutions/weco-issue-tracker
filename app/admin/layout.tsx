import { createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'admin') {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle className="text-destructive">Access Denied</CardTitle>
                        <CardDescription>
                            You do not have permission to view this page.
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>
        )
    }

    return <>{children}</>
}
