import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import NavLinks from "./nav-links";
import Progres from "./progres";

export default function Sidenav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si estamos en un dispositivo móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Cerrar el menú al hacer clic en un enlace (solo en móviles)
  const handleLinkClick = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Navbar con botón integrado solo para móviles */}
      {isMobile && (
        <button 
          className="bg-white dark:bg-zinc-800 shadow-md rounded-2xl p-4 mx-4 flex justify-between items-center lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Menú</h1>
          <div
            className="p-2 rounded-md bg-gray-100 dark:bg-zinc-700 hover:bg-gray-200 dark:hover:bg-zinc-600 transition-colors"
            aria-label="Abrir menú"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <motion.span
                animate={isOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                className="block w-5 h-0.5 bg-gray-900 dark:bg-white mb-1"
              />
              <motion.span
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-5 h-0.5 bg-gray-900 dark:bg-white mb-1"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                className="block w-5 h-0.5 bg-gray-900 dark:bg-white"
              />
            </div>
          </div>
        </button>
      )}

      {/* Overlay para móviles */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Contenedor principal que se ajusta al diseño */}
      <div className="lg:col-span-3">
        {/* Menú lateral - Comportamiento diferente en móvil vs desktop */}
        <motion.div
          initial={isMobile ? { x: -300, opacity: 0 } : { x: 0, opacity: 1 }}
          animate={
            isMobile
              ? isOpen
                ? { x: 0, opacity: 1 }
                : { x: -300, opacity: 0 }
              : { x: 0, opacity: 1 }
          }
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`${
            isMobile
              ? "fixed top-0 left-0 h-full w-80 max-w-full bg-white dark:bg-zinc-900 shadow-xl dark:shadow-zinc-800 p-6 z-50 pt-16 overflow-y-auto"
              : "bg-white dark:bg-zinc-900 rounded-xl shadow-xl dark:shadow-zinc-800 p-6 h-auto"
          }`}
        >
          {isMobile && (
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800"
                aria-label="Cerrar menú"
              >
                <svg
                  className="w-5 h-5 text-gray-900 dark:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          )}

          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            Menú
          </h2>

          <nav className="space-y-2" onClick={handleLinkClick}>
            <NavLinks />
          </nav>
          
          <div className="mt-6">
            <Progres />
          </div>
        </motion.div>
      </div>
    </>
  );
}