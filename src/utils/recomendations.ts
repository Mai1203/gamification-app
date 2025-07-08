// src/utils/recommendations.ts
import { modules } from "@/data/modules";

export function getRecommendedLessons() {
  const recommendations = [];

  for (const mod of modules) {
    const incomplete = mod.lessons.find((l) => !l.completed);
    if (incomplete) {
      recommendations.push({
        moduleTitle: mod.title,
        lessonTitle: incomplete.title,
        lessonDescription: incomplete.description,
        moduleId: mod.id,
      });
    }
  }

  return recommendations;
}
