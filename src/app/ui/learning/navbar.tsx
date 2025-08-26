// components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { Menu, ChevronUp, Lock, ArrowLeft, Home, X } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

type Lesson = {
  title: string;
  locked: boolean;
};

type NavbarProps = {
  moduleId: string;
  title: string;
  lessons: Lesson[];
};

export default function Navbar({ moduleId, title, lessons }: NavbarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentLevel = parseInt(searchParams.get('level') || '1', 10);
  
  const [showPanel, setShowPanel] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const totalLessons = lessons.length;
  const unlockedLessons = lessons.filter((l) => !l.locked).length;
  const progress = Math.round((unlockedLessons / totalLessons) * 100);

  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    const controls = animate(motionValue, progress, {
      duration: 1,
      ease: "easeOut",
    });
    return controls.stop;
  }, [progress, motionValue]);

  return (
    <div className="relative w-full px-3 sm:px-4">
      <div className="max-w-4xl mx-auto relative">
        <div className="flex items-center justify-between gap-3 sm:gap-5">
          {/* Botón de retroceso */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button
              onClick={() => router.back()}
              className="bg-white dark:bg-zinc-800 rounded-full shadow-lg dark:shadow-zinc-800/50 p-3 flex items-center justify-center hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-zinc-600 dark:text-zinc-300" />
            </button>
          </motion.div>
          
          {/* Navbar principal - Más alto */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl dark:shadow-zinc-800 px-4 py-3 sm:px-6 sm:py-4 flex items-center justify-between flex-1" // Aumentado el padding vertical
          >
            <div
              onClick={() => setShowPanel(!showPanel)}
              className="flex items-center gap-2 sm:gap-3 text-zinc-600 dark:text-zinc-300 cursor-pointer flex-1 min-w-0"
            >
              <Menu className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
              <div className="h-6 sm:h-8 w-px bg-zinc-300 dark:bg-zinc-700 flex-shrink-0" />
              <span className="text-sm sm:text-base font-medium truncate">
                Nivel {currentLevel}
                {!isMobile && " – 10"}
              </span>
            </div>

            <Link href={`/dashboard/${moduleId}`} className="flex-shrink-0">
              <div className="flex items-center gap-2 sm:gap-3 text-zinc-600 dark:text-zinc-300">
                {isMobile ? (
                  <Home className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <>
                    <span className="text-sm sm:text-base font-medium truncate max-w-[120px] sm:max-w-none">
                      {title}
                    </span>
                    <div className="h-6 sm:h-8 w-px bg-zinc-300 dark:bg-zinc-700" />
                    <ChevronUp className="w-5 h-5 sm:w-5 sm:h-5" />
                  </>
                )}
              </div>
            </Link>
          </motion.div>
        </div>

        {/* Barra de progreso - Mantenida en su posición original */}
        <div className="mt-4 px-2">
          <div className="w-full bg-gray-200 dark:bg-zinc-700 h-3 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
            />
          </div>
          <div className="text-right text-xs mt-1 text-zinc-500 dark:text-zinc-400">
            Progreso: <motion.span>{rounded}</motion.span>%
          </div>
        </div>
      </div>

      {/* Panel lateral - Mejorado para móviles */}
      <AnimatePresence> 
        {showPanel && (
          <>
            {/* Overlay para móviles */}
            {isMobile && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowPanel(false)}
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
              />
            )}
            
            <motion.div
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`fixed sm:absolute left-0 top-0 sm:top-full sm:mt-2 bg-white dark:bg-zinc-800 shadow-xl rounded-lg sm:rounded-lg w-80 max-w-full sm:w-64 z-50 p-4 space-y-2 ${
                isMobile ? "h-full rounded-none" : ""
              }`}
            >
              {/* Encabezado con botón cerrar */}
              <div className="flex justify-between items-center mb-4 px-3">
                <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100">Niveles</h3>
                <button
                  onClick={() => setShowPanel(false)}
                  className="text-zinc-500 hover:text-zinc-800 dark:hover:text-white transition p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Lista de niveles */}
              <div className="overflow-y-auto max-h-[70vh] sm:max-h-96 pr-2">
                {lessons.map((level, index) => (
                  <div key={index} className="mb-2 last:mb-0">
                    {level.locked ? (
                      <div className="flex items-center justify-between px-3 py-3 bg-zinc-100 dark:bg-zinc-700 rounded text-gray-400 cursor-not-allowed">
                        <span className="text-sm">
                          <span className="font-medium">Nivel {index + 1}:</span> {level.title}
                        </span>
                        <Lock className="w-4 h-4 flex-shrink-0" />
                      </div>
                    ) : (
                      <div onClick={() => setShowPanel(false)}>
                        <Link href={`/learning?module=${moduleId}&level=${index + 1}`}>
                          <div className={`flex items-center justify-between px-3 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded cursor-pointer text-zinc-700 dark:text-zinc-200 ${
                            currentLevel === index + 1 ? "bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-300 dark:border-indigo-700" : ""
                          }`}>
                            <span className="text-sm">
                              <span className="font-medium">Nivel {index + 1}:</span> {level.title}
                            </span>
                            {currentLevel === index + 1 && (
                              <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                            )}
                          </div>
                        </Link>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}