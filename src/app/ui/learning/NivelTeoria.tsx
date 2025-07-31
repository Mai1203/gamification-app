"use client";

import { useEffect, useState } from "react";
import { MousePointerClick } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useSearchParams, useRouter } from "next/navigation";

import { theoryData } from "@/data/theory";
import EditorLive from "./EditorLive";

type ValidModule = "html" | "css";

export default function NivelTeoria() {
  const searchParams = useSearchParams();
  const modKey = (searchParams.get("module") as ValidModule) ?? "html";
  const levelParam = searchParams.get("level") ?? "1";

  const moduleTheory = theoryData[modKey as keyof typeof theoryData];
  const levelData = moduleTheory?.[levelParam as keyof typeof moduleTheory];

  const router = useRouter();
  const [showAnimations, setShowAnimations] = useState(false);

  useEffect(() => {
    // Detectar tamaño de pantalla
    const checkResponsive = () => {
      setShowAnimations(window.innerWidth >= 1024); // Solo mostrar animaciones en pantallas grandes
    };
    
    checkResponsive();
    window.addEventListener("resize", checkResponsive);
    
    return () => {
      window.removeEventListener("resize", checkResponsive);
    };
  }, []);

  if (!levelData) {
    return <p className="text-center mt-10">⚠ Nivel o módulo no encontrado.</p>;
  }

  return (
    <section className="min-h-screen px-4 py-8 md:px-8 lg:px-20 relative dark:text-zinc-300">
      {/* Animaciones Lottie - Solo en pantallas grandes */}
      {showAnimations && (
        <>
          <div className="absolute top-40 left-0 lg:left-15 w-60 lg:w-75 z-0">
            <DotLottieReact
              autoplay
              loop
              src="/animation/learning robot.json"
              className="w-full h-auto max-w-md"
            />
          </div>

          <div className="absolute bottom-40 right-0 lg:right-5 w-60 lg:w-100 z-0">
            <DotLottieReact
              autoplay
              loop
              src="/animation/animation-learning-dark.json"
              className="w-full h-auto max-w-md"
            />
          </div>
        </>
      )}

      {/* Contenido principal */}
      <div className="w-full max-w-4xl mx-auto space-y-8 relative z-10">
        <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100 dark:border-zinc-800">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
              {levelData.title}
            </h2>

            <div className="bg-red-100 text-red-800 dark:bg-red-200/20 dark:text-red-300 rounded-xl p-4 mt-4">
              <p className="font-semibold flex items-center gap-2">
                <span className="text-lg">🎯</span> Objetivo de nivel:
              </p>
              <p className="text-sm md:text-base mt-2">{levelData.objective}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-5">
              <h3 className="text-xl font-bold flex items-center gap-2">
                {levelData.intro.question}
              </h3>
              <p className="text-base">{levelData.intro.content}</p>
              <div className="overflow-x-auto">
                <pre className="bg-gray-50 dark:bg-zinc-800 p-4 rounded-lg text-sm border border-gray-200 dark:border-zinc-700 min-w-min">
                  {levelData.intro.code}
                </pre>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-yellow-100 p-4 rounded-xl text-center dark:text-black">
                <p className="font-bold text-lg flex items-center justify-center gap-2">
                  &lt;{modKey}&gt;
                </p>
                <div className="flex flex-wrap justify-center mt-3 gap-2 text-sm font-semibold">
                  {levelData.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="bg-blue-200 px-3 py-1.5 rounded-lg whitespace-nowrap"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-zinc-800 p-4 rounded-xl text-sm shadow-sm border border-gray-100 dark:border-zinc-700">
                <p className="font-bold mb-3 flex items-center gap-2">
                  <span className="text-green-500">✅</span> ¿Qué debes recordar?
                </p>
                <ul className="space-y-3">
                  {levelData.tips.map((tip: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span>•</span> {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-5">
            <h3 className="text-xl font-bold flex items-center gap-2">
              {levelData.extra.title}
            </h3>
            <p className="text-base">{levelData.extra.content}</p>

            <div className="overflow-x-auto">
              <pre className="bg-gray-50 dark:bg-zinc-800 p-4 rounded-lg text-sm border border-gray-200 dark:border-zinc-700 min-w-min">
                {levelData.extra.example}
              </pre>
            </div>
          </div>

          <div className="mt-10 space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <span className="text-purple-500">🧪</span> ¡Prueba el código!
            </h3>
            {modKey === "css" ? (
              <EditorLive 
                key={levelParam}
                defaultHtml={levelData.lifeCode.html}
                defaultCss={levelData.lifeCode.css}
                mode={modKey}
              />
            ) : (
              <EditorLive 
                key={levelParam}
                defaultHtml={levelData.lifeCode.html}
                mode={modKey}
              />
            )}
          </div>

          <div className="text-center mt-10">
            <button 
              onClick={() => router.push(`/learning/activities?module=${modKey}&level=${levelParam}`)}
              className="px-6 py-3 text-base font-semibold rounded-xl transition-all flex items-center justify-center gap-2 mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 cursor-pointer shadow-md hover:shadow-lg">
              <MousePointerClick size={20} />
              ¡Empezar Desafío!
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
