"use client";

import Editor from "@monaco-editor/react";
import { useState, useRef, useEffect } from "react";

type LiveHtmlGameProps = {
  initialCode: string;
};

export default function LiveHtmlGame({ initialCode }: LiveHtmlGameProps) {
  const [code, setCode] = useState(initialCode);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    updateIframeContent(initialCode); // Renderizar el código inicial
  }, []);

  const updateIframeContent = (html: string) => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentDocument) {
      iframe.contentDocument.open();
      iframe.contentDocument.write(html);
      iframe.contentDocument.close();
    }
  };

  const handleRun = () => {
    updateIframeContent(code);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-5xl mx-auto p-4">
      <h2 className="text-xl font-bold text-center">Escribe tu código HTML</h2>

      <Editor
        height="300px"
        defaultLanguage="html"
        value={code}
        onChange={(value) => setCode(value || "")}
        theme="vs-dark"
        options={{ fontSize: 14 }}
      />

      <button
        onClick={handleRun}
        className="self-center bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-md shadow hover:scale-105 transition"
      >
        Ejecutar
      </button>

      <div className="border rounded overflow-hidden w-full h-[300px] bg-white">
        <iframe
          ref={iframeRef}
          title="Resultado"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}
