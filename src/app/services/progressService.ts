import { db } from "@/app/lib/firebaseConfig";
import { collection, onSnapshot, doc, getDoc, updateDoc } from "firebase/firestore";

export type LessonProgress = {
  title: string;
  completed: boolean;
  locked: boolean;
};

export type UserModuleProgress = {
  id: string; // módulo: 'html', 'css', etc.
  lessons: LessonProgress[];
};

export const listenToUserProgress = (
  userId: string,
  callback: (data: UserModuleProgress[]) => void
) => {
  const progressRef = collection(db, "users", userId, "progress");

  return onSnapshot(progressRef, (querySnapshot) => {
    const progressData: UserModuleProgress[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as Omit<UserModuleProgress, "id">),
    }));

    callback(progressData);
  });
};

export const updateProgress = async (
  userId: string,
  moduleId: string,
  level: number
) => {
  try {
    const docRef = doc(db, "users", userId, "progress", moduleId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      throw new Error("Documento de progreso no encontrado");
    }

    const data = docSnap.data();
    const lessons = [...data.lessons];

    // Marcar nivel actual como completado
    if (lessons[level]) lessons[level].completed = true;

    // Desbloquear el siguiente nivel si existe
    if (lessons[level + 1]) lessons[level + 1].locked = false;

    await updateDoc(docRef, { lessons });

    return true;
  } catch (error) {
    console.error("Error al actualizar progreso:", error);
    return false;
  }
};
