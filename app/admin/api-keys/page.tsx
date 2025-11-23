import { createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CreateApiKeyDialog } from '@/components/admin/create-api-key-dialog'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getApiKeys } from '@/app/actions/api-key-actions'

export default async function ApiKeysPage() {
    const supabase = await createServerClient()

    // Check if user is admin
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
        redirect('/')
    }

    // Fetch API keys
    const result = await getApiKeys()
    const apiKeys = result?.data || []

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Link href="/admin">
                                <Button variant="ghost" size="sm">
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back to Admin
                                </Button>
                            </Link>
                        </div>
                        <h1 className="text-3xl font-bold">API Keys</h1>
                        <p className="text-muted-foreground">
                            Manage API keys for programmatic access
                        </p>
                    </div>
                    <CreateApiKeyDialog />
                </div>

                {apiKeys.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <p className="text-muted-foreground mb-4">No API keys yet</p>
                            <p className="text-sm text-muted-foreground">
                                Create your first API key to get started
                            </p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4">
                        {apiKeys.map((key: any) => (
                            <Card key={key.id}>
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <CardTitle className="flex items-center gap-2">
                                                {key.name}
                                                {!key.is_active && (
                                                    <Badge variant="destructive">Revoked</Badge>
                                                )}
                                            </CardTitle>
                                            <CardDescription className="font-mono text-xs mt-1">
                                                {key.key_prefix}••••••••••••••••••••
                                            </CardDescription>
                                        </div>
                                        <div className="flex gap-2">
                                            {key.is_active && (
                                                <form action={async () => {
                                                    'use server'
                                                    const { revokeApiKey } = await import('@/app/actions/api-key-actions')
                                                    await revokeApiKey(key.id)
                                                }}>
                                                    <Button variant="outline" size="sm" type="submit">
                                                        Revoke
                                                    </Button>
                                                </form>
                                            )}
                                            <form action={async () => {
                                                'use server'
                                                const { deleteApiKey } = await import('@/app/actions/api-key-actions')
                                                await deleteApiKey(key.id)
                                            }}>
                                                <Button variant="destructive" size="sm" type="submit">
                                                    Delete
                                                </Button>
                                            </form>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                        <div>
                                            <p className="text-muted-foreground">Created</p>
                                            <p className="font-medium">
                                                {new Date(key.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Last Used</p>
                                            <p className="font-medium">
                                                {key.last_used_at
                                                    ? new Date(key.last_used_at).toLocaleDateString()
                                                    : 'Never'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Requests</p>
                                            <p className="font-medium">
                                                {key.request_count.toLocaleString()} / {key.rate_limit.toLocaleString()}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Created By</p>
                                            <p className="font-medium">
                                                {key.profiles?.full_name || 'Unknown'}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
