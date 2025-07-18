'use client';
import { motion } from 'framer-motion';
import { Menu, ChevronUp } from 'lucide-react';

export default function Navbar() {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
      className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl dark:shadow-zinc-800 px-6 py-4 flex items-center justify-between w-full max-w-4xl mx-auto"
    >
      {/* Menú a la izquierda */}
      <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-300">
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
  );
}
