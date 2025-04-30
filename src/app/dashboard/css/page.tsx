import { BookOpen, Code, Play, CheckCircle } from "lucide-react";
import { modules } from "@/data/modules";

const moduleCss = modules[1];

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-[#0D0D0D] dark:via-[#0D0D0D] dark:to-[#0D0D0D]">
      <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-xl p-8">
        <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">CSS Creativo</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Domina el diseño y estilizado de páginas web con CSS moderno.
        </p>
  
        <div className="space-y-6">
          {moduleCss.lessons.map((lesson, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-zinc-700 rounded-lg p-6 transition-all hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-lg ${
                      lesson.completed
                        ? 'bg-green-100 text-green-600 dark:bg-green-200 dark:text-green-800'
                        : 'bg-indigo-100 text-indigo-600 dark:bg-indigo-200 dark:text-indigo-800'
                    }`}
                  >
                    {lesson.completed ? (
                      <CheckCircle className="h-6 w-6" />
                    ) : (
                      <BookOpen className="h-6 w-6" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-white">
                      {lesson.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">{lesson.description}</p>
                  </div>
                </div>
                <button
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                    lesson.completed
                      ? 'bg-gray-100 text-gray-600 dark:bg-zinc-600 dark:text-gray-200'
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  {lesson.completed ? (
                    <>
                      <Code className="h-4 w-4" />
                      Repasar
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      Comenzar
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
}