'use client'

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const Animation = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Detecta si el HTML tiene la clase 'dark'
    const dark = document.documentElement.classList.contains("dark");
    setIsDarkMode(dark);

    // Observa cambios en el atributo 'class' del HTML
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
      className="lg:w-1/2 flex justify-center"
    >
      <DotLottieReact
        key={isDarkMode ? "dark" : "light"}
        autoplay
        loop
        src={isDarkMode ? "/animation/game-dark.json" : "/animation/game-light2.json"}
        className="w-full max-w-2xl h-auto"
      />
    </motion.div>
  );
};
