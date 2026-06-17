import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

  // Remove old image if exists
  const { data: tm } = await supabaseAdmin
    .from('trademarks')
    .select('img_url')
    .eq('id', id)
    .single()

  if (tm?.img_url) {
    try {
      const url = new URL(tm.img_url)
      const parts = url.pathname.split('/trademark-images/')
      if (parts[1]) {
        await supabaseAdmin.storage.from('trademark-images').remove([parts[1]])
      }
    } catch { /* ignore */ }
  }

  const ext = file.name.split('.').pop()
  const path = `${id}.${ext}`
  const buffer = new Uint8Array(await file.arrayBuffer())

  const { error: uploadError } = await supabaseAdmin.storage
    .from('trademark-images')
    .upload(path, buffer, { contentType: file.type, upsert: true })

  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 })

  const { data: urlData } = supabaseAdmin.storage.from('trademark-images').getPublicUrl(path)
  const freshUrl = `${urlData.publicUrl}?t=${Date.now()}`

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
      const url = new URL(tm.img_url)
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
