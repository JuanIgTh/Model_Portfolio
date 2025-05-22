import Image from 'next/image'

export default function Gallery({ images }: { images: string[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[400px] ">
      {images.map((url, i) => {
        const isTall = (i + 1) % 3 === 0 // cada 3era imagen
        return (
          <div
            key={i}
            className={`relative rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform ${
              isTall ? 'row-span-2' : ''
            }`}
          >
            <Image
              src={url}
              alt={`image-${i}`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        )
      })}
    </div>
  )
}
