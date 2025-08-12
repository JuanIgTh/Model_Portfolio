"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosPhotos } from 'react-icons/io';

type Album = {
  name: string;
  thumbnailUrl: string | null;
  images: string[];
};

export default function Gallery({ images }: { images: Album[] }) {
  const [selectedAlbumIndex, setSelectedAlbumIndex] = useState<number | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const openLightbox = (albumIndex: number) => {
    setSelectedAlbumIndex(albumIndex);
    setSelectedImageIndex(0);
  };

  const closeLightbox = () => setSelectedAlbumIndex(null);

  const showPrev = () => {
    if (selectedAlbumIndex === null) return;
    setSelectedImageIndex((i) => {
      const imagesCount = images[selectedAlbumIndex].images.length;
      return i > 0 ? i - 1 : imagesCount - 1;
    });
  };

  const showNext = () => {
    if (selectedAlbumIndex === null) return;
    setSelectedImageIndex((i) => {
      const imagesCount = images[selectedAlbumIndex].images.length;
      return i < imagesCount - 1 ? i + 1 : 0;
    });
  };

  return (
    <>
      {/* Grid de álbumes */}
      <div id="shoots" className="py-6 grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[250px] md:auto-rows-[400px]">
        {images.map((album, i) => {
        const isTall = (i + 1) % 3 === 0;
        const isEven = (images.length % 2 === 0)
        const lastItem = images.length === i + 1

          const url = album.thumbnailUrl || "";

          return (
            <div
              key={album.name}
              className={`relative rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform cursor-pointer ${
                isTall ? "md:row-span-2 md:col-span-1 col-span-2" : ""
              }`}   
              onClick={() => openLightbox(i)}
              title={album.name}
            >
              {url ? (
                <>
                  <Image
                    src={url}
                    alt={`thumbnail-${album.name}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none z-10" />
                </>
              ) : (
                <div className="bg-gray-300 w-full h-full flex items-center justify-center text-gray-600">
                  Sin imagen
                </div>
              )}

              {album.images.length > 1 && (
                <div className="absolute bottom-2 right-2 rounded-full p-1 flex items-center justify-center opacity-30 z-20">
                  <IoIosPhotos className="text-white w-6 h-6" />
                  <span className="text-white ml-1 text-sm font-semibold">{album.images.length}</span>
                </div>
              )}
            </div>

          );
        })}
      </div>

      {/* Lightbox de imágenes del álbum seleccionado */}
      <AnimatePresence>
        {selectedAlbumIndex !== null && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              key={selectedImageIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="relative w-[90%] h-[80%] max-w-5xl"
            >
              <Image
                src={images[selectedAlbumIndex].images[selectedImageIndex]}
                alt={`image-${selectedImageIndex}`}
                fill
                className="object-contain select-none"
              />

              {/* Dots container */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {images[selectedAlbumIndex].images.map((_, idx) => {
                  const isActive = idx === selectedImageIndex;
                  return (
                    <motion.span
                      key={idx}
                      layoutId={isActive ? "activeDot" : undefined}
                      initial={false}
                      animate={{
                        scale: isActive ? 1.5 : 1,
                        opacity: isActive ? 1 : 0.5,
                        backgroundColor: isActive ? "#fff" : "#888",
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="w-3 h-3 rounded-full cursor-pointer"
                      onClick={() => setSelectedImageIndex(idx)}
                    />
                  );
                })}
              </div>
            </motion.div>

            {/* Botón cerrar */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 text-white text-3xl hover:scale-110 transition"
            >
              ✕
            </button>

            {/* Flechas */}
            {images[selectedAlbumIndex].images.length > 1 && (
              <>
                <button
                  onClick={showPrev}
                  className="absolute left-5 text-white text-4xl hover:scale-110 transition"
                >
                  ‹
                </button>
                <button
                  onClick={showNext}
                  className="absolute right-5 text-white text-4xl hover:scale-110 transition"
                >
                  ›
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
