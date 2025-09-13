'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useUser } from "@clerk/nextjs";
import { useIsAdmin } from "@/app/hooks/useIsAdmin";
import { redirect } from "next/navigation";
import { QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { User, getUsers, getUserStats, searchUsers } from '@/app/services/userAdminService';
import { getUserProjects, Project, getUserProjectStats } from '@/app/services/projectService';
import UsersTable from '@/app/ui/admin/UsersTable';
import ProjectsModal from '@/app/ui/admin/ProjectsModal';
import StatsCards from '@/app/ui/admin/StatsCards';
import SearchBar from '@/app/ui/admin/SearchBar';

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
  
  // Referencia para controlar la carga inicial
  const initialLoadDone = useRef(false);

  const loadUsers = useCallback(async (next = false) => {
    setLoading(true);
    try {
      const result = await getUsers(next ? lastVisible : null);
      
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
  }, [lastVisible]);

  const loadStats = useCallback(async () => {
    try {
      const statsData = await getUserStats();
      setStats(statsData);
    } catch (error) {
      console.error('Error cargando estadísticas:', error);
    }
  }, []);

  useEffect(() => {
    // Solo cargar una vez cuando todo esté listo y no se haya cargado antes
    if (isCurrentUserLoaded && !isAdminLoading && !initialLoadDone.current) {
      if (!isAdmin) {
        redirect("/dashboard");
      } else {
        initialLoadDone.current = true;
        loadStats();
        loadUsers();
      }
    }
  }, [isCurrentUserLoaded, isAdmin, isAdminLoading, loadStats, loadUsers]);

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
      const result = await searchUsers(searchTerm);
      setUsers(result);
      setLastVisible(null);
      setHasMore(false);
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
      </div>
      
      <StatsCards stats={stats} />

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        handleKeyDown={handleKeyDown}
        clearSearch={clearSearch}
        loading={loading}
      />

      <UsersTable
        users={users}
        loading={loading}
        hasMore={hasMore}
        userProjectStats={userProjectStats}
        openProjectsModal={openProjectsModal}
        loadMore={loadMore}
      />

      <ProjectsModal
        showProjectsModal={showProjectsModal}
        selectedUser={selectedUser}
        loadingProjects={loadingProjects}
        userProjects={userProjects}
        getProjectUrl={getProjectUrl}
        closeProjectsModal={closeProjectsModal}
      />
    </div>
  );
}