import { db } from "@/app/lib/firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";

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
