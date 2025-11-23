import { NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET() {
    try {
        const supabase = await createServerClient()

        const { data: regions, error } = await supabase
            .from('regions')
            .select('code, name')
            .order('name')

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            )
        }

        return NextResponse.json({ data: regions })
    } catch (error) {
        console.error('Error fetching regions:', error)
        return NextResponse.json(
            { error: 'Failed to fetch regions' },
            { status: 500 }
        )
    }
}
