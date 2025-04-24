"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Header } from "@/app/ui/home/Header";
import { Carts } from "@/app/ui/home/Carts";
import { Footer } from "@/app/ui/home/Footer";
import { Animation } from "@/app/ui/home/Animation"

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100"
    >
      <Header />
      <main className="container mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="lg:w-1/2 space-y-6"
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900">
              ¡La forma divertida de aprender desarrollo web!
            </h1>
            <p className="text-xl text-gray-600">
              Aprende HTML, CSS y JavaScript de manera interactiva y efectiva.
              Construye proyectos reales mientras juegas y ganas puntos.
            </p>

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
        <Carts />
      </main>
      <Footer />
    </motion.div>
  );
}
