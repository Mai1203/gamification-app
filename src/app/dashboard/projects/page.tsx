'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Project, getUserProjects } from '@/app/services/projectService';
import { Plus, Code, Calendar, FileText, Sparkles } from 'lucide-react';
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
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 dark:from-zinc-900 dark:to-zinc-800">
        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-8 w-full max-w-md text-center border border-gray-100 dark:border-zinc-700">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-6">
            <Code className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Inicia sesión para gestionar tus proyectos</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-base leading-relaxed">
            Guarda tus creaciones HTML/CSS y accede a ellas desde cualquier dispositivo.
          </p>
          <div className="flex flex-col gap-3">
            <SignInButton mode="modal">
              <button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl transition-all cursor-pointer font-medium w-full shadow-md hover:shadow-lg">
                Iniciar sesión
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-white dark:bg-zinc-700 border border-gray-300 dark:border-zinc-600 text-gray-800 dark:text-white px-6 py-3 rounded-xl transition-all cursor-pointer font-medium w-full shadow-sm hover:shadow-md">
                Registrarse
              </button>
            </SignUpButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-white bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-800 rounded-xl shadow-xl p-4 lg:p-8 mx-4 sm:mx-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2"
            >
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Mis Proyectos
              </span>
              <Sparkles className="w-6 h-6 text-yellow-500" />
            </motion.h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              Crea y gestiona tus proyectos HTML/CSS
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCreateProject}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-5 py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer w-full sm:w-auto text-sm font-medium shadow-md hover:shadow-lg"
          >
            <Plus size={18} /> Nuevo Proyecto
          </motion.button>
        </div>

        {projects.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center py-12 bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-zinc-700"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-zinc-700 rounded-full mb-6">
              <FileText className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Aún no tienes proyectos</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-base leading-relaxed max-w-md mx-auto">
              Comienza creando tu primer proyecto para practicar tus habilidades de desarrollo web.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCreateProject}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl transition-all cursor-pointer font-medium shadow-md hover:shadow-lg"
            >
              Crear primer proyecto
            </motion.button>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg overflow-hidden cursor-pointer border border-gray-100 dark:border-zinc-700 hover:shadow-xl transition-all duration-300"
                onClick={() => handleEditProject(project)}
              >
                <div className="p-5 sm:p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className='flex justify-center items-center gap-2'>
                      <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                        <Code className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <h3 className="font-semibold text-lg mb-3 text-gray-800 dark:text-white line-clamp-2 leading-tight">
                        {project.title}
                      </h3>
                    </div>
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 dark:bg-zinc-700 text-gray-600 dark:text-gray-300">
                      {project.html.length + project.css.length > 1000 ? 'Avanzado' : 'Básico'}
                    </span>
                  </div>
                
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <Calendar size={16} className="mr-2" />
                    {project.updatedAt.toLocaleDateString('es-ES', { 
                      day: 'numeric', 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {(project.html.length + project.css.length).toLocaleString()} caracteres
                    </span>
                    <div className="flex space-x-1">
                      {['bg-indigo-500', 'bg-purple-500', 'bg-pink-500'].map((color, i) => (
                        <div key={i} className={`w-2 h-2 rounded-full ${color}`}></div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-zinc-700 dark:to-zinc-600 px-5 py-3 text-xs text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-zinc-600">
                  <div className="flex justify-between items-center">
                    <span>Última modificación: {project.updatedAt.toLocaleDateString()}</span>
                    <div className="animate-pulse bg-indigo-500 rounded-full w-2 h-2"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {isModalOpen && (
          <ProjectModal
            project={editingProject}
            onClose={() => setIsModalOpen(false)}
            onProjectUpdated={handleProjectUpdated}
          />
        )}
      </div>
    </div>
  );
}