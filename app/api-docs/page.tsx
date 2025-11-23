'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Download, FileJson, FileCode } from 'lucide-react'
import Link from 'next/link'
import './swagger-ui.css'

export default function ApiDocsPage() {
    const [spec, setSpec] = useState<any>(null)

    useEffect(() => {
        // Load OpenAPI spec
        fetch('/api/openapi.json')
            .then(res => res.json())
            .then(data => setSpec(data))
            .catch(err => console.error('Failed to load API spec:', err))
    }, [])

    useEffect(() => {
        if (!spec) return

        // Dynamically load Swagger UI
        const loadSwaggerUI = async () => {
            const SwaggerUI = (await import('swagger-ui-react')).default
            await import('swagger-ui-react/swagger-ui.css')

            const container = document.getElementById('swagger-ui')
            if (container && SwaggerUI) {
                const root = (await import('react-dom/client')).createRoot(container)
                root.render(
                    <SwaggerUI
                        spec={spec}
                        docExpansion="list"
                        defaultModelsExpandDepth={1}
                        defaultModelExpandDepth={1}
                    />
                )
            }
        }

        loadSwaggerUI()
    }, [spec])

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-4xl font-bold">API Documentation</h1>
                            <p className="text-muted-foreground mt-2">
                                Interactive documentation for the WECO Issue Tracker REST API
                            </p>
                        </div>
                        <Link href="/">
                            <Button variant="outline">Back to App</Button>
                        </Link>
                    </div>

                    {/* Download Buttons */}
                    <div className="flex gap-3">
                        <a href="/api/openapi.json" download>
                            <Button variant="outline" size="sm">
                                <FileJson className="h-4 w-4 mr-2" />
                                Download JSON
                            </Button>
                        </a>
                        <a href="/api/openapi.yaml" download>
                            <Button variant="outline" size="sm">
                                <FileCode className="h-4 w-4 mr-2" />
                                Download YAML
                            </Button>
                        </a>
                    </div>
                </div>

                {/* Quick Start Guide */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>Quick Start</CardTitle>
                        <CardDescription>Get started with the API in 3 steps</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h3 className="font-semibold mb-2">1. Get an API Key</h3>
                            <p className="text-sm text-muted-foreground">
                                Navigate to <Link href="/admin/api-keys" className="text-primary hover:underline">/admin/api-keys</Link> and create a new API key.
                                Save it securely - you won't be able to see it again!
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">2. Authenticate Your Requests</h3>
                            <p className="text-sm text-muted-foreground mb-2">
                                Include your API key in the Authorization header:
                            </p>
                            <pre className="bg-muted p-3 rounded-md text-xs overflow-x-auto">
                                <code>Authorization: Bearer weco_live_your_api_key_here</code>
                            </pre>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">3. Make Your First Request</h3>
                            <p className="text-sm text-muted-foreground mb-2">
                                Try fetching all projects:
                            </p>
                            <pre className="bg-muted p-3 rounded-md text-xs overflow-x-auto">
                                <code>{`curl -H "Authorization: Bearer YOUR_API_KEY" \\
  ${typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'}/api/projects`}</code>
                            </pre>
                        </div>
                    </CardContent>
                </Card>

                {/* Swagger UI Container */}
                <Card>
                    <CardContent className="p-0">
                        <div id="swagger-ui" className="swagger-ui-container" />
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
