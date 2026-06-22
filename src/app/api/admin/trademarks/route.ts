import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from('trademarks')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data ?? [])
}

export async function POST(req: Request) {
  const { name } = await req.json()
  if (!name?.trim()) {
    return NextResponse.json({ error: 'Country name is required' }, { status: 400 })
  }

  // Geocode via Nominatim
  const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(name)}&format=json&limit=1`
  const geoRes = await fetch(geocodeUrl, {
    headers: { 'User-Agent': 'DonginthermoCMS/1.0' },
  })

  if (!geoRes.ok) {
    return NextResponse.json({ error: 'Geocoding service unavailable' }, { status: 502 })
  }

  const geoData = await geoRes.json()
  if (!geoData || geoData.length === 0) {
    return NextResponse.json({ error: `Could not find coordinates for "${name}"` }, { status: 422 })
  }

  const lat = parseFloat(geoData[0].lat)
  const lon = parseFloat(geoData[0].lon)

  const { data, error } = await supabaseAdmin
    .from('trademarks')
    .insert({ name: name.trim(), lat, lon })
    .select()
    .single()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  revalidatePath('/technology/trademark')
  return NextResponse.json(data)
}
