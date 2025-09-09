import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { isUserAdmin } from '@/app/services/adminService';

export const useIsAdmin = () => {
  const { user, isLoaded } = useUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (isLoaded && user) {
        try {
          const adminStatus = await isUserAdmin(user.id);
          setIsAdmin(adminStatus);
        } catch (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    checkAdminStatus();
  }, [isLoaded, user]);

  return { isAdmin, loading };
};