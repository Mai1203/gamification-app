import { useEffect, useState } from "react";
import { listenToUserProgress } from "@/app/services/progressService";
import { initialModules } from "@/data/initialModules";
import { useUser } from "@clerk/nextjs";
import {  UserProgress, ModuleWithProgress } from "@/types/modules";

export const useModulesWithProgress = () => {
  const { user } = useUser();
  const [modules, setModules] = useState<ModuleWithProgress[]>([]);

  useEffect(() => {
    if (!user) return;

    const unsubscribe = listenToUserProgress(user.id, (progress: UserProgress[]) => {
      const merged = initialModules.map((mod) => {
        const userMod = progress.find((p) => p.id === mod.id);

        return {
          ...mod,
          lessons: mod.lessons.map((lesson, idx) => ({
            ...lesson,
            completed: userMod?.lessons?.[idx]?.completed ?? false,
            locked: userMod?.lessons?.[idx]?.locked ?? (idx !== 0),
          })),
        };
      });

      setModules(merged);
    });

    return () => unsubscribe(); // Limpia el listener al desmontar
  }, [user]);

  return modules;
};
