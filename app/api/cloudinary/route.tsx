import { NextResponse } from 'next/server'

export async function GET() {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET
  const folder = 'model-uploads' // Cambia según corresponda

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload?prefix=${folder}/&max_results=20`,
      {
        headers: {
          Authorization:
            'Basic ' + Buffer.from(`${apiKey}:${apiSecret}`).toString('base64'),
        },
      }
    )

    const text = await response.text() // Leer como texto para debug
    console.log('Respuesta raw de Cloudinary:', text)

    // Intentar parsear
    const data = JSON.parse(text)

    if (!data.resources) {
      console.error('No se encontraron resources en la respuesta:', data)
      return NextResponse.json({ urls: [] })
    }

    const urls = data.resources.map((img: any) => img.secure_url)
    return NextResponse.json({ urls })
  } catch (error) {
    console.error('Error llamando a Cloudinary:', error)
    return NextResponse.json({ error: 'Error fetching images' }, { status: 500 })
  }
}
