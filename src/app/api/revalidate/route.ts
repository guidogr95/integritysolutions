import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

// Map Sanity document types to Next.js cache tags
const typeToTags: Record<string, string[]> = {
  siteSettings: ['siteSettings'],
  homepage: ['homepage'],
  service: ['service'],           // also add per-slug tag via slug field below
  contactPage: ['contactPage'],
  clientLogo: ['clientLogo'],
}

export async function POST(request: Request) {
  const secret = request.headers.get('x-sanity-webhook-secret')

  if (secret !== process.env.SANITY_WEBHOOK_SECRET) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  let body: { _type?: string; slug?: { current?: string } } = {}

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ message: 'Invalid body' }, { status: 400 })
  }

  const documentType = body._type
  if (!documentType) {
    return NextResponse.json({ message: 'Missing _type' }, { status: 400 })
  }

  const tags = typeToTags[documentType]
  if (!tags) {
    return NextResponse.json({ message: 'Unknown document type' }, { status: 400 })
  }

  for (const tag of tags) {
    revalidateTag(tag, 'page')
  }

  // For services, also revalidate the specific slug tag
  if (documentType === 'service' && body.slug?.current) {
    revalidateTag(`service:${body.slug.current}`, 'page')
  }

  return NextResponse.json({ revalidated: true, tags })
}
