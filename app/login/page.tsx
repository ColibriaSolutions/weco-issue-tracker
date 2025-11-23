'use client'

import { useState, useEffect } from 'react'
import { login, signup } from '@/app/actions/auth-actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true)
    const [loading, setLoading] = useState(false)
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
        const action = isLogin ? login : signup

        const result = await action(formData)

        if (result?.error) {
            toast({
                title: 'Error',
                description: result.error,
                variant: 'destructive',
            })
            setLoading(false)
        }
        // If success, the action redirects, so no need to set loading false
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/50 p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>{isLogin ? 'Welcome Back' : 'Create Account'}</CardTitle>
                    <CardDescription>
                        {isLogin
                            ? 'Enter your credentials to access your account'
                            : 'Sign up to start tracking issues'}
                    </CardDescription>
                </CardHeader>
                <form action={handleSubmit}>
                    <CardContent className="space-y-4">
                        {!isLogin && (
                            <>
                                <div className="space-y-2">
                                    <Label htmlFor="fullName">Full Name</Label>
                                    <Input
                                        id="fullName"
                                        name="fullName"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="department">Department</Label>
                                    <Input
                                        id="department"
                                        name="department"
                                        placeholder="e.g., Engineering, Sales, HR"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="region">Region</Label>
                                    <Select name="region" required>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select your region" />
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
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                minLength={6}
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-4">
                        <Button className="w-full" disabled={loading}>
                            {loading
                                ? 'Loading...'
                                : isLogin
                                    ? 'Sign In'
                                    : 'Create Account'}
                        </Button>
                        <Button
                            type="button"
                            variant="link"
                            className="text-sm text-muted-foreground"
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {isLogin
                                ? "Don't have an account? Sign up"
                                : 'Already have an account? Sign in'}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
