// services/activitiesService.ts
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebaseConfig"; 

export const getActivities = async () => {
  const querySnapshot = await getDocs(
    collection(db, "modules", "html", "lessons", "html-1", "activities")
  );

  const activities = querySnapshot.docs.map(doc => {
    const data = doc.data();

    return {
      id: doc.id,
      description: data.description,
      content: data.content, // Asegúrate que esto existe en Firestore
    };
  });

  return activities;
};

