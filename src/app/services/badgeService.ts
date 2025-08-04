// services/badgeService.ts

import { db } from '@/app/lib/firebaseConfig';
import { doc, updateDoc, arrayUnion, getDoc } from 'firebase/firestore';

import { badges } from '@/data/badgeData';

// Desbloquear insignia para un usuario
export const unlockBadgeForUser = async (userId: string, badgeId: number) => {
  try{
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists) {
      throw new Error("Usuario no encontrado");
    }

    const unlockedBadges = userDoc.data()?.unlockedBadges || [];

    if (!unlockedBadges.includes(badgeId)) {
      await updateDoc(userRef, {
        unlockedBadges: arrayUnion(badgeId)
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error desbloqueando insignia:", error);
    return false;
  }
  
};

// Obtener insignias desbloqueadas de un usuario
export const getUserBadges = async (userId: string): Promise<number[]> => {
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);
  return userDoc.data()?.unlockedBadges || [];
};

// Obtener todas las insignias con estado de desbloqueo
export const getUserBadgesWithStatus = async (userId: string) => {
  const unlockedBadgeIds = await getUserBadges(userId);
  return badges.map(badge => ({
    ...badge,
    unlocked: unlockedBadgeIds.includes(badge.id)
  }));
};