'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Project, getUserProjects } from '@/app/services/projectService';
import { Plus, Code, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import ProjectModal from '@/app/ui/projects/ProjectModal';
import { SignInButton, SignUpButton } from '@clerk/nextjs';
import AnimationLoaded from '@/app/ui/dashboard/animationLoaded';

export default function ProjectsPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      loadProjects(user.id);
    } else {
      setLoading(false);
    }
  }, [isLoaded, isSignedIn, user]);

  const loadProjects = async (userID: string) => {
    try {
      const userProjects = await getUserProjects(userID);
      setProjects(userProjects);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = () => {
    setEditingProject(null);
    setIsModalOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleProjectUpdated = () => {
    if (user) {
      loadProjects(user.id);
    }
  };

  if (loading) {
    return <AnimationLoaded />;
  }

  if (!isSignedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
        <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-6 w-full max-w-md text-center">
          <Code className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-3 dark:text-white">Inicia sesión para gestionar tus proyectos</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-5 text-sm leading-relaxed">
            Guarda tus creaciones HTML/CSS y accede a ellas desde cualquier dispositivo.
          </p>
          <div className="flex flex-col gap-3">
            <SignInButton mode="modal">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg transition cursor-pointer text-sm font-medium w-full">
                Iniciar sesión
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg transition cursor-pointer text-sm font-medium w-full">
                Registrarse
              </button>
            </SignUpButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-700 dark:text-white mb-1">Mis Proyectos</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Crea y gestiona tus proyectos HTML/CSS
          </p>
        </div>
        <button
          onClick={handleCreateProject}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition cursor-pointer w-full sm:w-auto text-sm font-medium"
        >
          <Plus size={18} /> Nuevo Proyecto
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-8 sm:py-12 bg-white dark:bg-zinc-800 rounded-xl shadow p-6">
          <Code className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2 dark:text-white">Aún no tienes proyectos</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-5 text-sm leading-relaxed">
            Comienza creando tu primer proyecto para practicar tus habilidades.
          </p>
          <button
            onClick={handleCreateProject}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg transition cursor-pointer text-sm font-medium"
          >
            Crear primer proyecto
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-zinc-800 rounded-lg shadow overflow-hidden cursor-pointer border border-gray-200 dark:border-zinc-700"
              onClick={() => handleEditProject(project)}
            >
              <div className="p-4 sm:p-5">
                <h3 className="font-semibold text-base sm:text-lg mb-3 text-gray-700 dark:text-white line-clamp-2 leading-tight" style={{ minHeight: '2.5rem' }}>
                  {project.title}
                </h3>
                <div className="flex items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <Calendar size={14} className="mr-1.5" />
                  {project.updatedAt.toLocaleDateString()}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  {(project.html.length + project.css.length).toLocaleString()} caracteres
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-zinc-700 px-4 py-2.5 text-xs text-gray-500 dark:text-gray-400">
                Última modificación: {project.updatedAt.toLocaleDateString()}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <ProjectModal
          project={editingProject}
          onClose={() => setIsModalOpen(false)}
          onProjectUpdated={handleProjectUpdated}
        />
      )}
    </div>
  );
}