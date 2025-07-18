"use client";
import { useState, useEffect } from "react";
import { MousePointerClick } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";


export default function NivelUno() {
  const [isLocked, setIsLocked] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
      // Detecta si el HTML tiene la clase 'dark'
      const dark = document.documentElement.classList.contains("dark");
      setIsDarkMode(dark);
  
      // Observa cambios en el atributo 'class' del HTML
      const observer = new MutationObserver(() => {
        setIsDarkMode(document.documentElement.classList.contains("dark"));
      });
  
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
  
      return () => observer.disconnect();
    }, []);


  return (
    <section className="min-h-screen px-6 py-10 md:px-20 relative dark:text-zinc-300">
      {/* Lottie izquierda */}
      <div className="absolute top-40 left-15 hidden md:block w-75
      ">
        <DotLottieReact
          autoplay
          loop
          src="/animation/learning robot.json"
          className="w-full max-w-2xl h-auto"
        />
      </div>

      {/* Lottie derecha */}
      <div className="absolute bottom-55 right-5 hidden md:block w-100">
        <DotLottieReact
          key={isDarkMode ? "dark" : "light"}
          autoplay
          loop
          src={isDarkMode ? "/animation/animation-learning-dark.json" : "/animation/animation-learning.json"}
          className="w-full max-w-2xl h-auto"
        />
      </div>

      <div className="w-full max-w-4xl mx-auto space-y-10">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            🤖 Nivel 1 - Estructura básica de un documento HTML
          </h2>

          <div className="bg-red-100 text-red-800 dark:bg-red-200/20 dark:text-red-300 rounded-md p-4 mt-4">
            <p className="font-semibold">🎯 Objetivo de nivel:</p>
            <p className="text-sm md:text-base">
              Comprender qué es HTML y cómo se estructura un documento básico
              para crear una página web.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* ¿Qué es HTML? */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              💻 ¿Qué es HTML?
            </h3>
            <p className="text-sm md:text-base">
              HTML (HyperText Markup Language) es el lenguaje estándar para
              construir páginas web. No es un lenguaje de programación, sino un
              lenguaje de marcado que define la estructura y el contenido de una
              página.
            </p>

            <pre className="bg-white/80 dark:bg-zinc-800 p-4 rounded-md text-sm overflow-auto border border-gray-200 dark:border-zinc-700">
              {`<!DOCTYPE html>
<html>
  <head>
    <title>Mi Primera Página</title>
  </head>
  <body>
    <h1>¡Bienvenido!</h1>
  </body>
</html>`}
            </pre>
          </div>

          {/* Imagen explicativa + recordatorio */}
          <div className="space-y-6">
            <div className="bg-yellow-100 p-4 rounded-md text-center dark:text-black">
              <p className="font-bold text-lg">&lt;html&gt;</p>
              <div className="flex justify-center mt-2 gap-4 text-sm font-semibold">
                <span className="bg-blue-200 px-3 py-1 rounded">&lt;head&gt;</span>
                <span className="bg-blue-200 px-3 py-1 rounded">&lt;body&gt;</span>
              </div>
            </div>

            <div className="bg-white dark:bg-zinc-900 p-4 rounded-md text-sm shadow-md border border-gray-200 dark:border-zinc-800">
              <p className="font-bold mb-2">✅ ¿Qué debes recordar?</p>
              <ul className="space-y-2">
                <li>✔️ Todas las etiquetas (excepto algunas) se abren y se cierran.</li>
                <li>✔️ Las etiquetas se pueden anidar: unas dentro de otras.</li>
                <li>✔️ Siempre debes cerrar correctamente las etiquetas para que la página funcione bien.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ¿Qué son las etiquetas? */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            💻 ¿Qué son las etiquetas HTML?
          </h3>
          <p className="text-sm md:text-base">
            Las etiquetas son instrucciones que le dicen al navegador cómo mostrar
            el contenido. Se escriben entre los signos menor y mayor que:
          </p>

          <pre className="bg-white/80 dark:bg-zinc-800 p-4 rounded-md text-sm overflow-auto border border-gray-200 dark:border-zinc-700">
            {`<etiqueta>Contenido</etiqueta>

Ejemplo:
<p>Hola mundo</p>`}
          </pre>
        </div>

        {/* Botón de desafío */}
        <div className="text-center">
          <button
            disabled={isLocked}
            className={`px-6 py-3 text-base font-semibold rounded-lg transition-all flex items-center justify-center gap-2 mx-auto ${
              isLocked
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer"
            }`}
          >
            <MousePointerClick size={20} />
            ¡Empezar Desafío!
          </button>
        </div>
      </div>
    </section>
  );
}
