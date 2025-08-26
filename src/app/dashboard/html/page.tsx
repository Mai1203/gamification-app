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
  const htmlModule = isSignedIn 
    ? modules.find((mod) => mod.id === "html")
    : initialModules.find((mod) => mod.id === "html");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timeout);
  }, [modules]);

  if (isLoading || !isLoaded || (isSignedIn && !htmlModule)) {
    return <AnimationLoaded />;
  }

  const handleLessonClick = (index: number) => {
    if (!isSignedIn) {
      setShowAuthModal(true);
      return;
    }
    router.push(`/learning?module=html&level=${index + 1}`);
  };

  return (
    <>
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        className="bg-white dark:bg-zinc-800 rounded-xl shadow-xl p-4 lg:p-8 mx-4 sm:mx-4"
      >
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
          {htmlModule!.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6 sm:mb-8">
          {htmlModule!.description}
        </p>

        <div className="max-h-[550px] overflow-y-auto pr-1 sm:pr-2 space-y-3 sm:space-y-4">
          {htmlModule!.lessons.map((lesson, index) => {
            // Para usuarios no autenticados, todas las lecciones están disponibles pero no completadas
            const isCompleted = isSignedIn ? lesson.completed : false;
            const isLocked = isSignedIn ? lesson.locked : false;

            return (
              <motion.div
                key={index}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
                className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 rounded-xl transition-all
                  ${
                    isLocked
                      ? "bg-red-50 dark:bg-red-900/30 opacity-80"
                      : isCompleted
                      ? "bg-green-50 dark:bg-green-900/30"
                      : "bg-indigo-50 dark:bg-indigo-900/30"
                  }`}
              >
                <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-0 flex-1 min-w-0">
                  <div
                    className={`p-2 sm:p-3 rounded-full flex-shrink-0 ${
                      isCompleted
                        ? "bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200"
                        : isLocked
                        ? "bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200"
                        : "bg-indigo-200 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-200"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                    ) : isLocked ? (
                      <Lock className="w-5 h-5 sm:w-6 sm:h-6" />
                    ) : (
                      <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm sm:text-md font-semibold text-gray-800 dark:text-white truncate">
                      {lesson.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                      {isCompleted
                        ? "Completado ✅"
                        : isLocked
                        ? "Bloqueado 🔒"
                        : "Disponible"}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end sm:justify-normal">
                  <button
                    onClick={() => handleLessonClick(index)}
                    disabled={isLocked}
                    className={`px-3 py-2 text-xs sm:text-sm rounded-lg font-medium flex items-center gap-1 sm:gap-2 transition-all w-full sm:w-auto justify-center ${
                      isCompleted
                        ? "bg-gray-100 text-gray-600 dark:bg-zinc-700 dark:text-white cursor-pointer"
                        : isLocked
                        ? "bg-gray-200 text-gray-400 dark:bg-zinc-800 dark:text-zinc-500 cursor-not-allowed"
                        : "bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer"
                    }`}
                  >
                    {isCompleted ? (
                      <>
                        <Code className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">Repasar</span>
                        <span className="sm:hidden">Repasar</span>
                      </>
                    ) : isLocked ? (
                      <>
                        <Lock className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>Bloqueado</span>
                      </>
                    ) : isSignedIn ? (
                      <>
                        <Play className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span className="hidden sm:inline">Comenzar</span>
                        <span className="sm:hidden">Iniciar</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span>Explorar</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        title="Desbloquea las lecciones de HTML"
        description="Regístrate para acceder a todas las lecciones y guardar tu progreso"
      />
    </>
  );
}