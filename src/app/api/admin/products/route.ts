import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('products')
    .select('*, product_images(id, img_url, alt, sort_order)')
    .order('sort_order')

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(req: Request) {
  const body = await req.json()
  const { name, category, tagline, features } = body

  if (!name || !category) {
    return NextResponse.json({ error: 'name and category are required' }, { status: 400 })
  }

  // Get max sort_order
  const { data: last } = await supabaseAdmin
    .from('products')
    .select('sort_order')
    .order('sort_order', { ascending: false })
    .limit(1)
    .single()

  const sort_order = (last?.sort_order ?? 0) + 1

  const id = crypto.randomUUID()

  const { data, error } = await supabaseAdmin
    .from('products')
    .insert({ id, name, category, tagline: tagline ?? '', features: features ?? [], sort_order })
    .select('*, product_images(id, img_url, alt, sort_order)')
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}
