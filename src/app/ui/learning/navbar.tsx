// components/Navbar.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";
import { Menu, ChevronUp, Lock } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

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
  const searchParams = useSearchParams();
  const currentLevel = parseInt(searchParams.get('level') || '1', 10);
  
  const [showPanel, setShowPanel] = useState(false);

  const totalLessons = lessons.length;
  const unlockedLessons = lessons.filter((l) => !l.locked).length;
  const progress = Math.round((unlockedLessons / totalLessons) * 100);

  const motionValue = useMotionValue(0);
  const rounded = useTransform(motionValue, (latest) => Math.round(latest));

  useEffect(() => {
    const controls = animate(motionValue, progress, {
      duration: 1,
      ease: "easeOut",
    });
    return controls.stop;
  }, [progress, motionValue]);

  return (
    <div className="relative">
      {/* Navbar principal */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        className="bg-white dark:bg-zinc-900 rounded-2xl shadow-xl dark:shadow-zinc-800 px-6 py-4 flex items-center justify-between w-full max-w-4xl mx-auto"
      >
        <div
          onClick={() => setShowPanel(!showPanel)}
          className="flex items-center gap-3 text-zinc-600 dark:text-zinc-300 cursor-pointer"
        >
          <Menu className="w-5 h-5" />
          <div className="h-6 w-px bg-zinc-300 dark:bg-zinc-700" />
          <span className="text-sm md:text-base font-medium p-4">
            Nivel {currentLevel} – 10
          </span>
        </div>

        <Link href={`/dashboard/${moduleId}`}>
          <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-300">
            <span className="text-sm md:text-base font-medium">{title}</span>
            <div className="h-6 w-px bg-zinc-300 dark:bg-zinc-700" />
            <ChevronUp className="w-4 h-4" />
          </div>
        </Link>
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
            {lessons.map((level, index) => (
              <div key={index}>
                {level.locked ? (
                  <div className="flex items-center justify-between px-3 py-2 bg-zinc-100 dark:bg-zinc-700 rounded text-gray-400 cursor-not-allowed">
                    <span className="text-sm">Nivel {index + 1}: {level.title}</span>
                    <Lock className="w-4 h-4" />
                  </div>
                ) : (
                  <Link href={`/learning?module=${moduleId}&level=${index + 1}`}>
                    <div className="flex items-center justify-between px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 rounded cursor-pointer text-zinc-700 dark:text-zinc-200">
                      <span className="text-sm">Nivel {index + 1}: {level.title}</span>
                    </div>
                  </Link>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Barra de progreso */}
      <div className="mt-4 max-w-4xl mx-auto px-2">
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
  );
}
