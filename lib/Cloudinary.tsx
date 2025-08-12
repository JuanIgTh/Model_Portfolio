import { headers } from 'next/headers'

export async function getBaseUrl() {
  if (typeof window !== "undefined") return ""; // Cliente → relativo

  // Node server
  const dev = process.env.NODE_ENV !== "production";
  if (dev) {
    return "http://localhost:3000";
  }

  // Producción
  return `https://${process.env.VERCEL_URL}`;
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

type Folder = {
  name: string;
  thumbnailUrl: string | null;
  images: string[];
};

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
