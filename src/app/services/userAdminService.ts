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
  QueryDocumentSnapshot,
  Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebaseConfig';

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  progress?: {
    html: number;
    css: number;
  };
}

export interface UserStats {
  totalUsers: number;
  totalAdmins: number;
  activeToday: number;
}

interface Lesson {
  completed: boolean;
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
  lastVisible: QueryDocumentSnapshot<DocumentData> | null = null
): Promise<{ 
  users: User[], 
  lastVisible: QueryDocumentSnapshot<DocumentData> | null, 
  hasMore: boolean 
}> => {
  try {
    let q = query(
      collection(db, 'users'),
      orderBy('name'),
      limit(ITEMS_PER_PAGE)
    );

    if (lastVisible) {
      q = query(q, startAfter(lastVisible));
    }

    const querySnapshot = await getDocs(q);
    const users: User[] = [];

    for (const document of querySnapshot.docs) {
      const data = document.data();

      // Calcular progresos en paralelo
      const [htmlProgress, cssProgress] = await Promise.all([
        calculateModuleProgress(document.id, 'html'),
        calculateModuleProgress(document.id, 'css')
      ]);

      users.push({
        id: document.id,
        name: data.name || 'Sin nombre',
        email: data.email,
        createdAt: data.createdAt,
        progress: {
          html: htmlProgress,
          css: cssProgress
        }
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

// Buscar usuarios por nombre o email
export const searchUsers = async (searchTerm: string): Promise<User[]> => {
  try {
    // Consultas separadas para nombre y email
    const nameQuery = query(
      collection(db, 'users'),
      where('name', '>=', searchTerm),
      where('name', '<=', searchTerm + '\uf8ff'),
      orderBy('name')
    );
    
    const emailQuery = query(
      collection(db, 'users'),
      where('email', '>=', searchTerm),
      where('email', '<=', searchTerm + '\uf8ff'),
      orderBy('email')
    );

    // Ejecutar ambas consultas en paralelo
    const [nameSnapshot, emailSnapshot] = await Promise.all([
      getDocs(nameQuery),
      getDocs(emailQuery)
    ]);

    // Combinar resultados y eliminar duplicados
    const combinedDocs = [...nameSnapshot.docs, ...emailSnapshot.docs];
    const uniqueDocs = combinedDocs.filter((doc, index, self) => 
      index === self.findIndex(d => d.id === doc.id)
    );

    const users: User[] = [];

    for (const document of uniqueDocs) {
      const data = document.data();

      // Calcular progresos en paralelo
      const [htmlProgress, cssProgress] = await Promise.all([
        calculateModuleProgress(document.id, 'html'),
        calculateModuleProgress(document.id, 'css')
      ]);

      users.push({
        id: document.id,
        name: data.name || 'Sin nombre',
        email: data.email,
        createdAt: data.createdAt,
        progress: {
          html: htmlProgress,
          css: cssProgress
        }
      });
    }

    // Ordenar por nombre
    users.sort((a, b) => a.name.localeCompare(b.name));

    return users;
  } catch (error) {
    console.error('Error buscando usuarios:', error);
    throw error;
  }
};

// Obtener estadísticas de usuarios
export const getUserStats = async (): Promise<UserStats> => {
  try {
    const [usersSnapshot, adminsSnapshot] = await Promise.all([
      getDocs(collection(db, 'users')),
      getDocs(collection(db, 'admins'))
    ]);
    
    // Calcular usuarios activos hoy
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = Timestamp.fromDate(today);
    
    const activeUsers = usersSnapshot.docs.filter(document => {
      const userData = document.data();
      if (!userData.lastLogin) return false;
      
      let lastLogin: Timestamp;
      if (typeof userData.lastLogin === 'string') {
        lastLogin = Timestamp.fromDate(new Date(userData.lastLogin));
      } else {
        lastLogin = userData.lastLogin;
      }
      
      return lastLogin.toMillis() >= todayTimestamp.toMillis();
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