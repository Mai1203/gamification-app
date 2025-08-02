import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const CompletionCard = () => {
  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      {/* Tarjeta principal */}
      <motion.div 
        className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 rounded-2xl shadow-2xl p-8 max-w-md w-full relative overflow-hidden"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "backOut" }}
      >
        {/* Efecto de brillo */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]"></div>
        
        {/* Decoración de esquina */}
        <div className="absolute top-4 right-4 w-12 h-12 border-t-4 border-r-4 border-yellow-400 rounded-tr-2xl"></div>
        <div className="absolute bottom-4 left-4 w-12 h-12 border-b-4 border-l-4 border-yellow-400 rounded-bl-2xl"></div>
        
        {/* Contenido */}
        <div className="relative z-10 text-center">
          <motion.div
            className="mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, 10, -10, 5, 0] }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="text-7xl mb-4 text-yellow-400">🏆</div>
          </motion.div>
          
          <motion.h1 
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            ¡Felicidades!
          </motion.h1>
          
          <motion.p 
            className="text-xl text-purple-200 mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Has completado todos los niveles
          </motion.p>
          
          <motion.div 
            className="text-2xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            HTML + CSS Master
          </motion.div>
          
          {/* Confeti animado simple */}
          <div className="flex justify-center gap-3 my-8">
            <motion.div
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 20, 0]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                repeatType: "mirror",
                delay: 0.2
              }}
              className="text-3xl"
            >
              🎉
            </motion.div>
            <motion.div
              animate={{ 
                y: [0, -15, 0],
                rotate: [0, -15, 0]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                repeatType: "mirror",
                delay: 0.4
              }}
              className="text-3xl"
            >
              🎊
            </motion.div>
            <motion.div
              animate={{ 
                y: [0, -25, 0],
                rotate: [0, 10, 0]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                repeatType: "mirror",
                delay: 0.6
              }}
              className="text-3xl"
            >
              ✨
            </motion.div>
          </div>
          
          <motion.p 
            className="mb-8 text-purple-300 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
          >
            Dominar CSS es un logro que pocos alcanzan
          </motion.p>
          
          {/* Botón */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <motion.button
              onClick={() => window.location.href = "/dashboard"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 px-8 rounded-full shadow-lg cursor-pointer"
            >
              ¡Ir a la página principal!
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default CompletionCard;