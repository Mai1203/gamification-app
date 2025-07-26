"use client";

import { useEffect, useState } from "react";
import { BookOpen, Code, Play, CheckCircle, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { useModulesWithProgress } from "@/app/hooks/useModulesWithProgress";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { initialModules } from "@/data/initialModules";
import AuthModal from "@/app/ui/dashboard/authModal";

import AnimationLoaded from "../../ui/dashboard/animationLoaded";

export default function Page() {
  const { isLoaded, isSignedIn } = useUser();
  const modules = useModulesWithProgress();
  const [isLoading, setIsLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const router = useRouter();

  // Obtener el módulo HTML de los datos iniciales si el usuario no está autenticado
  const cssModule = isSignedIn 
    ? modules.find((mod) => mod.id === "css")
    : initialModules.find((mod) => mod.id === "css");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timeout);
  }, [modules]);

  if (isLoading || !isLoaded || (isSignedIn && !cssModule)) {
    return <AnimationLoaded />;
  }

  const handleLessonClick = (index: number) => {
    if (!isSignedIn) {
      setShowAuthModal(true);
      return;
    }
    router.push(`/learning?module=css&level=${index + 1}`);
  };


  return (
    <>
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        className="bg-white dark:bg-zinc-800 rounded-xl shadow-xl p-8"
      >
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          {cssModule!.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          {cssModule!.description}
        </p>

        <div className="max-h-[550px] overflow-y-auto pr-2 space-y-4">
          {cssModule!.lessons.map((lesson, index) => {
            // Para usuarios no autenticados, todas las lecciones están disponibles pero no completadas
            const isCompleted = isSignedIn ? lesson.completed : false;
            const isLocked = isSignedIn ? lesson.locked : false;

            return (
              <motion.div
                key={index}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className={`flex items-center justify-between p-6 rounded-xl transition-all
                  ${
                    isLocked
                      ? "bg-red-50 dark:bg-red-200 opacity-80"
                      : isCompleted
                      ? "bg-green-50 dark:bg-green-200"
                      : "bg-indigo-50 dark:bg-indigo-200"
                  }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-full ${
                      isCompleted
                        ? "bg-green-200 text-green-800"
                        : isLocked
                        ? "bg-red-200 text-red-800"
                        : "bg-indigo-200 text-indigo-800"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : isLocked ? (
                      <Lock className="w-6 h-6" />
                    ) : (
                      <BookOpen className="w-6 h-6" />
                    )}
                  </div>

                  <div>
                    <h3 className="text-md font-semibold text-gray-800 dark:text-zinc-900">
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-zinc-700">
                      {isCompleted
                        ? "Completado ✅"
                        : isLocked
                        ? "Bloqueado 🔒"
                        : "Disponible"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleLessonClick(index)}
                  disabled={isLocked}
                  className={`px-4 py-2 text-sm rounded-lg font-medium flex items-center gap-2 transition-all ${
                    isCompleted
                      ? "bg-gray-100 text-gray-600 dark:bg-zinc-600 dark:text-white cursor-pointer"
                      : isLocked
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer"
                  }`}
                >
                  {isCompleted ? (
                    <>
                      <Code className="h-4 w-4" />
                      Repasar
                    </>
                  ) : isLocked ? (
                    <>
                      <Lock className="h-4 w-4" />
                      Bloqueado
                    </>
                  ) : isSignedIn ? (
                    <>
                      <Play className="h-4 w-4" />
                      Comenzar
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      Explorar
                    </>
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        title="Desbloquea las lecciones de CSS"
        description="Regístrate para crear diseños increíbles y guardar tu progreso"
      />
    </>
  );
}