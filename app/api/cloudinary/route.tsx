import { NextResponse } from 'next/server'

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
const apiSecret = process.env.CLOUDINARY_API_SECRET
const parentFolder = 'model-uploads'

async function getImagesFromFolder(folder: string) {
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload?prefix=${folder}&max_results=100`,
    {
      headers: {
        Authorization:
          'Basic ' + Buffer.from(`${apiKey}:${apiSecret}`).toString('base64'),
      },
    }
  )
  console.log(` links https://api.cloudinary.com/v1_1/${cloudName}/resources/image/upload?prefix=${folder}&max_results=100`)
  const data = await res.json()
  return data.resources?.map((img: any) => img.secure_url) || []
}

export async function GET() {
  // Primero saco las subcarpetas dentro de model-uploads
  console.log(`link; https://api.cloudinary.com/v1_1/${cloudName}/folders/${parentFolder}/`)
  const foldersRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/folders/${parentFolder}/`,
    {
      headers: {
        Authorization:
          'Basic ' + Buffer.from(`${apiKey}:${apiSecret}`).toString('base64'),
      },
    }
  )
  const foldersData = await foldersRes.json()

  // Traigo imágenes raíz (directas en model-uploads)
  const rootImages = await getImagesFromFolder(parentFolder)

  // Luego para cada subcarpeta, traigo sus imágenes
  const foldersWithImages = await Promise.all(
    (foldersData.folders || []).map(async (folder: any) => {
      const images = await getImagesFromFolder(folder.path)
      return {
        name: folder.name,
        images,
      }
    })
  )

  // Incluyo la carpeta root con sus imágenes
  // foldersWithImages.unshift({
  //   name: 'root',
  //   images: rootImages,
  // })

  console.log('Folders with images:', foldersWithImages)

  return NextResponse.json({ folders: foldersWithImages })
}
