import { motion } from "framer-motion";
import ProgressBar from "./ProgressBar";
import { useModulesWithProgress } from '@/app/hooks/useModulesWithProgress';
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { getUserBadgesWithStatus } from "@/app/services/badgeService";
import { Badge } from "@/data/badgeData";
import BadgeComponent from "../learning/Badge";
import { X } from "lucide-react"

export default function Progres() {
  const { isLoaded, isSignedIn, user } = useUser();
  const modules = useModulesWithProgress(); 
  const [badges, setBadges] = useState<(Badge & { unlocked: boolean })[]>([]);
  const [loadingBadges, setLoadingBadges] = useState(true);
  const [showAllBadges, setShowAllBadges] = useState(false);
  
  // Cargar insignias del usuario
  useEffect(() => {
    const loadBadges = async () => {
      if (isLoaded && isSignedIn && user) {
        try {
          const userBadges = await getUserBadgesWithStatus(user.id);
          setBadges(userBadges);
        } catch (error) {
          console.error("Error loading badges:", error);
        } finally {
          setLoadingBadges(false);
        }
      }
    };
    
    loadBadges();
  }, [isLoaded, isSignedIn, user]);

  if (!isLoaded) {
    return (
      <div className="mt-8">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <></>;
  }

  if (modules.length === 0) {
    return (
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Tu Progreso</h3>
        <div className="space-y-4">
          <div className="animate-pulse h-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="animate-pulse h-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        </div>
      </div>
    );
  }

  // Datos cargados y usuario autenticado
  const currentModulehtml = modules.find((m) => m.id === "html");
  const currentModulecss = modules.find((m) => m.id === "css");

  const totalLessonsHtml = currentModulehtml?.lessons.length ?? 0;
  const totalLessonsCss = currentModulecss?.lessons.length ?? 0;

  const completedHtml = currentModulehtml?.lessons.filter((l) => l.completed).length ?? 0;
  const completedCss = currentModulecss?.lessons.filter((l) => l.completed).length ?? 0;

  const progresshtml = totalLessonsHtml > 0 ? Math.round((completedHtml / totalLessonsHtml) * 100) : 0;
  const progresscss = totalLessonsCss > 0 ? Math.round((completedCss / totalLessonsCss) * 100) : 0;

  // Filtrar insignias desbloqueadas
  const unlockedBadges = badges.filter(badge => badge.unlocked);
  const recentBadges = unlockedBadges.slice(-3).reverse();

  return (
    <>
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Tu Progreso</h3>
        <div className="space-y-4">
          <ProgressBar label="HTML" progress={progresshtml} color="indigo" />
          <ProgressBar label="CSS" progress={progresscss} color="purple" />
        </div>
      </div>
  
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
          Insignias {unlockedBadges.length > 0 && `(${unlockedBadges.length})`}
        </h3>
        
        {loadingBadges ? (
          <div className="grid grid-cols-3 gap-2">
            {[...Array(3)].map((_, i) => (
              <div 
                key={i} 
                className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl w-full aspect-square"
              />
            ))}
          </div>
        ) : unlockedBadges.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center py-4">
            Completa niveles para desbloquear insignias
          </p>
        ) : (
          <div className="grid grid-cols-3 gap-2 w-full">
            {recentBadges.map((badge) => (
              <motion.div
                key={badge.id}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                className="w-full max-w-[100px] mx-auto" // Control de tamaño máximo
              >
                <BadgeComponent 
                  badge={badge} 
                  unlocked={badge.unlocked} 
                />
              </motion.div>
            ))}
            
            {unlockedBadges.length > 3 && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center justify-center"
                onClick={() => setShowAllBadges(true)}
              >
                <div className="aspect-square w-full max-w-[100px] rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center cursor-pointer">
                  <span className="text-[min(3vw,1.5rem)] font-bold">+{unlockedBadges.length - 3}</span>
                </div>
                <span className="text-[min(2vw,0.6rem)] mt-1">Ver todas</span>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {showAllBadges && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
          onClick={() => setShowAllBadges(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg w-full max-w-3xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Todas tus insignias
              </h2>
              <button 
                onClick={() => setShowAllBadges(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 cursor-pointer"
              >
                <X className="text-xl" />
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto max-h-[calc(90vh-100px)]">
              {unlockedBadges.length === 0 ? (
                <p className="text-center py-8 text-gray-500 dark:text-gray-400">
                  Aún no has desbloqueado insignias
                </p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {unlockedBadges.map((badge) => (
                    <div 
                      key={badge.id} 
                      className="flex flex-col items-center"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-full max-w-[100px]"
                      >
                        <BadgeComponent 
                          badge={badge} 
                          unlocked={true} 
                        />
                      </motion.div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-center">
              <button
                onClick={() => setShowAllBadges(false)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition cursor-pointer"
              >
                Cerrar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}