import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/app/lib/firebaseConfig";
import { saveUserProgress } from "./userProgressService";

/**
 * Crea un usuario en Firestore si no existe.
 * @param userId - ID único del usuario (proporcionado por Clerk).
 * @param name - Nombre completo del usuario.
 * @param email - Correo electrónico del usuario.
 */
export const createUserIfNotExists = async (
  userId: string,
  name: string,
  email: string
): Promise<void> => {
  try {
    if (!userId || !email) {
      console.warn("❗ userId o email inválido.");
      return;
    }

    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        name: name || "Sin nombre",
        email,
        createdAt: new Date().toISOString(),
      });
      console.log("✅ Usuario creado en Firestore.");
      await saveUserProgress(userId);
    } else {
      console.log("ℹ️ Usuario ya existe.");
    }
  } catch (error) {
    console.error("❌ Error creando usuario en Firestore:", error);
  }
};
