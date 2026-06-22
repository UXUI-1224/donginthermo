import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string; imageId: string }> }
) {
  const { id: productId, imageId } = await params

  // Get the image record to find the storage path
  const { data: img, error: fetchError } = await supabaseAdmin
    .from('product_images')
    .select('img_url')
    .eq('id', imageId)
    .single()

  if (fetchError || !img) {
    return NextResponse.json({ error: 'Image not found' }, { status: 404 })
  }

  // Extract storage path from public URL
  // URL format: {SUPABASE_URL}/storage/v1/object/public/product-images/{productId}/{filename}
  const url = new URL(img.img_url)
  const pathParts = url.pathname.split('/product-images/')
  const storagePath = pathParts[1]

  if (storagePath) {
    await supabaseAdmin.storage.from('product-images').remove([storagePath])
  }

  const { error: dbError } = await supabaseAdmin
    .from('product_images')
    .delete()
    .eq('id', imageId)
    .eq('product_id', productId)

  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 })

  revalidatePath('/products', 'layout')
  return NextResponse.json({ success: true })
}
