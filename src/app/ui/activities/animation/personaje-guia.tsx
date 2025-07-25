import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

type PersonajeGuiaProps = {
  mensaje: string;
};

export const PersonajeGuia = ({ mensaje }: PersonajeGuiaProps) => {
  const [typedMessage, setTypedMessage] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);
  const prevMessageRef = useRef("");

  useEffect(() => {
    // ⚠️ Solo reactiva la animación si el mensaje cambió
    if (prevMessageRef.current === mensaje) return;

    prevMessageRef.current = mensaje;
    setTypedMessage("");
    setTypingIndex(0);

    const interval = setInterval(() => {
      setTypingIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        setTypedMessage(mensaje.slice(0, nextIndex));

        if (nextIndex >= mensaje.length) {
          clearInterval(interval);
        }

        return nextIndex;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [mensaje]);

  return (
    <motion.div
      className="flex flex-col items-center gap-2 w-40"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 80, damping: 12 }}
    >
      <motion.img
        src="/img/personaje-guia.png"
        alt="Guía"
        className="w-36 h-36 object-contain drop-shadow-xl"
        animate={{
          y: [0, -6, 0],
          rotate: [0, -2, 2, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="relative bg-white text-indigo-800 border border-indigo-300 shadow-xl rounded-3xl px-4 py-3 text-sm max-w-[220px] font-medium leading-snug min-h-[70px]"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <span className="block whitespace-pre-line">
          {typedMessage}
          {typingIndex < mensaje.length && <span className="animate-pulse">|</span>}
        </span>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white" />
      </motion.div>
    </motion.div>
  );
};
