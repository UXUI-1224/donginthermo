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
  const { data: cert } = await supabaseAdmin
    .from('certifications')
    .select('img_url')
    .eq('id', id)
    .single()

  if (cert?.img_url) {
    try {
      const oldUrl = new URL(cert.img_url.split('?')[0])
      const pathParts = oldUrl.pathname.split('/cert-images/')
      if (pathParts[1]) {
        await supabaseAdmin.storage.from('cert-images').remove([pathParts[1]])
      }
    } catch { /* ignore */ }
  }

  const freshUrl = `${url}?t=${Date.now()}`

  const { error: dbError } = await supabaseAdmin
    .from('certifications')
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

  const { data: cert } = await supabaseAdmin
    .from('certifications')
    .select('img_url')
    .eq('id', id)
    .single()

  if (cert?.img_url) {
    try {
      const url = new URL(cert.img_url.split('?')[0])
      const pathParts = url.pathname.split('/cert-images/')
      if (pathParts[1]) {
        await supabaseAdmin.storage.from('cert-images').remove([pathParts[1]])
      }
    } catch { /* ignore */ }
  }

  const { error } = await supabaseAdmin
    .from('certifications')
    .update({ img_url: null })
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
