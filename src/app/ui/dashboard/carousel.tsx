"use client";

import { useState, useEffect, useCallback } from "react";
import CardCarousel from "./card-carousel";
import { motion } from "framer-motion";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(0); // 0: right, 1: left

  const cards = [
    {
      title: "Domina HTML",
      description: "Construye estructuras web sólidas mientras aprendes con desafíos interactivos",
      emoji: "🏗️",
      link: "/dashboard/html",
      imageUrl: "/img/carousel-html.jpg",
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "Crea con CSS",
      description: "Da vida a tus diseños con efectos visuales y animaciones sorprendentes",
      emoji: "🎨",
      link: "/dashboard/css",
      imageUrl: "/img/carousel-css.jpg",
      color: "from-purple-500 to-pink-600"
    },
    {
      title: "HTML para Jóvenes",
      description: "Aprende las bases de la web con juegos educativos diseñados para ti",
      emoji: "👩‍💻",
      link: "/dashboard/html",
      imageUrl: "/img/carousel-html2.jpg",
      color: "from-green-500 to-teal-600"
    },
    {
      title: "CSS Creativo",
      description: "Transforma páginas aburridas en experiencias visuales cautivadoras",
      emoji: "✨",
      link: "/dashboard/css",
      imageUrl: "/img/carousel-css2.jpg",
      color: "from-yellow-500 to-orange-600"
    },
    {
      title: "Proyectos Reales",
      description: "Desarrolla sitios completos aplicando todo lo aprendido",
      emoji: "🚀",
      link: "/dashboard/html",
      imageUrl: "/img/carousel-projects.png",
      color: "from-red-500 to-amber-600"
    }
  ];

  const nextCard = useCallback(() => {
    setDirection(0);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  }, [cards.length]);

  const prevCard = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  // Auto-desplazamiento cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) nextCard();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextCard]);

  // Animación de entrada/salida
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction === 0 ? "100%" : "-100%",
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction === 0 ? "-100%" : "100%",
      opacity: 0
    })
  };

  return (
    <div 
      className="relative w-full h-[70vh] mx-auto rounded-2xl overflow-hidden"
      onMouseEnter={() => setIsPaused(true)} 
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Contenedor principal */}
      <div className="h-full w-full overflow-hidden relative">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate={currentIndex === index ? "center" : "exit"}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className={`absolute top-0 left-0 w-full h-full ${currentIndex === index ? "z-10" : "z-0"}`}
          >
            <CardCarousel 
              {...card} 
              className="h-full"
              isActive={currentIndex === index}
            />
          </motion.div>
        ))}
      </div>

      {/* Botones de navegación */}
      <button
        onClick={prevCard}
        className="absolute left-7 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg text-xl backdrop-blur-sm z-20 transition-all"
        aria-label="Anterior"
      >
        <span className="block w-6 h-6">◀</span>
      </button>
      <button
        onClick={nextCard}
        className="absolute right-7 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg text-xl backdrop-blur-sm z-20 transition-all"
        aria-label="Siguiente"
      >
        <span className="block w-6 h-6">▶</span>
      </button>

      {/* Indicadores de posición */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentIndex === index 
                ? "bg-white scale-125" 
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Ir a tarjeta ${index + 1}`}
          />
        ))}
      </div>

      {/* Contador */}
      <div className="absolute top-4 right-4 bg-black/30 text-white text-sm px-3 py-1 rounded-full backdrop-blur-sm z-20">
        {currentIndex + 1} / {cards.length}
      </div>
    </div>
  );
};

export default Carousel;