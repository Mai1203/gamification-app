"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { PersonajeGuia } from "./animation/personaje-guia";

type DragDropGameProps = {
  code: string;
  options: string[];
  answers: string[];
};

export default function DragDropGame({ code, options, answers }: DragDropGameProps) {
  const [drops, setDrops] = useState<(string | null)[]>(Array(answers.length).fill(null));
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const codeParts = code.split("_____");

  const handleDrop = (index: number) => {
    if (!selected) return;
    const newDrops = [...drops];
    newDrops[index] = selected;
    setDrops(newDrops);
    setSelected(null);
  };

  const handleVerify = () => {
    setSubmitted(true);
    const allCorrect = drops.every((drop, i) => isCorrect(drop, i));
    if (allCorrect) {
      setMensajeRobot("¡Excelente! Has completado todo correctamente 🎉");
    } else {
      setMensajeRobot("Algunas respuestas están mal, ¡inténtalo otra vez! ❌");
    }
  }

  const isCorrect = (value: string | null, index: number) => value === answers[index];
  const reset = () => {
    setDrops(Array(answers.length).fill(null));
    setSelected(null);
    setSubmitted(false);
  };

  const [mensajeRobot, setMensajeRobot] = useState("¡Vamos! Coloca la etiqueta correcta en su lugar 😄");

  return (
    <div className="flex justify-center items-start gap-8 px-4 mt-8">
      {/* Personaje guía en la izquierda */}
      <div className="sticky top-20 ">
        <PersonajeGuia mensaje={mensajeRobot} />
      </div>

      {/* Panel del juego */}
      <div className="relative max-w-3xl p-6 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800 rounded-3xl shadow-xl space-y-6 border border-indigo-200 dark:border-zinc-600">
        <motion.h2
          className="text-2xl font-bold text-center text-zinc-800 dark:text-white flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Sparkles className="text-indigo-500" />
          Completa el código HTML
        </motion.h2>

        <div className="bg-zinc-900 text-white font-mono p-4 rounded-lg whitespace-pre-wrap text-base leading-relaxed">
          {codeParts.map((part, i) => (
            <span key={i}>
              {part}
              {i < answers.length && (
                <motion.span
                  onClick={() => handleDrop(i)}
                  className={`inline-block min-w-[80px] px-3 py-1 mx-1 text-center rounded border cursor-pointer transition-all
                    ${drops[i] ? "bg-indigo-500 text-white" : "bg-zinc-700 text-zinc-300"} 
                    ${submitted && (isCorrect(drops[i], i) ? "border-green-400" : "border-red-400")}`}
                  whileHover={{ scale: 1.05 }}
                >
                  {drops[i] || "_____"}
                </motion.span>
              )}
            </span>
          ))}
        </div>

        {/* Opciones */}
        <div className="flex flex-wrap justify-center gap-4">
          {options.map((option) => (
            <motion.button
              key={option}
              onClick={() => setSelected(option)}
              className={`px-4 py-2 rounded-lg border font-semibold transition shadow
                ${selected === option
                  ? "bg-purple-600 text-white ring-2 ring-purple-400"
                  : "bg-white dark:bg-zinc-700 text-zinc-800 dark:text-white hover:bg-indigo-100 dark:hover:bg-zinc-600"}`}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              {option}
            </motion.button>
          ))}
        </div>

        {/* Acciones */}
        <div className="text-center flex flex-col items-center gap-2">
          {!submitted ? (
            <motion.button
              onClick={handleVerify}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition"
              whileTap={{ scale: 0.95 }}
            >
              Verificar
            </motion.button>
          ) : (
            <>
              <p className="text-lg font-medium text-zinc-800 dark:text-zinc-100">
                {drops.every((drop, i) => isCorrect(drop, i))
                  ? "¡Correcto! ✅"
                  : "Algunas respuestas son incorrectas. ❌"}
              </p>
              <button
                onClick={reset}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition"
              >
                Reintentar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
