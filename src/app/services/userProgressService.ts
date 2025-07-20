import { db } from "@/app/lib/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";
import { initialModules } from "@/data/initialModules";

/**
 * Crea o sobrescribe la subcolección de progreso del usuario con los módulos iniciales.
 * @param userId - ID del usuario autenticado.
 */
export const saveUserProgress = async (userId: string) => {
  try {
    const progressRef = doc(db, "users", userId);

    await setDoc(progressRef, { hasProgress: true }, { merge: true });

    for (const mod of initialModules) {
      const moduleRef = doc(db, `users/${userId}/progress`, mod.id);
      await setDoc(moduleRef, {
        lessons: mod.lessons,
      });
    }

    console.log("✅ Progreso inicial guardado exitosamente.");
  } catch (error) {
    console.error("❌ Error al guardar el progreso del usuario:", error);
  }
};
