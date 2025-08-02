"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, RotateCcw, Lightbulb, XCircle, CheckCircle } from "lucide-react";

import PagFinal from "./pagFinalizar/pagFinal";
import { PersonajeGuia } from "./animation/personaje-guia";

type QuizItem = {
  question: string;
  options: string[];
  correctAnswer: string;
  hint?: string;
  message: string;
};

type MultipleChoiceGameProps = {
  quizzes: QuizItem[];
};

export default function MultipleChoiceGame({ 
  quizzes, 
}: MultipleChoiceGameProps) {
  const minCorrect = 2;
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [availableHints, setAvailableHints] = useState(2); // Pistas disponibles para todo el nivel

  const currentQuiz = quizzes[current];

  const [mensajeRobot, setMensajeRobot] = useState("");

  useEffect(() => {
    setMensajeRobot(currentQuiz.message);
    
    // Resetear estados al cambiar de pregunta
    setSelected(null);
    setSubmitted(false);
    setShowHint(false);
    setShowCorrectAnswer(false);
  }, [current, currentQuiz]);

  const handleVerify = () => {
    if (!selected) return;
    setSubmitted(true);
    
    if (selected === currentQuiz.correctAnswer) {
      setScore((prev) => prev + 1);
    } else {
      setShowCorrectAnswer(true);
    }
  };

  const handleNext = () => {
    if (current + 1 < quizzes.length) {
      setCurrent((prev) => prev + 1);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setSubmitted(false);
    setScore(0);
    setFinished(false);
    setShowHint(false);
    setShowCorrectAnswer(false);
    setAvailableHints(2); // Restablecer pistas al reiniciar
    setMensajeRobot("¡Vamos! El título es importante 😎");
  };

  const handleUseHint = () => {
    if (availableHints > 0 && currentQuiz.hint) {
      setShowHint(true);
      setAvailableHints(prev => prev - 1);
    }
  };

  const getButtonStyle = (option: string) => {
    if (!submitted) 
      return "bg-white hover:bg-indigo-50 dark:bg-zinc-700 dark:hover:bg-zinc-600";
    
    if (option === currentQuiz.correctAnswer) 
      return "bg-green-100 border-green-500 dark:bg-green-900/30 dark:border-green-700";
    
    if (option === selected) 
      return "bg-red-100 border-red-500 dark:bg-red-900/30 dark:border-red-700";
    
    return "bg-white dark:bg-zinc-700";
  };

  if (finished) {
    return (
      <PagFinal 
        score={score}
        total={quizzes.length}
      />
    );
  }

  return (
    <div className="flex flex-col md:flex-row justify-center items-start min-h-screen gap-6 p-4">
      <div className="w-full md:w-auto">
        <PersonajeGuia mensaje={mensajeRobot} />
      </div>
      
      {/* Cuadro del juego */}
      <motion.div
        key={current}
        className="w-full max-w-xl p-6 bg-white dark:bg-zinc-800 rounded-xl shadow-xl space-y-6"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-wrap justify-between items-center gap-3 text-sm text-zinc-600 dark:text-zinc-300 font-medium">
          <div className="flex items-center gap-2">
            <span className="bg-indigo-100 dark:bg-indigo-900/30 px-3 py-1 rounded-full">
              Pregunta {current + 1}/{quizzes.length}
            </span>
            
            <div className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
              Correctas: {score}/{minCorrect}
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={handleUseHint}
              disabled={availableHints === 0 || !currentQuiz.hint}
              className="flex items-center gap-1 text-sm bg-amber-100 hover:bg-amber-200 dark:bg-amber-900/30 dark:hover:bg-amber-800/40 px-3 py-1 rounded-full transition disabled:opacity-50"
            >
              <Lightbulb className="w-4 h-4" />
              Pistas: {availableHints}
            </button>
            
            {(current + 1 === quizzes.length) && (
              <div className="flex items-center gap-1 bg-purple-100 dark:bg-purple-900/30 px-3 py-1 rounded-full">
                <Trophy className="w-4 h-4 text-purple-600" />
                <span>¡Última!</span>
              </div>
            )}
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2.5 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${((current) / quizzes.length) * 100}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>

        <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mt-4">
          {currentQuiz.question}
        </h2>

        {/* Mostrar pista */}
        <AnimatePresence>
          {showHint && currentQuiz.hint && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-700"
            >
              <div className="flex items-start gap-2">
                <Lightbulb className="w-5 h-5 flex-shrink-0 text-amber-500 mt-0.5" />
                <p className="text-amber-700 dark:text-amber-300">
                  <span className="font-medium">Pista:</span> {currentQuiz.hint}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Opciones de respuesta */}
        <div className="space-y-3 mt-4">
          {currentQuiz.options.map((option) => (
            <motion.button
              key={option}
              onClick={() => !submitted && setSelected(option)}
              disabled={submitted}
              className={`w-full py-3 px-4 text-left border rounded-lg transition-all duration-200 flex items-start gap-3 dark:text-white ${
                getButtonStyle(option)
              } ${selected === option ? "ring-2 ring-indigo-500" : ""}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center">
                {submitted && option === currentQuiz.correctAnswer && (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                )}
                {submitted && option === selected && option !== currentQuiz.correctAnswer && (
                  <XCircle className="w-4 h-4 text-red-500" />
                )}
              </div>
              <span>{option}</span>
            </motion.button>
          ))}
        </div>

        {/* Mostrar respuesta correcta si el usuario falló */}
        {showCorrectAnswer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700"
          >
            <p className="text-blue-700 dark:text-blue-300">
              <span className="font-bold">Respuesta correcta:</span> {currentQuiz.correctAnswer}
            </p>
          </motion.div>
        )}

        {/* Acciones */}
        <div className="pt-4 flex flex-col sm:flex-row gap-3">
          <motion.button
            onClick={handleRestart}
            className="flex items-center justify-center gap-2 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-700 dark:hover:bg-zinc-600 py-2 px-4 rounded-lg transition"
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-4 h-4" />
            Reiniciar nivel
          </motion.button>
          
          {!submitted ? (
            <motion.button
              onClick={handleVerify}
              disabled={!selected}
              className={`flex-1 py-2 px-6 rounded-lg transition flex items-center justify-center gap-2 ${
                selected 
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer" 
                  : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
              }`}
              whileTap={{ scale: 0.95 }}
            >
              Verificar
            </motion.button>
          ) : (
            <motion.button
              onClick={handleNext}
              className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-lg transition flex items-center justify-center gap-2"
              whileTap={{ scale: 0.95 }}
            >
              {current + 1 < quizzes.length ? "Siguiente" : "Finalizar"}
              {current + 1 < quizzes.length ? (
                <span className="ml-1">→</span>
              ) : (
                <Trophy className="w-4 h-4" />
              )}
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
}