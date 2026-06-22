import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const body = await req.json()
  const { name, tagline, features } = body

  const { error } = await supabaseAdmin
    .from('products')
    .update({ name, tagline, features })
    .eq('id', id)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  revalidatePath('/products', 'layout')
  return NextResponse.json({ success: true })
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  // Delete all product images from storage
  const { data: images } = await supabaseAdmin
    .from('product_images')
    .select('img_url')
    .eq('product_id', id)

  if (images && images.length > 0) {
    const paths = images
      .map((img) => {
        try {
          const url = new URL(img.img_url)
          const parts = url.pathname.split('/product-images/')
          return parts[1] ?? null
        } catch { return null }
      })
      .filter(Boolean) as string[]

    if (paths.length > 0) {
      await supabaseAdmin.storage.from('product-images').remove(paths)
    }
  }

  const { error } = await supabaseAdmin.from('products').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  revalidatePath('/products', 'layout')
  return NextResponse.json({ success: true })
}
