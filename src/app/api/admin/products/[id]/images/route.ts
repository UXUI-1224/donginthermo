import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: productId } = await params

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

  const ext = file.name.split('.').pop()
  const filename = `${Date.now()}.${ext}`
  const path = `${productId}/${filename}`

  const arrayBuffer = await file.arrayBuffer()
  const buffer = new Uint8Array(arrayBuffer)

  const { error: uploadError } = await supabaseAdmin.storage
    .from('product-images')
    .upload(path, buffer, { contentType: file.type, upsert: false })

  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 })

  const { data: urlData } = supabaseAdmin.storage
    .from('product-images')
    .getPublicUrl(path)

  // Get current max sort_order
  const { data: existing } = await supabaseAdmin
    .from('product_images')
    .select('sort_order')
    .eq('product_id', productId)
    .order('sort_order', { ascending: false })
    .limit(1)

  const nextOrder = existing && existing.length > 0 ? existing[0].sort_order + 1 : 1

  const { data: imgRow, error: dbError } = await supabaseAdmin
    .from('product_images')
    .insert({ product_id: productId, img_url: urlData.publicUrl, sort_order: nextOrder })
    .select()
    .single()

  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 })

  return NextResponse.json(imgRow)
}
