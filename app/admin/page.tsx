import { listUsers, createUser, toggleUserStatus, resetUserPassword } from '@/app/actions/admin-actions'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { CreateUserDialog } from '@/components/admin/create-user-dialog'
import { UserActionsDropdown } from '@/components/admin/user-actions-dropdown'
import { createServerClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminDashboard() {
    const supabase = await createServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Check if user is admin
    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    console.log('Admin Check Debug:', {
        userId: user.id,
        profile,
        profileError,
        role: profile?.role
    })

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

    const { data: users, error } = await listUsers()

    if (error) {
        return <div>Error loading users: {error}</div>
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                    <p className="text-muted-foreground">
                        Manage users, roles, and system access.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" asChild>
                        <a href="/admin/api-keys">API Keys</a>
                    </Button>
                    <CreateUserDialog />
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Users</CardTitle>
                    <CardDescription>
                        A list of all registered users and their roles.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Created At</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users?.map((user: any) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">
                                        {user.full_name || 'N/A'}
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            user.role === 'admin' ? 'destructive' :
                                                user.role === 'support' ? 'default' : 'secondary'
                                        }>
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={user.is_active ? 'outline' : 'destructive'}>
                                            {user.is_active ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {new Date(user.created_at).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <UserActionsDropdown user={user} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
