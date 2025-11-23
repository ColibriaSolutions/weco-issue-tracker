import { generateOpenAPISpec } from '@/lib/api/openapi-spec'
import { NextResponse } from 'next/server'

export async function GET() {
    const spec = generateOpenAPISpec()

    return NextResponse.json(spec, {
        headers: {
            'Content-Type': 'application/json',
            'Content-Disposition': 'attachment; filename="openapi.json"'
        }
    })
}
