'use client';

import { useState, useRef, useEffect } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { RotateCw, Eye, CodeIcon, Copy, Check, Maximize, Minimize } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  defaultHtml: string;
  defaultCss?: string;
  mode?: 'html' | 'css';
  onHtmlChange?: (html: string) => void;
  onCssChange?: (css: string) => void;
};

type IStandaloneCodeEditor = monaco.editor.IStandaloneCodeEditor;

export default function EditorLive({ defaultHtml, defaultCss = '', mode = 'html', onHtmlChange, onCssChange }: Props) {
  const [htmlCode, setHtmlCode] = useState(defaultHtml);
  const [cssCode, setCssCode] = useState(defaultCss);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'split' | 'code' | 'preview'>('split');
  const [activeTab, setActiveTab] = useState<'html' | 'css'>('html'); // Nuevo estado para pestañas
  const editorRef = useRef<IStandaloneCodeEditor | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLIFrameElement>(null);

  // Combinar HTML + CSS para la vista previa
  const fullCode = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>${cssCode}</style>
    </head>
    <body>
      ${htmlCode}
    </body>
    </html>
  `;

  // Notificar cambios a los componentes padres
  useEffect(() => {
    onHtmlChange?.(htmlCode);
  }, [htmlCode, onHtmlChange]);

  useEffect(() => {
    onCssChange?.(cssCode);
  }, [cssCode, onCssChange]);

  // Toggle fullscreen mode
  const toggleFullscreen = () => {
    if (!isFullscreen && containerRef.current) {
      containerRef.current.requestFullscreen().catch(console.error);
    } else if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isCurrentlyFullscreen);
      
      setTimeout(() => {
        if (previewRef.current) {
          previewRef.current.srcdoc = fullCode;
        }
      }, 100);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [fullCode]);

  // Copy code to clipboard
  const copyToClipboard = async () => {
    try {
      const codeToCopy = mode === 'css' ? cssCode : htmlCode;
      await navigator.clipboard.writeText(codeToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code', err);
    }
  };

  // Reset to default code
  const resetCode = () => {
    setHtmlCode(defaultHtml);
    setCssCode(defaultCss || '');
  };

  // Handle editor mount
  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  // Render principal
  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white dark:bg-zinc-900 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-zinc-800 ${
        isFullscreen ? 'fixed inset-0 z-50 h-screen' : 'relative'
      }`}
    >
      {/* Header con controles */}
      <div className="flex justify-between items-center bg-gray-50 dark:bg-zinc-800 px-4 py-3 border-b border-gray-200 dark:border-zinc-700">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-2">
            {mode === 'css' ? 'styles.css' : 'index.html'}
          </span>
        </div>
        
        <div className="flex space-x-2">
          {/* Selector de vista */}
          <div className="hidden md:flex items-center bg-gray-100 dark:bg-zinc-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('code')}
              className={`px-3 py-1 rounded-md text-sm cursor-pointer ${
                viewMode === 'code' 
                  ? 'bg-white text-gray-400 dark:bg-zinc-600 shadow' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <CodeIcon size={16} className="inline mr-1" />
              Código
            </button>
            <button
              onClick={() => setViewMode('preview')}
              className={`px-3 py-1 rounded-md text-sm cursor-pointer ${
                viewMode === 'preview' 
                  ? 'bg-white text-gray-400 dark:bg-zinc-600 shadow' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <Eye size={16} className="inline mr-1" />
              Vista
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`px-3 py-1 rounded-md text-sm cursor-pointer ${
                viewMode === 'split' 
                  ? 'bg-white text-gray-400 dark:bg-zinc-600 shadow' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <div className="flex items-center cursor-pointer">
                <CodeIcon size={16} className="mr-1" />
                <span className="mx-1">|</span>
                <Eye size={16} className="ml-1" />
              </div>
            </button>
          </div>
          
          {/* Botones de acción */}
          <button
            onClick={resetCode}
            className="p-2 rounded-lg hover:bg-gray-200 text-gray-500 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
            title="Resetear código"
          >
            <RotateCw size={18} />
          </button>
          
          <button
            onClick={copyToClipboard}
            className="p-2 rounded-lg hover:bg-gray-200 text-gray-500 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
            title="Copiar código"
          >
            {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
          </button>
          
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg hover:bg-gray-200 text-gray-500 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
            title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
          >
            {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>
        </div>
      </div>

      {/* Editor y Vista Previa */}
      <div className={`flex flex-col md:flex-row ${isFullscreen ? 'h-[calc(100vh-7.5rem)]' : ''}`}>
        {(viewMode === 'split' || viewMode === 'code') && (
          <div className={`w-full ${viewMode === 'split' ? 'md:w-1/2' : ''} ${isFullscreen ? 'h-full' : ''}`}>
            {/* Pestañas solo en modo CSS */}
            {mode === 'css' && (
              <div className="flex bg-gray-100 dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700">
                <button
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === 'html'
                      ? 'text-indigo-600 border-b-2 border-indigo-500 bg-white dark:bg-zinc-700'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
                  }`}
                  onClick={() => setActiveTab('html')}
                >
                  HTML
                </button>
                <button
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === 'css'
                      ? 'text-indigo-600 border-b-2 border-indigo-500 bg-white dark:bg-zinc-700'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400'
                  }`}
                  onClick={() => setActiveTab('css')}
                >
                  CSS
                </button>
              </div>
            )}

            {/* Editor principal */}
            <Editor
              key={mode === 'css' ? activeTab : 'html'}
              height={isFullscreen ? "100%" : "300px"}
              defaultLanguage={mode === 'css' && activeTab === 'css' ? 'css' : 'html'}
              value={mode === 'css' ? (activeTab === 'html' ? htmlCode : cssCode) : htmlCode}
              theme="vs-dark"
              onChange={(value) => {
                if (mode === 'css') {
                  if (activeTab === 'html') {
                    setHtmlCode(value || "");
                  } else {
                    setCssCode(value || "");
                  }
                } else {
                  setHtmlCode(value || "");
                }
              }}
              onMount={handleEditorDidMount}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                fontFamily: "'Fira Code', monospace",
                fontLigatures: true,
                lineNumbers: 'on',
              }}
            />
          </div>
        )}
        
        {(viewMode === 'split' || viewMode === 'preview') && (
          <div 
            className={`w-full bg-gray-50 dark:bg-zinc-800 ${
              viewMode === 'split' ? 'md:w-1/2' : ''
            } ${viewMode === 'split' ? 'border-l border-gray-200 dark:border-zinc-700' : ''} ${isFullscreen ? 'h-full' : ''}`}
          >
            <div className="p-2 text-xs text-gray-500 dark:text-gray-400 flex justify-between">
              <span>Vista previa</span>
              <span>{mode === 'css' ? 'HTML + CSS' : 'HTML'}</span>
            </div>
            <iframe
              ref={previewRef}
              className={`w-full ${isFullscreen ? 'h-[calc(100%-2rem)]' : 'h-64 md:h-[300px]'} bg-white`}
              srcDoc={fullCode}
              title="Resultado"
              sandbox="allow-same-origin allow-scripts"
            />
          </div>
        )}
      </div>

      {/* Barra de estado */}
      <div className="bg-gray-50 dark:bg-zinc-800 px-4 py-2 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-zinc-700 flex justify-between">
        <div>
          {mode === 'css' ? 'HTML + CSS' : 'HTML'} <span className="hidden md:inline">| Live Preview</span>
        </div>
        <div>
          {mode === 'css' 
            ? `${htmlCode.length + cssCode.length} caracteres` 
            : `${htmlCode.length} caracteres`}
        </div>
      </div>
      
      {/* Botones flotantes para móviles */}
      <div className="md:hidden fixed bottom-4 right-4 flex flex-col space-y-2 z-10">
        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-green-500 text-white px-3 py-2 rounded-lg shadow-lg"
            >
              ¡Código copiado!
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="flex space-x-2">
          {mode === 'css' && (
            <button
              onClick={() => setActiveTab(activeTab === 'html' ? 'css' : 'html')}
              className="bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
              title={`Cambiar a ${activeTab === 'html' ? 'CSS' : 'HTML'}`}
            >
              {activeTab === 'html' ? 'CSS' : 'HTML'}
            </button>
          )}
          
          <button
            onClick={() => setViewMode(viewMode === 'split' ? 'preview' : viewMode === 'preview' ? 'code' : 'split')}
            className="bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
            title="Cambiar vista"
          >
            {viewMode === 'code' ? (
              <div className="flex items-center justify-center">
                <CodeIcon size={14} className="mr-0.5"/>|<Eye size={14} className="ml-0.5"/>
              </div>
            ) : viewMode === 'preview' ? (
              <CodeIcon size={20} />
            ) : ( 
              <Eye size={20} />
            )}
          </button>
          
          <button
            onClick={toggleFullscreen}
            className="bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
            title={isFullscreen ? "Salir de pantalla completa" : "Pantalla completa"}
          >
            {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}