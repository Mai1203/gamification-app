// src/app/services/userAdminService.ts
import { 
  collection, 
  getDocs, 
  doc, 
  query, 
  where, 
  orderBy, 
  limit, 
  startAfter,
  getDoc,
  DocumentData,
  QueryDocumentSnapshot
} from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';
import { Project } from './projectService';

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
  createdAt: string;
  lastLogin?: string;
  progress?: {
    html: number;
    css: number;
  };
  projects?: Project[]; // Tipo específico en lugar de any[]
}

interface Lesson {
  completed: boolean;
  // Agrega otras propiedades que puedan existir en tus lecciones
  locked?: boolean;
  title?: string;
  // ... otras propiedades según tu estructura de datos
}

export interface UserStats {
  totalUsers: number;
  totalAdmins: number;
  activeToday: number;
}

const ITEMS_PER_PAGE = 10;

// Función para calcular el progreso de un módulo específico
const calculateModuleProgress = async (userId: string, moduleId: string): Promise<number> => {
  try {
    const progressRef = doc(db, 'users', userId, 'progress', moduleId);
    const progressSnap = await getDoc(progressRef);
    
    if (!progressSnap.exists()) {
      return 0;
    }
    
    const progressData = progressSnap.data();
    const lessons = progressData.lessons || [];
    
    if (lessons.length === 0) {
      return 0;
    }
    
    const completedLessons = lessons.filter((lesson: Lesson) => lesson.completed === true);
    return Math.round((completedLessons.length / lessons.length) * 100);
  } catch (error) {
    console.error(`Error calculando progreso para módulo ${moduleId}:`, error);
    return 0;
  }
};

// Obtener lista de usuarios con paginación
export const getUsers = async (
  lastVisible: QueryDocumentSnapshot<DocumentData> | null = null, 
  searchTerm: string = ''
): Promise<{ 
  users: User[], 
  lastVisible: QueryDocumentSnapshot<DocumentData> | null, 
  hasMore: boolean 
}> => {
  try {
    let q;
    const usersCollection = collection(db, 'users');
    
    if (searchTerm) {
      q = query(
        usersCollection,
        where('name', '>=', searchTerm),
        where('name', '<=', searchTerm + '\uf8ff'),
        orderBy('name'),
        limit(ITEMS_PER_PAGE)
      );
    } else {
      q = query(
        usersCollection,
        orderBy('name'),
        limit(ITEMS_PER_PAGE)
      );
    }

    if (lastVisible) {
      q = query(q, startAfter(lastVisible));
    }

    const querySnapshot = await getDocs(q);
    const users: User[] = [];

    for (const document of querySnapshot.docs) {
      const data = document.data();
      
      // Verificar si es administrador
      const adminDocRef = doc(db, 'admins', document.id);
      const adminDoc = await getDoc(adminDocRef);
      const isAdmin = adminDoc.exists();

      // Obtener progreso de HTML y CSS desde la ruta correcta
      const htmlProgress = await calculateModuleProgress(document.id, 'html');
      const cssProgress = await calculateModuleProgress(document.id, 'css');

      // Obtener proyectos del usuario (puede ser opcional para mejorar rendimiento)
      // const projects = await getUserProjects(document.id);

      users.push({
        id: document.id,
        name: data.name || 'Sin nombre',
        email: data.email,
        isAdmin: isAdmin,
        createdAt: data.createdAt,
        lastLogin: data.lastLogin,
        progress: {
          html: htmlProgress,
          css: cssProgress
        }
        // projects: projects // Descomentar si quieres cargar proyectos aquí
      });
    }

    return {
      users,
      lastVisible: querySnapshot.docs[querySnapshot.docs.length - 1] || null,
      hasMore: users.length === ITEMS_PER_PAGE
    };
  } catch (error) {
    console.error('Error obteniendo usuarios:', error);
    throw error;
  }
};

// Obtener estadísticas de usuarios
export const getUserStats = async (): Promise<UserStats> => {
  try {
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const adminsSnapshot = await getDocs(collection(db, 'admins'));
    
    // Calcular usuarios activos hoy (ejemplo simplificado)
    const today = new Date().toISOString().split('T')[0];
    const activeUsers = usersSnapshot.docs.filter(document => {
      const userData = document.data();
      return userData.lastLogin && userData.lastLogin.includes(today);
    });

    return {
      totalUsers: usersSnapshot.size,
      totalAdmins: adminsSnapshot.size,
      activeToday: activeUsers.length
    };
  } catch (error) {
    console.error('Error obteniendo estadísticas:', error);
    throw error;
  }
};