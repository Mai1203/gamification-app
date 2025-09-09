'use client';

import { useState, useEffect, useCallback } from 'react';
import { useUser } from "@clerk/nextjs";
import { useIsAdmin } from "@/app/hooks/useIsAdmin";
import { redirect } from "next/navigation";
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { User, getUsers, getUserStats } from '@/app/services/userAdminService';
import { setUserAsAdmin, removeAdminRole } from '@/app/services/adminService';
import { getUserProjects, Project, getUserProjectStats } from '@/app/services/projectService';
import Link from 'next/link';
import { Eye, ExternalLink, X } from 'lucide-react';


export default function AdminPage() {
  const { isLoaded: isCurrentUserLoaded } = useUser();
  const { isAdmin, loading: isAdminLoading } = useIsAdmin();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAdmins: 0,
    activeToday: 0
  });
  const [userProjects, setUserProjects] = useState<Record<string, Project[]>>({});
  const [userProjectStats, setUserProjectStats] = useState<Record<string, {total: number, active: number, completed: number}>>({});
  const [loadingProjects, setLoadingProjects] = useState<Record<string, boolean>>({});
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showProjectsModal, setShowProjectsModal] = useState(false);

  const loadUsers = useCallback(async (next = false) => {
    setLoading(true);
    try {
      const result = await getUsers(next ? lastVisible : null, searchTerm);
      
      if (next) {
        setUsers(prev => [...prev, ...result.users]);
      } else {
        setUsers(result.users);
      }

      setLastVisible(result.lastVisible);
      setHasMore(result.hasMore);
    } catch (error) {
      console.error('Error cargando usuarios:', error);
    } finally {
      setLoading(false);
    }
  }, [lastVisible, searchTerm]);

  const loadStats =  useCallback(async () => {
    try {
      const statsData = await getUserStats();
      setStats(statsData);
    } catch (error) {
      console.error('Error cargando estadísticas:', error);
    }
  }, []);

  useEffect(() => {
    if (isCurrentUserLoaded && !isAdminLoading) {
      if (!isAdmin) {
        redirect("/");
      } else {
        loadUsers();
        loadStats();
      }
    }
  }, [isCurrentUserLoaded, isAdmin, isAdminLoading, loadUsers, loadStats]);

  

  const loadUserProjects = async (userId: string) => {
    setLoadingProjects(prev => ({ ...prev, [userId]: true }));
    try {
      const projects = await getUserProjects(userId);
      const stats = await getUserProjectStats(userId);
      
      setUserProjects(prev => ({ ...prev, [userId]: projects }));
      setUserProjectStats(prev => ({ ...prev, [userId]: stats }));
    } catch (error) {
      console.error('Error cargando proyectos:', error);
    } finally {
      setLoadingProjects(prev => ({ ...prev, [userId]: false }));
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const result = await getUsers(null, searchTerm);
      setUsers(result.users);
      setLastVisible(result.lastVisible);
      setHasMore(result.hasMore);
    } catch (error) {
      console.error('Error buscando usuarios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleAdmin = async (userId: string, currentStatus: boolean) => {
    try {
      if (currentStatus) {
        await removeAdminRole(userId);
      } else {
        await setUserAsAdmin(userId);
      }
      
      // Actualizar el estado local
      setUsers(users.map(user => 
        user.id === userId ? { ...user, isAdmin: !currentStatus } : user
      ));
      
      // Recargar estadísticas
      await loadStats();
    } catch (error) {
      console.error('Error cambiando rol de administrador:', error);
    }
  };

  const loadMore = () => {
    if (hasMore) {
      loadUsers(true);
    }
  };

  const clearSearch = () => {
    setSearchTerm('');
    loadUsers();
  };

  const openProjectsModal = async (user: User) => {
    setSelectedUser(user);
    if (!userProjects[user.id]) {
      await loadUserProjects(user.id);
    }
    setShowProjectsModal(true);
  };

  const closeProjectsModal = () => {
    setShowProjectsModal(false);
    setSelectedUser(null);
  };

  // Función para obtener la URL del proyecto (ajusta según tu estructura de rutas)
  const getProjectUrl = (userId: string, projectId: string) => {
    return `/dashboard/projects/${projectId}?userId=${userId}`;
  };

  if (!isCurrentUserLoaded || isAdminLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Panel de Administración
        </h1>
        <Link 
          href="/dashboard"
          className="bg-gray-300 hover:bg-gray-400 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-gray-800 dark:text-white font-medium py-2 px-4 rounded-lg transition"
        >
          Volver al Dashboard
        </Link>
      </div>
      
      {/* Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total de Usuarios</h3>
          <p className="text-3xl font-bold text-indigo-600">{stats.totalUsers}</p>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Administradores</h3>
          <p className="text-3xl font-bold text-purple-600">{stats.totalAdmins}</p>
        </div>
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Activos hoy</h3>
          <p className="text-3xl font-bold text-green-600">{stats.activeToday}</p>
        </div>
      </div>

      {/* Búsqueda */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Buscar por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-grow border border-gray-300 dark:border-gray-700 p-3 rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
          />
          <button 
            onClick={handleSearch}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium py-3 px-6 rounded-lg transition"
          >
            Buscar
          </button>
          <button 
            onClick={clearSearch}
            disabled={loading}
            className="bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 dark:bg-zinc-700 dark:hover:bg-zinc-600 disabled:dark:bg-zinc-800 text-gray-800 dark:text-white font-medium py-3 px-6 rounded-lg transition"
          >
            Limpiar
          </button>
        </div>
      </div>

      {/* Tabla de usuarios */}
      <div className="bg-white dark:bg-zinc-800 rounded-lg shadow overflow-hidden">
        {loading && users.length === 0 ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Cargando usuarios...</p>
          </div>
        ) : users.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-600 dark:text-gray-400">No se encontraron usuarios.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-zinc-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Usuario
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Progreso
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Proyectos
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Último acceso
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Rol
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-zinc-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                            <span className="text-indigo-800 dark:text-indigo-200 font-medium">
                              {user.name?.charAt(0)?.toUpperCase() || 'U'}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {user.name || 'Usuario sin nombre'}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              Registrado: {new Date(user.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">
                          HTML: {user.progress?.html || 0}%
                        </div>
                        <div className="text-sm text-gray-900 dark:text-white">
                          CSS: {user.progress?.css || 0}%
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        <button
                          onClick={() => openProjectsModal(user)}
                          className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 text-xs flex items-center"
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Ver proyectos ({userProjectStats[user.id]?.total || 0})
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Nunca'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.isAdmin 
                            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' 
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                        }`}>
                          {user.isAdmin ? 'Administrador' : 'Usuario'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => toggleAdmin(user.id, user.isAdmin || false)}
                          className={`px-4 py-2 rounded-md text-white ${
                            user.isAdmin 
                              ? 'bg-red-600 hover:bg-red-700' 
                              : 'bg-indigo-600 hover:bg-indigo-700'
                          }`}
                        >
                          {user.isAdmin ? 'Quitar Admin' : 'Hacer Admin'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Paginación */}
            {hasMore && (
              <div className="px-6 py-4 bg-gray-50 dark:bg-zinc-700 text-right">
                <button 
                  onClick={loadMore}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition"
                  disabled={loading}
                >
                  {loading ? 'Cargando...' : 'Cargar más usuarios'}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal de Proyectos */}
      {showProjectsModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Proyectos de {selectedUser.name}
              </h2>
              <button 
                onClick={closeProjectsModal}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
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
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-gray-800 dark:text-white rounded-lg transition"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}