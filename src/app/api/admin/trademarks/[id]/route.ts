import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { name } = await req.json()

  if (!name?.trim()) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  }

  const { error } = await supabaseAdmin
    .from('trademarks')
    .update({ name: name.trim() })
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  revalidatePath('/technology/trademark')
  return NextResponse.json({ success: true })
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  // Remove image from storage if exists
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

  const { error } = await supabaseAdmin.from('trademarks').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  revalidatePath('/technology/trademark')
  return NextResponse.json({ success: true })
}
