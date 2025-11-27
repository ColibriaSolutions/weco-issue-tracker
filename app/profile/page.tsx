import { getCurrentUser } from '@/app/actions/profile-actions'
import { ProfileForm } from '@/components/profile/profile-form'
import { ChangePasswordForm } from '@/components/profile/change-password-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { redirect } from 'next/navigation'
import { Badge } from '@/components/ui/badge'

// Mark page as dynamic since it uses cookies (via createServerClient)
export const dynamic = 'force-dynamic'

export default async function ProfilePage() {
    const result = await getCurrentUser()

    if (result.error || !result.data) {
        redirect('/login')
    }

    const user = result.data

    return (
        <div className="container max-w-4xl py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Profile</h1>
                <p className="text-muted-foreground">Manage your account settings and preferences</p>
            </div>

            <div className="grid gap-6">
                {/* User Info Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Account Information</CardTitle>
                        <CardDescription>View and update your personal information</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Email</label>
                                <p className="text-sm">{user.email}</p>
                            </div>
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Role</label>
                                <div className="mt-1">
                                    <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                                        {user.role}
                                    </Badge>
                                </div>
                            </div>
                            {user.department && (
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Department</label>
                                    <p className="text-sm">{user.department}</p>
                                </div>
                            )}
                            {user.region && (
                                <div>
                                    <label className="text-sm font-medium text-muted-foreground">Region</label>
                                    <p className="text-sm">{user.region}</p>
                                </div>
                            )}
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Account Status</label>
                                <div className="mt-1">
                                    <Badge variant={user.is_active ? 'default' : 'destructive'}>
                                        {user.is_active ? 'Active' : 'Inactive'}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Edit Profile Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Profile</CardTitle>
                        <CardDescription>Update your name and profile picture</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ProfileForm user={user} />
                    </CardContent>
                </Card>

                {/* Change Password Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Change Password</CardTitle>
                        <CardDescription>Update your account password</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChangePasswordForm />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
