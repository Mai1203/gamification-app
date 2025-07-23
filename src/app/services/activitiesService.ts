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
      locked: data.locked,
      completed: data.completed,
      description: data.description,
      content: data.content, // Asegúrate que esto existe en Firestore
    };
  });

  return activities;
};


export const getActivityById = async (activityId: string) => {
  const ref = doc(db, "modules", "html", "lessons", "html-1", "activities", activityId);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    const data = snap.data();
    return {
      id: snap.id,
      description: data.description,
      content: data.content,
    };
  } else {
    console.warn("Actividad no encontrada");
    return null;
  }
};


