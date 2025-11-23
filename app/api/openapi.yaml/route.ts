import { generateOpenAPISpec } from '@/lib/api/openapi-spec'
import { NextResponse } from 'next/server'
import yaml from 'js-yaml'

export async function GET() {
    const spec = generateOpenAPISpec()
    const yamlSpec = yaml.dump(spec)

    return new NextResponse(yamlSpec, {
        headers: {
            'Content-Type': 'application/x-yaml',
            'Content-Disposition': 'attachment; filename="openapi.yaml"'
        }
    })
}
