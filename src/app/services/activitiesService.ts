// services/activitiesService.ts
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebaseConfig"; 

export const getActivities = async () => {
  const querySnapshot = await getDocs(
    collection(db, "modules", "html", "lessons", "html-1", "activities")
  );

  const activities = querySnapshot.docs.map(doc => {
    const data = doc.data();

    return {
      id: doc.id,
      locked: data.locked ?? false,
      completed: data.completed ?? false,
      description: data.description ?? "",
      content: data.content ?? {},
    };
  });

  return activities;
};

/**
 * Obtiene los datos de la actividad según el módulo y nivel.
 * La subcolección "activities" debe estar bajo cada lección.
 */
export const getActivityData = async (module: string, level: number) => {
  const lessonId = `${module}-1`; 
  const levelId = `level-${level}`; 

  const levelRef = doc(
    db,
    "modules",
    module,
    "lessons",
    lessonId,
    "levels",
    levelId
  );
  const levelSnap = await getDoc(levelRef);
  if (!levelSnap.exists()) return null;

  const activityId = "actividad-1";

  const activityRef = doc(
    db,
    "modules",
    module,
    "lessons",
    lessonId,
    "levels",
    levelId,
    "activity",
    activityId
  );
  const activitySnap = await getDoc(activityRef);
  if (!activitySnap.exists()) return null;

  const activityData = activitySnap.data();

  return {
    id: activitySnap.id,
    level: level,
    type: activityData.type ?? "code-fill",
    description: activityData.description ?? "",
    content: activityData.content ?? {},
    answers: activityData.answers ?? [],
  };
};
