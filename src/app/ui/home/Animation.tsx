'use client';
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export const Animation = () => {
  return(
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
      className="lg:w-1/2 flex justify-center"
    >
      <DotLottieReact
        autoplay
        loop
        src="/animation/game-light2.json"
        className="w-full max-w-2xl h-auto"
      />
    </motion.div>
  )
}

