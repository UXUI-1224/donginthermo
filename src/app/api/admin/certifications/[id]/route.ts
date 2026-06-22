import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { name, category } = await req.json()
  const { error } = await supabaseAdmin
    .from('certifications')
    .update({ name, category })
    .eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  revalidatePath('/technology/cert')
  return NextResponse.json({ success: true })
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  // Delete image from storage if exists
  const { data: cert } = await supabaseAdmin
    .from('certifications')
    .select('img_url')
    .eq('id', id)
    .single()

  if (cert?.img_url) {
    const url = new URL(cert.img_url)
    const pathParts = url.pathname.split('/cert-images/')
    if (pathParts[1]) {
      await supabaseAdmin.storage.from('cert-images').remove([pathParts[1]])
    }
  }

  const { error } = await supabaseAdmin.from('certifications').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  revalidatePath('/technology/cert')
  return NextResponse.json({ success: true })
}
