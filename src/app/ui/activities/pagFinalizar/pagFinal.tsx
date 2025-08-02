import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs"

import { updateProgress } from "@/app/services/progressService";
import { AnimationConfety } from "../animation/animationConfety"
import CompletionCard from "./completionCard";

export default function PagFinal({ score, total }: { score: number; total: number }) {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const modKey = searchParams.get("module") ?? "html";
  const levelParam = searchParams.get("level") ?? "1";
  const [final, setFinal] = useState(false);
  const maxLevel = 10;
  
  // Usa useEffect para actualizar el estado basado en parámetros
  useEffect(() => {
    if (modKey === "css" && levelParam === maxLevel.toString()) {
      setFinal(true);
    } else {
      setFinal(false);
    }
  }, [modKey, levelParam]); // Dependencias del efecto

  const handleClick = async () => {
    const nextLevel = Number(levelParam) + 1;

    if (!isLoaded || !isSignedIn || !user?.id) return;

    await updateProgress(user.id, modKey, Number(levelParam)-1);

    if (nextLevel > maxLevel) {
      router.push(`/learning?module=css&level=1`);
    } else {
      router.push(`/learning?module=${modKey}&level=${nextLevel}`);
    }
  };

  if (final) {
    return <CompletionCard />;
  }

  return (
        <>
          <AnimationConfety />
          <motion.div
            className="max-w-xl mx-auto mt-12 p-8 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-indigo-500 dark:via-purple-500 dark:to-pink-500 rounded-3xl shadow-2xl text-center space-y-6 border border-indigo-200 dark:border-zinc-600"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex justify-center"
            >
              <Trophy className="w-20 h-20 text-amber-500" />
            </motion.div>
  
            <h2 className="text-3xl font-bold text-indigo-700 dark:text-white">¡Actividad completada! 🎉</h2>
  
            <p className="text-lg font-medium text-zinc-800 dark:text-zinc-300">
              Obtuviste <span className="text-indigo-600 dark:text-indigo-300 font-bold">{score}</span> de {total} respuestas correctas.
            </p>
  
            <p className="text-zinc-600 dark:text-zinc-400 italic">
              ¡Sigue así, estás aprendiendo muy bien! 🚀
            </p>
  
            <button
              onClick={handleClick}
              className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition cursor-pointer"
            >
              Siguiente nivel
            </button>
          </motion.div>
        </>
      );
}