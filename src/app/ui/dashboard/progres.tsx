import { motion } from "framer-motion";
import { useState } from "react";
import { Award, Star, Trophy } from "lucide-react";
import ProgressBar from "./ProgressBar";

export default function Progres() {
  const [progress] = useState({
    html: 25,
    css: 10,
    javascript: 5,
  });

  return (
    <>
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Tu Progreso</h3>
        <div className="space-y-4">
          <ProgressBar label="HTML" progress={progress.html} color="rose" />
          <ProgressBar label="CSS" progress={progress.css} color="blue" />
          <ProgressBar label="JavaScript" progress={progress.javascript} color="yellow" />
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
