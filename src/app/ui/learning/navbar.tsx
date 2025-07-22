'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ChevronUp, Lock } from 'lucide-react';
import Link from 'next/link';

const levels = [
  { id: 1, title: "Estructura básica", locked: false },
  { id: 2, title: "Etiquetas comunes", locked: false },
  { id: 3, title: "Anidamiento", locked: true },
  { id: 4, title: "Imágenes y enlaces", locked: true },
  { id: 5, title: "Estructura básica", locked: false },
  { id: 6, title: "Etiquetas comunes", locked: false },
  { id: 7, title: "Anidamiento", locked: true },
  { id: 8, title: "Imágenes y enlaces", locked: true },
  { id: 9, title: "Anidamiento", locked: true },
  { id: 10, title: "Imágenes y enlaces", locked: true },
];

export default function Navbar() {
  const [showPanel, setShowPanel] = useState(false);

  return (
    <div className="relative">
      {/* Navbar principal */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
        className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl dark:shadow-zinc-800 px-6 py-4 flex items-center justify-between w-full max-w-4xl mx-auto"
      >
        {/* Menú a la izquierda */}
        <div
          onClick={() => setShowPanel(!showPanel)}
          className="flex items-center gap-3 text-zinc-600 dark:text-zinc-300 cursor-pointer"
        >
          <Menu className="w-5 h-5" />
          <div className="h-6 w-px bg-zinc-300 dark:bg-zinc-700" />
          <span className="text-sm md:text-base font-medium">🤖 Nivel 1 – 10</span>
        </div>

        {/* Módulo a la derecha */}
        <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-300">
          <span className="text-sm md:text-base font-medium">HTML Básico</span>
          <div className="h-6 w-px bg-zinc-300 dark:bg-zinc-700" />
          <ChevronUp className="w-4 h-4" />
        </div>
      </motion.div>

      {/* Panel lateral */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute left-5 top-full mt-2 bg-white dark:bg-zinc-800 shadow-xl rounded-lg w-64 z-50 p-4 space-y-2"
          >
            <h3 className="text-lg font-bold mb-2 text-zinc-800 dark:text-zinc-100">Niveles</h3>
            {levels.map((level) => (
              <div key={level.id}>
                {level.locked ? (
                  <div className="flex items-center justify-between px-3 py-2 bg-zinc-100 dark:bg-zinc-700 rounded text-gray-400 cursor-not-allowed">
                    <span className="text-sm">Nivel {level.id}: {level.title}</span>
                    <Lock className="w-4 h-4" />
                  </div>
                ) : (
                  <Link href={`/learning?level=${level.id}`}>
                    <div className="flex items-center justify-between px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded cursor-pointer text-zinc-700 dark:text-zinc-200">
                      <span className="text-sm">Nivel {level.id}: {level.title}</span>
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
