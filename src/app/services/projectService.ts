import { db } from '@/app/lib/firebaseConfig';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs,
  getDoc,
  query,
  orderBy
} from 'firebase/firestore';

export interface Project {
  id?: string;
  userId: string;
  title: string;
  html: string;
  css: string;
  createdAt: Date;
  updatedAt: Date;
}

// Crear un nuevo proyecto dentro del usuario
export const createProject = async (project: Omit<Project, 'id'>): Promise<string> => {
  const userProjectsRef = collection(db, 'users', project.userId, 'projects');
  const docRef = await addDoc(userProjectsRef, {
    ...project,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return docRef.id;
};

// Actualizar un proyecto existente dentro del usuario
export const updateProject = async (userId: string, projectId: string, updates: Partial<Project>): Promise<void> => {
  const projectRef = doc(db, 'users', userId, 'projects', projectId);
  await updateDoc(projectRef, {
    ...updates,
    updatedAt: new Date(),
  });
};

// Eliminar un proyecto del usuario
export const deleteProject = async (userId: string, projectId: string): Promise<void> => {
  await deleteDoc(doc(db, 'users', userId, 'projects', projectId));
};

// Obtener todos los proyectos de un usuario
export const getUserProjects = async (userId: string): Promise<Project[]> => {
  const userProjectsRef = collection(db, 'users', userId, 'projects');
  const q = query(
    userProjectsRef,
    orderBy('updatedAt', 'desc')
  );
  
  const querySnapshot = await getDocs(q);
  const projects: Project[] = [];
  
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    projects.push({
      id: doc.id,
      userId: data.userId,
      title: data.title,
      html: data.html,
      css: data.css,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
    });
  });
  
  return projects;
};

// Obtener un proyecto específico de un usuario
export const getProject = async (userId: string, projectId: string): Promise<Project | null> => {
  const projectRef = doc(db, 'users', userId, 'projects', projectId);
  const projectSnap = await getDoc(projectRef);
  
  if (!projectSnap.exists()) return null;
  
  const data = projectSnap.data();
  return {
    id: projectSnap.id,
    userId: data.userId,
    title: data.title,
    html: data.html,
    css: data.css,
    createdAt: data.createdAt.toDate(),
    updatedAt: data.updatedAt.toDate(),
  };
};