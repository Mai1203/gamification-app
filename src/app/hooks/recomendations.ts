// src/app/hooks/useRecommendedLessons.ts
import { useModulesWithProgress } from "@/app/hooks/useModulesWithProgress";

export function useRecommendedLessons() {
  const modules = useModulesWithProgress();
  const recommendations = [];
  
  const currentModuleHtml = modules.find((m) => m.id === "html");
  const currentModuleCss = modules.find((m) => m.id === "css");

  // Para HTML
  if (currentModuleHtml) {
    const incompleteHtml = currentModuleHtml.lessons.filter(l => !l.completed);
    if (incompleteHtml.length > 0) {
      recommendations.push({
        moduleTitle: currentModuleHtml.title,
        lessonTitle: incompleteHtml[0].title,
        moduleId: currentModuleHtml.id,
      });
    }
  }

  // Para CSS
  if (currentModuleCss) {
    const incompleteCss = currentModuleCss.lessons.filter(l => !l.completed);
    if (incompleteCss.length > 0) {
      recommendations.push({
        moduleTitle: currentModuleCss.title,
        lessonTitle: incompleteCss[0].title,
        moduleId: currentModuleCss.id,
      });
    }
  }

  return recommendations;
}