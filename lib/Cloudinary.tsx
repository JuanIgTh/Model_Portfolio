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

  // Aquí aplano las imágenes de todas las carpetas en un solo array
  const urls = data.folders?.flatMap((folder: { images: string[] }) => folder.images) || []

  console.log('✅ Imágenes obtenidas:', urls)
  return urls
}

export async function getFoldersWithImages(): Promise<Folder[]> {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/cloudinary`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    console.error('❌ Error al obtener imágenes:', res.status);
    return [];
  }

  const data = await res.json();

  // Devolvemos todas las carpetas con su lista completa de imágenes
  return (data.folders || []).map((folder: { name: string; images: string[] }) => ({
    name: folder.name,
    thumbnailUrl: folder.images.length > 0 ? folder.images[0] : null,
    images: folder.images,
  }));
}
