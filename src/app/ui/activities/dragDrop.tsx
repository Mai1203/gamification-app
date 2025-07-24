"use client";

import { useState } from "react";

type DragDropGameProps = {
  code: string; // contiene los espacios '_____'
  options: string[]; // piezas para arrastrar
  answers: string[]; // respuestas correctas en orden
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
  };

  const isCorrect = (value: string | null, index: number) =>
    value === answers[index];

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-zinc-800 rounded-xl shadow space-y-6">
      <h2 className="text-xl font-bold text-center text-zinc-800 dark:text-white">Completa el código</h2>

      {/* Render del código con zonas de drop */}
      <div className="bg-zinc-900 text-white font-mono p-4 rounded-lg whitespace-pre-wrap">
        {codeParts.map((part, i) => (
          <span key={i}>
            {part}
            {i < answers.length && (
              <span
                onClick={() => handleDrop(i)}
                className={`inline-block min-w-[80px] px-2 py-1 mx-1 rounded border 
                  ${drops[i] ? "bg-indigo-500 text-white" : "bg-zinc-700 text-zinc-400"} 
                  ${submitted && (isCorrect(drops[i], i) ? "border-green-400" : "border-red-400")}`}
              >
                {drops[i] || "_____"}
              </span>
            )}
          </span>
        ))}
      </div>

      {/* Opciones arrastrables */}
      <div className="flex flex-wrap justify-center gap-4">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => setSelected(option)}
            className={`px-4 py-2 rounded border text-sm font-medium transition 
              ${selected === option ? "bg-purple-600 text-white" : "bg-zinc-100 dark:bg-zinc-700 text-zinc-800 dark:text-white"}`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={handleVerify}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
        >
          Verificar
        </button>
      </div>
    </div>
  );
}

