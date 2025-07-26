import { motion } from "framer-motion";
import { Award, Star, Trophy} from "lucide-react";
import ProgressBar from "./ProgressBar";
import { useModulesWithProgress } from '@/app/hooks/useModulesWithProgress';
import { useUser } from "@clerk/nextjs";

export default function Progres() {
  const { isLoaded, isSignedIn } = useUser();
  const modules = useModulesWithProgress(); 
  
  // Si Clerk aún no ha cargado o el usuario no está autenticado
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

  // Usuario no autenticado
  if (!isSignedIn) {
    return (
      <>
      </>
    );
  }

  // Usuario autenticado pero datos aún cargando
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
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Logros</h3>
        <div className="grid grid-cols-3 gap-2">
          <motion.div
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            className="flex flex-col items-center"
          >
            <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded-lg">
              <Star className="h-6 w-6 text-yellow-500" />
            </div>
            <span className="text-xs mt-1 text-gray-800 dark:text-gray-300">Principiante</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            className="flex flex-col items-center"
          >
            <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
              <Award className="h-6 w-6 text-blue-500" />
            </div>
            <span className="text-xs mt-1 text-gray-800 dark:text-gray-300">Intermedio</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
            className="flex flex-col items-center opacity-50"
          >
            <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-lg">
              <Trophy className="h-6 w-6 text-purple-500" />
            </div>
            <span className="text-xs mt-1 text-gray-800 dark:text-gray-300">Experto</span>
          </motion.div>
        </div>
      </div>
    </>
  );
}