'use client'

import { useState, useEffect } from 'react'
import { createUser } from '@/app/actions/admin-actions'
import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'

export function CreateUserDialog() {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [selectedRole, setSelectedRole] = useState('user')
    const [regions, setRegions] = useState<Array<{code: string, name: string}>>([])
    const { toast } = useToast()

    useEffect(() => {
        // Load regions from API
        fetch('/api/regions')
            .then(res => res.json())
            .then(data => setRegions(data.data || []))
            .catch(err => console.error('Failed to load regions:', err))
    }, [])

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        const result = await createUser(formData)
        setLoading(false)

        if (result?.error) {
            toast({
                title: 'Error',
                description: typeof result.error === 'string' ? result.error : 'Validation failed',
                variant: 'destructive',
            })
        } else {
            toast({
                title: 'Success',
                description: 'User created successfully',
            })
            setOpen(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Add User</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create New User</DialogTitle>
                    <DialogDescription>
                        Provision a new user account. They will be forced to reset their password on login.
                    </DialogDescription>
                </DialogHeader>
                <form action={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="fullName" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="fullName"
                                name="fullName"
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="password" className="text-right">
                                Password
                            </Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                className="col-span-3"
                                required
                                minLength={6}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="role" className="text-right">
                                Role
                            </Label>
                            <Select name="role" defaultValue="user" onValueChange={setSelectedRole}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="user">User</SelectItem>
                                    <SelectItem value="support">Support</SelectItem>
                                    <SelectItem value="admin">Admin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {selectedRole !== 'admin' && (
                            <>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="department" className="text-right">
                                        Department <span className="text-destructive">*</span>
                                    </Label>
                                    <Input
                                        id="department"
                                        name="department"
                                        className="col-span-3"
                                        required={selectedRole !== 'admin'}
                                        placeholder="e.g., Engineering, Sales, HR"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="region" className="text-right">
                                        Region <span className="text-destructive">*</span>
                                    </Label>
                                    <Select name="region" required={selectedRole !== 'admin'}>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Select a region" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {regions.map((region) => (
                                                <SelectItem key={region.code} value={region.code}>
                                                    {region.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </>
                        )}
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Creating...' : 'Create User'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
