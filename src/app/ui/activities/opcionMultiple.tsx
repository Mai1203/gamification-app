"use client";

import { useState } from "react";

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

  const currentQuiz = quizzes[current];

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
      <div className="max-w-xl mx-auto p-6 text-center bg-zinc-50 dark:bg-zinc-800 rounded-xl shadow-md space-y-4">
        <h2 className="text-xl font-bold text-zinc-800 dark:text-white">¡Completado! ✅</h2>
        <p className="text-lg text-zinc-700 dark:text-zinc-200">
          Obtuviste {score} de {quizzes.length} respuestas correctas.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-zinc-50 dark:bg-zinc-800 rounded-xl shadow-md space-y-4">
      <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-100">{currentQuiz.question}</h2>

      <div className="space-y-3">
        {currentQuiz.options.map((option) => (
          <button
            key={option}
            onClick={() => setSelected(option)}
            disabled={submitted}
            className={`w-full py-3 px-4 text-left border rounded-lg transition-all duration-300
              ${getButtonStyle(option)}
              ${selected === option ? "ring-2 ring-indigo-500" : ""}
            `}
          >
            {option}
          </button>
        ))}
      </div>

      {!submitted && selected && (
        <button
          onClick={handleVerify}
          className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg"
        >
          Verificar
        </button>
      )}

      {submitted && (
        <button
          onClick={handleNext}
          className="mt-4 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg"
        >
          Siguiente
        </button>
      )}
    </div>
  );
}
