// src/app/ui/dashboard/Recommendations.tsx
'use client';
import { getRecommendedLessons } from "@/utils/recomendations";
import Link from "next/link";
import { Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

const Recommendations = () => {
  const recommendations = getRecommendedLessons();

  if (recommendations.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-6 mt-8"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
        <Lightbulb className="text-yellow-400" /> Recomendado para ti
      </h2>
      <ul className="space-y-6">
        {recommendations.map((rec, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * idx }}
            className="border-l-4 border-indigo-500 pl-4"
          >
            <Link
              href={`/dashboard/${rec.moduleId}`}
              className="text-lg text-indigo-600 hover:underline font-semibold"
            >
              {rec.lessonTitle} ({rec.moduleTitle})
            </Link>
            <p className="text-gray-600 dark:text-gray-300">{rec.lessonDescription}</p>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Recommendations;
