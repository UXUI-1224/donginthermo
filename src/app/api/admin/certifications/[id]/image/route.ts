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

  const ext = file.name.split('.').pop()
  const path = `${id}.${ext}`
  const buffer = new Uint8Array(await file.arrayBuffer())

  const { error: uploadError } = await supabaseAdmin.storage
    .from('cert-images')
    .upload(path, buffer, { contentType: file.type, upsert: true })

  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 })

  const { data: urlData } = supabaseAdmin.storage.from('cert-images').getPublicUrl(path)

  const { error: dbError } = await supabaseAdmin
    .from('certifications')
    .update({ img_url: urlData.publicUrl })
    .eq('id', id)

  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 })

  return NextResponse.json({ img_url: urlData.publicUrl })
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

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

  const { error } = await supabaseAdmin
    .from('certifications')
    .update({ img_url: null })
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
