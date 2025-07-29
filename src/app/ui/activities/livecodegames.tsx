"use client";

import Editor from "@monaco-editor/react";
import { useState, useRef, useEffect, useCallback } from "react";
import { ValidationFunction, ValidationResult } from "@/types/liveCoding";

import PagFinal from "./pagFinalizar/pagFinal";

type LiveCodingActivityProps = {
  content: {
    description: string;
    initialCode: string;
    validation: string;
    hints: string[];
    resources: { label: string; code: string }[];
    difficulty: string;
    points: number;
  };
};

export default function LiveCodingActivity({
  content
}: LiveCodingActivityProps) {
  const [code, setCode] = useState(content.initialCode);
  const [isValid, setIsValid] = useState(false);
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [currentHint, setCurrentHint] = useState(0);
  const [completed, setCompleted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const validationFnRef = useRef<ValidationFunction | null>(null);
  const [nextLevel, setNextLevel] = useState(false);

  const validateContent = useCallback(() => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentDocument && validationFnRef.current) {
      try {
        // Ejecutar la función con tipo seguro
        const result: ValidationResult = validationFnRef.current(iframe.contentDocument);
        setIsValid(result.valid);
        setIsAdvanced(result.advanced || false);
        setValidationMessage(result.message);
        
        if (result.valid && !completed) {
          setCompleted(true);
        }
      } catch (error) {
        setValidationMessage("Error en validación: " + (error as Error).message);
      }
    }
  }, [completed]);

  const updateIframeContent = useCallback((html: string) => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentDocument) {
      iframe.contentDocument.open();
      iframe.contentDocument.write(html);
      iframe.contentDocument.close();
      validateContent();
    }
  }, [validateContent]);
  // Crear función de validación con tipo seguro
  useEffect(() => {
    try {
      // Crear la función con tipo explícito
      const fn: ValidationFunction = new Function(
        "doc",
        `return (${content.validation})(doc)`
      ) as ValidationFunction;
      
      validationFnRef.current = fn;
    } catch (error) {
      console.error("Error creating validation function", error);
      validationFnRef.current = null;
      setValidationMessage("Error en la función de validación");
    }
    updateIframeContent(code);
  }, [content.validation, code, updateIframeContent]);

  const handleNextLevel = () => {
    setNextLevel(true);
  }

  const handleRun = () => {
    updateIframeContent(code);
  };

  const handleChange = (value: string = "") => {
    setCode(value);
  };

  const showHint = () => {
    if (currentHint < content.hints.length) {
      setCurrentHint(currentHint + 1);
    }
  };

  const resetChallenge = () => {
    setCode(content.initialCode);
    setCurrentHint(0);
    setCompleted(false);
    setIsValid(false);
    setIsAdvanced(false);
    setValidationMessage("");
    updateIframeContent(content.initialCode);
  };

  if (nextLevel) return <PagFinal score={1} total={1} />;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="flex justify-between items-center">
          <div>
            <span className="bg-white text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
              {content.difficulty === "beginner" 
                ? "Principiante" 
                : content.difficulty === "advanced" 
                  ? "Avanzado" 
                  : "Intermedio"}
            </span>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">⭐ {content.points}</div>
            <div className="text-sm">puntos</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-bold text-lg mb-2">🎯 Objetivo</h3>
            <p className="mb-4">{content.description}</p>
            <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-bold">💡 Pistas</h4>
                <button 
                  onClick={showHint}
                  disabled={currentHint >= content.hints.length}
                  className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-3 py-1 rounded text-sm disabled:opacity-50"
                >
                  Mostrar pista
                </button>
              </div>
              {currentHint > 0 && (
                <ul className="list-disc pl-5 space-y-1 text-yellow-700">
                  {content.hints.slice(0, currentHint).map((hint, index) => (
                    <li key={index}>{hint}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Editor
              height="400px"
              defaultLanguage="html"
              value={code}
              onChange={handleChange}
              theme="vs-dark"
              options={{ 
                fontSize: 14,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: "on"
              }}
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleRun}
              className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg shadow font-bold"
            >
              ▶️ Ejecutar código
            </button>
            <button
              onClick={resetChallenge}
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-3 rounded-lg"
              title="Reiniciar desafío"
            >
              🔄
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className={`border-2 rounded-lg overflow-hidden transition-all ${
            isAdvanced ? "border-purple-500 shadow-lg" : 
            isValid ? "border-green-500" : "border-red-500"
          }`}>
            <div className="p-3 bg-gray-100 flex justify-between items-center">
              <strong>Resultado</strong>
              <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                isAdvanced ? "bg-purple-500 text-white" : 
                isValid ? "bg-green-500 text-white" : "bg-red-500 text-white"
              }`}>
                {isAdvanced ? "AVANZADO" : isValid ? "VÁLIDO" : "NO VÁLIDO"}
              </div>
            </div>
            <iframe
              ref={iframeRef}
              title="Resultado"
              className="w-full h-[400px] bg-white"
              sandbox="allow-same-origin"
            />
          </div>

          <div className={`p-4 rounded-lg ${
            isAdvanced ? "bg-purple-100 text-purple-800 border border-purple-300" : 
            isValid ? "bg-green-100 text-green-800 border border-green-300" : "bg-red-100 text-red-800 border border-red-300"
          }`}>
            {validationMessage || (isValid ? "¡Código válido!" : "Ejecuta tu código para validar")}
          </div>

          {completed && (
            <div className="bg-gradient-to-r from-green-400 to-emerald-500 text-white p-4 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="text-3xl">🎉</div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg">¡Desafío completado!</h3>
                  <p>Has ganado {content.points} puntos</p>
                </div>
                <button
                  onClick={handleNextLevel}
                  className="bg-white text-emerald-600 hover:bg-gray-100 font-bold py-2 px-4 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg cursor-pointer"
                >
                  Siguiente Nivel
                </button>
              </div>
            </div>
          )}

          {content.resources.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="font-bold mb-3">📚 Recursos útiles</h3>
              <div className="grid grid-cols-1 gap-3">
                {content.resources.map((resource, index) => (
                  <div key={index} className="bg-white p-3 rounded border border-gray-200">
                    <div className="font-medium">{resource.label}</div>
                    <pre className="text-xs bg-gray-800 text-green-400 p-2 rounded mt-1 overflow-x-auto">
                      {resource.code}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}