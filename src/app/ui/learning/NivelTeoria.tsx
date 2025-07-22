"use client";

import { useEffect, useState } from "react";
import { MousePointerClick } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useSearchParams } from "next/navigation";
import { theoryData } from "@/data/theory";

export default function NivelTeoria() {
  const searchParams = useSearchParams();
  const modKey = searchParams.get("module") ?? "html";
  const levelParam = searchParams.get("level") ?? "1";

  const moduleTheory = theoryData[modKey as keyof typeof theoryData];
  const levelData = moduleTheory?.[levelParam as keyof typeof moduleTheory];


  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const dark = document.documentElement.classList.contains("dark");
    setIsDarkMode(dark);
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  if (!levelData) {
    return <p className="text-center mt-10">⚠ Nivel o módulo no encontrado.</p>;
  }

  return (
    <section className="min-h-screen px-6 py-10 md:px-20 relative dark:text-zinc-300">
      {/* Animaciones Lottie */}
      <div className="absolute top-40 left-15 hidden md:block w-75">
        <DotLottieReact
          autoplay
          loop
          src="/animation/learning robot.json"
          className="w-full max-w-2xl h-auto"
        />
      </div>

      <div className="absolute bottom-55 right-5 hidden md:block w-100">
        <DotLottieReact
          key={isDarkMode ? "dark" : "light"}
          autoplay
          loop
          src={
            isDarkMode
              ? "/animation/animation-learning-dark.json"
              : "/animation/animation-learning.json"
          }
          className="w-full max-w-2xl h-auto"
        />
      </div>

      {/* Contenido */}
      <div className="w-full max-w-4xl mx-auto space-y-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            {levelData.title}
          </h2>

          <div className="bg-red-100 text-red-800 dark:bg-red-200/20 dark:text-red-300 rounded-md p-4 mt-4">
            <p className="font-semibold">🎯 Objetivo de nivel:</p>
            <p className="text-sm md:text-base">{levelData.objective}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              {levelData.intro.question}
            </h3>
            <p className="text-sm md:text-base">{levelData.intro.content}</p>
            <pre className="bg-white/80 dark:bg-zinc-800 p-4 rounded-md text-sm overflow-auto border border-gray-200 dark:border-zinc-700">
              {levelData.intro.code}
            </pre>
          </div>

          <div className="space-y-6">
            <div className="bg-yellow-100 p-4 rounded-md text-center dark:text-black">
              <p className="font-bold text-lg">&lt;html&gt;</p>
              <div className="flex justify-center mt-2 gap-4 text-sm font-semibold">
                {levelData.tags.map((tag: string) => (
                  <span key={tag} className="bg-blue-200 px-3 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-4 rounded-md text-sm shadow-md border border-gray-200 dark:border-zinc-800">
              <p className="font-bold mb-2">✅ ¿Qué debes recordar?</p>
              <ul className="space-y-2">
                {levelData.tips.map((tip: string, i: number) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            {levelData.extra.title}
          </h3>
          <p className="text-sm md:text-base">{levelData.extra.content}</p>

          <pre className="bg-white/80 dark:bg-zinc-800 p-4 rounded-md text-sm overflow-auto border border-gray-200 dark:border-zinc-700">
            {levelData.extra.example}
          </pre>
        </div>

        <div className="text-center">
          <button className="px-6 py-3 text-base font-semibold rounded-lg transition-all flex items-center justify-center gap-2 mx-auto bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer">
            <MousePointerClick size={20} />
            ¡Empezar Desafío!
          </button>
        </div>
      </div>
    </section>
  );
}
