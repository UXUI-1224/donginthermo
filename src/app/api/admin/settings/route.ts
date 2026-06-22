import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabaseAdmin.from('site_settings').select('key, value')
  if (error) return NextResponse.json({}, { status: 500 })
  const settings: Record<string, string> = {}
  for (const row of data ?? []) settings[row.key] = row.value ?? ''
  return NextResponse.json(settings)
}

export async function PUT(req: Request) {
  const updates: Record<string, string> = await req.json()
  const rows = Object.entries(updates).map(([key, value]) => ({ key, value }))
  const { error } = await supabaseAdmin
    .from('site_settings')
    .upsert(rows, { onConflict: 'key' })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  revalidatePath('/', 'layout')
  return NextResponse.json({ success: true })
}
