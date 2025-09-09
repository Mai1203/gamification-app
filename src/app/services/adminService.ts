import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../lib/firebaseConfig";


export const isUserAdmin = async (userId: string): Promise<boolean> => {
  try {
    const adminRef = doc(db, "admins", userId);
    const adminSnap = await getDoc(adminRef);
    return adminSnap.exists();
  } catch (error) {
    console.error("Error verificando administrador:", error);
    return false;
  }
};

export const setUserAsAdmin = async (userId: string): Promise<void> => {
  try {
    const adminRef = doc(db, "admins", userId);
    await setDoc(adminRef, { isAdmin: true });
  } catch (error) {
    console.error("Error estableciendo administrador:", error);
    throw error;
  }
};


export const removeAdminRole = async (userId: string): Promise<void> => {
  try {
    const adminRef = doc(db, "admins", userId);
    await deleteDoc(adminRef);
  } catch (error) {
    console.error("Error removiendo administrador:", error);
    throw error;
  }
};