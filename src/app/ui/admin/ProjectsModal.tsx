// src/app/components/admin/ProjectsModal.tsx
import { User } from '@/app/services/userAdminService';
import { Project } from '@/app/services/projectService';
import { X, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface ProjectsModalProps {
  showProjectsModal: boolean;
  selectedUser: User | null;
  loadingProjects: Record<string, boolean>;
  userProjects: Record<string, Project[]>;
  getProjectUrl: (userId: string, projectId: string) => string;
  closeProjectsModal: () => void;
}

export default function ProjectsModal({
  showProjectsModal,
  selectedUser,
  loadingProjects,
  userProjects,
  getProjectUrl,
  closeProjectsModal
}: ProjectsModalProps) {
  if (!showProjectsModal || !selectedUser) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Proyectos de {selectedUser.name}
          </h2>
          <button 
            onClick={closeProjectsModal}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          {loadingProjects[selectedUser.id] ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-4 text-gray-600 dark:text-gray-400">Cargando proyectos...</p>
            </div>
          ) : !userProjects[selectedUser.id] || userProjects[selectedUser.id].length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-400">Este usuario no tiene proyectos.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userProjects[selectedUser.id].map((project) => (
                <div key={project.id} className="bg-gray-50 dark:bg-zinc-700 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    <p>Creado: {new Date(project.createdAt).toLocaleDateString()}</p>
                    <p>Actualizado: {new Date(project.updatedAt).toLocaleDateString()}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs px-2 py-1 bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200 rounded-full">
                      {project.status || 'Activo'}
                    </span>
                    <Link 
                      href={getProjectUrl(selectedUser.id, project.id!)}
                      target="_blank"
                      className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 flex items-center"
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Ver proyecto
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-right">
          <button
            onClick={closeProjectsModal}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-gray-800 dark:text-white rounded-lg transition cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}