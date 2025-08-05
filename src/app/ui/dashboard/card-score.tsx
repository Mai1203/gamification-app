'use client';
import { Trophy, Award, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useModulesWithProgress } from "@/app/hooks/useModulesWithProgress";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { getUserBadgesWithStatus } from "@/app/services/badgeService";

const Card = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const modules = useModulesWithProgress();
  const [completedActivities, setCompletedActivities] = useState(0);
  const [badgesCount, setBadgesCount] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);

  // Calcular actividades completadas y puntos
  useEffect(() => {
    if (modules.length > 0) {
      let completed = 0;
      let points = 0;
      
      modules.forEach(module => {
        module.lessons.forEach(lesson => {
          if (lesson.completed) {
            completed++;
            points += 12; 
          }
        });
      });
      
      setCompletedActivities(completed);
      setTotalPoints(points);
    }
  }, [modules]);

  // Obtener insignias del usuario
  useEffect(() => {
    const loadBadges = async () => {
      if (isLoaded && isSignedIn && user) {
        try {
          const userBadges = await getUserBadgesWithStatus(user.id);
          const unlockedBadges = userBadges.filter(badge => badge.unlocked);
          setBadgesCount(unlockedBadges.length);
        } catch (error) {
          console.error("Error loading badges:", error);
        }
      }
    };
    
    loadBadges();
  }, [isLoaded, isSignedIn, user]);

  const cards = [
    {
      icon: <Trophy className="h-7 w-7 text-white"/>,
      score: completedActivities.toString()+" - 20",
      title: "Atividades completadas",
    },
    {
      icon: <Award className="h-7 w-7 text-white"/>,
      score: badgesCount.toString() +" - 20",
      title: "Insignias Obtenidas",
    },
    {
      icon: <Star className="h-7 w-7 text-white"/>,
      score: totalPoints.toString(),
      title: "Puntos Totales",
    },
  ];

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
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 rounded-full dark:from-indigo-400 dark:to-purple-400">
            {card.icon}
          </div>
          <p className="text-xl font-bold text-gray-700 dark:text-white">{card.score}</p>
          <h3 className="text-l font-medium text-gray-700 dark:text-white">{card.title}</h3>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Card;