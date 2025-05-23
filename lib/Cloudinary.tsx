import { headers } from 'next/headers'

async function getBaseUrl() {
  const headersList = await headers()
  const host = headersList.get('host')
  const protocol = host?.includes('localhost') ? 'http' : 'https'
  return `${protocol}://${host}`
}

export async function getImages(): Promise<string[]> {
  const baseUrl = await getBaseUrl()
  const res = await fetch(`${baseUrl}/api/cloudinary`, {
    cache: 'no-store',
  })

  if (!res.ok) {
    console.error('❌ Error al obtener imágenes:', res.status)
    return []
  }

  const data = await res.json()
  return data.urls
}
