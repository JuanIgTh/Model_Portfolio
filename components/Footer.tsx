'use client';
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeartbeat, FaEnvelope, FaPhone, FaComments } from "react-icons/fa";
import { MdCall } from 'react-icons/md';

export default function Footer() {
  const [open, setOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleToggle = () => {
    if (open) {
      setShowContent(false); // ocultar contenido antes de cerrar
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <motion.div
        initial={false}
        animate={{
          width: open ? "auto" : "3rem",
          padding: open ? "0.5rem 1rem" : "0.5rem",
        }}
        transition={{ duration: 0.3 }}
        onAnimationComplete={() => {
          if (open) setShowContent(true); // mostrar texto después de abrir
        }}
        className="bg-black/50 backdrop-blur rounded-full shadow-lg 
                   text-gray-300 text-sm font-classy select-none flex items-center 
                   overflow-hidden cursor-pointer hover:bg-black/70 transition-colors"
        onClick={handleToggle}
      >
        {/* Botón/Icono principal */}
        <MdCall size={30} className="text-xl flex-shrink-0" />

        {/* Contenido visible solo cuando está abierto y ha terminado la animación */}
        <AnimatePresence>
          {open && showContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 ml-3"
            >
              {/* <p className="flex items-center">
                Made with <FaHeartbeat className="mx-1 text-red-500" /> by Baleatech
              </p> */}
              <div className="flex flex-col sm:flex-row sm:space-x-4 mt-1 sm:mt-0">
                <a href="mailto:contact@baleatech.com" className="flex items-center hover:text-accent transition">
                  <FaEnvelope className="mr-1" /> contact@baleatech.com
                </a>
                <a href="tel:+1234567890" className="flex items-center hover:text-accent transition">
                  <FaPhone className="mr-1" /> +1 234 567 890
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
