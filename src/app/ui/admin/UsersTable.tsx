import { User } from '@/app/services/userAdminService';
import { Eye } from 'lucide-react';

interface UsersTableProps {
  users: User[];
  loading: boolean;
  hasMore: boolean;
  userProjectStats: Record<string, { total: number; active: number; completed: number }>;
  openProjectsModal: (user: User) => void;
  loadMore: () => void;
}

export default function UsersTable({
  users,
  loading,
  hasMore,
  userProjectStats,
  openProjectsModal,
  loadMore
}: UsersTableProps) {
  return (
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
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col space-y-2">
                        {/* Barra de progreso HTML */}
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-600 dark:text-gray-300">HTML</span>
                            <span className="font-medium text-indigo-600 dark:text-indigo-400">{user.progress?.html || 0}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300 ease-out" 
                              style={{ width: `${user.progress?.html || 0}%` }}
                            ></div>
                          </div>
                        </div>
                        
                        {/* Barra de progreso CSS */}
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-600 dark:text-gray-300">CSS</span>
                            <span className="font-medium text-purple-600 dark:text-purple-400">{user.progress?.css || 0}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full transition-all duration-300 ease-out" 
                              style={{ width: `${user.progress?.css || 0}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => openProjectsModal(user)}
                        className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 cursor-pointer"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Ver proyectos
                        <span className="ml-2 bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
                          {userProjectStats[user.id]?.total || 0}
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {hasMore && (
            <div className="px-6 py-4 bg-gray-50 dark:bg-zinc-700 text-right">
              <button 
                onClick={loadMore}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition cursor-pointer"
                disabled={loading}
              >
                {loading ? 'Cargando...' : 'Cargar más usuarios'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}