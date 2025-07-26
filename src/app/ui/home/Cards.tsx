"use client";
import { Code2, Layout, Palette } from "lucide-react";
import { motion } from "framer-motion";

// Datos de las tarjetas
const cards = [
  {
    icon: <Layout className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />,
    bgIcon: "bg-indigo-100 dark:bg-indigo-900",
    title: "HTML Estructurado",
    description: "Aprende a crear la estructura perfecta para tus páginas web con HTML5.",
  },
  {
    icon: <Palette className="h-6 w-6 text-purple-600 dark:text-purple-400" />,
    bgIcon: "bg-purple-100 dark:bg-purple-900",
    title: "CSS Creativo",
    description: "Domina el arte del diseño web con CSS moderno y responsive.",
  },
  {
    icon: <Code2 className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />,
    bgIcon: "bg-yellow-100 dark:bg-yellow-900",
    title: "JavaScript Dinámico",
    description: "Da vida a tus páginas web con interactividad y funcionalidades dinámicas.",
  },
];

export const Cards = () => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
      className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8"
    >
      {cards.map((card, index) => (
        <motion.div
          key={index}
          whileHover={{ y: -10, transition: { duration: 0.3 } }}
          className="bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-lg dark:text-white"
        >
          <div className={`w-12 h-12 ${card.bgIcon} rounded-lg flex items-center justify-center mb-4`}>
            {card.icon}
          </div>
          <h3 className="text-xl font-semibold mb-2 text-zinc-800 dark:text-gray-400">{card.title}</h3>
          <p className="text-gray-600 dark:text-gray-300">{card.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
};
