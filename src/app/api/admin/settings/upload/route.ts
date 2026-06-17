import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get('file') as File | null
  const settingKey = formData.get('key') as string | null

  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

  const ext = file.name.split('.').pop()
  const filename = `${settingKey ?? 'asset'}-${Date.now()}.${ext}`

  const arrayBuffer = await file.arrayBuffer()
  const buffer = new Uint8Array(arrayBuffer)

  const { error: uploadError } = await supabaseAdmin.storage
    .from('site-assets')
    .upload(filename, buffer, { contentType: file.type, upsert: true })

  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 })

  const { data: urlData } = supabaseAdmin.storage.from('site-assets').getPublicUrl(filename)

  if (settingKey) {
    await supabaseAdmin
      .from('site_settings')
      .upsert({ key: settingKey, value: urlData.publicUrl }, { onConflict: 'key' })
  }

  return NextResponse.json({ url: urlData.publicUrl })
}
