import { NextResponse } from 'next/server'
import { deleteApiKey } from '@/app/actions/api-key-actions'
import { requireApiKey } from '@/lib/api/auth'

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    // Ensure admin via API key
    const authResult = await requireApiKey(request)
    if (authResult) return authResult // 401 if not authorized

    const { id } = params
    const result = await deleteApiKey(id)
    if (result.error) {
        return NextResponse.json({ error: result.error }, { status: 400 })
    }
    return NextResponse.json({ success: true })
}
