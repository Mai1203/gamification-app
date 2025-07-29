"use client";

import { useState } from "react";
import PagFinal from "./pagFinalizar/pagFinal";

type FindErrorGameProps = {
  code: string[];
  correctLine: number;
  explanation: string;
};

export default function FindError({ code, correctLine, explanation }: FindErrorGameProps) {
  const [selectedLine, setSelectedLine] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFinal, setShowFinal] = useState(false);

  const handleSubmit = () => {
    if (selectedLine !== null) {
      const correct = selectedLine === correctLine;
      setSubmitted(true);
      setIsCorrect(correct);
      
      if (correct) {
        setTimeout(() => setShowFinal(true), 1500);
      }
    }
  };

  const handleRetry = () => {
    setSubmitted(false);
    setIsCorrect(null);
    setSelectedLine(null);
  };

  if (showFinal) return <PagFinal score={1} total={1} />;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-[#0d1117] rounded-xl shadow-2xl space-y-6 border border-zinc-200 dark:border-zinc-800">
      <h2 className="text-2xl font-bold text-center text-zinc-800 dark:text-zinc-100">
        <span className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-500 dark:to-indigo-600 text-transparent bg-clip-text">
          Encuentra el error en el código
        </span>
      </h2>

      {/* Simulador de editor de código profesional */}
      <div className="bg-[#1e1e1e] rounded-lg overflow-hidden shadow-2xl border border-zinc-700">
        {/* Barra de título del editor */}
        <div className="flex items-center px-4 py-2 bg-[#252526] border-b border-zinc-700">
          <div className="flex space-x-1.5 mr-3">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
          </div>
          <div className="text-sm text-zinc-400 font-medium">script.js</div>
        </div>
        
        {/* Área de código con numeración y sintaxis */}
        <div className="font-mono text-[15px] text-[#d4d4d4] overflow-auto max-h-[350px]">
          {code.map((line, index) => {
            const isSelected = selectedLine === index;
            const lineCorrect = submitted && index === correctLine;
            const lineWrong = submitted && isSelected && index !== correctLine;

            // Detección básica de sintaxis para resaltado
            const renderLine = () => {
              if (line.includes("function")) {
                return <span className="text-[#569cd6]">{line}</span>;
              }
              if (line.includes("return")) {
                return <span className="text-[#c586c0]">{line}</span>;
              }
              if (line.includes("const") || line.includes("let") || line.includes("var")) {
                return (
                  <>
                    <span className="text-[#569cd6]">{line.split(' ')[0]}</span>
                    <span> </span>
                    <span className="text-[#9cdcfe]">{line.split(' ')[1]}</span>
                    <span>{line.substring(line.indexOf('='))}</span>
                  </>
                );
              }
              if (line.includes("//")) {
                return <span className="text-[#6a9955]">{line}</span>;
              }
              return line;
            };

            return (
              <div
                key={index}
                onClick={() => !submitted && setSelectedLine(index)}
                className={`flex items-start px-4 py-1 transition-all duration-200 cursor-pointer group
                  ${isSelected && !submitted ? 'bg-[#264f78]' : ''}
                  ${lineCorrect ? '!bg-[#0d4429] border-l-4 border-green-500' : ''}
                  ${lineWrong ? '!bg-[#5a1d1d] border-l-4 border-red-500' : ''}
                  ${!isSelected && !lineCorrect && !lineWrong ? 'hover:bg-[#2a2d2e]' : ''}
                `}
              >
                <span className="inline-block w-8 text-right mr-4 text-zinc-500 select-none">{index + 1}</span>
                <span className="flex-1">{renderLine()}</span>
                {isSelected && !submitted && (
                  <span className="ml-2 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Botón de verificación o feedback */}
      {!showFinal && (
        <div className="text-center">
          {!submitted ? (
            <button
              onClick={handleSubmit}
              disabled={selectedLine === null}
              className="mt-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium px-8 py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20"
            >
              Verificar Respuesta
            </button>
          ) : (
            <div className={`mt-4 p-5 rounded-xl transition-all duration-300 ${isCorrect ? 'bg-[#0d2b1d]' : 'bg-[#2b0d0d]'} border ${isCorrect ? 'border-green-800' : 'border-red-800'}`}>
              {isCorrect ? (
                <p className="text-green-400 font-bold text-xl flex items-center justify-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  ¡Respuesta Correcta!
                </p>
              ) : (
                <>
                  <p className="text-red-400 font-bold text-xl flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    Respuesta Incorrecta
                  </p>
                  <div className="mt-4 text-left text-zinc-300 bg-black/30 p-4 rounded-lg border border-zinc-700">
                    <span className="font-bold block mb-2 text-green-400 dark:text-green-300">Explicación:</span>
                    <p className="text-base">{explanation}</p>
                  </div>
                  <div className="mt-6 flex justify-center gap-4">
                    <button
                      onClick={handleRetry}
                      className="bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 text-white font-medium px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg shadow-amber-500/20"
                    >
                      Reintentar
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}