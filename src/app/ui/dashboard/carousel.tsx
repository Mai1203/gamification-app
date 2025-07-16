"use client";

import { useState, useEffect, useCallback } from "react";
import CardCarousel from "./card-carousel";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const cards = [
    {
      title: "Aprende HTML",
      description: "¡Construye castillos con bloques de código mientras juegas y aprendes!",
      emoji: "🏗️",
      link: "/dashboard/html",
      imageUrl: "/img/carousel-html.jpg"
    },
    {
      title: "Aprende CSS",
      description: "¡Pinta arcoíris en la web mientras dominas el estilo con juegos interactivos!",
      emoji: "🎨",
      link: "/dashboard/css",
      imageUrl: "/img/carousel-css.jpg"
    },
    {
      title: "Aprende HTML",
      description: "¡Explora el mundo del código HTML de forma divertida y llena de desafíos!",
      emoji: "🧩", // Cambiado por uno que representa juego y desafío
      link: "/dashboard/html",
      imageUrl: "/img/carousel-html2.jpg"
    },
    {
      title: "Aprende CSS",
      description: "¡Juega con colores, formas y estilos mientras aprendes CSS como nunca antes!",
      emoji: "🌈", // Relacionado con colores y estilo visual
      link: "/dashboard/css",
      imageUrl: "/img/carousel-css2.jpg"
    }
  ];

  const nextCard = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  }, [cards.length]);

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  // Auto-desplazamiento cada 3 segundos (si no está pausado)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) nextCard();
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, nextCard]);

  return (
    <div className="relative w-full h-[70vh] mx-auto" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      {/* Contenedor principal al 100% */}
      <div className="h-full w-full overflow-hidden">
        <div
          className="flex h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {cards.map((card, index) => (
            <div key={index} className="w-full h-full flex-shrink-0 px-4">
              <CardCarousel {...card} className="h-full" /> {/* Pasamos className */}
            </div>
          ))}
        </div>
      </div>

      {/* Botones de navegación */}
      <button
        onClick={prevCard}
        className="absolute left-7 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg text-xl hover:bg-gray-100"
        aria-label="Anterior"
      >
        ◀️
      </button>
      <button
        onClick={nextCard}
        className="absolute right-7 top-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg text-xl hover:bg-gray-100"
        aria-label="Siguiente"
      >
        ▶️
      </button>

      {/* Indicadores de posición */}
      <div className="flex justify-center mt-4 space-x-2">
        {cards.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${currentIndex === index ? "bg-black" : "bg-gray-300"}`}
            aria-label={`Ir a tarjeta ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;