"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { PersonajeGuia } from "./animation/personaje-guia";
import PagFinal from "./pagFinalizar/pagFinal";

type DragDropGameProps = {
  code: string;
  options: string[];
  answers: string[];
};

export default function DragDropGame({ 
  code, 
  options, 
  answers,
}: DragDropGameProps) {
  const [drops, setDrops] = useState<(string | null)[]>(Array(answers.length).fill(null));
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  
  // Mensajes para el personaje guía
  const [mensajeRobot, setMensajeRobot] = useState("¡Vamos! Coloca la etiqueta correcta en su lugar 😄");
  const mensajes = useMemo(() => [
    "¡Excelente elección! Sigue así 💪",
    "Cada etiqueta tiene su lugar específico 🧩",
    "Recuerda cerrar las etiquetas correctamente 🔐",
    "¡Estás mejorando con cada intento! 🚀"
  ], []);

  const totalQuestions = answers.length;

  // Efecto para establecer el mensaje inicial
  useEffect(() => {
    setMensajeRobot("¡Vamos! Coloca la etiqueta correcta en su lugar 😄");
  }, []);

  const calculateCorrect = useCallback(() => {
    return drops.reduce((count, drop, index) => 
      drop === answers[index] ? count + 1 : count, 0);
  }, [drops, answers]);

  useEffect(() => {
    const correct = calculateCorrect();
    setCorrectCount(correct);
    
    // Actualizar mensaje según progreso (solo si no está enviado)
    if (!submitted) {
      if (correct === totalQuestions) {
        setMensajeRobot("¡Perfecto! Todo está correcto 🎉");
      } else if (correct > 0) {
        // Seleccionar un mensaje aleatorio del array
        const randomIndex = Math.floor(Math.random() * mensajes.length);
        setMensajeRobot(mensajes[randomIndex]);
      } else {
        setMensajeRobot("¡Vamos! Coloca la etiqueta correcta en su lugar 😄");
      }
    }
  }, [drops, calculateCorrect, totalQuestions, submitted, mensajes]);

  useEffect(() => {
    if (submitted && correctCount === totalQuestions) {
      setIsCompleted(true);
    }
  }, [submitted, correctCount, totalQuestions]);

  const codeParts = code.split("_____");

  const handleDrop = (index: number) => {
    if (!selected || submitted) return;
    const newDrops = [...drops];
    newDrops[index] = selected;
    setDrops(newDrops);
    setSelected(null);
  };

  const handleVerify = () => {
    setSubmitted(true);
    if (correctCount === totalQuestions) {
      setMensajeRobot("¡Excelente! Has completado todo correctamente 🎉");
    } else {
      setMensajeRobot(`Tienes ${correctCount} de ${totalQuestions} correctas. ¡Sigue intentando! ❌`);
    }
  };

  const isCorrect = (value: string | null, index: number) => value === answers[index];
  
  const reset = () => {
    setDrops(Array(answers.length).fill(null));
    setSelected(null);
    setSubmitted(false);
    setIsCompleted(false);
    setMensajeRobot("¡Vamos! Coloca la etiqueta correcta en su lugar 😄");
  };

  // Mostrar componente final cuando todo esté correcto
  if (isCompleted) {
    return <PagFinal score={correctCount} total={totalQuestions} />;
  }

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-4 lg:gap-8 px-4 mt-4 lg:mt-8">
      {/* Personaje guía - Asegurar que siempre reciba un mensaje */}
      <div className="lg:sticky top-20 mb-4 lg:mb-0">
        <PersonajeGuia mensaje={mensajeRobot} />
      </div>

      {/* Panel del juego */}
      <div className="w-full max-w-3xl p-4 lg:p-6 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800 rounded-3xl shadow-xl space-y-4 lg:space-y-6 border border-indigo-200 dark:border-zinc-600">
        <motion.h2
          className="text-xl lg:text-2xl font-bold text-center text-zinc-800 dark:text-white flex items-center justify-center gap-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Sparkles className="text-indigo-500" />
          Completa el código HTML
        </motion.h2>

        {/* Contador de progreso */}
        <div className="flex justify-between items-center px-2">
          <span className="text-sm font-medium text-indigo-600 dark:text-indigo-300">
            {correctCount}/{totalQuestions} correctas
          </span>
          {submitted && (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
              correctCount === totalQuestions 
                ? "bg-green-100 text-green-800" 
                : "bg-yellow-100 text-yellow-800"
            }`}>
              {correctCount === totalQuestions ? "Perfecto!" : "Sigue practicando"}
            </span>
          )}
        </div>

        {/* Área de código */}
        <div className="bg-zinc-900 text-white font-mono p-4 rounded-lg whitespace-pre-wrap text-sm md:text-base leading-relaxed overflow-x-auto">
          {codeParts.map((part, i) => (
            <span key={i}>
              {part}
              {i < answers.length && (
                <motion.span
                  onClick={() => !submitted && handleDrop(i)}
                  className={`inline-block min-w-[60px] md:min-w-[80px] px-2 md:px-3 py-1 mx-1 text-center rounded border cursor-pointer transition-all
                    ${drops[i] 
                      ? "bg-indigo-500 text-white" 
                      : "bg-zinc-700 text-zinc-300"} 
                    ${submitted && (isCorrect(drops[i], i) 
                      ? "!border-green-400 !bg-green-500/90" 
                      : "!border-red-400")}`}
                  whileHover={{ scale: submitted ? 1 : 1.05 }}
                >
                  {drops[i] || "_____"}
                </motion.span>
              )}
            </span>
          ))}
        </div>

        {/* Opciones */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          {options.map((option) => (
            <motion.button
              key={option}
              onClick={() => !submitted && setSelected(option)}
              disabled={submitted}
              className={`px-3 py-1 md:px-4 md:py-2 rounded-lg border font-medium md:font-semibold transition shadow text-sm md:text-base
                ${selected === option
                  ? "bg-purple-600 text-white ring-2 ring-purple-400"
                  : "bg-white dark:bg-zinc-700 text-zinc-800 dark:text-white hover:bg-indigo-100 dark:hover:bg-zinc-600"}
                ${submitted && "opacity-70"}`}
              whileTap={{ scale: submitted ? 1 : 0.95 }}
              whileHover={{ scale: submitted ? 1 : 1.05 }}
            >
              {option}
            </motion.button>
          ))}
        </div>

        {/* Acciones */}
        <div className="text-center flex flex-col items-center gap-2 pt-2">
          {!submitted ? (
            <motion.button
              onClick={handleVerify}
              disabled={drops.some(drop => drop === null)}
              className={`px-5 py-2 rounded-lg font-semibold transition ${
                drops.some(drop => drop === null)
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
              whileTap={{ scale: 0.95 }}
            >
              Verificar
            </motion.button>
          ) : (
            <>
              <div className="mb-2">
                <p className="text-lg font-medium text-zinc-800 dark:text-zinc-100">
                  {correctCount === totalQuestions
                    ? "¡Perfecto! Todas correctas 🎉"
                    : `Tienes ${correctCount} de ${totalQuestions} correctas`}
                </p>
              </div>
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