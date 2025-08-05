'use client';
import { motion } from "framer-motion";
import Link from "next/link";
import { Header } from "@/app/ui/home/Header";
import { Cards } from "@/app/ui/home/Cards";
import { Footer } from "@/app/ui/home/Footer";
import { Animation } from "@/app/ui/home/Animation"
import AnimatedText from "@/app/ui/animatedText";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:bg-gradient-to-br dark:from-[#0D0D0D] dark:via-[#0D0D0D] dark:to-[#0D0D0D]"
    >
      <div className="hidden dark:block fixed inset-0 z-0">
        <div className="absolute top-[5%] left-[5%] w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-purple-600 rounded-full blur-3xl opacity-30" />
        <div className="absolute top-[5%] right-[5%] w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-indigo-600 rounded-full blur-3xl opacity-30" />
      </div>  

      <div className="relative z-10">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="lg:w-1/2 space-y-7"
            >
              {/* Texto principal con envoltura de palabras */}
              <AnimatedText 
                type="bounce" 
                className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white"
                stagger={0.5}
                mode="words"
                duration={0.4}
              >
                ¡Aprender jugando con desafíos reales!
              </AnimatedText>
              
              {/* Descripción con animación máquina de escribir */}
              <AnimatedText 
                type="typewriter" 
                duration={6}
                stagger={0.06}
                className="text-xl text-gray-600 dark:text-gray-300"
              >
                Aprende HTML, CSS y JavaScript de manera interactiva y efectiva.
                Construye proyectos reales mientras juegas y ganas puntos.
              </AnimatedText>
    
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
                  whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}
                >
                  <Link
                    href="/dashboard"
                    className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white text-lg font-semibold rounded-xl transition-all duration-300 transform cursor:pointer"
                  >
                    ¡Empieza Ahora!
                  </Link>
                </motion.button>
              </div>
            </motion.div>
    
            <Animation />
          </div>
          <Cards />
        </main>
        <Footer />
      </div>
    </motion.div>
  );
}