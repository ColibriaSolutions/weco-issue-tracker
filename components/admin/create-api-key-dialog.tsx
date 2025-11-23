'use client'

import { useState } from 'react'
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
import { Plus, Copy, Check, AlertTriangle, Eye, EyeOff } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { createApiKey } from '@/app/actions/api-key-actions'

export function CreateApiKeyDialog() {
    const [open, setOpen] = useState(false)
    const [name, setName] = useState('')
    const [rateLimit, setRateLimit] = useState('10000')
    const [creating, setCreating] = useState(false)
    const [newKey, setNewKey] = useState<string | null>(null)
    const [copied, setCopied] = useState(false)
    const [showKey, setShowKey] = useState(false)
    const { toast } = useToast()

    async function handleCreate() {
        if (!name.trim()) {
            toast({
                title: 'Error',
                description: 'Please enter a name for the API key',
                variant: 'destructive',
            })
            return
        }

        setCreating(true)
        const result = await createApiKey(name, parseInt(rateLimit))
        setCreating(false)

        if (result?.error) {
            toast({
                title: 'Error',
                description: result.error,
                variant: 'destructive',
            })
        } else if (result?.data) {
            setNewKey(result.data.key)
            toast({
                title: 'Success',
                description: 'API key created successfully',
            })
        }
    }

    function handleCopy() {
        if (newKey) {
            navigator.clipboard.writeText(newKey)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
            toast({
                title: 'Copied!',
                description: 'API key copied to clipboard',
            })
        }
    }

    function handleClose() {
        setOpen(false)
        setName('')
        setRateLimit('10000')
        setNewKey(null)
        setCopied(false)
        setShowKey(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    New API Key
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                {!newKey ? (
                    <>
                        <DialogHeader>
                            <DialogTitle>Create API Key</DialogTitle>
                            <DialogDescription>
                                Create a new API key for programmatic access to the issue tracker
                            </DialogDescription>
                        </DialogHeader>

                        <div className="grid gap-4 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    placeholder="e.g., Production API, Mobile App"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="rateLimit">Rate Limit (requests/month)</Label>
                                <Input
                                    id="rateLimit"
                                    type="number"
                                    value={rateLimit}
                                    onChange={(e) => setRateLimit(e.target.value)}
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button variant="outline" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button onClick={handleCreate} disabled={creating}>
                                {creating ? 'Creating...' : 'Create Key'}
                            </Button>
                        </DialogFooter>
                    </>
                ) : (
                    <>
                        <DialogHeader>
                            <DialogTitle>API Key Created!</DialogTitle>
                            <DialogDescription>
                                Copy this key now. You won't be able to see it again.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4 py-4">
                            <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-lg">
                                <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-amber-800 dark:text-amber-200">
                                    <strong>Important:</strong> Save this key in a secure location. For security reasons, we cannot show it again.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label>Your API Key</Label>
                                <div className="flex gap-2">
                                    <div className="relative flex-1">
                                        <Input
                                            value={newKey || ''}
                                            readOnly
                                            type={showKey ? 'text' : 'password'}
                                            className="font-mono text-sm pr-10"
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="absolute right-0 top-0 h-full hover:bg-transparent"
                                            onClick={() => setShowKey(!showKey)}
                                        >
                                            {showKey ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </Button>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="icon"
                                        onClick={handleCopy}
                                    >
                                        {copied ? (
                                            <Check className="h-4 w-4 text-green-600" />
                                        ) : (
                                            <Copy className="h-4 w-4" />
                                        )}
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <DialogFooter>
                            <Button onClick={handleClose}>
                                Done
                            </Button>
                        </DialogFooter>
                    </>
                )}
            </DialogContent>
        </Dialog>
    )
}
