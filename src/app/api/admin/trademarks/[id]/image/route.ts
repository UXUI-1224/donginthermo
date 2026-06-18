import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { url } = await req.json()
  if (!url) return NextResponse.json({ error: 'No URL provided' }, { status: 400 })

  // Remove old image from storage if exists
  const { data: tm } = await supabaseAdmin
    .from('trademarks')
    .select('img_url')
    .eq('id', id)
    .single()

  if (tm?.img_url) {
    try {
      const oldUrl = new URL(tm.img_url.split('?')[0])
      const parts = oldUrl.pathname.split('/trademark-images/')
      if (parts[1]) {
        await supabaseAdmin.storage.from('trademark-images').remove([parts[1]])
      }
    } catch { /* ignore */ }
  }

  const freshUrl = `${url}?t=${Date.now()}`

  const { error: dbError } = await supabaseAdmin
    .from('trademarks')
    .update({ img_url: freshUrl })
    .eq('id', id)

  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 })

  return NextResponse.json({ img_url: freshUrl })
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const { data: tm } = await supabaseAdmin
    .from('trademarks')
    .select('img_url')
    .eq('id', id)
    .single()

  if (tm?.img_url) {
    try {
      const url = new URL(tm.img_url.split('?')[0])
      const parts = url.pathname.split('/trademark-images/')
      if (parts[1]) {
        await supabaseAdmin.storage.from('trademark-images').remove([parts[1]])
      }
    } catch { /* ignore */ }
  }

  const { error } = await supabaseAdmin
    .from('trademarks')
    .update({ img_url: null })
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
