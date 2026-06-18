import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: Request) {
  const { bucket, path } = await req.json()
  if (!bucket || !path) {
    return NextResponse.json({ error: 'Missing bucket or path' }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin.storage
    .from(bucket)
    .createSignedUploadUrl(path)

  if (error || !data) {
    return NextResponse.json({ error: error?.message ?? 'Failed to create signed URL' }, { status: 500 })
  }

  const { data: urlData } = supabaseAdmin.storage.from(bucket).getPublicUrl(path)

  return NextResponse.json({ signedUrl: data.signedUrl, publicUrl: urlData.publicUrl })
}
