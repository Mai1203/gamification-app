"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";

type QuizItem = {
  question: string;
  options: string[];
  correctAnswer: string;
};

type MultipleChoiceGameProps = {
  quizzes: QuizItem[];
};

export default function MultipleChoiceGame({ quizzes }: MultipleChoiceGameProps) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const [typedMessage, setTypedMessage] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);



  const currentQuiz = quizzes[current];

  const robotMessages = [
    "¡Vamos! El título es importante 😎",
    "Esta es muy fácil, ¡piensa en los párrafos! 📝",
    "¿Dónde se muestra el contenido? 🤔",
    "¡Genial, estás cerca del final! 🚀",
  ];

  useEffect(() => {
    const fullMessage = robotMessages[current] ?? "¡Vamos con esta! 😄";

    setTypedMessage("");       // Reinicia mensaje visible
    setTypingIndex(0);         // Reinicia índice de escritura

    const interval = setInterval(() => {
      setTypingIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        setTypedMessage(fullMessage.slice(0, nextIndex));

        if (nextIndex >= fullMessage.length) {
          clearInterval(interval);
        }

        return nextIndex;
      });
    }, 40); // Velocidad de tipeo

    return () => clearInterval(interval); // Limpia si cambia el nivel
  }, [current]);



  const handleVerify = () => {
    if (!selected) return;
    setSubmitted(true);
    if (selected === currentQuiz.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelected(null);
    setSubmitted(false);
    if (current + 1 < quizzes.length) {
      setCurrent((prev) => prev + 1);
    } else {
      setFinished(true);
    }
  };

  const getButtonStyle = (option: string) => {
    if (!submitted) return "bg-white hover:bg-indigo-100";
    if (option === currentQuiz.correctAnswer) return "bg-green-200 border-green-500";
    if (option === selected) return "bg-red-200 border-red-500";
    return "bg-white";
  };

  if (finished) {
    return (
      <motion.div
        className="max-w-xl mx-auto mt-12 p-8 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-800 rounded-3xl shadow-2xl text-center space-y-6 border border-indigo-200 dark:border-zinc-600"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          initial={{ y: -10 }}
          animate={{ y: [0, -5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex justify-center"
        >
          <Trophy className="w-20 h-20 text-amber-500" />
        </motion.div>

        <h2 className="text-3xl font-bold text-indigo-700 dark:text-white">¡Actividad completada! 🎉</h2>

        <p className="text-lg font-medium text-zinc-800 dark:text-zinc-300">
          Obtuviste <span className="text-indigo-600 dark:text-indigo-300 font-bold">{score}</span> de {quizzes.length} respuestas correctas.
        </p>

        <p className="text-zinc-600 dark:text-zinc-400 italic">
          ¡Sigue así, estás aprendiendo muy bien! 🚀
        </p>

        <button
          onClick={() => location.reload()}
          className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition"
        >
          Reintentar
        </button>
      </motion.div>
    );
  }


  return (
    <div className="flex justify-center items-start min-h-screen gap-8 relative">
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-100 via-pink-50 to-purple-100 opacity-60 animate-pulse -z-10" />
      {/* Sección del robot y mensaje */}
      <motion.div
        className="flex flex-col items-center gap-2"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 12 }}
      >
        <motion.img
          src="/img/personaje-guia.png"
          alt="Guía"
          className="w-36 h-36 object-contain drop-shadow-xl"
          animate={{ 
            y: [0, -6, 0],
            rotate: [0, -2, 2, 0]
          }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "loop", esase: "easeInOut" }}
        />

        <motion.div
          className="relative bg-white text-indigo-800 border border-indigo-300 shadow-xl rounded-3xl px-5 py-3 text-base max-w-xs font-medium leading-snug"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="block whitespace-pre-line">
            {typedMessage}
            {typingIndex < (robotMessages[current]?.length ?? 0) && <span className="animate-pulse">|</span>}
          </span>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white" />
        </motion.div>
      </motion.div>

      {/* Cuadro del juego */}
      <motion.div
        key={current}
        className="max-w-xl w-full p-6 bg-white dark:bg-zinc-800 rounded-xl shadow-xl space-y-6"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.4 }}
      >
        <div className="mb-1 flex justify-between items-center text-sm text-zinc-600 dark:text-zinc-300 font-medium">
          <span>Pregunta {current + 1} de {quizzes.length}</span>

          {(current + 1 === quizzes.length && !finished) ? (
            <motion.div
              className="flex items-center gap-1 text-amber-500"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 120 }}
            >
              <Trophy className="w-5 h-5" />
              <span>¡Última!</span>
            </motion.div>
          ) : (
            <span>{Math.round((current / quizzes.length) * 100)}%</span>
          )}
        </div>

        {/* Barra de progreso */}
        <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-4 overflow-hidden mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${((current + (submitted ? 1 : 0)) / quizzes.length) * 100}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>

        <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
          {currentQuiz.question}
        </h2>

        <div className="space-y-3">
          {currentQuiz.options.map((option) => (
            <motion.button
              key={option}
              onClick={() => setSelected(option)}
              disabled={submitted}
              className={`w-full py-3 px-4 text-left border rounded-lg cursor-pointer transition-all duration-300 ${getButtonStyle(option)} ${selected === option ? "ring-2 ring-indigo-500" : ""}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {option}
            </motion.button>
          ))}
        </div>

        <div className="pt-4">
          {!submitted && selected && (
            <motion.button
              onClick={handleVerify}
              className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg transition cursor-pointer"
              whileTap={{ scale: 0.95 }}
            >
              Verificar
            </motion.button>
          )}

          {submitted && (
            <motion.button
              onClick={handleNext}
              className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg transition"
              whileTap={{ scale: 0.95 }}
            >
              Siguiente
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
