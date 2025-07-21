// src/utils/recommendations.ts
import { initialModules } from "@/data/initialModules";

export function getRecommendedLessons() {
  const recommendations = [];

  for (const mod of initialModules) {
    const incomplete = mod.lessons.find((l) => !l.completed);
    if (incomplete) {
      recommendations.push({
        moduleTitle: mod.title,
        Description: mod.description,
        lessonTitle: incomplete.title,
        moduleId: mod.id,
      });
    }
  }

  return recommendations;
}
