"use client";

import { useState } from "react";

type FindErrorGameProps = {
  code: string[];
  correctLine: number;
  explanation: string;
};

export default function FindError({ code, correctLine, explanation }: FindErrorGameProps) {
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (selectedLine !== null) {
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-zinc-800 rounded-xl shadow space-y-6">
      <h2 className="text-xl font-bold text-center text-zinc-800 dark:text-white">
        Encuentra el error en el código
      </h2>

      <div className="bg-zinc-900 text-white font-mono p-4 rounded-lg space-y-1">
        {code.map((line, index) => {
          const isSelected = selectedLine === index;
          const isCorrect = submitted && index === correctLine;
          const isWrong = submitted && isSelected && index !== correctLine;

          return (
            <div
              key={index}
              onClick={() => !submitted && setSelectedLine(index)}
              className={`px-2 py-1 rounded cursor-pointer transition
                ${isSelected ? "bg-indigo-600" : "hover:bg-zinc-700"}
                ${isCorrect ? "bg-green-600" : ""}
                ${isWrong ? "bg-red-600" : ""}
              `}
            >
              {index + 1}. {line}
            </div>
          );
        })}
      </div>

      <div className="text-center">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={selectedLine === null}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
          >
            Verificar
          </button>
        ) : (
          <div className="mt-4 text-zinc-800 dark:text-white">
            {selectedLine === correctLine ? (
              <p className="text-green-500 font-semibold">¡Correcto! ✅</p>
            ) : (
              <p className="text-red-500 font-semibold">¡Incorrecto! ❌</p>
            )}
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}
