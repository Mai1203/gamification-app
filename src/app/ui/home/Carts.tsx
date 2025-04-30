"use client";
import { Code2, Layout, Palette } from "lucide-react";
import { motion } from "framer-motion";

export const Carts = () => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
      className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
    >
      {/* Primera tarjeta */}
      <motion.div
        whileHover={{ y: -10, transition: { duration: 0.3 } }}
        className="bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-lg dark:text-white"
      >
        <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
          <Layout className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h3 className="text-xl font-semibold mb-2">HTML Estructurado</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Aprende a crear la estructura perfecta para tus páginas web con HTML5.
        </p>
      </motion.div>
  
      {/* Segunda tarjeta */}
      <motion.div
        whileHover={{ y: -10, transition: { duration: 0.3 } }}
        className="bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-lg dark:text-white"
      >
        <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
          <Palette className="h-6 w-6 text-purple-600 dark:text-purple-400" />
        </div>
        <h3 className="text-xl font-semibold mb-2">CSS Creativo</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Domina el arte del diseño web con CSS moderno y responsive.
        </p>
      </motion.div>
  
      {/* Tercera tarjeta */}
      <motion.div
        whileHover={{ y: -10, transition: { duration: 0.3 } }}
        className="bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-lg dark:text-white"
      >
        <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mb-4">
          <Code2 className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
        </div>
        <h3 className="text-xl font-semibold mb-2">JavaScript Dinámico</h3>
        <p className="text-gray-600 dark:text-gray-300">
          Da vida a tus páginas web con interactividad y funcionalidades dinámicas.
        </p>
      </motion.div>
    </motion.div>
  );  
};
