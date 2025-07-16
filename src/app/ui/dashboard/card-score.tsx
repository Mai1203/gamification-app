'use client';
import { Trophy, Award, Star } from "lucide-react";
import { motion } from "framer-motion";

const cards = [
  {
    icon: <Trophy className="h-7 w-7 text-white"/>,
    score: "5",
    title: "Atividades completadas",
  },
  {
    icon: <Award className="h-7 w-7 text-white"/>,
    score: "10",
    title: "Insignias Obtenidas",
  },
  {
    icon: <Star className="h-7 w-7 text-white"/>,
    score: "15",
    title: "Puntos Totales",
  },
]

const Card = () => {
  return (
    <motion.div
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
      className="mx-5 mb-5 grid grid-cols-1 md:grid-cols-3 gap-16"
    >
      {cards.map((card, index) => (
        <motion.div
          key={index}
          whileHover={{ y: -10, transition: { duration: 0.3 } }}
          className="bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-md text-center flex flex-col items-center gap-3"
        >
          <div className="bg-gradient-to-r bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-full dark:from-indigo-400 dark:to-purple-400">
            {card.icon}
          </div>
          <p className="text-xl font-bold dark:text-white">{card.score}</p>
          <h3 className="text-l font-medium dark:text-white">{card.title}</h3>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Card;