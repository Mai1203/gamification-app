'use client';
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs"
import toast from "react-hot-toast";

import { updateProgress } from "@/app/services/progressService";
import { AnimationConfety } from "../animation/animationConfety"
import CompletionCard from "./completionCard";
import { unlockBadgeForUser } from "@/app/services/badgeService";
import { badges } from "@/data/badgeData";
import { theoryData } from "@/data/theory";
import AnimatedText from "../../animatedText";

export default function PagFinal({ score, total }: { score: number; total: number }) {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const modKey = searchParams.get("module") ?? "html";
  const levelParam = searchParams.get("level") ?? "1";
  const [final, setFinal] = useState(false);
  const [newBadgeUnlocked, setNewBadgeUnlocked] = useState<number | null>(null);
  const maxLevel = 10;
  const hasUpdated = useRef(false);

  const moduleTheory = theoryData[modKey as keyof typeof theoryData];
  const levelData = moduleTheory?.[levelParam as keyof typeof moduleTheory];
  
  useEffect(() => {
    if (modKey === "css" && levelParam === maxLevel.toString()) {
      setFinal(true);
    } else {
      setFinal(false);
    }
  }, [modKey, levelParam]); 

  useEffect(() => {
    const updateOnLoad = async () => {
      if (!isLoaded || !isSignedIn || !user?.id || hasUpdated.current) return;
      
      try {
        await updateProgress(user.id, modKey, Number(levelParam)-1);
        
        const levelNum = Number(levelParam);
        const badgeId = modKey === "html" ? levelNum : levelNum + 10;
        const unlocked = await unlockBadgeForUser(user.id, badgeId);
        
        if (unlocked) {
          setNewBadgeUnlocked(badgeId);
          const badge = badges.find(b => b.id === badgeId);
          
          if (badge) {
            toast.success(
              <div className="flex items-center">
                <span className="text-2xl mr-2">{badge.emoji}</span>
                <div>
                  <p className="font-bold">¡Insignia desbloqueada!</p>
                  <p>{badge.title}</p>
                </div>
              </div>,
              { duration: 4000, position: 'top-center' }
            );
          }
        }
      } catch (error) {
        console.error("Error actualizando progreso/insignia:", error);
      } finally {
        hasUpdated.current = true;
      }
    };

    updateOnLoad();
  }, [isLoaded, isSignedIn, user, modKey, levelParam]);

  const handleClick = async () => {
    const nextLevel = Number(levelParam) + 1;

    if (nextLevel > maxLevel) {
      router.push(`/learning?module=css&level=1`);
    } else {
      router.push(`/learning?module=${modKey}&level=${nextLevel}`);
    }
  };

  if (newBadgeUnlocked) {
    const badge = badges.find(b => b.id === newBadgeUnlocked);
    
    if (badge) {
      return (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
          <motion.div
            className="max-w-md w-full p-8 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-indigo-500 dark:via-purple-500 dark:to-pink-500 rounded-3xl shadow-2xl text-center space-y-6 border-4 border-amber-400"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <AnimationConfety />
            
            <div className="text-7xl mb-4">{badge.emoji}</div>
            
            <h2 className="text-3xl font-bold text-amber-600 dark:text-amber-300">
              ¡Insignia Desbloqueada!
            </h2>
            
            <div className="bg-gradient-to-r from-amber-300 to-yellow-200 rounded-full py-2 px-6 inline-block">
              <h3 className="text-2xl font-bold text-gray-800">{badge.title}</h3>
            </div>
            
            <p className="text-lg text-gray-700 dark:text-gray-200">
              Has completado el nivel {levelParam} de {modKey.toUpperCase()}
            </p>
            
            <button
              onClick={() => setNewBadgeUnlocked(null)}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition text-lg"
            >
              Continuar
            </button>
          </motion.div>
        </div>
      );
    }
  }

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

            <AnimatedText 
              type="bounce" 
              className="text-3xl font-bold text-indigo-700 dark:text-white"
            >
              ¡Actividad completada!
            </AnimatedText>

            <AnimatedText 
              type="fadeIn" 
              delay={0.3}
              className="text-lg font-medium text-zinc-800 dark:text-zinc-300"
            >
              Obtuviste <span className="text-indigo-600 dark:text-indigo-300 font-bold">{score}</span> de {total} respuestas correctas.
            </AnimatedText>

            {/* Texto de resumen agregado */}
            <div className="bg-white/50 dark:bg-indigo-600/30 rounded-xl p-4 border border-indigo-200 dark:border-indigo-400/50">
              <AnimatedText 
                type="slideLeft" 
                delay={0.5}
                className="font-semibold text-indigo-800 dark:text-indigo-200 mb-1"
              >
                Resumen del módulo: {levelData?.title.split(" – ")[1]}
              </AnimatedText>
              <p className="text-zinc-700 dark:text-zinc-200 text-sm">
                {levelData.resume}
              </p>
            </div>

            <p className="text-zinc-600 dark:text-zinc-600 italic">
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